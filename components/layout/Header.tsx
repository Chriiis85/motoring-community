'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface HeaderProps {
  variant?: "main" | "page";
  pageTitle?: string;
  backgroundImage?: string;
}

export default function Header({ variant = "main", pageTitle = "", backgroundImage = "" }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileF1SubmenuOpen, setIsMobileF1SubmenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsMobileF1SubmenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  return (
    <>
      {/* ── Fixed Navbar Header ────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-gray-800/80 shadow-xs dark:shadow-2xl transition-all duration-300">
        <div className="w-full max-w-7xl 2xl:max-w-8xl mx-auto h-16 sm:h-20 flex items-center justify-between px-3 sm:px-6 lg:px-8">
          
          {/* ── Logo Brand ─────────────────────────────────────────────────── */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              href="/" 
              className="text-slate-950 dark:text-white text-xs sm:text-base md:text-lg lg:text-xl font-black tracking-wider sm:tracking-widest hover:text-[#008cc3] dark:hover:text-[#00b9ff] transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 group"
            >
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#008cc3] dark:bg-[#00b9ff] group-hover:scale-125 transition-transform duration-300 shrink-0"></span>
              <span>MOTORING <span className="text-[#008cc3] dark:text-[#00b9ff]">COMMUNITY</span></span>
            </Link>
          </div>

          {/* ── Desktop Navigation Links (lg+) ─────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3 2xl:gap-6 text-xs xl:text-sm font-bold text-slate-700 dark:text-gray-200">
            {/* Formula One Dropdown Trigger */}
            <div 
              className="relative py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                className="cursor-pointer px-3 py-2 rounded-lg text-slate-700 dark:text-gray-200 hover:text-[#008cc3] dark:hover:text-[#00b9ff] hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
              >
                FORMULA ONE
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#008cc3] dark:text-[#00b9ff]' : 'text-slate-400 dark:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* F1 Mega-Dropdown Card */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[500px] bg-white/98 dark:bg-[#1a1a1a]/98 backdrop-blur-2xl border border-slate-200 dark:border-gray-800 rounded-2xl shadow-2xl p-5 text-slate-900 dark:text-white transition-all duration-300 z-50 grid grid-cols-2 gap-4 ${isDropdownOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-2 invisible pointer-events-none'}`}
              >
                <div className="space-y-1.5 border-r border-slate-200/80 dark:border-gray-800/80 pr-4">
                  <div className="text-[11px] font-black tracking-widest text-[#008cc3] dark:text-[#00b9ff] uppercase pb-1 mb-1 border-b border-slate-100 dark:border-gray-800">
                    Información F1
                  </div>
                  <Link href="/about" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <span className="text-[#008cc3] dark:text-[#00b9ff] font-bold">›</span> About Formula One
                  </Link>
                  <Link href="/news" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <span className="text-[#008cc3] dark:text-[#00b9ff] font-bold">›</span> Latest News
                  </Link>
                </div>

                <div className="space-y-1.5 pl-2">
                  <div className="text-[11px] font-black tracking-widest text-[#008cc3] dark:text-[#00b9ff] uppercase pb-1 mb-1 border-b border-slate-100 dark:border-gray-800">
                    Temporada Actual
                  </div>
                  <Link href="/drivers" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <span className="text-[#008cc3] dark:text-[#00b9ff] font-bold">›</span> Season Drivers
                  </Link>
                  <Link href="/teams" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <span className="text-[#008cc3] dark:text-[#00b9ff] font-bold">›</span> Season Constructors
                  </Link>
                  <Link href="/calendar" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <span className="text-[#008cc3] dark:text-[#00b9ff] font-bold">›</span> Season Calendar
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/standings" 
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-gray-200 hover:text-[#008cc3] dark:hover:text-[#00b9ff] hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
            >
              SEASON STANDINGS
            </Link>

            <Link 
              href="/data" 
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-gray-200 hover:text-[#008cc3] dark:hover:text-[#00b9ff] hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
            >
              HISTORIC DATA
            </Link>

            <Link 
              href="/forum" 
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-gray-200 hover:text-[#008cc3] dark:hover:text-[#00b9ff] hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
            >
              FORUM
            </Link>
          </nav>

          {/* ── Desktop Right Controls (lg+) ────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            <Link 
              href="/login" 
              className="bg-[#00b9ff] hover:bg-[#009edc] text-black font-extrabold px-4 xl:px-5 py-2 rounded-xl text-xs xl:text-sm tracking-wider uppercase transition-all duration-200 shadow-md shadow-[#00b9ff]/20 hover:shadow-lg whitespace-nowrap"
            >
              LOGIN
            </Link>
            
            <ThemeToggle className="scale-95" />

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-gray-700/80">
              <span className="text-xs text-slate-500 dark:text-gray-400 font-bold hidden xl:inline-block">Social:</span>
              <a 
                href="https://github.com/Chriiis85" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 dark:text-gray-400 hover:text-[#008cc3] dark:hover:text-[#00b9ff] transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5" 
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 0 19 19">
                  <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 dark:text-gray-400 hover:text-[#008cc3] dark:hover:text-[#00b9ff] transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5" 
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 -2 44 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" transform="translate(-702.000000, -265.000000)" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Mobile Right Controls (< lg) ────────────────────────────────── */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:hidden flex-shrink-0">
            <ThemeToggle className="scale-80 sm:scale-90" />
            
            <Link 
              href="/login" 
              className="bg-[#00b9ff] text-black text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-[#009edc] transition-colors whitespace-nowrap"
            >
              LOGIN
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 sm:p-2 text-slate-800 dark:text-white hover:text-[#008cc3] dark:hover:text-[#00b9ff] focus:outline-none rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* ── Mobile Drawer Overlay (< lg) ─────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-gray-800 bg-white/98 dark:bg-[#161616]/98 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 text-slate-900 dark:text-white flex flex-col gap-2.5 font-['F1Regular'] max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* F1 Accordion */}
            <div className="border-b border-slate-200 dark:border-gray-800 pb-2">
              <button 
                type="button"
                onClick={() => setIsMobileF1SubmenuOpen(!isMobileF1SubmenuOpen)}
                className="w-full flex items-center justify-between py-2.5 text-sm sm:text-base font-bold text-[#008cc3] dark:text-[#00b9ff] cursor-pointer"
              >
                <span>FORMULA ONE</span>
                <span className={`transform transition-transform duration-200 ${isMobileF1SubmenuOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {isMobileF1SubmenuOpen && (
                <div className="pl-3 flex flex-col gap-1.5 mt-1 text-sm text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-200/80 dark:border-gray-800/60">
                  <Link href="/about" className="hover:text-slate-950 dark:hover:text-white py-1.5 flex items-center gap-2">
                    <span className="text-[#008cc3] dark:text-[#00b9ff]">›</span> About Formula One
                  </Link>
                  <Link href="/news" className="hover:text-slate-950 dark:hover:text-white py-1.5 flex items-center gap-2">
                    <span className="text-[#008cc3] dark:text-[#00b9ff]">›</span> Latest News
                  </Link>
                  <Link href="/drivers" className="hover:text-slate-950 dark:hover:text-white py-1.5 flex items-center gap-2">
                    <span className="text-[#008cc3] dark:text-[#00b9ff]">›</span> Season Drivers
                  </Link>
                  <Link href="/teams" className="hover:text-slate-950 dark:hover:text-white py-1.5 flex items-center gap-2">
                    <span className="text-[#008cc3] dark:text-[#00b9ff]">›</span> Season Constructors
                  </Link>
                  <Link href="/calendar" className="hover:text-slate-950 dark:hover:text-white py-1.5 flex items-center gap-2">
                    <span className="text-[#008cc3] dark:text-[#00b9ff]">›</span> Season Calendar
                  </Link>
                </div>
              )}
            </div>

            <Link href="/standings" className="py-2.5 text-sm sm:text-base font-bold text-slate-800 dark:text-gray-200 hover:text-[#008cc3] dark:hover:text-[#00b9ff] border-b border-slate-100 dark:border-gray-800 transition-colors">
              SEASON STANDINGS
            </Link>
            <Link href="/data" className="py-2.5 text-sm sm:text-base font-bold text-slate-800 dark:text-gray-200 hover:text-[#008cc3] dark:hover:text-[#00b9ff] border-b border-slate-100 dark:border-gray-800 transition-colors">
              HISTORIC DATA
            </Link>
            <Link href="/forum" className="py-2.5 text-sm sm:text-base font-bold text-slate-800 dark:text-gray-200 hover:text-[#008cc3] dark:hover:text-[#00b9ff] border-b border-slate-100 dark:border-gray-800 transition-colors">
              FORUM
            </Link>

            {/* Social & Mobile Theme */}
            <div className="pt-3 flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span>Tema:</span>
                <ThemeToggle className="scale-80" />
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/Chriiis85" target="_blank" rel="noopener noreferrer" className="hover:text-[#008cc3] dark:hover:text-[#00b9ff] transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/" target="_blank" rel="noopener noreferrer" className="hover:text-[#008cc3] dark:hover:text-[#00b9ff] transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Page Header Banner (if variant="page") ─────────────────────────── */}
      {variant === "page" && pageTitle && (
        <section className="w-full h-[38vh] sm:h-[45vh] md:h-[50vh] min-h-[280px] pt-16 sm:pt-20 flex items-center justify-center text-center bg-cover bg-center relative z-0">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-[1px]" />
          <h1 className="title-header-container w-[92%] max-w-5xl flex justify-center items-center text-center absolute text-white top-[50%] -translate-y-1/2 text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider z-10 font-[family-name:var(--font-f1-title)] uppercase px-2 leading-tight drop-shadow-lg">
            {pageTitle}
          </h1>
        </section>
      )}
    </>
  );
}
