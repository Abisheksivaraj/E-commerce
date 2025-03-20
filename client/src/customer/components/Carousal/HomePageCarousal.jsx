import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import mens from "../../../assets/HomeCarousal/menswear.jpg";
import womens from "../../../assets/HomeCarousal/womens.jpg";
import shoe from "../../../assets/HomeCarousal/shoe.jpg";
import gadgets from "../../../assets/HomeCarousal/gadjets.png";

const items = [
  <div className="item" data-value="1" key="1">
    <img
      src={mens}
      alt="Menswear"
      className="w-full h-auto object-cover aspect-[16/9] md:aspect-[21/9]"
      loading="lazy"
      draggable="false"
    />
  </div>,
  <div className="item" data-value="2" key="2">
    <img
      src={womens}
      alt="Womenswear"
      className="w-full h-auto object-cover aspect-[16/9] md:aspect-[21/9]"
      loading="lazy"
      draggable="false"
    />
  </div>,
  <div className="item" data-value="3" key="3">
    <img
      src={shoe}
      alt="Shoes"
      className="w-full h-auto object-cover aspect-[16/9] md:aspect-[21/9]"
      loading="lazy"
      draggable="false"
    />
  </div>,
  <div className="item" data-value="4" key="4">
    <img
      src={gadgets}
      alt="Gadgets"
      className="w-full h-auto object-cover aspect-[16/9] md:aspect-[21/9]"
      loading="lazy"
      draggable="false"
    />
  </div>,
];

const HomePageCarousel = () => (
  <div className="relative px-4 lg:px-8">
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay
      autoPlayInterval={2000}
      infinite
      disableButtonsControls
      animationType="fade"
      responsive={{
        0: { items: 1 },
        768: { items: 1 },
        1024: { items: 1 },
      }}
    />
  </div>
);

export default HomePageCarousel;
