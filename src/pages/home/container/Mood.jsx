import React, { useState } from 'react';

const Mood = () => {
  const [activeMood, setActiveMood] = useState(null);

  const moods = [
    { label: 'Angry', opacity: 50, details: 'More details about feeling angry...' },
    { label: 'Anxious', opacity: 60, details: 'More details about feeling anxious...' },
    { label: 'Sad', opacity: 70, details: 'More details about feeling sad...' },
    { label: 'Lonely', opacity: 80, details: 'More details about feeling lonely...' },
    { label: 'Stressed', opacity: 90, details: 'More details about feeling stressed...' },
  ];

  return (
    <div>
      <div className="text-black text-7xl font-bold self-center mt-32 max-md:max-w-full max-md:text-4xl max-md:mt-10 text-center">
        How are you feeling today?
      </div>
      <div className="mt-8 text-3xl"> 
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`
              text-white font-bold justify-center ml-11 mr-9 px-11 py-12 items-start 
              max-md:text-5xl max-w-full max-md:mr-2.5 max-md:px-5 cursor-pointer 
              transition-transform duration-300 transform hover:-translate-y-1
              ${activeMood === mood.label ? `bg-opacity-${mood.opacity}` : ''}
            `}
            onClick={() => setActiveMood(activeMood === mood.label ? null : mood.label)}
            style={{ backgroundColor: `rgba(51, 128, 140, 0.${mood.opacity})` }}
          >
            {mood.label}
            {activeMood === mood.label && (
              <div className="mt-2 text-sm max-md:text-base">{mood.details}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mood;
