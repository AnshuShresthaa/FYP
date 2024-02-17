import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero';
import Mood from './container/Mood';
import Articles from './container/Articles';
import Question from './container/Question';
import CTA from "./container/CTA";

const HomePage = () => {
  return (
  <MainLayout>
    <Hero />
    <Mood />
    <Articles />
    <Question />
    <CTA />
  </MainLayout>
  );
};

export default HomePage;