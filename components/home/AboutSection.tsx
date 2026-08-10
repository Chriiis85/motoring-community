'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const [opacity, setOpacity] = useState(0);
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
      className="about w-full flex flex-col md:flex-row p-8 transition-opacity duration-500 bg-white"
      style={{ opacity }}
    >
      <article className="about-us w-full md:w-1/2 p-4 flex flex-col justify-center">
        <h1 className="about-title text-3xl font-bold mb-6 font-f1-bold">What is Motoring Community?</h1>
        <p className="about-content text-lg mb-4 font-open-sans">
          Welcome to Motoring Community WebPage! In this page you can find all type
          of data, news, standings and information about the actual and past seasons
          of the Formula One Championship.
        </p>
        <p className="about-content text-lg mb-4 font-open-sans">
          Motoring Community aims to bring Formula One users and fans closer together
          through a web portal where they can access information about teams,
          drivers, statistics, races, standings, etc. It provides all the necessary
          information to understand the championship and bring both expert and less
          experienced users closer to this sport. Thanks to the forum, it seeks to
          provide a safe and regulated space where all fans can discuss and share
          images, ideas, or questions, all centralized around the sport.
        </p>
        <p className="about-content text-lg mb-4 font-open-sans">
          This page requires the use of an API to collect and show all the
          information about the drivers, teams, standings, data, etc. Thanks to the{' '}
          <a title="Go to Ergast API Page" href="https://ergast.com/" className="text-blue-600 hover:underline">
            Ergast Developer API
          </a>
          , all the data can be collected and showed to all the users that navigates
          through this page. Also thanks to{' '}
          <a title="Go to NewsAPI Page" href="https://newsapi.org" className="text-blue-600 hover:underline">
            News Api
          </a>
          , latest news can be collected and show all the recent news about his
          beautiful sport.
        </p>
        <p className="about-content text-lg mb-4 font-open-sans">
          This page is created with the purpose of displaying data and centralizing
          all information regarding the Formula One World Championship to attract
          both expert users and newcomers. The website does not have any economic
          benefit or profit from its users or functions.
        </p>
      </article>
      <article className="about-image w-full md:w-1/2 p-4 flex items-center justify-center">
        <div className="about-image-container w-full h-full relative min-h-[400px]">
          <Image
            src="https://images.ecestaticos.com/GmybLEEqNXeHlXczyzpIegwHZwg=/0x0:2272x1454/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F9b6%2Fd85%2Fe5f%2F9b6d85e5fc0e2eab3a31d978e7fb6208.jpg"
            alt="Formula 1 Image"
            title="Formula 1 Image"
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </article>
    </section>
  );
}
