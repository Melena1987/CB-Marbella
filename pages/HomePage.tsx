import React, { useState } from 'react';
import AnimatedContent from '../components/AnimatedContent';
import { Link } from 'react-router-dom';
import NextMatch from '../components/NextMatch';
import NewsCard from '../components/NewsCard';
import LoginModal from '../components/LoginModal';

const HeroSection: React.FC = () => (
  <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/cb-marbella-857d1.firebasestorage.app/o/Recursos%2FCBMarbella%20portada.jpg?alt=media&token=e1ce8649-fe66-4ef0-8d77-3e420969dfe0"
      alt="Jugadores del CB Marbella en la cancha"
      className="absolute z-0 w-full h-full object-cover"
    />
    <div className="relative z-20 text-center px-4">
      <AnimatedContent>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/cb-marbella-857d1.firebasestorage.app/o/Recursos%2FCBMarbella%20logo.png?alt=media&token=27643f10-e2f1-47c9-96d6-29afacaae12f"
          alt="CB Marbella Logo"
          className="mx-auto mb-4 w-24 h-24 md:w-32 md:h-32"
        />
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] md:tracking-[0.2em] uppercase font-['Teko'] leading-none">
          CBMARBELLA
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-300">
          Medio siglo de historia, una vida de pasión por el baloncesto.
        </p>
        <Link 
          to="/abonate" 
          className="mt-8 inline-block bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Únete al Club
        </Link>
      </AnimatedContent>
    </div>
  </section>
);

const sponsors = [
    { name: 'Hospital Ochoa', seed: 'ochoa' },
    { name: 'Sponsor 2', seed: 'sponsor2' },
    { name: 'La Estrellita', seed: 'estrellita' },
    { name: 'Sponsor 4', seed: 'sponsor4' },
    { name: 'Kune Fisio', seed: 'kune' },
    { name: 'Show Time Sport MKT', seed: 'showtime' },
];

