import React from 'react';
import Image from 'next/image';

export default function HeroSlideshow() {
  return (
    <section className="main">
      {/* Main Group Content */}
      <article className="main-group">
        <div className="main-group1">
          <div className="main-title font-['F1Title']">
            <h1>Welcome to</h1>
            <h1>Motoring Community!</h1>
          </div>
          <div className="main-devices">
            <img src="/images/Devices.png" alt="Devices Images" />
          </div>
        </div>
        <div className="main-group2 font-['F1Regular']">
          <h1>"The home of all the race fans, where we can meet together."</h1>
        </div>
      </article>

      {/* Slider Background */}
      <article className="slider">
        <ul className="slideshow">
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
        </ul>
      </article>
    </section>
  );
}
