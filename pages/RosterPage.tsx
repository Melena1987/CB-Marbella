import React, { useState, useEffect } from 'react';
import AnimatedContent from '../components/AnimatedContent';
import PlayerModal from '../components/PlayerModal';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { User } from 'firebase/auth';

interface Player {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

const PlayerCard: React.FC<{
  player: Player;
  user: User | null;
  onEdit: (player: Player) => void;
  onDelete: (player: Player) => void;
}> = ({ player, user, onEdit, onDelete }) => (
    <div className="relative group/card bg-[#061121] rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-blue-500/20">
        <div className="bg-white h-96 flex items-center justify-center overflow-hidden">
            <img 
                src={player.imageUrl}
                alt={`Foto de ${player.name}`}
                className="object-cover w-full h-full group-hover/card:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="p-5 text-center">
            <h3 className="text-3xl font-bold text-red-500 font-['Teko'] tracking-wider leading-tight">{player.name}</h3>
            <p className="text-slate-400 uppercase text-sm tracking-widest">{player.position}</p>
        </div>
        {user && (
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                <button 
                    onClick={() => onEdit(player)}
                    className="p-2 bg-blue-600/90 rounded-full text-white hover:bg-blue-500"
                    aria-label={`Editar ${player.name}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                </button>
                <button
                    onClick={() => onDelete(player)}
                    className="p-2 bg-red-600/90 rounded-full text-white hover:bg-red-500"
                    aria-label={`Eliminar ${player.name}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        )}
    </div>
);

const RosterPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const playersCollection = collection(db, "players");
    const q = query(playersCollection, orderBy("name", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const playersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Player));
      setPlayers(playersData);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenAddModal = () => {
    setPlayerToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (player: Player) => {
    setPlayerToEdit(player);
    setIsModalOpen(true);
  };
  
  const handleDeletePlayer = async (player: Player) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar a "${player.name}"?`)) {
      return;
    }

    try {
      if (player.imageUrl) {
        const imageRef = ref(storage, player.imageUrl);
        await deleteObject(imageRef).catch(err => {
          if (err.code !== 'storage/object-not-found') {
              console.error("Error deleting image from storage:", err);
          }
        });
      }
      await deleteDoc(doc(db, "players", player.id));
    } catch (error) {
      console.error("Error deleting player: ", error);
      alert("No se pudo eliminar al jugador.");
    }
  };


  return (
    <>
      <PlayerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        playerToEdit={playerToEdit}
      />
      <div className="pt-24 pb-16 bg-[#0a192f]">
        <div className="container mx-auto px-4 relative">
          <AnimatedContent>
            <h1 className="text-6xl md:text-7xl font-bold text-center text-white uppercase font-['Teko'] mb-2">Plantilla 2025/26</h1>
            <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-12">Conoce a los jugadores que defenderán nuestros colores esta temporada.</p>
          </AnimatedContent>

          {user && (
            <div className="text-center mb-12">
               <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#003782]/80 hover:bg-[#003782] text-white rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a192f] focus:ring-[#003782] shadow-lg"
                  aria-label="Añadir nuevo jugador"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Añadir Jugador</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {players.map((player) => (
              <AnimatedContent key={player.id}>
                <PlayerCard 
                  player={player} 
                  user={user}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeletePlayer}
                />
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RosterPage;
