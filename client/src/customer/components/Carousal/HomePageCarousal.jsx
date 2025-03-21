import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
// Import your static images
import mens from "../../../assets/HomeCarousal/menswear.jpg";
import womens from "../../../assets/HomeCarousal/womens.jpg";
import shoe from "../../../assets/HomeCarousal/shoe.jpg";
import gadgets from "../../../assets/HomeCarousal/gadjets.png";

const HomePageCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Use the full URL to your backend API
        const response = await axios.get("http://localhost:2288/banners");
        console.log("Banner response:", response.data);

        if (Array.isArray(response.data)) {
          // Notice we're now handling both image and imageUrl properties
          const processedBanners = response.data.map((banner) => ({
            ...banner,
            // Ensure we have a consistent image property
            image: banner.image || banner.imageUrl,
          }));
          setBanners(processedBanners);
        } else {
          // Fallback to static images if API fails
          const staticBanners = [
            { image: mens, name: "Menswear" },
            { image: womens, name: "Womenswear" },
            { image: shoe, name: "Shoes" },
            { image: gadgets, name: "Gadgets" },
          ];
          setBanners(staticBanners);
          console.log("Using static banners as fallback");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);

        // Fallback to static banners on error
        const staticBanners = [
          { image: mens, name: "Menswear" },
          { image: womens, name: "Womenswear" },
          { image: shoe, name: "Shoes" },
          { image: gadgets, name: "Gadgets" },
        ];
        setBanners(staticBanners);
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const items = banners.map((banner, index) => (
    <div
      className="carousel-item relative h-screen w-full"
      data-value={index + 1}
      key={index}
    >
      <img
        src={banner.image}
        alt={banner.name}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable="false"
      />
    </div>
  ));

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (banners.length === 0)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        No banners available
      </div>
    );

  return (
    <div className="w-full h-screen overflow-hidden">
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        autoPlayInterval={2000}
        infinite
        disableDotsControls
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
};

export default HomePageCarousel;
