import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CreateNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateNewsModal: React.FC<CreateNewsModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
      } else {
        setError('Por favor, selecciona un archivo de imagen válido.');
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setExcerpt('');
    setContent('');
    setImageFile(null);
    setError('');
    setIsUploading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !excerpt.trim() || !content.trim() || !imageFile) {
      setError('Todos los campos y la imagen son obligatorios.');
      return;
    }
    
    setIsUploading(true);
    setError('');

    try {
      const slug = title.trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // 1. Upload image
      const imageRef = ref(storage, `news-images/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // 2. Add document to Firestore
      await addDoc(collection(db, 'news'), {
        title,
        slug,
        category,
        excerpt,
        content,
        image: imageUrl,
        createdAt: serverTimestamp(),
      });
      
      handleClose();

    } catch (err) {
      console.error("Error creating news item:", err);
      setError('Hubo un error al crear la noticia. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="bg-[#061121] rounded-lg shadow-2xl p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-white font-['Teko'] mb-6">Añadir Nueva Noticia</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="news-title" className="block text-sm font-medium text-slate-300 mb-1">Título</label>
            <input 
              type="text" 
              id="news-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              required
            />
          </div>
          <div>
            <label htmlFor="news-category" className="block text-sm font-medium text-slate-300 mb-1">Categoría</label>
            <input 
              type="text" 
              id="news-category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              placeholder="Ej: Primer Equipo, Fichajes, Club..."
              required
            />
          </div>
          <div>
            <label htmlFor="news-excerpt" className="block text-sm font-medium text-slate-300 mb-1">Extracto</label>
            <textarea
              id="news-excerpt"
              rows={3}
              value={excerpt} 
              onChange={(e) => setExcerpt(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              required
            ></textarea>
          </div>
           <div>
            <label htmlFor="news-content" className="block text-sm font-medium text-slate-300 mb-1">Contenido Completo</label>
            <textarea
              id="news-content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              placeholder="Escribe el contenido. Puedes usar HTML (ej: <p>, <b>, <ul>)."
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="news-image" className="block text-sm font-medium text-slate-300 mb-1">Imagen de Portada</label>
            <input 
              type="file" 
              id="news-image" 
              onChange={handleFileSelect} 
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#003782] file:text-white hover:file:bg-[#002966] transition"
              accept="image/*"
            />
             {imageFile && <p className="text-xs text-slate-400 mt-2">Seleccionado: {imageFile.name}</p>}
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isUploading}
            className="w-full mt-4 bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
          >
            {isUploading ? 'Publicando...' : 'Publicar Noticia'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewsModal;