import React, { useState } from 'react';
import AnimatedContent from '../components/AnimatedContent';
import { Link } from 'react-router-dom';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        privacyAccepted: false,
        newsletterSubscribed: false,
        honeypot: '', // Anti-spam honeypot field
    });

    const [formStatus, setFormStatus] = useState('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // 1. Honeypot check
        if (formData.honeypot) {
            console.error("SPAM detected!");
            setFormStatus("Error: SPAM detectado.");
            return; 
        }

        // 2. Data validation (simple example)
        if (!formData.privacyAccepted) {
            setFormStatus("Debes aceptar la política de privacidad.");
            return;
        }

        // 3. Process form data (e.g., send to an API endpoint)
        console.log("Formulario enviado:", formData);
        setFormStatus("¡Mensaje enviado con éxito! Gracias por contactarnos.");
        
        // 4. Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            privacyAccepted: false,
            newsletterSubscribed: false,
            honeypot: '',
        });
        
        // Hide status message after a few seconds
        setTimeout(() => setFormStatus(''), 5000);
    };


  return (
    <div className="pt-24 pb-16 bg-[#0a192f]">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <h1 className="text-6xl md:text-7xl font-bold text-center text-white uppercase font-['Teko'] mb-4">Contacto</h1>
          <p className="text-lg text-slate-400 text-center max-w-3xl mx-auto mb-16">
            ¿Tienes alguna pregunta o quieres colaborar con nosotros? Rellena el formulario. ¡Estaremos encantados de atenderte!
          </p>
        </AnimatedContent>

        <div className="max-w-2xl mx-auto">
          <AnimatedContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Nombre</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#061121] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition" />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#061121] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition" />
              </div>

              {/* Subject Dropdown */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">Asunto</label>
                <select 
                    name="subject" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    className="w-full bg-[#061121] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition appearance-none bg-no-repeat bg-right pr-8"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="" disabled>Selecciona un motivo...</option>
                  <option value="patrocinio">Patrocinio</option>
                  <option value="jugar">Quiero jugar en el equipo</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="info">Info general</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Mensaje</label>
                <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full bg-[#061121] border border-slate-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-[#003782] focus:border-[#003782] transition"></textarea>
              </div>

              {/* Honeypot field (invisible to users) */}
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                  <input type="text" name="honeypot" tabIndex={-1} value={formData.honeypot} onChange={handleChange} autoComplete="off" />
              </div>
              
              {/* Checkboxes */}
              <div className="space-y-4">
                 <div className="flex items-start">
                    <input type="checkbox" id="privacyAccepted" name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleChange} required className="h-4 w-4 mt-1 rounded border-slate-600 text-[#003782] bg-[#061121] focus:ring-[#002966] shrink-0" />
                    <label htmlFor="privacyAccepted" className="ml-3 block text-sm text-slate-400">
                        He leído y acepto la <Link to="/legal" className="font-medium text-[#003782] hover:underline">política de privacidad</Link>.
                    </label>
                 </div>
                 <div className="flex items-start">
                    <input type="checkbox" id="newsletterSubscribed" name="newsletterSubscribed" checked={formData.newsletterSubscribed} onChange={handleChange} className="h-4 w-4 mt-1 rounded border-slate-600 text-[#003782] bg-[#061121] focus:ring-[#002966] shrink-0" />
                    <label htmlFor="newsletterSubscribed" className="ml-3 block text-sm text-slate-400">
                        Deseo suscribirme para recibir información y noticias sobre el club.
                    </label>
                 </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#003782] to-[#002966] hover:from-[#002966] hover:to-[#003782] text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                disabled={!formData.privacyAccepted}
              >
                Enviar Mensaje
              </button>

              {formStatus && (
                <p className={`text-center text-sm mt-4 ${formStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {formStatus}
                </p>
              )}
            </form>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;