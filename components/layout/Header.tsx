'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  variant?: "main" | "page";
  pageTitle?: string;
  backgroundImage?: string;
}

export default function Header({ variant = "main", pageTitle = "", backgroundImage = "" }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  };

  return (
    <>
      <header className="w-full z-50 absolute top-[10%] flex items-center justify-center">
        {/* Main Header Container */}
        <article className="w-[85%] h-[70px] bg-[#222222] flex flex-row items-center justify-center text-center tracking-[1px] shadow-[0_54px_55px_rgba(0,0,0,0.25),0_-12px_30px_rgba(0,0,0,0.12),0_4px_6px_rgba(0,0,0,0.12),0_12px_13px_rgba(0,0,0,0.17),0_-3px_5px_rgba(0,0,0,0.09)] relative z-[98]">
          
          {/* Logo Section */}
          <div className="w-[20%] h-full flex items-center justify-center text-white text-lg xl:text-xl font-bold tracking-widest cursor-pointer hover:scale-105 hover:underline hover:decoration-[#00b9ff] transition-all duration-300">
            <Link href="/">MOTORING COMMUNITY</Link>
          </div>

          {/* Links Section */}
          <div className="w-[60%] h-full pr-[3%] flex items-center justify-end flex-row border-x-2 border-[#00b9ff] gap-[3%] text-xs xl:text-sm 2xl:text-base font-semibold text-white">
            <a 
              className="cursor-pointer hover:opacity-60 transition-opacity flex items-center gap-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleMouseEnter}
              onBlur={handleMouseLeave}
              tabIndex={0}
            >
              FORMULA ONE
              <Image src="/images/down-arrow-svgrepo-com.svg" alt="Down Arrow" width={16} height={16} />
            </a>
            <Link href="/standings" className="hover:scale-105 hover:underline hover:decoration-[#00b9ff] transition-all duration-300">SEASON STANDINGS</Link>
            <Link href="/data" className="hover:scale-105 hover:underline hover:decoration-[#00b9ff] transition-all duration-300">HISTORIC DATA</Link>
            <Link href="/forum" className="hover:scale-105 hover:underline hover:decoration-[#00b9ff] transition-all duration-300">FORUM</Link>
            <Link href="/login" className="bg-[#00b9ff] text-black px-4 py-1 rounded hover:bg-white transition-colors ml-4 font-bold border-2 border-transparent">LOGIN</Link>
          </div>

          {/* Social Section */}
          <div className="w-[20%] h-full flex items-center justify-center gap-[10px] flex-row text-white">
            <h1 className="text-xs xl:text-sm ml-[5px] mr-[10px] font-semibold">Social Media:</h1>
            <div className="flex gap-3">
              <a href="https://github.com/Chriiis85" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 0 19 19">
                  <path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/christian-moreno-díaz-109024292/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5 fill-white" viewBox="0 -2 44 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" transform="translate(-702.000000, -265.000000)" />
                </svg>
              </a>
              <a href="https://www.instagram.com/christiaan.85/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792" transform="translate(-284.000000, -7279.000000)" />
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Dropdown Menu */}
        <div 
          className={`absolute z-[97] w-[85%] h-[150px] top-full bg-[#222222] border-b-2 border-white shadow-[0_54px_55px_rgba(0,0,0,0.25),0_-12px_30px_rgba(0,0,0,0.12),0_4px_6px_rgba(0,0,0,0.12),0_12px_13px_rgba(0,0,0,0.17),0_-3px_5px_rgba(0,0,0,0.09)] transition-all duration-500 ease-in-out flex flex-row items-center justify-around text-white ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'}`}
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
        <section className="w-full h-[50vh] min-h-[300px] flex items-center justify-center text-center bg-cover bg-center relative z-0">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
          <h1 className="title-header-container w-full h-[20%] flex justify-center absolute text-white top-[45%] text-[3.5em] md:text-[5em] tracking-wider z-10 font-[family-name:var(--font-f1-title)]">
            {pageTitle}
          </h1>
        </section>
      )}
    </>
  );
}
