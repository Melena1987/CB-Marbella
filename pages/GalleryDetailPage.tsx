
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, Timestamp, limit, doc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, deleteObject } from 'firebase/storage';
import AnimatedContent from '../components/AnimatedContent';
import Lightbox from '../components/Lightbox';
import { useAuth } from '../contexts/AuthContext';


interface GalleryImage {
  original: string;
  thumbnail: string;
}

interface GalleryItem {
  id: string;
  title: string;
  images: (GalleryImage | string)[];
  createdAt: Timestamp;
  slug: string;
}

const GalleryDetailPage: React.FC = () => {
  const { gallerySlug } = useParams<{ gallerySlug: string }>();
  const [gallery, setGallery] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      if (!gallerySlug) {
        setError('URL de galería no válida.');
        setLoading(false);
        return;
      }

      try {
        const galleriesRef = collection(db, 'galleries');
        const q = query(galleriesRef, where("slug", "==", gallerySlug), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setGallery({ id: docSnap.id, ...docSnap.data() } as GalleryItem);
        } else {
          setError('No se ha encontrado la galería.');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar la galería.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [gallerySlug]);
  
  const openLightbox = (index: number) => {
      setSelectedImage(index);
      setLightboxOpen(true);
  }
  
  const handleDeleteGallery = async () => {
    if (!gallery) return;
    if (!window.confirm(`¿Estás seguro de que quieres eliminar la galería "${gallery.title}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const imagesToDelete = gallery.images;

      // Delete all images (original and thumbnail) from Storage
      const imageDeletePromises = imagesToDelete.flatMap(img => {
          const originalUrl = typeof img === 'object' ? img.original : img;
          const thumbnailUrl = typeof img === 'object' ? img.thumbnail : null;
          
          const deletePromises = [];
          
          if (originalUrl) {
              const originalRef = ref(storage, originalUrl);
              deletePromises.push(deleteObject(originalRef).catch(err => console.error(`Failed to delete original: ${originalUrl}`, err)));
          }

          if (thumbnailUrl) {
              const thumbnailRef = ref(storage, thumbnailUrl);
              deletePromises.push(deleteObject(thumbnailRef).catch(err => console.error(`Failed to delete thumbnail: ${thumbnailUrl}`, err)));
          }

          return deletePromises;
      });
      
      await Promise.all(imageDeletePromises);

      // Delete gallery document from Firestore
      await deleteDoc(doc(db, "galleries", gallery.id));
      
      // Navigate back to the gallery list
      navigate('/galeria');

    } catch (error) {
      console.error("Error deleting gallery:", error);
      alert("No se pudo eliminar la galería.");
    }
  };

  if (loading) {
    return <div className="text-center pt-32">Cargando galería...</div>;
  }

  if (error) {
    return <div className="text-center pt-32 text-red-500">{error}</div>;
  }
  
  if (!gallery) {
      return null;
  }

  return (
    <div className="pt-24 pb-16 bg-[#0a192f] min-h-screen">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Link to="/galeria" className="text-sm text-slate-400 hover:text-white inline-block">&larr; Volver a todas las galerías</Link>
              {user && (
                <button 
                  onClick={handleDeleteGallery}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded-full transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                  <span>Eliminar</span>
                </button>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white uppercase font-['Teko'] mb-2">{gallery.title}</h1>
            <p className="text-slate-400">
                {gallery.createdAt?.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                <span className="mx-2">&bull;</span>
                {gallery.images.length} fotos
            </p>
          </div>
        </AnimatedContent>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {gallery.images.map((img, index) => {
            const thumbnailUrl = typeof img === 'object' ? img.thumbnail || img.original : img;
            return (
              <AnimatedContent key={index} style={{ animationDelay: `${index * 50}ms` }}>
                <div 
                  className="aspect-square bg-[#061121] rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                  >
                  <img src={thumbnailUrl} alt={`${gallery.title} - ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
      
      {lightboxOpen && (
          <Lightbox 
            images={gallery.images.map(img => typeof img === 'object' ? img.original : img)}
            selectedIndex={selectedImage}
            onClose={() => setLightboxOpen(false)}
            onNext={() => setSelectedImage((prev) => (prev + 1) % gallery.images.length)}
            onPrev={() => setSelectedImage((prev) => (prev - 1 + gallery.images.length) % gallery.images.length)}
          />
      )}
    </div>
  );
};

export default GalleryDetailPage;