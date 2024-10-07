import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeCarouselData from './MainCaroselData'; // Adjust path if needed
const MainCarousel = () => {
  // Generate items for the carousel
  const items = HomeCarouselData.map((item, index) => (
    <img
      key={index}
       className='cursor-pointer  w-full h-full object-cover object-top sm:h-[80vh] lg:h-[86vh] lg:object-fill'
      role='presentation'
      src={item.image}
      alt={`Carousel item ${index}`}
    />
  ));

  return (
    <AliceCarousel
    className='setting-images'
      mouseTracking
      items={items}
      controlsStrategy="alternate"
      disableButtonsControls
      autoPlay
      autoPlayInterval={1000}
      infinite
    />
  );
};

export default MainCarousel;
