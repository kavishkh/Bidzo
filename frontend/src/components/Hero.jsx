import React from 'react';
import BackgroundVideo from './BackgroundVideo';
import Navbar from './Navbar';
import HeroContent from './HeroContent';

const Hero = ({ onNavigate }) => {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Bidzo — Bidding Platform hero"
    >
      <BackgroundVideo />
      <div className="relative z-10 flex h-full flex-col">
        <Navbar onNavigate={onNavigate} />
        <HeroContent />
      </div>
    </section>
  );
};

export default Hero;
