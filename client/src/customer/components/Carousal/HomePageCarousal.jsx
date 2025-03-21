import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
// Import your static images
import mens from "../../../assets/HomeCarousal/menswear.jpg";
import womens from "../../../assets/HomeCarousal/womens.jpg";
import shoe from "../../../assets/HomeCarousal/shoe.jpg";
import gadgets from "../../../assets/HomeCarousal/gadjets.png";

// Use an environment variable or relative URL instead of hardcoded localhost
const API_BASE_URL = "https://e-commerce-server-oj8e.onrender.com" || "/api"; // Fallback to relative path

const HomePageCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Use the configurable base URL instead of hardcoded localhost
        const response = await axios.get(`${API_BASE_URL}/banners`);
        console.log("Banner response:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          // Notice we're now handling both image and imageUrl properties
          const processedBanners = response.data.map((banner) => ({
            ...banner,
            // Ensure we have a consistent image property
            image: banner.image || banner.imageUrl,
          }));
          setBanners(processedBanners);
        } else {
          // Fallback to static images if API returns empty array
          console.log(
            "API returned empty array, using static banners as fallback"
          );
          const staticBanners = getStaticBanners();
          setBanners(staticBanners);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
        console.log("Network error, using static banners as fallback");

        // Fallback to static banners on error
        const staticBanners = getStaticBanners();
        setBanners(staticBanners);
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const getStaticBanners = () => {
    return [
      { image: mens, name: "Menswear" },
      { image: womens, name: "Womenswear" },
      { image: shoe, name: "Shoes" },
      { image: gadgets, name: "Gadgets" },
    ];
  };

  // Determine carousel height based on screen size
  const getCarouselHeight = () => {
    if (windowWidth < 640) {
      return "h-64"; // Small screens
    } else if (windowWidth < 1024) {
      return "h-96"; // Medium screens
    } else {
      return "h-screen"; // Large screens
    }
  };

  const items = banners.map((banner, index) => (
    <div
      className={`carousel-item relative w-full ${getCarouselHeight()}`}
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
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 md:p-8">
        {/* <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold">
          {banner.name}
        </h2> */}
        {banner.description && (
          <p className="text-white text-sm md:text-base mt-2 max-w-md hidden md:block">
            {banner.description}
          </p>
        )}
      </div>
    </div>
  ));

  // Responsive loading screen
  if (loading) {
    return (
      <div
        className={`w-full ${getCarouselHeight()} flex items-center justify-center bg-gray-100`}
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700">Loading carousel...</p>
        </div>
      </div>
    );
  }

  // Responsive empty state
  if (banners.length === 0) {
    return (
      <div
        className={`w-full ${getCarouselHeight()} flex items-center justify-center bg-gray-100`}
      >
        <div className="text-center p-4">
          <p className="text-xl text-gray-700">No banner images available</p>
          <p className="text-sm text-gray-500 mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${getCarouselHeight()} overflow-hidden relative`}>
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        autoPlayInterval={3000}
        infinite
        disableDotsControls={windowWidth < 640}
        disableButtonsControls={windowWidth < 768}
        animationType="fade"
        animationDuration={800}
        responsive={{
          0: { items: 1 },
          640: { items: 1 },
          1024: { items: 1 },
        }}
        renderDotsItem={CustomDot}
      />
    </div>
  );
};

// Custom dot component for better mobile experience
const CustomDot = ({ isActive }) => {
  return (
    <span
      className={`inline-block h-2 w-2 md:h-3 md:w-3 rounded-full mx-1 md:mx-2 transition-all duration-300 ${
        isActive ? "bg-white scale-125" : "bg-white bg-opacity-50"
      }`}
    ></span>
  );
};

export default HomePageCarousel;
