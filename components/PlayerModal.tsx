import React, { useState, useEffect } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface Player {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerToEdit?: Player | null;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ isOpen, onClose, playerToEdit }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
        if (playerToEdit) {
            setName(playerToEdit.name);
            setPosition(playerToEdit.position);
            setImagePreview(playerToEdit.imageUrl);
            setImageFile(null);
        } else {
            setName('');
            setPosition('');
            setImageFile(null);
            setImagePreview(null);
        }
        setError('');
    }
  }, [playerToEdit, isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setError('');
      } else {
        setError('Por favor, selecciona un archivo de imagen válido.');
        setImageFile(null);
      }
    }
  };

  const resetForm = () => {
    setName('');
    setPosition('');
    setImageFile(null);
    setImagePreview(null);
    setError('');
    setIsUploading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim()) {
      setError('Nombre y posición son obligatorios.');
      return;
    }
    if (!playerToEdit && !imageFile) {
      setError('La imagen es obligatoria para un nuevo jugador.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      let imageUrl = playerToEdit?.imageUrl || '';

      if (imageFile) {
        if (playerToEdit && playerToEdit.imageUrl) {
          try {
            const oldImageRef = ref(storage, playerToEdit.imageUrl);
            await deleteObject(oldImageRef);
          } catch (deleteError: any) {
            if (deleteError.code !== 'storage/object-not-found') {
              console.error("Could not delete old image:", deleteError);
            }
          }
        }
        
        const imageRef = ref(storage, `player-images/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const playerData = {
        name,
        position,
        imageUrl,
      };

      if (playerToEdit) {
        const playerDocRef = doc(db, 'players', playerToEdit.id);
        await updateDoc(playerDocRef, playerData);
      } else {
        await addDoc(collection(db, 'players'), {
          ...playerData,
          createdAt: serverTimestamp(),
        });
      }
      
      handleClose();

    } catch (err) {
      console.error("Error saving player:", err);
      setError('Hubo un error al guardar el jugador. Inténtalo de nuevo.');
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
        <h2 className="text-3xl font-bold text-white font-['Teko'] mb-6">{playerToEdit ? 'Editar Jugador' : 'Añadir Jugador'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="player-name" className="block text-sm font-medium text-slate-300 mb-1">Nombre</label>
            <input 
              type="text" 
              id="player-name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              required
            />
          </div>
          <div>
            <label htmlFor="player-position" className="block text-sm font-medium text-slate-300 mb-1">Posición</label>
            <input 
              type="text" 
              id="player-position" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              placeholder="Ej: Base, Alero..."
              required
            />
          </div>
          <div>
            <label htmlFor="player-image" className="block text-sm font-medium text-slate-300 mb-1">Foto del Jugador</label>
            <input 
              type="file" 
              id="player-image" 
              onChange={handleFileSelect} 
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#003782] file:text-white hover:file:bg-[#002966] transition"
              accept="image/*"
            />
             {imagePreview && <img src={imagePreview} alt="Vista previa" className="w-24 h-24 object-cover mt-2 rounded" />}
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isUploading}
            className="w-full mt-4 bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
          >
            {isUploading ? 'Guardando...' : 'Guardar Jugador'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerModal;
