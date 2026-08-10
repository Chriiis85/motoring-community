'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getNextRace, getRaceCalendar } from '@/lib/f1-api';
import { getTrackImageName } from '@/lib/types';
import { Race } from '@/lib/types';
import FallbackImage from '@/components/ui/FallbackImage';

export default function CountdownTimer() {
  const [nextRace, setNextRace] = useState<Race | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const fetchNextRace = async () => {
      try {
        const races = await getRaceCalendar('current');
        const now = new Date();
        
        let closestRace = null;
        let minTime = Infinity;

        for (const race of races) {
          const raceTime = new Date(`${race.date}T${race.time || '00:00:00Z'}`).getTime() - now.getTime();
          if (raceTime > 0 && raceTime < minTime) {
            minTime = raceTime;
            closestRace = race;
          }
        }

        if (!closestRace && races.length > 0) {
          closestRace = races[races.length - 1];
        }
        
        setNextRace(closestRace);
      } catch (error) {
        console.error('Error fetching next race:', error);
      }
    };

    fetchNextRace();
  }, []);

  useEffect(() => {
    if (!nextRace) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const raceTime = new Date(`${nextRace.date}T${nextRace.time || '00:00:00Z'}`).getTime();
      const difference = raceTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [nextRace]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
  };

  const trackImageName = nextRace ? getTrackImageName(nextRace.raceName) : 'ChineseGrandPrix';

  return (
    <section className="next-race bg-black py-[10px] lg:py-[20px] border-b border-[#38383f] shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
      <div className="next-race-container w-full px-[10px] mx-auto font-f1-regular sm:max-w-[576px] md:max-w-[768px] lg:max-w-[986px] xl:max-w-[1320px]">
        <div className="row flex flex-wrap -mx-[10px]">
          {/* Race Info */}
          <div className="col-md-7 col-lg-8 col-xl-9 relative w-full px-[10px] md:flex-none md:w-[58.33333%] lg:w-[66.66667%] xl:w-[75%]">
            <div className="next-race-title mb-[10px] md:mb-0 md:h-full lg:table lg:w-full">
              <div className="next-race-date mb-[10px] text-white">
                <p className="m-0 text-[1.25em]">{formatDate(nextRace?.date || '')}</p>
              </div>
              <div className="next-race-info flex">
                <div className="next-race-next-race-circuit-imagecontainer border-t border-r border-[#38383f] rounded-tr-[10px] pt-[10px] pr-[10px] w-[50px] mr-[10px] md:w-[70px] md:mr-[15px] xl:w-[100px]">
                  <FallbackImage
                    src={`/images/Tracks/${trackImageName}.png`}
                    fallbackSrc="/images/transparent.svg"
                    alt="F1 next Track"
                    width={75}
                    height={75}
                    className="w-[40px] md:w-[50px] xl:w-[75px]"
                  />
                </div>
                <div className="next-race-text-container border-t border-[#38383f] text-white uppercase w-full pt-[12px] md:pt-[15px] xl:pt-[20px]">
                  <div className="next-race-text inline-block font-f1-regular text-[16px] leading-[18px] md:text-[20px] md:leading-[24px] lg:text-[25px] lg:leading-[30px] xl:text-[32px] xl:leading-[36px]">
                    <span className="race-name">{nextRace?.raceName || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Countdown Clock */}
          <div className="col-md-5 col-lg-4 col-xl-3 relative w-full px-[10px] md:flex-none md:w-[41.66667%] lg:w-[33.33333%] xl:w-[25%]">
            <div className="next-race-clock table w-full mt-[2px] md:mt-0">
              <div className="countdown-clock table-cell p-[10px] bg-[#1f1f27] rounded-l-[10px] align-middle">
                <div className="title-bar font-f1-regular text-[13px] leading-[15px] tracking-[0.5px] font-normal p-[5px] bg-[#38383f] text-white rounded-[10px] mb-[10px] max-w-[165px] mx-auto uppercase text-center">
                  Race Start
                </div>
                <div className="clock table mx-auto whitespace-nowrap [font-feature-settings:'tnum']">
                  <div className="days table-cell text-white px-[10px] text-center">
                    <p className="countdown-text m-0 font-f1-regular text-[22px] leading-[26px] md:text-[20px] md:leading-[24px] lg:text-[25px] lg:leading-[30px] xl:text-[32px] xl:leading-[36px]">{timeLeft.days || '-'}</p>
                    <span className="font-f1-regular text-[12px] leading-[15px] tracking-[0.5px] font-normal uppercase block text-[#949498]">days</span>
                  </div>
                  <div className="hours table-cell text-white px-[10px] text-center border-l border-[#38383f]">
                    <p className="countdown-text m-0 font-f1-regular text-[22px] leading-[26px] md:text-[20px] md:leading-[24px] lg:text-[25px] lg:leading-[30px] xl:text-[32px] xl:leading-[36px]">{timeLeft.hours || '-'}</p>
                    <span className="font-f1-regular text-[12px] leading-[15px] tracking-[0.5px] font-normal uppercase block text-[#949498]">hrs</span>
                  </div>
                  <div className="minutes table-cell text-white px-[10px] text-center border-l border-[#38383f] md:pr-0">
                    <p className="countdown-text m-0 font-f1-regular text-[22px] leading-[26px] md:text-[20px] md:leading-[24px] lg:text-[25px] lg:leading-[30px] xl:text-[32px] xl:leading-[36px]">{timeLeft.minutes || '-'}</p>
                    <span className="font-f1-regular text-[12px] leading-[15px] tracking-[0.5px] font-normal uppercase block text-[#949498]">mins</span>
                  </div>
                </div>
              </div>
              <div id="round" className="countdown-clock table-cell align-middle border-l-[5px] border-black rounded-r-[10px] rounded-l-none bg-[#38383f] mr-[5%]">
                <div id="round-title" className="title-bar font-f1-regular text-[13px] leading-[15px] tracking-[0.5px] font-normal p-[5px] bg-[#1f1f27] text-white rounded-[10px] mb-[10px] max-w-[165px] mx-auto uppercase text-center">
                  Race
                </div>
                <div className="clock table mx-auto whitespace-nowrap [font-feature-settings:'tnum']">
                  <div id="round-text" className="days table-cell text-white pl-[10%] pr-[10px] text-center">
                    <p className="countdown-text m-0 font-f1-regular text-[22px] leading-[26px] md:text-[20px] md:leading-[24px] lg:text-[25px] lg:leading-[30px] xl:text-[32px] xl:leading-[36px]">{nextRace?.round || '-'}</p>
                    <span className="font-f1-regular text-[12px] leading-[15px] tracking-[0.5px] font-normal uppercase block text-[#949498]">Round</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
