'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!isVisible) return null;

  return (
    <button onClick={scrollToTop} className="fixed bottom-5 right-5 w-10 h-10 rounded-full bg-[#222] text-white border-2 border-white cursor-pointer z-[1000] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_3px_3px_#00b9ff] focus:border-[5px] focus:shadow-[0_0_3px_3px_#00b9ff] flex items-center justify-center outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
      </svg>
    </button>
  );
}
