import React, { useEffect } from 'react';

interface LightboxProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, selectedIndex, onClose, onNext, onPrev }) => {

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const handleDownload = async () => {
    try {
        const imageUrl = images[selectedIndex];
        // Fetch the image as a blob to bypass potential CORS issues with direct download
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        // Create a temporary link to trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        
        // Extract a clean filename from the URL
        const fileName = imageUrl.split('/').pop()?.split('?')[0]?.replace('thumb_', '') || 'download';
        a.download = fileName;
        
        document.body.appendChild(a);
        a.click();
        
        // Clean up the temporary URL and link
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error("Error downloading image:", error);
        // As a fallback, open the image in a new tab
        window.open(images[selectedIndex], '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center backdrop-blur-sm animate-fade-in">
      {/* Controls Container */}
      <div className="absolute top-4 right-4 flex items-center gap-4 z-20">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Descargar imagen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 text-white/70 hover:text-white transition-colors z-20 p-2 bg-black/20 rounded-full"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 text-white/70 hover:text-white transition-colors z-20 p-2 bg-black/20 rounded-full"
        aria-label="Siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Display */}
      <div className="relative w-full h-full flex items-center justify-center p-16">
        <img
          src={images[selectedIndex]}
          alt={`Imagen ${selectedIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>

       {/* Counter */}
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/30 px-3 py-1 rounded-full text-sm">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Simple fade-in animation for the lightbox
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`;
document.head.appendChild(style);


export default Lightbox;