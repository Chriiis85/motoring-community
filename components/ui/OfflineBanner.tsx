'use client';

import React, { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Initial check
    if (typeof window !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div 
      role="alert" 
      aria-live="assertive"
      className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white font-['F1Regular'] py-2.5 px-4 text-center text-xs sm:text-sm font-semibold shadow-lg flex items-center justify-center gap-2 animate-in slide-in-from-top-full duration-300"
    >
      <span className="text-base">⚠️</span>
      <span>
        Sin conexión a Internet. Estás navegando en modo sin conexión; algunas funciones de datos en tiempo real pueden no estar disponibles.
      </span>
    </div>
  );
}
