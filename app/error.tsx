'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error caught by ErrorBoundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white font-['F1Regular'] px-4 text-center py-16">
      <div className="max-w-lg mx-auto bg-[#1e1e1e] border-2 border-red-500 rounded-2xl p-8 sm:p-12 shadow-[0_10px_35px_rgba(239,68,68,0.3)]">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500 text-3xl">
          🛑
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-bold font-['F1Title'] uppercase tracking-wider text-white mb-4">
          Pit Stop Inesperado
        </h1>

        <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
          Ha ocurrido un problema al comunicar con los servidores de datos de Fórmula 1 o al procesar la solicitud.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-[#00b9ff] text-black font-bold font-['F1RegularBold'] rounded hover:bg-white transition-all shadow-[0_0_15px_rgba(0,185,255,0.4)] cursor-pointer text-sm"
          >
            Reintentar Conexión
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition-colors text-sm border border-gray-700"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
