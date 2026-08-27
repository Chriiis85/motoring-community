import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col font-['F1Regular'] bg-white dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      <Header variant="main" />
      <main className="flex-grow flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-lg mx-auto bg-[#f8f8f8] dark:bg-[#1e1e1e] border-2 border-gray-300 dark:border-gray-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
          <div className="text-6xl sm:text-7xl font-bold font-['F1Title'] text-[#00b9ff] mb-4">
            404
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold font-['F1Title'] uppercase tracking-wider mb-4">
            ¡Te has salido de la pista!
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-8 leading-relaxed">
            La página, piloto, escudería o carrera que estás buscando no existe o ha cambiado de posición en la parrilla.
          </p>

          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-[#00b9ff] text-black font-bold font-['F1RegularBold'] rounded hover:bg-[#222] hover:text-white transition-all shadow-[0_0_15px_rgba(0,185,255,0.4)] text-sm sm:text-base"
          >
            Volver a Boxes (Inicio)
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
