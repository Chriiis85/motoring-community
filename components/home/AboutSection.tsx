'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const [opacity, setOpacity] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setOpacity(1);
        } else {
          setOpacity(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-12 sm:py-16 px-4 sm:px-8 md:px-12 transition-opacity duration-500 bg-white dark:bg-[#121212] text-black dark:text-white border-t border-gray-200 dark:border-gray-800"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Text column */}
        <article className="w-full lg:w-1/2 flex flex-col justify-center font-['F1Regular']">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 font-['F1Title'] uppercase tracking-wider text-black dark:text-white">
            What is Motoring Community?
          </h2>
          
          <p className="text-base sm:text-lg mb-4 text-gray-800 dark:text-gray-200 leading-relaxed font-['F1Regular']">
            Welcome to Motoring Community WebPage! In this page you can find all type
            of data, news, standings and information about the actual and past seasons
            of the Formula One Championship.
          </p>
          
          <p className="text-base sm:text-lg mb-4 text-gray-800 dark:text-gray-200 leading-relaxed font-['F1Regular']">
            Motoring Community aims to bring Formula One users and fans closer together
            through a web portal where they can access information about teams,
            drivers, statistics, races, standings, etc. It provides all the necessary
            information to understand the championship and bring both expert and less
            experienced users closer to this sport. Thanks to the forum, it seeks to
            provide a safe and regulated space where all fans can discuss and share
            images, ideas, or questions, all centralized around the sport.
          </p>
          
          <p className="text-base sm:text-lg mb-4 text-gray-800 dark:text-gray-200 leading-relaxed font-['F1Regular']">
            This page requires the use of an API to collect and show all the
            information about the drivers, teams, standings, data, etc. Thanks to the{' '}
            <a title="Go to Ergast API Page" href="https://ergast.com/" target="_blank" rel="noopener noreferrer" className="text-[#00b9ff] hover:underline font-['F1RegularBold']">
              Ergast Developer API
            </a>
            , all the data can be collected and showed to all the users that navigates
            through this page. Also thanks to{' '}
            <a title="Go to NewsAPI Page" href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-[#00b9ff] hover:underline font-['F1RegularBold']">
              News Api
            </a>
            , latest news can be collected and show all the recent news about his
            beautiful sport.
          </p>
          
          <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-['F1Regular']">
            This page is created with the purpose of displaying data and centralizing
            all information regarding the Formula One World Championship to attract
            both expert users and newcomers. The website does not have any economic
            benefit or profit from its users or functions.
          </p>
        </article>

        {/* Image column */}
        <article className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full relative min-h-[300px] sm:min-h-[400px] md:min-h-[460px] rounded-xl overflow-hidden shadow-2xl border-4 border-black dark:border-[#00b9ff]">
            <Image
              src="https://images.ecestaticos.com/GmybLEEqNXeHlXczyzpIegwHZwg=/0x0:2272x1454/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F9b6%2Fd85%2Fe5f%2F9b6d85e5fc0e2eab3a31d978e7fb6208.jpg"
              alt="Formula 1 cars racing on a Grand Prix circuit"
              fill
              className="object-cover"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
