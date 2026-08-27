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
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 350);
  };

  return (
    <>
      <header className="w-full z-50 absolute top-[4%] lg:top-[6%] xl:top-[8%] flex items-center justify-center px-3 sm:px-6">
        {/* Main Desktop Header Container (>= 1280px) */}
        <article className="hidden xl:flex w-[95%] max-w-[1400px] h-[72px] bg-[#222222] flex-row items-center justify-between px-6 text-center tracking-[1px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] relative z-[98] rounded-[6px] border border-gray-800">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center text-white text-base xl:text-lg 2xl:text-xl font-bold tracking-widest cursor-pointer hover:scale-105 hover:underline hover:decoration-[#00b9ff] transition-all duration-300">
            <Link href="/" className="whitespace-nowrap">MOTORING COMMUNITY</Link>
          </div>

          {/* Links Section */}
          <div className="flex items-center justify-center flex-row border-x-2 border-[#00b9ff] px-6 h-full gap-4 2xl:gap-7 text-xs xl:text-sm 2xl:text-base font-semibold text-white">
            <a 
              className="cursor-pointer hover:text-[#00b9ff] transition-colors flex items-center gap-1.5 whitespace-nowrap py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleMouseEnter}
              onBlur={handleMouseLeave}
              tabIndex={0}
            >
              FORMULA ONE
              <Image src="/images/down-arrow-svgrepo-com.svg" alt="Down Arrow" width={14} height={14} />
            </a>
            <Link href="/standings" className="whitespace-nowrap hover:text-[#00b9ff] hover:underline hover:decoration-[#00b9ff] transition-all duration-200">SEASON STANDINGS</Link>
            <Link href="/data" className="whitespace-nowrap hover:text-[#00b9ff] hover:underline hover:decoration-[#00b9ff] transition-all duration-200">HISTORIC DATA</Link>
            <Link href="/forum" className="whitespace-nowrap hover:text-[#00b9ff] hover:underline hover:decoration-[#00b9ff] transition-all duration-200">FORUM</Link>
          </div>

          {/* User & Social Section */}
          <div className="flex-shrink-0 flex items-center justify-end gap-3 text-white">
            <Link href="/login" className="bg-[#00b9ff] text-black px-4 py-1.5 rounded font-bold hover:bg-white transition-colors border-2 border-transparent text-xs xl:text-sm whitespace-nowrap shadow-sm">
              LOGIN
            </Link>
            
            <ThemeToggle className="ml-1" />

            <div className="hidden 2xl:flex items-center gap-2 pl-3 border-l border-gray-700">
              <span className="text-xs text-gray-400 font-semibold">Social:</span>
              <a href="https://github.com/Chriiis85" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b9ff] transition-colors p-1" title="GitHub">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 0 19 19">
                  <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b9ff] transition-colors p-1" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 -2 44 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" transform="translate(-702.000000, -265.000000)" />
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Mobile & Tablet Header Container (< 1280px) */}
        <article className="flex xl:hidden w-full max-w-4xl h-[64px] bg-[#222222] items-center justify-between px-3 sm:px-6 text-white rounded-lg shadow-2xl border border-gray-800 border-b-2 border-b-[#00b9ff] relative z-[98]">
          <Link href="/" className="text-xs sm:text-base md:text-lg font-bold tracking-wider text-white whitespace-nowrap flex-shrink-0 hover:text-[#00b9ff] transition-colors">
            MOTORING COMMUNITY
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <ThemeToggle className="scale-90" />
            
            <Link href="/login" className="bg-[#00b9ff] text-black text-xs sm:text-sm px-3 py-1.5 rounded font-bold hover:bg-white transition-colors">
              LOGIN
            </Link>

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-[#00b9ff] focus:outline-none rounded hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </article>

        {/* Mobile & Tablet Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-2 max-w-4xl mx-auto bg-[#222222] border-2 border-[#00b9ff] rounded-xl shadow-2xl p-5 text-white z-[99] flex flex-col gap-3 font-['F1Regular'] animate-in fade-in slide-in-from-top-2 duration-200">
            {/* F1 Accordion */}
            <div className="border-b border-gray-700 pb-2">
              <button 
                onClick={() => setIsMobileF1SubmenuOpen(!isMobileF1SubmenuOpen)}
                className="w-full flex items-center justify-between py-2 text-sm sm:text-base font-bold text-[#00b9ff]"
              >
                <span>FORMULA ONE</span>
                <span className={`transform transition-transform ${isMobileF1SubmenuOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {isMobileF1SubmenuOpen && (
                <div className="pl-4 flex flex-col gap-2 mt-2 text-sm text-gray-300">
                  <Link href="/about" className="hover:text-white py-1">About Formula One</Link>
                  <Link href="/news" className="hover:text-white py-1">Latest News</Link>
                  <Link href="/drivers" className="hover:text-white py-1">Season Drivers</Link>
                  <Link href="/teams" className="hover:text-white py-1">Season Constructors</Link>
                  <Link href="/calendar" className="hover:text-white py-1">Season Calendar</Link>
                </div>
              )}
            </div>

            <Link href="/standings" className="py-2 text-sm sm:text-base font-bold hover:text-[#00b9ff] border-b border-gray-700 transition-colors">
              SEASON STANDINGS
            </Link>
            <Link href="/data" className="py-2 text-sm sm:text-base font-bold hover:text-[#00b9ff] border-b border-gray-700 transition-colors">
              HISTORIC DATA
            </Link>
            <Link href="/forum" className="py-2 text-sm sm:text-base font-bold hover:text-[#00b9ff] border-b border-gray-700 transition-colors">
              FORUM
            </Link>

            {/* Theme & Social Links on Mobile */}
            <div className="pt-3 flex items-center justify-between text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span>Theme:</span>
                <ThemeToggle className="scale-75" />
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/Chriiis85" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b9ff] transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/christian-moreno-d%C3%ADaz-109024292/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b9ff] transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Dropdown Menu (>= 1280px) */}
        <div 
          className={`hidden xl:flex absolute z-[97] w-[95%] max-w-[1400px] h-[150px] top-full bg-[#222222] border-b-2 border-white shadow-[0_54px_55px_rgba(0,0,0,0.25)] transition-all duration-500 ease-in-out flex-row items-center justify-around text-white rounded-b-[6px] ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Column 1 */}
          <div className="w-[30%] h-[90%] flex flex-col justify-center items-center text-center">
            <h1 className="text-lg xl:text-xl font-bold">Formula One <div className="w-full h-1 bg-[#00b9ff] mt-2"></div></h1>
          </div>
          
          {/* Column 2 */}
          <div className="w-[30%] h-[90%] flex flex-col justify-center items-center text-center gap-2">
            <Link href="/about" className="flex items-center gap-3 text-sm xl:text-base hover:underline hover:decoration-[#00acee] hover:opacity-65 transition-all">
              <Image src="/images/down-arrow-svgrepo-com.svg" alt="Arrow" width={20} height={20} className="-rotate-90" />
              About Formula One
            </Link>
            <Link href="/news" className="flex items-center gap-3 text-sm xl:text-base hover:underline hover:decoration-[#00acee] hover:opacity-65 transition-all">
              <Image src="/images/down-arrow-svgrepo-com.svg" alt="Arrow" width={20} height={20} className="-rotate-90" />
              Latest News
            </Link>
          </div>
          
          {/* Column 3 */}
          <div className="w-[30%] h-[90%] flex flex-col justify-center items-start pl-[5%] gap-2 transition-all text-center">
            <Link href="/drivers" className="flex items-center gap-3 text-sm xl:text-base hover:underline hover:decoration-[#00acee] hover:opacity-65 transition-all">
              <Image src="/images/down-arrow-svgrepo-com.svg" alt="Arrow" width={20} height={20} className="-rotate-90" />
              Season Drivers
            </Link>
            <Link href="/teams" className="flex items-center gap-3 text-sm xl:text-base hover:underline hover:decoration-[#00acee] hover:opacity-65 transition-all">
              <Image src="/images/down-arrow-svgrepo-com.svg" alt="Arrow" width={20} height={20} className="-rotate-90" />
              Season Constructors
            </Link>
            <Link href="/calendar" className="flex items-center gap-3 text-sm xl:text-base hover:underline hover:decoration-[#00acee] hover:opacity-65 transition-all">
              <Image src="/images/down-arrow-svgrepo-com.svg" alt="Arrow" width={20} height={20} className="-rotate-90" />
              Season Calendar
            </Link>
          </div>
        </div>
      </header>

      {/* Page Title & Background Image if variant="page" */}
      {variant === "page" && pageTitle && (
        <section className="w-full h-[35vh] sm:h-[45vh] md:h-[50vh] min-h-[260px] flex items-center justify-center text-center bg-cover bg-center relative z-0">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
          <h1 className="title-header-container w-[92%] max-w-5xl flex justify-center items-center text-center absolute text-white top-[45%] md:top-[42%] text-2xl sm:text-4xl md:text-5xl lg:text-[4em] tracking-wider z-10 font-[family-name:var(--font-f1-title)] uppercase px-2 leading-tight drop-shadow-lg">
            {pageTitle}
          </h1>
        </section>
      )}
    </>
  );
}
