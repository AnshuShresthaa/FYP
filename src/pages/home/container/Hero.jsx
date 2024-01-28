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
    <section className="flex items-start justify-between h-full  bg-gray-200 p-12 pb-48">
      <div className="w-1/2">
        <div>
          <h1 className="text-8xl font-bold mb-4">
            We all have<br />mental health
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700">
            Our emotional health can range from <br/> thriving to struggling. No matter what <br /> you’re experiencing, there are ways
            to <br /> take action to support yourself and <br />  those around you.
          </p>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center mt-16"> 
        <div className="breathing-container relative w-80 h-80">
          <div className="circle absolute w-full h-full rounded-full bg-pink-200 animate-breathe"></div>
          <div className={`text absolute w-full h-full flex items-center justify-center font-bold text-red-800 text-lg md:text-xl lg:text-2xl animate-fade`}>
            {breathingText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
