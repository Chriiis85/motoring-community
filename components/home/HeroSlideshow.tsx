import React from 'react';
import Image from 'next/image';

export default function HeroSlideshow() {
  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#222222] flex flex-col justify-between pt-24 sm:pt-28 md:pt-36 pb-8 px-4 sm:px-8 md:px-12">
      {/* Background Slideshow */}
      <article className="slider absolute inset-0 w-full h-full filter blur-[2px] z-0 pointer-events-none">
        <ul className="slideshow w-full h-full list-none m-0 p-0">
          <li><span></span></li>
          <li><span></span></li>
          <li><span></span></li>
          <li><span></span></li>
        </ul>
      </article>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col justify-between my-auto py-4">
        
        {/* Top Split: Title & Devices Image */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          
          {/* Main Title */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left text-white font-['F1Title']">
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-wider leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] m-0">
              Welcome to
            </h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-wider leading-tight text-[#00b9ff] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] m-0">
              Motoring Community!
            </h1>
          </div>

          {/* Devices Mockup */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-[280px] sm:w-[380px] md:w-[480px] lg:w-[560px] max-w-full aspect-[4/3] drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]">
              <Image 
                src="/images/Devices.png" 
                alt="Motoring Community on all devices"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>

        {/* Bottom Tagline */}
        <div className="w-full text-center text-white font-['F1Regular'] mt-6 sm:mt-8">
          <p className="text-sm sm:text-base md:text-xl xl:text-2xl italic tracking-wide text-gray-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-4xl mx-auto m-0 px-2 font-semibold">
            &quot;The home of all the race fans, where we can meet together.&quot;
          </p>
        </div>

      </div>
    </section>
  );
}
