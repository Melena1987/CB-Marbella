import React from 'react';
import AnimatedContent from '../components/AnimatedContent';
import NewsCard from '../components/NewsCard';

const NewsPage: React.FC = () => {
  const newsItems = [
    { image: 'https://picsum.photos/seed/news1/400/500', category: 'Primer Equipo', title: 'Victoria clave en casa para cerrar la jornada', excerpt: 'El equipo senior consigue una victoria crucial en un partido vibrante...', date: '15 OCT 2024' },
    { image: 'https://picsum.photos/seed/news2/400/500', category: 'Fichajes', title: 'El CB Marbella renueva a su capitán', excerpt: 'El capitán seguirá liderando al equipo una temporada más tras el acuerdo de renovación...', date: '12 OCT 2024' },
    { image: 'https://picsum.photos/seed/news3/400/500', category: 'Club', title: 'Abierta la campaña de abonados 2024-2025', excerpt: 'Únete a la familia del CB Marbella y disfruta de una temporada llena de emociones...', date: '10 OCT 2024' },
    { image: 'https://picsum.photos/seed/news4/400/500', category: 'Primer Equipo', title: 'Fichaje estrella para la pintura', excerpt: 'El club anuncia la incorporación de un nuevo pívot para reforzar la plantilla...', date: '08 OCT 2024' },
    { image: 'https://picsum.photos/seed/news5/400/500', category: 'Social', title: 'Visita solidaria al hospital local', excerpt: 'Los jugadores del primer equipo compartieron una mañana con los niños ingresados...', date: '05 OCT 2024' },
    { image: 'https://picsum.photos/seed/news6/400/500', category: 'Evento Social', title: 'Exitosa jornada de puertas abiertas', excerpt: 'Cientos de aficionados visitaron el pabellón en una jornada festiva para toda la familia...', date: '02 OCT 2024' },
  ];

  return (
    <div className="pt-24 pb-16 bg-[#0a192f]">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <h1 className="text-6xl md:text-7xl font-bold text-center text-white uppercase font-['Teko'] mb-2">Últimas Noticias</h1>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-12">Mantente al día de toda la actualidad del CB Marbella.</p>
        </AnimatedContent>
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {newsItems.map((item, index) => (
            <AnimatedContent key={index} style={{ animationDelay: `${index * 100}ms` }}>
              <NewsCard {...item} linkTo="#" />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
