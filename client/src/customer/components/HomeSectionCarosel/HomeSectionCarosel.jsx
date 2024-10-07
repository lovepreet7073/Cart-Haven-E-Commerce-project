import React, { useState, useRef } from 'react';
import HomeCard from '../HomeSectionCard/HomeCard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const HomeSectionCarousel = ({ data,sectionName }) => {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1, gutter: 16 },
        720: { items: 3, gutter: 24 },
        1024: { items: 5, gutter: 30 },
    };

    const slidePrev = () => {
        carouselRef.current.slidePrev();
    };
    const slideNext = () => {
        carouselRef.current.slideNext();
    };
    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = data.slice(0, 10).map((item) => <HomeCard product={item} />)

    return (
        <div className='px-4 lg:px-8'>
            <h2 className='text-2xl font-bold text-gray-800 py-5'>{sectionName}</h2>
            <div className='relative p-5 border'>
                <AliceCarousel
                    ref={carouselRef} // Assign the carousel ref
                    mouseTracking
                    items={items}
                    responsive={responsive}
                    disableButtonsControls
                    disableDotsControls
                    onSlideChanged={syncActiveIndex}
                    activeIndex={activeIndex}
                />
                {activeIndex !== items.length - 5 &&
                    <Button
                        onClick={slideNext}
                        variant='contained'
                        className='z-50 bg-white'
                        sx={{
                            position: "absolute",
                            top: "8rem",
                            right: "0rem",
                            transform: "translateX(50%) rotate(90deg)",
                            bgcolor: "white"
                        }}
                        aria-label='next'>
                        <KeyboardArrowLeftIcon sx={{
                            transform: "rotate(90deg)", color: "#38a3a5"
                        }} />
                    </Button>
                }
                {activeIndex !== 0 &&
                    <Button
                        onClick={slidePrev}
                        variant='contained'
                        className='z-50 bg-white'
                        sx={{
                            position: "absolute",
                            top: "8rem",
                            left: "0rem",
                            transform: "translateX(-50%) rotate(-90deg)",
                            bgcolor: "white"
                        }}
                        aria-label='prev'>
                        <KeyboardArrowLeftIcon sx={{
                            transform: "rotate(90deg)", color: "#38a3a5"
                        }} />
                    </Button>}
            </div>
        </div>
    );
};

export default HomeSectionCarousel;
