import React from 'react';
import AnimatedContent from '../components/AnimatedContent';
import { Link } from 'react-router-dom';
import SponsorsSection from '../components/SponsorsSection';

// New Hero Section for Sponsorship Page
const SponsorshipHeroSection: React.FC = () => (
  <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden bg-black">
    <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/cb-marbella-857d1.firebasestorage.app/o/Recursos%2F20230930_184230.jpg?alt=media&token=c80b8bfd-0c07-4b01-bb56-d0da3787dd2d"
      alt="Equipo de CB Marbella en la cancha"
      className="absolute z-0 w-full h-full object-cover"
    />
    <div className="relative z-20 text-center px-4 container mx-auto">
      <AnimatedContent>
        <h1 className="text-6xl md:text-8xl font-extrabold text-white uppercase font-['Teko'] tracking-wide">
          Patrocinio
        </h1>
        <p className="mt-4 max-w-4xl mx-auto text-lg md:text-xl text-slate-200">
          Únete a la vibrante comunidad de empresas que apuestan por el deporte, el crecimiento local y la excelencia. Al patrocinar al CB Marbella, te integras en un colectivo de marcas de renombre que son sinónimo de compromiso y pasión.
        </p>
      </AnimatedContent>
    </div>
  </section>
);


const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[#003782] mr-3 mt-1 flex-shrink-0">{children}</span>
);

const ContactButton: React.FC = () => (
    <Link 
        to="/contacto" 
        className="mt-8 inline-block bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
        Contacta con nosotros
    </Link>
);

const SponsorshipPage: React.FC = () => {
  return (
    <div className="bg-[#0a192f]">
      <SponsorshipHeroSection />
      
      <div className="container mx-auto px-4 pb-16">
        
        {/* Section: Tradition and Future */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedContent>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mb-4 border-l-4 border-[#003782] pl-4">Tradición y Futuro: La Historia del CB Marbella</h2>
              <p className="text-slate-300 mb-4">
                Desde nuestra fundación, el Club de Baloncesto de Marbella se ha establecido como un pilar del baloncesto. Con orgullo, portamos una herencia de pasión y tenacidad que se refleja en nuestro desempeño dentro y fuera de la cancha.
              </p>
              <p className="text-slate-300">
                Contamos con un equipo profesional masculino que representa nuestra visión de excelencia y competitividad. Al mismo tiempo, abrigamos el talento del mañana colaborando con una cantera de más de 400 jóvenes, quienes son el futuro del baloncesto. Juntos, escribimos la próxima página de nuestra rica historia.
              </p>
            </AnimatedContent>
            <AnimatedContent>
              <div className="grid grid-cols-2 gap-4">
                  <img src="https://picsum.photos/seed/history1/400/300" alt="Historia CB Marbella 1" className="rounded-lg shadow-xl aspect-[4/3] object-cover"/>
                  <img src="https://picsum.photos/seed/history2/400/300" alt="Historia CB Marbella 2" className="rounded-lg shadow-xl aspect-[4/3] object-cover mt-8"/>
                  <img src="https://picsum.photos/seed/history3/400/300" alt="Historia CB Marbella 3" className="rounded-lg shadow-xl aspect-[4/3] object-cover col-span-2"/>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* Section: Maximize Visibility */}
        <section className="py-16 bg-[#061121] rounded-lg my-12 p-8 md:p-12">
            <AnimatedContent className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mb-4">Maximiza tu Visibilidad con CB Marbella</h2>
                <p className="text-slate-400 max-w-3xl mx-auto">Nuestros socios gozan de una presencia destacada en cada juego y evento, conectando su imagen a la energía y la pasión que solo el deporte puede ofrecer.</p>
            </AnimatedContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                <AnimatedContent>
                    <div className="bg-[#0a192f] p-6 rounded-lg h-full">
                        <h3 className="text-2xl font-bold text-[#003782] font-['Teko'] mb-2">En el Juego</h3>
                        <p className="text-slate-300">Tu logo en nuestras camisetas, visible en transmisiones en vivo y en cada foto de acción.</p>
                    </div>
                </AnimatedContent>
                 <AnimatedContent>
                    <div className="bg-[#0a192f] p-6 rounded-lg h-full">
                        <h3 className="text-2xl font-bold text-[#003782] font-['Teko'] mb-2">Publicidad Dinámica</h3>
                        <p className="text-slate-300">Vallas publicitarias estratégicas y videos en partidos garantizan que todos los ojos estén en ti.</p>
                    </div>
                </AnimatedContent>
                 <AnimatedContent>
                    <div className="bg-[#0a192f] p-6 rounded-lg h-full">
                        <h3 className="text-2xl font-bold text-[#003782] font-['Teko'] mb-2">Presencia Digital Total</h3>
                        <p className="text-slate-300">Destacamos tu marca en nuestra web, redes sociales activas y retransmisiones en directo.</p>
                    </div>
                </AnimatedContent>
            </div>
            <AnimatedContent className="text-center">
              <ContactButton />
            </AnimatedContent>
        </section>
        
        {/* Section: Digital Presence */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedContent className="md:order-last">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mb-4 border-l-4 border-[#003782] pl-4">Presencia Digital: Amplifica tu Marca</h2>
              <p className="text-slate-300 mb-4">
                El impacto digital es crucial. Ofrecemos a nuestros patrocinadores una presencia prominente para que su marca no solo sea vista, sino que se convierta en una conversación constante.
              </p>
               <ul className="space-y-3 text-slate-300 text-lg">
                  <li className="flex"><FeatureIcon>&#10148;</FeatureIcon><strong>Sitio Web Oficial:</strong> Tu logo en nuestra portada, un centro de interacción con aficionados.</li>
                  <li className="flex"><FeatureIcon>&#10148;</FeatureIcon><strong>Redes Sociales:</strong> Más de 30.000 visualizaciones mensuales. Tu marca será parte de esta comunidad digital activa.</li>
                  <li className="flex"><FeatureIcon>&#10148;</FeatureIcon><strong>Retransmisiones en Directo:</strong> Alinea tu marca con la emoción del deporte en RTV Marbella.</li>
              </ul>
              <ContactButton />
            </AnimatedContent>
             <AnimatedContent>
                <img src="https://picsum.photos/seed/digital-presence/800/600" alt="Presencia digital del club" className="rounded-lg shadow-2xl"/>
            </AnimatedContent>
          </div>
        </section>

        {/* Section: Plans & VIP Access */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedContent>
                <img src="https://picsum.photos/seed/vip-access/800/600" alt="Acceso VIP" className="rounded-lg shadow-2xl"/>
            </AnimatedContent>
            <AnimatedContent>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mb-4 border-l-4 border-[#003782] pl-4">Planes Flexibles y Acceso VIP</h2>
              <p className="text-slate-300 mb-4">
                Ofrecemos una gama de paquetes de patrocinio diseñados para adaptarse a diferentes necesidades y presupuestos. Siempre estamos abiertos a nuevas ideas y sugerencias de colaboración.
              </p>
              <p className="text-slate-300 font-semibold bg-[#061121] p-4 rounded-md border-l-2 border-[#003782]">
                Además, como patrocinador del club, disfruta de <strong className="text-white">acceso VIP a pie de pista</strong> en todos nuestros partidos en casa y vive la emoción en primera persona.
              </p>
               <ContactButton />
            </AnimatedContent>
          </div>
        </section>

        {/* Section: Official Sponsors */}
        <SponsorsSection />

      </div>
    </div>
  );
};

export default SponsorshipPage;
