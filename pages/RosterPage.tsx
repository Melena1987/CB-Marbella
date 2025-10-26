import React from 'react';
import AnimatedContent from '../components/AnimatedContent';

interface Player {
  name: string;
  position: string;
}

const players: Player[] = [
  { name: 'Juan Agüera Zea', position: 'Base' },
  { name: 'Anibal Dario Buzzo', position: 'Escolta' },
  { name: 'Kelly Chukwuebuka Dike Egun', position: 'Alero' },
  { name: 'Ivo Dimitrov Kolev', position: 'Alero' },
  { name: 'Martin Fernandez Gil', position: 'Ala-Pívot' },
  { name: 'Daniel Fernandez Munkholm', position: 'Base' },
  { name: 'Francho Lascorz Rivares', position: 'Escolta' },
  { name: 'Justinas Leganovic', position: 'Ala-Pívot' },
  { name: 'Pedro Salvador López Gómez', position: 'Pívot' },
  { name: 'Petar Markota', position: 'Ala-Pívot' },
  { name: 'Christopher Mortellaro', position: 'Pívot' },
  { name: 'Hugo Vazquez Garcia', position: 'Alero' },
];

const PlayerCard: React.FC<Player> = ({ name, position }) => (
    <div className="bg-[#061121] rounded-lg shadow-lg overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-blue-500/20">
        <div className="bg-white h-96 flex items-center justify-center overflow-hidden">
            <img 
                src={`https://picsum.photos/seed/${name.split(' ').join('-')}/400/600`} 
                alt={`Foto de ${name}`}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="p-5 text-center">
            <h3 className="text-3xl font-bold text-red-500 font-['Teko'] tracking-wider leading-tight">{name}</h3>
            <p className="text-slate-400 uppercase text-sm tracking-widest">{position}</p>
        </div>
    </div>
);

const RosterPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a192f]">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <h1 className="text-6xl md:text-7xl font-bold text-center text-white uppercase font-['Teko'] mb-2">Plantilla 2025/26</h1>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-12">Conoce a los jugadores que defenderán nuestros colores esta temporada.</p>
        </AnimatedContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {players.map((player, index) => (
            <AnimatedContent key={index}>
              <PlayerCard {...player} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RosterPage;
