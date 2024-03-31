import React, { useState } from 'react';

const Mood = () => {
  const [activeMood, setActiveMood] = useState(null);

  const moods = [
    { 
      label: 'Angry', 
      opacity: 50, 
      details: (
        <>
          <p className="text-lg max-md:text-xl">
            Feeling angry is a common emotional response to perceived threats, injustices, or frustrations. It often involves heightened arousal, such as increased heart rate and muscle tension. When feeling angry, it's essential to acknowledge and express emotions in healthy ways, such as through assertive communication or constructive outlets like physical activity or creative expression.
          </p>
          <p className="text-lg max-md:text-xl">
            Managing anger involves learning effective coping strategies, such as relaxation techniques, mindfulness practices, and problem-solving skills. Seeking support from trusted individuals or mental health professionals can also provide valuable guidance and perspective.
          </p>
        </>
      )
    },
    { 
      label: 'Anxious', 
      opacity: 60, 
      details: (
        <>
          <p className="text-lg max-md:text-xl">
            Anxiety is characterized by feelings of worry, apprehension, or unease about future events or potential threats. It can manifest both mentally and physically, with symptoms ranging from racing thoughts and difficulty concentrating to trembling and shortness of breath.
          </p>
          <p className="text-lg max-md:text-xl">
            Managing anxiety involves relaxation techniques, mindfulness practices, and seeking support from loved ones or mental health professionals. It's essential to recognize triggers and develop coping strategies to navigate anxiety effectively.
          </p>
        </>
      )
    },
    { 
      label: 'Sad', 
      opacity: 70, 
      details: (
        <>
          <p className="text-lg max-md:text-xl">
            Feeling sad is a natural emotional response to loss, disappointment, or adversity. It involves a range of emotions from mild unhappiness to profound grief.
          </p>
          <p className="text-lg max-md:text-xl">
            When experiencing sadness, it's essential to allow oneself to feel and process emotions while engaging in self-care activities, seeking support from friends and family, and considering professional help if sadness persists or interferes with daily functioning.
          </p>
        </>
      )
    },
    { 
      label: 'Lonely', 
      opacity: 80, 
      details: (
        <>
          <p className="text-lg max-md:text-xl">
            Loneliness is the subjective feeling of isolation or disconnectedness from others, even when surrounded by people. It can arise from various factors, including social isolation, changes in relationships, or life transitions.
          </p>
          <p className="text-lg max-md:text-xl">
            Combatting loneliness involves reaching out to others, fostering meaningful connections, participating in social activities, and cultivating self-awareness and self-compassion.
          </p>
        </>
      )
    },
    { 
      label: 'Stressed', 
      opacity: 90, 
      details: (
        <>
          <p className="text-lg max-md:text-xl">
            Stress is the body's natural response to demands or pressure placed on it. While some stress can be motivating and beneficial, chronic or excessive stress can have adverse effects on mental and physical health.
          </p>
          <p className="text-lg max-md:text-xl">
            Managing stress involves identifying stressors, practicing relaxation techniques, prioritizing self-care, and seeking support when needed to restore balance and well-being.
          </p>
        </>
      )
    },
  ];

  return (
    <div>
      <div className="text-black text-5xl font-bold self-center mt-32 max-md:max-w-full max-md:text-4xl max-md:mt-10 text-center">
        How are you feeling today?
      </div>
      <div className="mt-8 text-4xl mx-4 md:mx-11"> 
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`
              text-white font-bold justify-center mx-2 px-11 py-12 items-start 
              max-md:text-3xl max-w-full max-md:mr-2.5 max-md:px-5 cursor-pointer 
              transition-transform duration-300 transform hover:-translate-y-1
              ${activeMood === mood.label ? `bg-opacity-${mood.opacity}` : ''}
            `}
            onClick={() => setActiveMood(activeMood === mood.label ? null : mood.label)}
            style={{ backgroundColor: `rgba(51, 128, 140, 0.${mood.opacity})` }}
          >
            {mood.label}
            {activeMood === mood.label && (
              <div className="mt-6 text-sm max-md:text-base">{mood.details}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mood;
