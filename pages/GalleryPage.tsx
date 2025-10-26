import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedContent from '../components/AnimatedContent';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import LoginModal from '../components/LoginModal';
import CreateGalleryModal from '../components/CreateGalleryModal';

interface GalleryImage {
  original: string;
  thumbnail: string;
}

interface GalleryItem {
  id: string; // Firestore document ID
  title: string;
  slug: string;
  images: GalleryImage[]; // Array of image objects
}

// --- Card Component for Displaying a Gallery ---
const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => (
    <Link to={`/galeria/${item.slug}`} className="block group overflow-hidden rounded-lg shadow-lg bg-[#061121] hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="overflow-hidden aspect-square">
        <img src={item.images[0]?.thumbnail || item.images[0]?.original} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold text-white font-['Teko'] mb-1 leading-tight truncate">{item.title}</h3>
        <p className="text-sm text-[#003782] font-semibold">{item.images.length} {item.images.length === 1 ? 'foto' : 'fotos'}</p>
      </div>
    </Link>
);

// --- Main Gallery Page Component ---
const GalleryPage: React.FC = () => {
    const [galleries, setGalleries] = useState<GalleryItem[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Effect to check auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Effect to fetch galleries from Firestore
    useEffect(() => {
      const galleriesCollection = collection(db, "galleries");
      const q = query(galleriesCollection, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const galleriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as GalleryItem));
        setGalleries(galleriesData);
      });

      return () => unsubscribe();
    }, []);

    const handleAddGalleryClick = () => {
        if (user) {
            setIsCreateModalOpen(true);
        } else {
            setIsLoginModalOpen(true);
        }
    };

    return (
        <div className="pt-24 pb-16 bg-[#0a192f] min-h-screen">
            <CreateGalleryModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
            <LoginModal 
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
            <div className="container mx-auto px-4">
                <AnimatedContent className="text-center mb-12">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-white uppercase font-['Teko'] mb-2 tracking-wide">Galería de Fotos</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-6">Los mejores momentos del club, en imágenes.</p>
                     <button
                        onClick={handleAddGalleryClick}
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