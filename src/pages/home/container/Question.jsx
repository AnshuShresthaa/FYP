import React, { useState } from 'react';

const QuestionItem = ({ question, onClick, isActive, details }) => (
  <div className="items-stretch border-t-[color:var(--white,#FFF)] border-b-[color:var(--white,#FFF)] bg-teal-600 flex justify-between gap-5 px-9 py-9 border-t border-solid border-b max-md:max-w-full max-md:flex-wrap max-md:px-5 cursor-pointer ${
    isActive ? 'bg-opacity' : ''
  }" 
  onClick={onClick}
  >
    <div className="text-white text-3xl font-bold grow my-auto max-md:max-w-full">
      {question}
      {isActive && <div className="mt-2 text-sm max-md:text-base">{details}</div>}
    </div>
  </div>
);

const Question = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const questions = [
      {
        question: "What exactly is 'mental health'?",
        details: 'More details about mental health...',
      },
      {
        question: 'What happens when a mental health problem is not addressed?',
        details: 'More details about addressing mental health problems...',
      },
      {
        question: 'How can we maintain and improve our mental health?',
        details: 'More details about maintaining mental health...',
      },
      {
        question: 'When should we reach out for help?',
        details: 'More details about seeking help...',
      },
      {
        question: 'How to help a friend who is struggling with a mental health issue?',
        details: 'More details about helping friends with mental health issues...',
      },
    ];

  return (
    <div className="bg-teal-600 flex w-full flex-col items-stretch mt-28 px-10 py-12 max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="text-white text-7xl font-bold self-center mt-26 max-md:max-w-full max-md:text-4xl max-md:mt-10">
        Common Questions
      </div>
      <div className="text-white text-center text-3xl self-center mt-9 mb-16 max-md:max-w-full">
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
