import React from 'react';
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children, showHeader = true }) => {
  return (
    <div>
      {showHeader && <Header />}
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

