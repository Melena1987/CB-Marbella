import React, { useState, useEffect } from 'react';
import AnimatedContent from './AnimatedContent';
import LoginModal from './LoginModal';
import UploadLogoModal from './UploadLogoModal';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // Ensure upload modal is closed if user logs out
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

  return (
    <section className="py-16 md:py-24 bg-[#0a192f]">
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <UploadLogoModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
      <div className="container mx-auto px-4">
        
        {/* Main Sponsors Section */}
        {mainSponsors.length > 0 && (
            <AnimatedContent className="mb-16">
                 <div className="flex justify-center items-center gap-12 md:gap-20 flex-wrap">
                    {mainSponsors.map((sponsor) => (
                        <div key={sponsor.id} className="flex justify-center">
                            <img 
                            src={sponsor.logoUrl}
                            alt={sponsor.name} 
                            className="opacity-90 hover:opacity-100 transition-opacity duration-300 object-contain h-28 md:h-32 mx-auto"
                            />
                        </div>
                    ))}
                </div>
            </AnimatedContent>
        )}

        <AnimatedContent className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white uppercase font-['Teko'] mb-4 tracking-wider">Nuestros Patrocinadores Oficiales</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Un agradecimiento especial a las empresas que hacen posible nuestro proyecto.</p>
        </AnimatedContent>
        <AnimatedContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-16 gap-y-12 items-center max-w-6xl mx-auto">
            {officialSponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex justify-center">
                <img 
                  src={sponsor.logoUrl}
                  alt={sponsor.name} 
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300 object-contain h-20 mx-auto"
                />
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