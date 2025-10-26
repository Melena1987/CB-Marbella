import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import AnimatedContent from '../components/AnimatedContent';
import Lightbox from '../components/Lightbox';

interface GalleryItem {
  id: string;
  title: string;
  images: string[];
  createdAt: Timestamp;
}

const GalleryDetailPage: React.FC = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const [gallery, setGallery] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      if (!galleryId) {
        setError('ID de galería no válido.');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'galleries', galleryId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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
  }, [galleryId]);
  
  const openLightbox = (index: number) => {
      setSelectedImage(index);
      setLightboxOpen(true);
  }

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
            <Link to="/galeria" className="text-sm text-slate-400 hover:text-white mb-4 inline-block">&larr; Volver a todas las galerías</Link>
            <h1 className="text-5xl md:text-7xl font-bold text-white uppercase font-['Teko'] mb-2">{gallery.title}</h1>
            <p className="text-slate-400">
                {gallery.createdAt?.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                <span className="mx-2">&bull;</span>
                {gallery.images.length} fotos
            </p>
          </div>
        </AnimatedContent>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {gallery.images.map((imgUrl, index) => (
            <AnimatedContent key={index} style={{ animationDelay: `${index * 50}ms` }}>
              <div 
                className="aspect-square bg-[#061121] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
                >
                <img src={imgUrl} alt={`${gallery.title} - ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
      
      {lightboxOpen && (
          <Lightbox 
            images={gallery.images}
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