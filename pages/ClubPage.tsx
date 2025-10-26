import React from 'react';
import AnimatedContent from '../components/AnimatedContent';
import { Link } from 'react-router-dom';

const ClubPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a192f]">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <h1 className="text-6xl md:text-7xl font-bold text-center text-white uppercase font-['Teko'] mb-4">El Club</h1>
          <p className="text-lg text-slate-400 text-center max-w-3xl mx-auto mb-16">
            Con 50 años de historia desde nuestra fundación en 1975, somos el club decano de la provincia de Málaga. Un referente de pasión, esfuerzo y baloncesto que ha inspirado a generaciones de jóvenes en la Costa del Sol.
          </p>
        </AnimatedContent>
        
        <AnimatedContent>
          <img src="https://picsum.photos/seed/cb-marbella-team/1200/500" alt="Equipo del CB Marbella" className="w-full h-auto object-cover rounded-lg shadow-2xl mb-16"/>
        </AnimatedContent>

        <div className="max-w-4xl mx-auto text-slate-300 text-lg space-y-12">
          <AnimatedContent>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mb-4 border-l-4 border-[#003782] pl-4">Nuestra Historia</h2>
            <p className="mb-4">
              El Club Baloncesto Marbella, fundado en 1975, es el Club decano de la Provincia de Málaga. Celebramos 50 años de historia durante la cual se han conseguido grandes logros deportivos. Nuestro equipo Senior ha sido durante muchos años un referente dentro del panorama del Baloncesto Profesional, llegando a participar en la que era la 2ª categoría del Baloncesto Nacional con serias opciones de ascenso.
            </p>
            <p className="mb-4">
              Nuestra ciudad ha vivido y disfrutado durante muchos años de baloncesto de primer nivel, con un equipo profesional disputando la antigua Liga EBA, actual LEB ORO y segunda categoría del baloncesto Nacional, siendo un espejo para los jugadores formados en la ciudad que son la base del baloncesto local.
            </p>
            <p>
                Hoy, esa tradición de excelencia continúa con un equipo comprometido que lucha en cada partido.
                <Link to="/plantilla" className="inline-block text-[#003782] font-semibold hover:underline ml-2">Conoce a la plantilla actual &rarr;</Link>
            </p>
          </AnimatedContent>

          <AnimatedContent>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mb-4 border-l-4 border-[#003782] pl-4">Talento Formado en Casa</h2>
            <p className="mb-4">
              Por las filas de nuestro Club han pasado jugadores de gran repercusión, como el Campeón Olímpico <strong className="text-white">Valdemaras Homicius</strong>, y se han formado muchos jugadores que hoy día juegan en Liga ACB, como <strong className="text-white">Alfonso Sánchez</strong> (XACOBEO-BLUSENS), llegando alguno de ellos a ser Internacional vistiendo la camiseta del Combinado Nacional como es el caso de <strong className="text-white">Carlos Cabezas</strong> (UNICAJA, BIZCAIA, CAI, FUENLABRADA).
            </p>
            <p>
              Otros jugadores destacados en el panorama nacional son <strong className="text-white">Paco Rueda Naranjo</strong>, internacional en categorías Juvenil y Junior; <strong className="text-white">Marta Pérez</strong>, internacional y campeona de Europa Sub-16; y <strong className="text-white">Marta García</strong>, jugadora en Liga F1 y también internacional en categorías inferiores.
            </p>
          </AnimatedContent>

          <AnimatedContent>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mt-10 mb-4 border-l-4 border-[#003782] pl-4">Compromiso con el Talento Local</h2>
            <p>
              El Club Baloncesto Marbella cree firmemente en el futuro del baloncesto en la ciudad. Por ello, mantenemos una excelente relación de colaboración con el club Marbella Basket, entidad encargada de la formación del baloncesto base. Esta sinergia crea un ecosistema que permite a los jóvenes talentos locales aspirar a formar parte de nuestro primer equipo en el futuro, asegurando que la llama del baloncesto siga brillando con fuerza en Marbella.
            </p>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default ClubPage;