import React from 'react';
import AnimatedContent from '../components/AnimatedContent';

const BenefitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


const SubscribePage: React.FC = () => {
    const benefits = [
        "Apoya a tu equipo en cada partido",
        "Disfruta de ventajas exclusivas de cada patrocinador",
        "Participa en sorteos durante la temporada",
        "Acceso a eventos especiales del club",
        "¡Y muchas más sorpresas!"
    ];

  return (
    <div className="pt-24 pb-16 bg-[#0a192f] min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <AnimatedContent>
                <img src="https://firebasestorage.googleapis.com/v0/b/cb-marbella-857d1.firebasestorage.app/o/Recursos%2FCB%20Marbella%20carner%20de%20abonado.jpg?alt=media&token=ba8dd06a-1445-4e3e-8725-3427bd18792c" alt="Carnet de Abonado 2025/26" className="rounded-lg shadow-2xl w-full object-contain" />
            </AnimatedContent>

            <AnimatedContent>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white uppercase font-['Teko']">
                    Más que un <span className="text-red-500">Carnet</span>
                </h1>
                <p className="text-xl text-slate-300 font-semibold mb-6">CARNET DE ABONADO - TEMPORADA 2025/26</p>
                
                <div className="my-6">
                    <p className="text-lg text-slate-400">Precio</p>
                    <p className="text-6xl font-extrabold text-amber-400 font-['Teko'] tracking-wider">25€</p>
                </div>
                
                <ul className="space-y-4 my-8">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-slate-300 text-lg">
                            <BenefitIcon />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
                
                <div className="mt-10 bg-[#061121] p-6 rounded-lg border-l-4 border-amber-400">
                    <h3 className="text-2xl font-bold text-white font-['Teko'] mb-2">¿Cómo conseguirlo?</h3>
                    <p className="text-slate-300">
                        Adquiere tu carnet de abonado por solo 25€ en la <strong className="text-white">barra ARAMA</strong> durante cada partido que juguemos en casa. ¡No te quedes sin el tuyo!
                    </p>
                </div>
            </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;