import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../../Pages/Homepage/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";


const HomeSection = ({data , sectionName}) => {
  const responsive = {
    0: { items: 1 }, 
    640: { items: 2 }, 
    1024: { items: 3 }, 
    1280: { items: 4 },
  };

  const carouselRef = useRef(null); 

  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const syncActiveIndex = (e) => {
    setActiveIndex(e.item); // Synchronize activeIndex with carousel's active item
  };

  // Generating items for the carousel
  const items = data.slice(0, 10).map((product, index) => (
    <div key={index} className="px-2">
      {/* Passing the product data to HomeSectionCard */}
      <HomeSectionCard product={product} />
    </div>
  ));

  return (
    <div className="relative px-4 lg:px-8">
      <h2 className="text-2xl font-medium italic">
        {sectionName}
      </h2>

      <div className="relative p-5 border border-slate-400">
        {/* AliceCarousel Component */}
        <AliceCarousel
          ref={carouselRef}
          mouseTracking
          items={items}
          autoPlay
          autoPlayInterval={1000}
          disableButtonsControls
          disableDotsControls
          infinite={false} // Disable infinite for proper index management
          responsive={responsive}
          controlsStrategy="alternate"
          onSlideChanged={syncActiveIndex} // Synchronize index on slide change
        />

        {/* Custom Navigation Buttons */}
        {activeIndex < items.length - responsive[1280].items && (
          <button
            onClick={slideNext}
            className="absolute top-1/2 right-0 bg-white rounded-full shadow-lg transform translate-x-1/2 -translate-y-1/2 rotate-90 z-50 p-2 hover:bg-gray-100"
            aria-label="next"
          >
            <KeyboardArrowLeftIcon className=" transform rotate-90" />
          </button>
        )}
        {activeIndex > 0 && (
          <button
            onClick={slidePrev}
            className="absolute top-1/2 left-0 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 rotate-0 z-50 p-2 hover:bg-gray-100"
            aria-label="prev"
          >
            <KeyboardArrowLeftIcon className=" transform rotate-0" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
