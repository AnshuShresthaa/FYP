import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [breathingText, setBreathingText] = useState('Breathe In');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBreathingText((prevText) => (prevText === 'Breathe In' ? 'Breathe Out' : 'Breathe In'));
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gray-200 p-4 md:p-12 pb-12 md:pb-48">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <div>
          <h1 className="text-5xl md:text-8xl font-bold mb-4 ml-4">
            We all have<br />mental health
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl text-gray-700 ml-4">
            Our emotional health can range from <br /> thriving to struggling. No matter what <br /> you’re experiencing, there are ways
            to <br /> take action to support yourself and <br /> those around you.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-8">
      <div className="breathing-container relative w-60 md:w-96 h-60 md:h-96">
          <div className="circle absolute w-full h-full rounded-full bg-pink-200 animate-breathe"></div>
          <div className={`text absolute w-full h-full flex items-center justify-center font-bold text-red-800 text-xl md:text-3xl lg:text-4xl animate-fade`}>
            {breathingText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
