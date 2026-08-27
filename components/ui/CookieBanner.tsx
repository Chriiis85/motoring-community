'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('motoring_cookie_consent');
    if (!consent) {
      // Delay slightly for smoother appearance
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('motoring_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('motoring_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      role="region" 
      aria-label="Consentimiento de Cookies" 
      className="fixed bottom-0 left-0 right-0 z-[999] p-4 sm:p-6 bg-[#1a1a1a]/95 text-white border-t-2 border-[#00b9ff] backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.5)] font-['F1Regular'] animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        {/* Information Text */}
        <div className="w-full md:w-2/3 text-xs sm:text-sm text-gray-300 leading-relaxed text-center md:text-left">
          <p className="font-bold text-white font-['F1Title'] uppercase tracking-wider mb-1 flex items-center justify-center md:justify-start gap-2">
            🍪 Uso de Cookies y Privacidad
          </p>
          <p>
            Utilizamos cookies técnicas necesarias para el funcionamiento del sitio (guardar tus preferencias de tema claro/oscuro) y análisis para mejorar tu experiencia en la comunidad de motor. Consulta nuestra{' '}
            <a 
              href="#footer" 
              onClick={() => {
                const footerCookiesLink = document.querySelector('a[title="Go to Footer Section"]') as HTMLElement;
                if (footerCookiesLink) footerCookiesLink.click();
              }}
              className="text-[#00b9ff] underline font-bold hover:text-white transition-colors"
            >
              Política de Cookies
            </a>{' '}
            para más detalles.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center flex-wrap sm:flex-nowrap">
          <button
            onClick={handleEssentialOnly}
            className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm border border-gray-600 rounded text-gray-300 hover:text-white hover:border-white transition-all bg-white/5 font-semibold cursor-pointer whitespace-nowrap"
          >
            Solo Esenciales
          </button>
          
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm bg-[#00b9ff] text-black font-['F1RegularBold'] font-bold rounded hover:bg-white transition-all shadow-[0_0_15px_rgba(0,185,255,0.4)] cursor-pointer whitespace-nowrap"
          >
            Aceptar Todas
          </button>
        </div>
      </div>
    </div>
  );
}
