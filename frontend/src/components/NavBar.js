import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "./logo.jpg"; // Update the path to your logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#8e0000] h-20 flex items-center justify-between px-4 shadow-lg z-50 transition-all duration-500 ease-in-out">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-36 h-auto rounded-lg hover:opacity-90 transition-opacity duration-300 ease-in-out transform hover:scale-105"
        />
      </div>

      {/* Burger Menu Icon for Mobile View */}
      <FaBars
        onClick={toggleNavbar}
        className={`text-white cursor-pointer lg:hidden transition-transform duration-300 ease-in-out transform ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
        size={28}
      />

      {/* Navigation Links */}
      <nav
        className={`lg:flex lg:items-center lg:space-x-8 ${
          isOpen ? "block" : "hidden"
        } w-full lg:w-auto text-white`}
      >
        <NavLink
          to="/menu"
          className="block py-2 px-4 text-white font-medium hover:bg-gray-500 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Menu
        </NavLink>
        <NavLink
          to="/my-orders"
          className="block py-2 px-4 text-white font-medium hover:bg-gray-500 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Orders
        </NavLink>
        <NavLink
          to="/cart"
          className="block py-2 px-4 text-white font-medium hover:bg-gray-500 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Cart
        </NavLink>
        <NavLink
          to="/admin"
          className="block py-2 px-4 text-white font-medium hover:bg-gray-500 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Admin
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
