import React, { useState, useEffect } from 'react';
import AnimatedContent from '../components/AnimatedContent';
import NewsCard, { NewsCardProps as NewsItem } from '../components/NewsCard';
import CreateNewsModal from '../components/CreateNewsModal';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const newsCollection = collection(db, "news");
    const q = query(newsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase().replace(/\./g, '') || new Date().toLocaleDateString()
      } as NewsItem));
      setNewsItems(newsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteNews = async (item: NewsItem) => {
    if (!item.id || !window.confirm(`¿Estás seguro de que quieres eliminar la noticia "${item.title}"?`)) {
        return;
    }

    try {
        await deleteDoc(doc(db, "news", item.id));

        if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef).catch(err => {
                if (err.code !== 'storage/object-not-found') {
                    console.error("Error deleting image from storage:", err);
                }
            });
        }
    } catch (error) {
        console.error("Error deleting news item: ", error);
        alert("No se pudo eliminar la noticia.");
    }
  };


  return (
    <>
      <CreateNewsModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <div className="pt-24 pb-16 bg-[#0a192f]">
        <div className="container mx-auto px-4 relative">
          <AnimatedContent>
            <h1 className="text-6xl md:text-7xl font-bold text-center text-white uppercase font-['Teko'] mb-2">Últimas Noticias</h1>
            <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-12">Mantente al día de toda la actualidad del CB Marbella.</p>
          </AnimatedContent>
          
          {user && (
            <div className="absolute top-0 right-4 -mt-4 sm:right-0">
               <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#003782]/80 hover:bg-[#003782] text-white rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a192f] focus:ring-[#003782] shadow-lg"
                  aria-label="Añadir nueva noticia"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline font-semibold">Añadir Noticia</span>
              </button>
            </div>
          )}

          <div className="max-w-4xl mx-auto flex flex-col gap-8">
             {newsItems.length > 0 ? (
                newsItems.map((item, index) => (
                <AnimatedContent key={item.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <NewsCard
                        {...item}
                        user={user}
                        onDelete={() => handleDeleteNews(item)}
                    />
                </AnimatedContent>
                ))
            ) : (
                <p className="text-center text-slate-400">No hay noticias publicadas todavía.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
