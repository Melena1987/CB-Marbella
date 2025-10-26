import React from 'react';
import AnimatedContent from '../components/AnimatedContent';

const FacilitiesPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a192f]">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <h1 className="text-6xl md:text-7xl font-bold text-center text-white uppercase font-['Teko'] mb-4">Instalaciones</h1>
          <p className="text-2xl md:text-3xl text-slate-400 text-center font-['Teko'] uppercase tracking-wider max-w-3xl mx-auto mb-12">
            Polideportivo Bello Horizonte "Carlos Cabezas"
          </p>
        </AnimatedContent>
        
        <AnimatedContent>
          <img 
            src="https://picsum.photos/seed/bello-horizonte/1200/500" 
            alt='Polideportivo Bello Horizonte "Carlos Cabezas"' 
            className="w-full h-auto object-cover rounded-lg shadow-2xl mb-16"
          />
        </AnimatedContent>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <AnimatedContent>
                 <div className="text-slate-300 text-lg space-y-6">
                    <p>
                        El pabellón cuenta con 2.300 metros de superficie construida, además de zonas ajardinadas, aparcamientos y una pista al aire libre. 
                    </p>
                    <p>
                        Los vecinos de la zona podrán aprovechar las instalaciones para practicar deportes como fútbol sala o baloncesto, así como voleibol y balonmano. 
                    </p>
                    <p>
                        El centro, con aforo para 200 personas, dispone de vestuarios, cafetería y áreas sanitarias y de administración.
                    </p>
                 </div>
            </AnimatedContent>
            <AnimatedContent>
                <div className="bg-[#061121] p-8 rounded-lg text-center shadow-lg border-t-4 border-[#003782]">
                    <h2 className="text-3xl font-bold text-white font-['Teko'] mb-4">¿Dónde estamos?</h2>
                    <p className="text-slate-400 mb-6">Visítanos en el Polideportivo Bello Horizonte y vive el baloncesto de cerca.</p>
                     <a 
                        href="https://maps.app.goo.gl/PTUB72o6zvHoxZKTA" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Ver en Google Maps
                    </a>
                </div>
            </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesPage;
