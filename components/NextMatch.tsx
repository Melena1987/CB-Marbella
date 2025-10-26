import React from 'react';
import AnimatedContent from './AnimatedContent';

// Logos extracted from the provided images. 
// For better quality, replace these with original assets in a public/assets folder.
const jaenLogoUrl = 'https://imagenes.feb.es/Imagen.aspx?i=981448&ti=1'; 
const marbellaLogoUrl = 'https://firebasestorage.googleapis.com/v0/b/cb-marbella-857d1.firebasestorage.app/o/Recursos%2FCBMarbella%20logo.png?alt=media&token=27643f10-e2f1-47c9-96d6-29afacaae12f';

const matchData = {
  homeTeam: {
    name: 'JAEN PARAISO INTERIOR - SKA LOGISTIK C.B. ANDÚJAR',
    logo: jaenLogoUrl,
  },
  awayTeam: {
    name: 'HOSPITAL OCHOA CB MARBELLA',
    logo: marbellaLogoUrl,
  },
  date: '02/11/2025 - 18:30',
  referees: ['BEJARANO AVILA, ANTONIO', 'PRADOS LOPEZ, EDUARDO JAVIER'],
  venue: 'POLIDEPORTIVO MUNICIPAL',
  location: 'Andújar (Jaén)',
};

const NextMatch: React.FC = () => {
  const teamNameColor = '#c51e3a';
  const vsColor = '#ef4444'; // A bright red, similar to Tailwind's red-500

  return (
    <section className="bg-[#061121] py-12 md:py-20">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <h2 className="text-5xl md:text-6xl font-bold uppercase text-white font-['Teko'] mb-8 text-center leading-tight">
            Siguiente Partido
          </h2>
          <div className="bg-[#0a192f] rounded-lg shadow-2xl p-6 md:p-8 max-w-5xl mx-auto">
            {/* Scoreboard Section */}
            <div className="flex items-center justify-between gap-2 md:gap-6 mb-6">
              {/* Home Team */}
              <div className="flex-1 flex items-center gap-2 md:gap-4 justify-start">
                <img src={matchData.homeTeam.logo} alt={`${matchData.homeTeam.name} logo`} className="w-16 h-16 md:w-24 md:h-24 object-contain" />
                <h3 className="text-lg md:text-2xl font-bold font-['Teko'] uppercase hidden sm:block" style={{ color: teamNameColor }}>
                  {matchData.homeTeam.name}
                </h3>
              </div>

              {/* VS Separator */}
              <div className="text-center px-2 md:px-4">
                <span
                  className="text-5xl md:text-7xl font-extrabold font-['Teko'] tracking-wider -skew-x-12 block"
                  style={{ color: vsColor }}
                >
                  VS
                </span>
              </div>
              
              {/* Away Team */}
              <div className="flex-1 flex items-center gap-2 md:gap-4 justify-end">
                <h3 className="text-lg md:text-2xl font-bold font-['Teko'] uppercase text-right hidden sm:block" style={{ color: teamNameColor }}>
                  {matchData.awayTeam.name}
                </h3>
                <img src={matchData.awayTeam.logo} alt={`${matchData.awayTeam.name} logo`} className="w-16 h-16 md:w-24 md:h-24 object-contain" />
              </div>
            </div>
            
            {/* Mobile Team Names */}
            <div className="flex justify-between sm:hidden mb-8 text-center gap-4">
                <h3 style={{ color: teamNameColor }} className="flex-1 text-base font-bold font-['Teko'] uppercase">{matchData.homeTeam.name}</h3>
                <h3 style={{ color: teamNameColor }} className="flex-1 text-base font-bold font-['Teko'] uppercase">{matchData.awayTeam.name}</h3>
            </div>


            {/* Match Details Section */}
            <div className="border-t border-slate-700 pt-6 space-y-2 text-slate-300">
               <div className="flex flex-col md:flex-row items-stretch text-sm md:text-base">
                  <span className="font-semibold bg-slate-700/50 px-3 py-2 w-full md:w-32 text-left shrink-0 flex items-center">Fecha</span>
                  <span className="bg-slate-800/50 px-3 py-2 flex-1">{matchData.date}</span>
               </div>
               <div className="flex flex-col md:flex-row items-stretch text-sm md:text-base">
                  <span className="font-semibold bg-slate-700/50 px-3 py-2 w-full md:w-32 text-left shrink-0 flex items-center">Árbitros</span>
                  <span className="bg-slate-800/50 px-3 py-2 flex-1">{matchData.referees.join(' ~ ')}</span>
               </div>
               <div className="flex flex-col md:flex-row items-stretch text-sm md:text-base">
                  <span className="font-semibold bg-slate-700/50 px-3 py-2 w-full md:w-32 text-left shrink-0 flex items-center">Pista</span>
                  <span className="bg-slate-800/50 px-3 py-2 flex-1">{`${matchData.venue}, ${matchData.location}`}</span>
               </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default NextMatch;