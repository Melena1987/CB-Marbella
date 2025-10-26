import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // Close modal on successful login
    } catch (err: any) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#061121] rounded-lg shadow-2xl p-8 max-w-md w-full relative border border-slate-700" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-3xl font-bold text-white font-['Teko'] mb-6 text-center">Acceso Playmaker</h2>
        
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label htmlFor="email-login" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              id="email-login" 
              value={email} 
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              required
            />
          </div>
          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-slate-300 mb-1">Contraseña</label>
            <input 
              type="password" 
              id="password-login" 
              value={password} 
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-[#0a192f] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-4 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
            <p className="text-slate-400">
                ¿Quieres poner tu logo aquí?{' '}
                <Link to="/contacto" onClick={onClose} className="font-medium text-[#003782] hover:underline">
                    Descubre cómo.
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;