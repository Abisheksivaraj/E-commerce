import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-gray-400">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Track Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Shipping Info
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-gray-400">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Best Sellers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Sale
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Gift Cards
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="bg-gray-700 text-center py-4 mt-8">
        <p className="text-sm">
          &copy; 2024 Your Company Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
