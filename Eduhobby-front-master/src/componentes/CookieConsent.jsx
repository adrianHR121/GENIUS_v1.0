import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get('cookieConsent');
    if (!cookieConsent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          Utilizamos cookies para mejorar su experiencia en nuestro sitio web. 
          Al continuar navegando, acepta nuestro uso de cookies.
        </p>
        <button 
          onClick={handleAccept} 
          className="bg-[var(--fondo-color)] text-white p-2 rounded-lg ml-4 hover:bg-white hover:text-[var(--fondo-color)] hover:border hover:border-gray-300 border-[var(--fondo-color)]"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
