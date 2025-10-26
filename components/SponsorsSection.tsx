
import React, { useState, useEffect } from 'react';
import AnimatedContent from './AnimatedContent';
import LoginModal from './LoginModal';
import UploadLogoModal from './UploadLogoModal';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';


// Define the type for a sponsor fetched from Firestore
interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
}

// URLs for the main sponsors to give them special treatment
const namingSponsorUrl = 'https://firebasestorage.googleapis.com/v0/b/cb-marbella-857d1.firebasestorage.app/o/sponsors%2F1761517264494-hospitalochoa.png?alt=media&token=2f36a5fc-bee2-4c96-8772-6e6647688284';
const mainSponsorUrl = 'https://firebasestorage.googleapis.com/v0/b/cb-marbella-857d1.firebasestorage.app/o/sponsors%2F1761517264496-logomarbella.png?alt=media&token=8d63e523-f88e-41ed-8006-501a91a5ad91';
const mainSponsorUrls = [namingSponsorUrl, mainSponsorUrl];


const SponsorsSection: React.FC = () => {
  const [mainSponsors, setMainSponsors] = useState<Sponsor[]>([]);
  const [officialSponsors, setOfficialSponsors] = useState<Sponsor[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { user } = useAuth();
  
  // Local user state to avoid dependency on useAuth in onAuthStateChanged
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLocalUser(currentUser);
      if (!currentUser) {
        setIsUploadModalOpen(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Effect to fetch sponsors from Firestore and separate them
  useEffect(() => {
    const sponsorsCollection = collection(db, "sponsors");
    const q = query(sponsorsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sponsorsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Sponsor));
      
      const main = sponsorsData.filter(s => mainSponsorUrls.includes(s.logoUrl));
      const official = sponsorsData.filter(s => !mainSponsorUrls.includes(s.logoUrl));

      setMainSponsors(main);
      setOfficialSponsors(official);
    });

    return () => unsubscribe();
  }, []);

  const handlePlusClick = () => {
    if (user) {
      setIsUploadModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };
  
  const handleDeleteSponsor = async (sponsor: Sponsor) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el logo de "${sponsor.name}"?`)) {
      return;
    }

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "sponsors", sponsor.id));

      // Delete from Storage
      const logoRef = ref(storage, sponsor.logoUrl);
      await deleteObject(logoRef);
      
    } catch (error) {
      console.error("Error deleting sponsor: ", error);
      alert("No se pudo eliminar el patrocinador.");
    }
  };

  return (
    <section className="py-12 md:py-20 bg-[#0a192f]">
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <UploadLogoModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
      <div className="container mx-auto px-4">
        
        {/* Main Sponsors Section */}
        {mainSponsors.length > 0 && (
            <AnimatedContent className="mb-12 md:mb-16">
                 <div className="flex justify-center items-start gap-12 md:gap-20 flex-wrap">
                    {mainSponsors.map((sponsor) => (
                        <div key={sponsor.id} className="relative group flex flex-col items-center gap-3">
                             <p className="text-center text-sm uppercase tracking-widest text-slate-400">
                                {sponsor.logoUrl === namingSponsorUrl && 'Naming Sponsor'}
                                {sponsor.logoUrl === mainSponsorUrl && 'Main Sponsor'}
                            </p>
                            <img 
                            src={sponsor.logoUrl}
                            alt={sponsor.name} 
                            className="opacity-90 hover:opacity-100 transition-opacity duration-300 object-contain h-40 md:h-48 mx-auto"
                            />
                            {user && (
                              <button
                                onClick={() => handleDeleteSponsor(sponsor)}
                                className="absolute -top-2 -right-2 p-1.5 bg-red-600/90 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-500"
                                aria-label={`Eliminar ${sponsor.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                        </div>
                    ))}
                </div>
            </AnimatedContent>
        )}

        <AnimatedContent className="text-center mb-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white uppercase font-['Teko'] mb-4 tracking-wider">Nuestros Patrocinadores Oficiales</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Un agradecimiento especial a las empresas que hacen posible nuestro proyecto.</p>
        </AnimatedContent>
        <AnimatedContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-16 gap-y-12 items-center max-w-6xl mx-auto">
            {officialSponsors.map((sponsor) => (
              <div key={sponsor.id} className="relative group flex justify-center">
                <img 
                  src={sponsor.logoUrl}
                  alt={sponsor.name} 
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300 object-contain h-20 mx-auto"
                />
                {user && (
                    <button
                      onClick={() => handleDeleteSponsor(sponsor)}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-600/90 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-500"
                      aria-label={`Eliminar ${sponsor.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
              </div>
            ))}
            {/* Add Sponsor Button */}
            <button 
              onClick={handlePlusClick}
              className="flex items-center justify-center w-full h-20 bg-transparent border border-slate-800 rounded-lg text-slate-700 hover:border-slate-600 hover:text-slate-500 transition-colors duration-300"
              aria-label="Añadir logo de patrocinador"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default SponsorsSection;