const SponsorsSection: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-[#0a192f]">
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <div className="container mx-auto px-4">
        <AnimatedContent className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white uppercase font-['Teko'] mb-4 tracking-wider">Nuestros Patrocinadores Oficiales</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Un agradecimiento especial a las empresas que hacen posible nuestro proyecto.</p>
        </AnimatedContent>
        <AnimatedContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
            {sponsors.map((sponsor) => (
              <div key={sponsor.seed} className="flex justify-center">
                <img 
                  src={`https://picsum.photos/seed/${sponsor.seed}/200/100?grayscale`} 
                  alt={sponsor.name} 
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            {/* Add Sponsor Button */}
            <button 
              onClick={() => setIsLoginModalOpen(true)}
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


const ContentSection: React.FC<{
  imageUrl: string;
  title: string;
  children: React.ReactNode;
  imagePosition?: 'left' | 'right';
}> = ({ imageUrl, title, children, imagePosition = 'right' }) => {
  const imageOrder = imagePosition === 'right' ? 'md:order-last' : '';

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-stretch min-h-[70vh] gap-8">
        <div className={`md:w-1/2 flex items-center justify-center ${imageOrder}`}>
           <AnimatedContent className="w-full">
            <img src={imageUrl} alt={title} className="rounded-lg shadow-2xl object-cover w-full h-full aspect-[4/3]" loading="lazy"/>
           </AnimatedContent>
        </div>
        <div className="md:w-1/2 flex items-center">
          <AnimatedContent>
            <h2 className="text-5xl md:text-6xl font-bold uppercase text-white font-['Teko'] mb-4 leading-tight">
              {title}
            </h2>
            <div className="text-slate-300 text-lg space-y-4">
                {children}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

const standingsData = [
  { po: 1, equipo: 'BYSPANIA TÍJOLA', pj: 4, pg: 4, pp: 0, pf: 430, pc: 287 },
  { po: 2, equipo: 'DAMEX CB ALGECIRAS', pj: 4, pg: 4, pp: 0, pf: 365, pc: 287 },
  { po: 3, equipo: 'JAEN PARAISO INTERIOR FS', pj: 4, pg: 4, pp: 0, pf: 336, pc: 264 },
  { po: 4, equipo: 'CB SALLIVER FUENGIROLA HIGUERÓN HOTEL', pj: 4, pg: 3, pp: 1, pf: 308, pc: 294 },
  { po: 5, equipo: 'MELILLA CIUDAD DEL DEPORTE ENRIQUE SOLER', pj: 4, pg: 3, pp: 1, pf: 317, pc: 303 },
  { po: 6, equipo: 'CB NOVASCHOOL RINCÓN DE LA VICTORIA', pj: 4, pg: 2, pp: 2, pf: 325, pc: 333 },
  { po: 7, equipo: 'SURSEEDS - B. MURGI', pj: 4, pg: 2, pp: 2, pf: 337, pc: 349 },
  { po: 8, equipo: 'MOLINA OLEA CB COSTA MOTRIL', pj: 4, pg: 2, pp: 2, pf: 310, pc: 325 },
  { po: 9, equipo: 'COLEGIO EL PINAR', pj: 4, pg: 1, pp: 3, pf: 295, pc: 266 },
  { po: 10, equipo: 'HOSPITAL OCHOA CB MARBELLA', pj: 4, pg: 1, pp: 3, pf: 264, pc: 281 },
  { po: 11, equipo: 'OH!TELS ULB', pj: 4, pg: 1, pp: 3, pf: 285, pc: 310 },
  { po: 12, equipo: 'JAEN PARAISO INTERIOR - SKA LOGISTIK C.B. ANDÚJAR', pj: 4, pg: 0, pp: 4, pf: 269, pc: 340 },
  { po: 13, equipo: 'TU SUPER CB LA ZUBIA', pj: 3, pg: 0, pp: 3, pf: 229, pc: 312 },
  { po: 14, equipo: 'ECOCULTURE CB ALMERÍA', pj: 3, pg: 0, pp: 3, pf: 177, pc: 296 },
];

const StandingsSection: React.FC = () => (
  <div className="py-16 md:py-24 bg-[#061121]">
    <div className="container mx-auto px-4">
      <AnimatedContent>
        <div className="flex justify-center items-center gap-4 mb-8">
            <img src="https://imagenes.feb.es/Imagen.aspx?p=2487973&ti=0" alt="Tercera FEB Logo" className="h-16 md:h-20 object-contain" />
            <h2 className="text-5xl md:text-6xl font-bold uppercase text-white font-['Teko'] leading-tight">
              Clasificación 2025/26
            </h2>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-2xl">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-white uppercase bg-[#0a192f]">
              <tr>
                <th scope="col" className="px-4 py-3 text-center">PO</th>
                <th scope="col" className="px-6 py-3">Equipo</th>
                <th scope="col" className="px-4 py-3 text-center">PJ</th>
                <th scope="col" className="px-4 py-3 text-center">PG</th>
                <th scope="col" className="px-4 py-3 text-center">PP</th>
                <th scope="col" className="px-4 py-3 text-center">PF</th>
                <th scope="col" className="px-4 py-3 text-center">PC</th>
              </tr>
            </thead>
            <tbody>
              {standingsData.map((team) => (
                <tr
                  key={team.po}
                  className={`border-b border-slate-800 ${
                    team.equipo === 'HOSPITAL OCHOA CB MARBELLA'
                      ? 'bg-[#003782]/20 font-bold text-white'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <td className="px-4 py-4 text-center">{team.po}</td>
                  <td scope="row" className="px-6 py-4 whitespace-nowrap">{team.equipo}</td>
                  <td className="px-4 py-4 text-center">{team.pj}</td>
                  <td className="px-4 py-4 text-center">{team.pg}</td>
                  <td className="px-4 py-4 text-center">{team.pp}</td>
                  <td className="px-4 py-4 text-center">{team.pf}</td>
                  <td className="px-4 py-4 text-center">{team.pc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedContent>
    </div>
  </div>
);

const latestNewsItem = {
  image: 'https://picsum.photos/seed/news1/400/500',
  category: 'Primer Equipo',
  title: 'Victoria clave en casa para cerrar la jornada',
  excerpt: 'El equipo senior consigue una victoria crucial en un partido vibrante...',
  date: '15 OCT 2024',
};

const LatestNewsSection: React.FC = () => (
  <div className="py-16 md:py-24 bg-[#0a192f]">
    <div className="container mx-auto px-4">
      <AnimatedContent>
        <h2 className="text-5xl md:text-6xl font-bold uppercase text-white font-['Teko'] mb-8 text-center leading-tight">
          Última Noticia
        </h2>
        <div className="max-w-4xl mx-auto">
          <NewsCard {...latestNewsItem} />
        </div>
        <div className="text-center mt-12">
          <Link
            to="/noticias"
            className="inline-block bg-transparent border-2 border-[#003782] hover:bg-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
          >
            Ver todas las noticias
          </Link>
        </div>
      </AnimatedContent>
    </div>
  </div>
);


const HomePage: React.FC = () => {
  return (
    <div className="bg-[#0a192f]">
      <HeroSection />

      <SponsorsSection />

      <NextMatch />
      
      <LatestNewsSection />

      <StandingsSection />

      <ContentSection 
        imageUrl="https://picsum.photos/seed/history/800/600"
        title="Nuestra Historia"
        imagePosition="left"
      >
        <p>Fundado con la ilusión de llevar el baloncesto a cada rincón de nuestra ciudad, el CB Marbella ha crecido hasta convertirse en un referente deportivo y social. Décadas de pasión y esfuerzo nos definen.</p>
        <Link to="/el-club" className="inline-block text-[#003782] font-semibold hover:underline">Conoce más &rarr;</Link>
      </ContentSection>

      <div className="bg-[#061121]">
        <ContentSection 
            imageUrl="https://picsum.photos/seed/team/800/600"
            title="Nuestro Equipo"
            imagePosition="right"
        >
            <p>Nuestro primer equipo es el estandarte del club. Un grupo de profesionales que compite al máximo nivel, demostrando en cada partido los valores de esfuerzo, compromiso y talento que nos definen.</p>
            <Link to="/plantilla" className="inline-block text-[#003782] font-semibold hover:underline">Conoce al equipo &rarr;</Link>
        </ContentSection>
      </div>

      <ContentSection 
        imageUrl="https://picsum.photos/seed/fans/800/600"
        title="Una Afición Única"
        imagePosition="left"
      >
        <p>Sois nuestro sexto jugador en la cancha. Vuestro apoyo incondicional nos impulsa en cada partido. ¡Forma parte de la marea azul y vive la emoción del baloncesto con nosotros!</p>
        <Link to="/abonate" className="inline-block text-[#003782] font-semibold hover:underline">¡Abónate ahora! &rarr;</Link>
      </ContentSection>

    </div>
  );
};

export default HomePage;