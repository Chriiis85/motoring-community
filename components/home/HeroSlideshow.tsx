import React from 'react';
import Image from 'next/image';

export default function HeroSlideshow() {
  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[560px] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#181818] pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12">
      {/* Background Slideshow */}
      <div aria-hidden="true" className="slider absolute inset-0 w-full h-full filter blur-[2px] z-0 pointer-events-none">
        <ul className="slideshow w-full h-full list-none m-0 p-0">
          <li><span></span></li>
          <li><span></span></li>
          <li><span></span></li>
          <li><span></span></li>
        </ul>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-12 my-auto">
        
        {/* Main Title */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left text-white font-['F1Title']">
          <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-wider leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)] m-0">
            Welcome to <span className="text-[#00b9ff] block sm:inline">Motoring Community!</span>
          </h1>
        </div>

        {/* Devices Mockup + Tagline directly underneath */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center">
          <div className="relative w-[260px] sm:w-[360px] md:w-[460px] lg:w-[560px] max-w-full aspect-[4/3] drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]">
            <Image 
              src="/images/Devices.png" 
              alt="Motoring Community on all devices"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Tagline always directly below the devices image, inside the hero */}
          <p className="font-['F1Regular'] text-xs sm:text-sm md:text-base lg:text-xl italic tracking-wide text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-lg mx-auto mt-2 sm:mt-3 px-2 font-semibold">
            &quot;The home of all the race fans, where we can meet together.&quot;
          </p>
        </div>

      </div>
    </section>
  );
}
