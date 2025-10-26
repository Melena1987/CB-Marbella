import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#061121] text-slate-400 py-12">
      <div className="container mx-auto px-6 text-center">
        {/* Call to Action Button */}
        <div className="mb-8">
            <Link 
                to="/patrocinio"
                className="inline-block bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                Patrocínate con nosotros
            </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center space-x-6 mb-8">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors duration-300" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors duration-300" aria-label="Twitter / X">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors duration-300" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.14 0-3.483.011-4.71.069-2.628.12-3.834 1.328-3.953 3.953-.058 1.226-.069 1.569-.069 4.71s.011 3.483.069 4.71c.119 2.625 1.325 3.833 3.953 3.953 1.227.058 1.57.069 4.71.069s3.483-.011 4.71-.069c2.628-.12 3.833-1.328 3.953-3.953.058-1.226.069-1.569.069-4.71s-.011-3.483-.069-4.71c-.12-2.625-1.325-3.833-3.953-3.953-1.227-.058-1.57-.069-4.71-.069zM12 8.358a3.642 3.642 0 100 7.284 3.642 3.642 0 000-7.284zM12 14a2 2 0 110-4 2 2 0 010 4zm6.406-7.874a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
                </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors duration-300" aria-label="Te vienes">
                <img src="https://firebasestorage.googleapis.com/v0/b/cb-marbella-857d1.firebasestorage.app/o/Recursos%2FTevienes.com%20blanco%20.png?alt=media&token=e5c2dd55-fadd-45b1-b000-c3e36bcccbba" alt="Te vienes" className="w-6 h-6" />
            </a>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 text-sm mb-4">
          <Link to="/legal" className="hover:text-[#003782] transition-colors">Aviso Legal y Política de Privacidad</Link>
        </div>
        <p className="text-sm mb-2">&copy; {new Date().getFullYear()} CB Marbella.</p>
        <p className="text-xs">
          Web creada por <a href="https://melenamarketing.com/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#003782] transition-colors">Melena Marketing</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;