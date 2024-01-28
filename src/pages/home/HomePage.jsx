import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero';
import Mood from './container/Mood';
import Articles from './container/Articles';
import Question from './container/Question';

const HomePage = () => {
  return (
  <MainLayout>
    <Hero />
    <Mood />
    <Articles />
    <Question />
  </MainLayout>
  );
};

export default HomePage;