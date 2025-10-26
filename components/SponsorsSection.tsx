import React, { useState, useEffect } from 'react';
import AnimatedContent from './AnimatedContent';
import LoginModal from './LoginModal';
import UploadLogoModal from './UploadLogoModal';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Define the type for a sponsor
interface Sponsor {
  name: string;
  logoUrl: string;
}

// Initial sponsors data is now empty
const initialSponsors: Sponsor[] = [];

const SponsorsSection: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // If user logs out while login modal is open, close it.
      if (!currentUser) {
        setIsLoginModalOpen(false);
      }
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

  const handleLogoUpload = (files: File[]) => {
    console.log('Uploading files:', files);
    // This is a simulation. In a real app, you would upload files to a service
    // like Firebase Storage and get back URLs.
    const newSponsors = files.map(file => ({
        name: file.name.replace(/\.[^/.]+$/, ""), // Use filename as name
        logoUrl: URL.createObjectURL(file), // Create a temporary local URL for display
    }));

    setSponsors(prev => [...prev, ...newSponsors]);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0a192f]">
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <UploadLogoModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUpload={handleLogoUpload}
      />
      <div className="container mx-auto px-4">
        <AnimatedContent className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white uppercase font-['Teko'] mb-4 tracking-wider">Nuestros Patrocinadores Oficiales</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Un agradecimiento especial a las empresas que hacen posible nuestro proyecto.</p>
        </AnimatedContent>
        <AnimatedContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
            {sponsors.map((sponsor) => (
              <div key={sponsor.name} className="flex justify-center">
                <img 
                  src={sponsor.logoUrl}
                  alt={sponsor.name} 
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 object-contain h-16"
                />
              </div>
            ))}
            {/* Add Sponsor Button */}
            <button 
              onClick={handlePlusClick}
              className="flex items-center justify-center h-full aspect-[2/1] border-2 border-dashed border-slate-700 rounded-lg text-slate-600 hover:border-slate-500 hover:text-slate-400 transition-colors duration-300"
              aria-label="Añadir logo de patrocinador"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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