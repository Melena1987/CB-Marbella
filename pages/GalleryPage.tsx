import React, { useState } from 'react';
import AnimatedContent from '../components/AnimatedContent';

interface GalleryItem {
  id: number;
  title: string;
  images: string[]; // URLs of images
}

// Mock data for initial galleries
const initialGalleries: GalleryItem[] = [
  { id: 1, title: 'Partido vs. CB Algeciras', images: ['https://picsum.photos/seed/gallery1-1/500/500', 'https://picsum.photos/seed/gallery1-2/500/500', 'https://picsum.photos/seed/gallery1-3/500/500'] },
  { id: 2, title: 'Presentación del Equipo 25/26', images: ['https://picsum.photos/seed/gallery2-1/500/500', 'https://picsum.photos/seed/gallery2-2/500/500'] },
  { id: 3, title: 'Evento con Patrocinadores', images: ['https://picsum.photos/seed/gallery3-1/500/500', 'https://picsum.photos/seed/gallery3-2/500/500', 'https://picsum.photos/seed/gallery3-3/500/500', 'https://picsum.photos/seed/gallery3-4/500/500'] },
  { id: 4, title: 'Jornada de Cantera', images: ['https://picsum.photos/seed/gallery4-1/500/500'] },
];

// --- Modal Component for Creating a New Gallery ---
interface CreateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, images: FileList) => void;
}

const CreateGalleryModal: React.FC<CreateGalleryModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && files && files.length > 0) {
      onCreate(title, files);
      setTitle('');
      setFiles(null);
      onClose();
    } else {
      alert('Por favor, introduce un título y selecciona al menos una imagen.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#061121] rounded-lg shadow-2xl p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-white font-['Teko'] mb-6">Crear Nueva Galería</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Título de la Galería</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              required
            />
          </div>
          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-slate-300 mb-1">Subir Fotos</label>
            <input 
              type="file" 
              id="photos" 
              onChange={(e) => setFiles(e.target.files)} 
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#003782] file:text-white hover:file:bg-[#002966] transition"
              multiple 
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Crear Galería
          </button>
        </form>
      </div>
    </div>
  );
};


// --- Card Component for Displaying a Gallery ---
const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => (
    <div className="block group overflow-hidden rounded-lg shadow-lg bg-[#061121] hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="overflow-hidden aspect-square">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold text-white font-['Teko'] mb-1 leading-tight truncate">{item.title}</h3>
        <p className="text-sm text-[#003782] font-semibold">{item.images.length} {item.images.length === 1 ? 'foto' : 'fotos'}</p>
      </div>
    </div>
);

// --- Main Gallery Page Component ---
const GalleryPage: React.FC = () => {
    const [galleries, setGalleries] = useState<GalleryItem[]>(initialGalleries);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateGallery = (title: string, files: FileList) => {
        const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
        const newGallery: GalleryItem = {
            id: Date.now(),
            title,
            images: imageUrls,
        };
        setGalleries(prev => [newGallery, ...prev]);
    };

    return (
        <div className="pt-24 pb-16 bg-[#0a192f] min-h-screen">
            <CreateGalleryModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateGallery}
            />
            <div className="container mx-auto px-4">
                <AnimatedContent className="text-center mb-12">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-white uppercase font-['Teko'] mb-2 tracking-wide">Galería de Fotos</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-6">Los mejores momentos del club, en imágenes.</p>
                     <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-2 border border-slate-600 text-slate-300 rounded-full hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        aria-label="Crear Nueva Galería"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>Crear Galería</span>
                    </button>
                </AnimatedContent>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {galleries.map((item, index) => (
                        <AnimatedContent key={item.id} style={{ animationDelay: `${index * 100}ms` }}>
                            <GalleryCard item={item} />
                        </AnimatedContent>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;