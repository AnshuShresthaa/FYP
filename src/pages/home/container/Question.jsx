import React, { useState } from 'react';

const QuestionItem = ({ question, onClick, isActive, details }) => (
  <div className="items-stretch border-t-[color:var(--white,#FFF)] border-b-[color:var(--white,#FFF)] bg-teal-600 flex justify-between gap-5 px-9 py-9 border-t border-solid border-b max-md:max-w-full max-md:flex-wrap max-md:px-5 cursor-pointer ${
    isActive ? 'bg-opacity' : ''
  }" 
  onClick={onClick}
  >
    <div className="text-white text-3xl font-bold grow my-auto max-md:max-w-full">
      {question}
      {isActive && <div className="mt-6 text-lg max-md:text-xl">{details}</div>}
    </div>
  </div>
);

const Question = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const questions = [
      {
        question: "What exactly is 'mental health'?",
        details: (
          <>
            <p className="text-lg max-md:text-xl">
              Mental health is a broad spectrum that encompasses our emotional, psychological, and social well-being. It's not just the absence of mental illness, but rather a continuum ranging from optimal mental wellness to experiencing challenges or conditions like depression or anxiety. Our position on this spectrum is influenced by a variety of factors, including both controllable aspects such as self-care practices and support networks, as well as uncontrollable factors like genetics and upbringing.
            </p>
            <p className="text-lg max-md:text-xl">
              When our mental health is robust, it empowers us to thrive in our daily lives. However, during times of struggle, it's essential to seek out self-care practices, coping mechanisms, and professional support.
            </p>
          </>
        ),
      },
      {
        question: 'What are the common signs and symptoms of mental health disorders?',
        details: (
          <>
            <p className="text-lg max-md:text-xl">
            Recognizing the signs and symptoms of mental health disorders is crucial for early intervention and treatment. These can vary widely depending on the specific disorder but may include changes in mood, behavior, or thought patterns. Common signs may include persistent feelings of sadness or anxiety, changes in sleep or appetite, difficulty concentrating, and withdrawal from social activities.
            </p>
            <p className="text-lg max-md:text-xl">
            Physical symptoms such as headaches or digestive issues may also manifest alongside psychological symptoms. It's essential to seek professional help if experiencing these symptoms to receive appropriate support and treatment.
            </p>
          </>
        ),
      },
      {
        question: 'How does stress impact mental health?',
        details: (
          <>
            <p className="text-lg max-md:text-xl">
            Stress is a natural response to challenging situations, but prolonged or excessive stress can have detrimental effects on mental health. Chronic stress can contribute to the development or exacerbation of various mental health conditions, including anxiety disorders and depression.
            </p>
            <p className="text-lg max-md:text-xl">
            It can also impair cognitive function, affect mood regulation, and disrupt sleep patterns. Learning effective stress management techniques, such as mindfulness, relaxation exercises, and time management, is crucial for protecting and maintaining mental well-being.
            </p>
          </>
        ),
      },
      {
        question: 'What role does nutrition and diet play in mental health?',
        details: (
          <>
            <p className="text-lg max-md:text-xl">
            Nutrition and diet play a significant role in mental health, influencing mood, cognition, and overall well-being. Consuming a balanced diet rich in nutrients, vitamins, and minerals supports optimal brain function and neurotransmitter production. Certain foods, such as those high in omega-3 fatty acids, antioxidants, and complex carbohydrates, have been linked to improved mental health outcomes. 
            </p>
            <p className="text-lg max-md:text-xl">
            Conversely, diets high in processed foods, sugar, and unhealthy fats may contribute to inflammation and negatively impact mood and cognitive function. Adopting healthy eating habits can promote better mental health and overall wellness.
            </p>
          </>
        ),
      },
      {
        question: 'How can mindfulness and meditation benefit mental health?',
        details: (
          <>
            <p className="text-lg max-md:text-xl">
            Mindfulness and meditation practices offer valuable tools for enhancing mental well-being and coping with stress and anxiety. By cultivating present-moment awareness and acceptance, mindfulness techniques help individuals regulate their emotions, reduce rumination, and enhance resilience.
            </p>
            <p className="text-lg max-md:text-xl">
            Meditation practices, such as focused breathing or body scans, promote relaxation, improve concentration, and foster a sense of inner calm. Research suggests that regular mindfulness and meditation practice can reduce symptoms of depression, anxiety, and PTSD, as well as enhance overall psychological well-being.
            </p>
          </>
        ),
      },
    ];

  return (
    <div className="bg-teal-600 flex w-full flex-col items-stretch mt-28 px-10 py-12 max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="text-white text-5xl font-bold self-center mt-26 max-md:max-w-full max-md:text-4xl max-md:mt-10">
        Common Questions
      </div>
      <div className="text-white text-center text-2xl self-center mt-9 mb-8 max-md:max-w-full">
        Curiosity makes a man intelligent. Find the most asked questions related
        to mental health answered below.
      </div>
      <div className="mt-8">
        {questions.map((q, index) => (
          <React.Fragment key={index}>
            <QuestionItem
              question={q.question}
              details={q.details}
              isActive={activeQuestion === index}
              onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
            />
            {index < questions.length - 1}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Question;
