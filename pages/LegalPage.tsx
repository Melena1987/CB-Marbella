import React from 'react';
import AnimatedContent from '../components/AnimatedContent';

const LegalPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-[#0a192f]">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <h1 className="text-6xl md:text-7xl font-bold text-center text-white uppercase font-['Teko'] mb-4">Aviso Legal y Política de Privacidad</h1>
          <p className="text-lg text-slate-400 text-center max-w-3xl mx-auto mb-16">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </AnimatedContent>

        <div className="max-w-4xl mx-auto text-slate-300 text-lg space-y-12 bg-[#061121] p-8 rounded-lg">
          <AnimatedContent>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mb-4 border-l-4 border-[#003782] pl-4">1. Términos y Condiciones de Uso</h2>
            <div className="space-y-4">
              <p>
                Bienvenido al sitio web oficial del Club Baloncesto Marbella (en adelante, "CB Marbella"). El acceso y uso de este sitio web están sujetos a los siguientes términos y condiciones. Al utilizar este sitio, usted acepta estas condiciones en su totalidad.
              </p>
              <h3 className="text-2xl font-bold text-white font-['Teko'] pt-4">Propiedad Intelectual</h3>
              <p>
                Todo el contenido de este sitio web, incluyendo, entre otros, textos, gráficos, logotipos, imágenes y código fuente, es propiedad del CB Marbella o de terceros que han autorizado su uso, y está protegido por las leyes de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o modificación sin el consentimiento expreso del CB Marbella.
              </p>
              <h3 className="text-2xl font-bold text-white font-['Teko'] pt-4">Uso del Sitio Web</h3>
              <p>
                El usuario se compromete a utilizar el sitio web de manera lícita, respetando los derechos del CB Marbella y de terceros. Queda prohibido el uso del sitio para fines ilícitos o que puedan dañar la imagen del club o el funcionamiento del sitio.
              </p>
              <h3 className="text-2xl font-bold text-white font-['Teko'] pt-4">Limitación de Responsabilidad</h3>
              <p>
                CB Marbella no se hace responsable de los posibles errores de seguridad o daños que puedan causarse en el sistema informático del usuario como consecuencia de la presencia de virus en el ordenador utilizado para la conexión a los servicios y contenidos del sitio web, ni de un mal funcionamiento del navegador o del uso de versiones no actualizadas del mismo.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Teko'] mb-4 border-l-4 border-[#003782] pl-4">2. Política de Privacidad</h2>
             <div className="space-y-4">
                <p>
                    La presente Política de Privacidad describe cómo CB Marbella recopila, utiliza y protege la información personal que usted proporciona a través de nuestro sitio web, en cumplimiento con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD).
                </p>
                <h3 className="text-2xl font-bold text-white font-['Teko'] pt-4">Responsable del Tratamiento</h3>
                <p>
                    <strong>Razón Social:</strong> Club Baloncesto Marbella<br/>
                    <strong>CIF:</strong> G29397874<br/>
                    <strong>Email de contacto:</strong> info@cbmarbella.com
                </p>
                <h3 className="text-2xl font-bold text-white font-['Teko'] pt-4">Información que Recopilamos</h3>
                <p>
                    Recopilamos los datos personales que usted nos proporciona voluntariamente a través del formulario de contacto (nombre, email y mensaje). El propósito de esta recopilación es exclusivamente para poder responder a sus consultas, solicitudes o colaboraciones.
                </p>
                <h3 className="text-2xl font-bold text-white font-['Teko'] pt-4">Finalidad del Tratamiento</h3>
                <p>
                    Sus datos serán utilizados únicamente para gestionar su comunicación con el club y no serán cedidos a terceros sin su consentimiento explícito, salvo obligación legal.
                </p>
                 <h3 className="text-2xl font-bold text-white font-['Teko'] pt-4">Derechos del Usuario</h3>
                 <p>
                    Usted tiene derecho a acceder, rectificar, suprimir sus datos, así como otros derechos (oposición, portabilidad y limitación), enviando una solicitud por escrito a la dirección de correo electrónico indicada anteriormente, adjuntando una copia de su DNI para acreditar su identidad.
                 </p>
                 <h3 className="text-2xl font-bold text-white font-['Teko'] pt-4">Cookies</h3>
                 <p>
                    Este sitio web puede utilizar cookies técnicas para garantizar el correcto funcionamiento del sitio. No se utilizan cookies para recabar información de carácter personal sin su consentimiento.
                 </p>
             </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;