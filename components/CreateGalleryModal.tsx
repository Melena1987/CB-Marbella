import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CreateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to resize images to create thumbnails
const resizeImage = (file: File, maxWidth: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        return reject(new Error('Failed to read file.'));
      }
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context'));
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        }, 'image/jpeg', 0.8); // 80% quality JPEG
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const CreateGalleryModal: React.FC<CreateGalleryModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = (Array.from(e.target.files) as File[]).filter(file => file.type.startsWith('image/'));
      const uniqueNewFiles = newFiles.filter(newFile => !files.some(existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size));
      setFiles(prev => [...prev, ...uniqueNewFiles]);
      e.target.value = '';
    }
  };
  
  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const resetForm = () => {
    setTitle('');
    setFiles([]);
    setError('');
    setIsUploading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || files.length === 0) {
      setError('Por favor, introduce un título y selecciona al menos una imagen.');
      return;
    }
    
    setIsUploading(true);
    setError('');
    const galleryId = `${Date.now()}-${title.replace(/\s+/g, '-').toLowerCase()}`;

    try {
      const imageUploadPromises = files.map(async (file) => {
        // 1. Create thumbnail (400px width)
        const thumbnailBlob = await resizeImage(file, 400);

        // 2. Upload original image
        const originalStorageRef = ref(storage, `galleries/${galleryId}/${file.name}`);
        await uploadBytes(originalStorageRef, file);
        const originalUrl = await getDownloadURL(originalStorageRef);

        // 3. Upload thumbnail
        const thumbnailStorageRef = ref(storage, `galleries/${galleryId}/thumb_${file.name}`);
        await uploadBytes(thumbnailStorageRef, thumbnailBlob);
        const thumbnailUrl = await getDownloadURL(thumbnailStorageRef);

        return { original: originalUrl, thumbnail: thumbnailUrl };
      });
      
      const imageUrls = await Promise.all(imageUploadPromises);

      await addDoc(collection(db, 'galleries'), {
        title: title,
        images: imageUrls,
        createdAt: serverTimestamp(),
      });
      
      handleClose();

    } catch (err) {
      console.error("Error creating gallery:", err);
      setError('Hubo un error al crear la galería. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#061121] rounded-lg shadow-2xl p-8 max-w-lg w-full relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-white font-['Teko'] mb-6">Crear Nueva Galería</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="gallery-title" className="block text-sm font-medium text-slate-300 mb-1">Título de la Galería</label>
            <input 
              type="text" 
              id="gallery-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              required
            />
          </div>
          <div>
            <label htmlFor="gallery-photos" className="block text-sm font-medium text-slate-300 mb-1">Subir Fotos ({files.length})</label>
            <input 
              type="file" 
              id="gallery-photos" 
              onChange={handleFileSelect} 
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#003782] file:text-white hover:file:bg-[#002966] transition"
              multiple 
              accept="image/*"
            />
          </div>

          {files.length > 0 && (
            <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
              {files.map(file => (
                <div key={file.name + file.size} className="flex items-center justify-between text-xs bg-[#0a192f] p-2 rounded">
                  <span className="truncate text-slate-300">{file.name}</span>
                  <button type="button" onClick={() => removeFile(file.name)} className="text-slate-500 hover:text-red-500 transition-colors p-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
          >
            {isUploading ? 'Creando...' : 'Crear Galería'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGalleryModal;