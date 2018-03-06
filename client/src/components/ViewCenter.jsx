import React from 'react';
import Carousel from './Carousel';
import SearchBar from './SearchBar';
import CenterCards from './CenterCards';
import Footer from './Footer';

const ViewCeneter = () => {
  return (
    <div>
      <Carousel />
      <SearchBar />
      <CenterCards />
      <Footer />
    </div>
  );
};

export default ViewCeneter;
