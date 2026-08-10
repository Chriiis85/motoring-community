'use client';

import React, { useEffect, useState } from 'react';

interface CalendarCountdownProps {
  date: string;
  time: string;
  round: string;
}

export default function CalendarCountdown({ date, time, round }: CalendarCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const raceTime = new Date(`${date}T${time || '00:00:00Z'}`).getTime();
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
  }, [date, time]);

  return (
    <div className="next-race-clock">
      <div className="countdown-clock">
        <div className="title-bar misc--label">Race Start</div>
        <div className="clock">
          <div className="days">
            <p id="next-race-days" className="countdown-text">{isMounted ? timeLeft.days : '-'}</p>
            <span className="f1--xxs f1-uppercase">days</span>
          </div>
          <div className="hours">
            <p id="next-race-hours" className="countdown-text">{isMounted ? timeLeft.hours : '-'}</p>
            <span className="f1--xxs f1-uppercase">hrs</span>
          </div>
          <div className="minutes">
            <p id="countdown-mins" className="countdown-text">{isMounted ? timeLeft.minutes : '-'}</p>
            <span className="f1--xxs f1-uppercase">mins</span>
          </div>
        </div>
      </div>
      <div id="round" className="countdown-clock">
        <div id="round-title" className="title-bar misc--label">Race</div>
        <div className="clock">
          <div id="round-text" className="days">
            <p id="round-number" className="countdown-text">{round}</p>
            <span className="f1--xxs f1-uppercase">Round</span>
          </div>
        </div>
      </div>
    </div>
  );
}
