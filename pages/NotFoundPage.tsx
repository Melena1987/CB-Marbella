import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[calc(100vh-150px)] pt-20 text-center">
      <div>
        <h1 className="text-9xl font-extrabold text-[#003782] font-['Teko']">404</h1>
        <p className="text-2xl md:text-3xl font-light text-slate-300 mt-4">Página no encontrada</p>
        <p className="mt-2 text-slate-400">Lo sentimos, la página que buscas no existe.</p>
        <Link 
          to="/"
          className="mt-8 inline-block bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;