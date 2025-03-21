import React, { useState, useEffect } from "react";
import { api } from "../../config/apiConfig";

const BannersPage = () => {
  const [banners, setBanners] = useState([]);

  // Fetch existing banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get("/banners");
        setBanners(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setBanners([]);
      }
    };
    fetchBanners();
  }, []);

  // Handle file selection and upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (banners.length >= 5) {
      alert("You can only upload up to 5 banners.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        // Create a consistent naming pattern for images
        const imageNumber = banners.length + 1;
        const response = await api.post("/upload", {
          image: base64Image,
          imageName: `image ${imageNumber}`,
        });
        setBanners((prevBanners) => [...prevBanners, response.data.banner]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };
  };

  // Handle banner deletion
  const handleDelete = async (id) => {
    try {
      await api.delete(`/banners/${id}`);
      // After deletion, refetch banners to maintain correct image numbering
      const response = await api.get("/banners");
      setBanners(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to delete banner:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-700">Banner Management</h1>
      <p className="text-gray-500 mt-2">Manage your website banners here.</p>

      {/* Upload Button */}
      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={banners.length >= 5}
          className="hidden"
          id="bannerUpload"
        />
        <label
          htmlFor="bannerUpload"
          className={`px-4 py-2 bg-blue-600 text-white rounded cursor-pointer ${
            banners.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Select Banner
        </label>
        <span className="ml-4 text-gray-500">
          {banners.length}/5 banners uploaded
        </span>
      </div>

      {/* Banners Preview */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <div
              key={banner._id}
              className="relative w-full h-40 border rounded"
            >
              <img
                src={banner.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded">
                Image {index + 1}
              </div>
              <button
                onClick={() => handleDelete(banner._id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3">No banners uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default BannersPage;
