import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, Timestamp, limit, doc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, deleteObject } from 'firebase/storage';
import AnimatedContent from '../components/AnimatedContent';
import SponsorsSection from '../components/SponsorsSection';
import { useAuth } from '../contexts/AuthContext';
import NotFoundPage from './NotFoundPage';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: Timestamp;
  slug: string;
}

const NewsDetailPage: React.FC = () => {
  const { newsSlug } = useParams<{ newsSlug: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      if (!newsSlug) {
        setError('URL de noticia no válida.');
        setLoading(false);
        return;
      }
      try {
        const newsRef = collection(db, 'news');
        const q = query(newsRef, where("slug", "==", newsSlug), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setNewsItem({ id: docSnap.id, ...docSnap.data() } as NewsItem);
        } else {
          setError('No se ha encontrado la noticia.');
        }
      } catch (err) {
        console.error("Error fetching news item:", err);
        setError('Error al cargar la noticia.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [newsSlug]);
  
  const handleDelete = async () => {
      if (!newsItem) return;
      if (!window.confirm(`¿Estás seguro de que quieres eliminar la noticia "${newsItem.title}"?`)) return;

      try {
          if (newsItem.image) {
              const imageRef = ref(storage, newsItem.image);
              await deleteObject(imageRef).catch(err => {
                  if (err.code !== 'storage/object-not-found') {
                      console.error("Error deleting image from storage:", err);
                  }
              });
          }
          await deleteDoc(doc(db, "news", newsItem.id));
          navigate('/noticias');
      } catch (err) {
          console.error("Error deleting news item:", err);
          alert("No se pudo eliminar la noticia.");
      }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Cargando noticia...</div>;
  }
  if (error || !newsItem) {
    return <NotFoundPage />;
  }

  const formattedDate = newsItem.createdAt?.toDate().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <>
        <style>{`
            .news-content h2 { font-family: 'Teko', sans-serif; font-size: 2.25rem; line-height: 2.5rem; color: white; margin-bottom: 1rem; margin-top: 2rem; }
            .news-content h3 { font-family: 'Teko', sans-serif; font-size: 1.875rem; line-height: 2.25rem; color: white; margin-bottom: 0.75rem; margin-top: 1.5rem; }
            .news-content p { margin-bottom: 1.25rem; line-height: 1.75; }
            .news-content ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1.25rem; padding-left: 1rem; }
            .news-content ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1.25rem; padding-left: 1rem; }
            .news-content li { margin-bottom: 0.5rem; }
            .news-content a { color: #003782; text-decoration: underline; font-weight: 600; }
            .news-content strong, .news-content b { color: white; }
            .news-content em, .news-content i { font-style: italic; }
        `}</style>
        <div className="pt-24 pb-16 bg-[#0a192f]">
            <div className="container mx-auto px-4">
                <AnimatedContent>
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <Link to="/noticias" className="text-sm text-slate-400 hover:text-white inline-flex items-center gap-2 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                Volver a Noticias
                            </Link>
                        </div>

                        <p className="text-sm font-semibold text-[#003782] uppercase mb-2">{newsItem.category}</p>
                        <h1 className="text-5xl md:text-6xl font-bold text-white uppercase font-['Teko'] mb-4 leading-tight">{newsItem.title}</h1>
                        <p className="text-slate-400 mb-6">{formattedDate}</p>

                        <img src={newsItem.image} alt={newsItem.title} className="w-full h-auto object-cover rounded-lg shadow-2xl mb-10 aspect-[4/5] max-h-[80vh]"/>

                        <div 
                            className="news-content text-lg text-slate-300"
                            dangerouslySetInnerHTML={{ __html: newsItem.content }}
                        />
                        
                        {user && (
                            <div className="mt-12 border-t border-slate-700 pt-6 text-right">
                                <button
                                    onClick={handleDelete}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a192f] focus:ring-red-500 shadow-lg text-sm font-semibold"
                                    aria-label="Eliminar noticia"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                    <span>Eliminar Noticia</span>
                                </button>
                            </div>
                        )}
                    </div>
                </AnimatedContent>
            </div>
        </div>
        <SponsorsSection />
    </>
  );
};

export default NewsDetailPage;