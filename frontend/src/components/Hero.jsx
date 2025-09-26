import React from 'react';
import farmingVideo from '/Bg_Video.mp4'; 

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white font-poppins overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-screen object-cover z-0"
        src={farmingVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

     
      <div className="absolute top-0 left-0 w-full h-screen bg-black/80 bg-opacity-90 z-10"></div>

      <div className="relative z-20 max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-green-400">Smart Farming with AI</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-primary-green mb-4">Your Digital Farming Assistant</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-100">
          Get AI-powered crop disease detection, soil health analysis, irrigation advice, and
          market trends - All in one platform.
        </p>
        <button className="bg-green-950 text-primary-green font-semibold py-3 px-8 rounded-full border-2 border-white hover:bg-transparent hover:text-green-400 transition-all duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;