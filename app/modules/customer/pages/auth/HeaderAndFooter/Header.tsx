"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search submit logic (e.g., redirect or fetch search results)
    console.log("Search query:", searchQuery);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-[#323F3F] shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      <Link href="/" className="block">
        <Image
          src="/images/logo.png"
          alt="CloudGlobe"
          width={32} // Specify the width of the image
          height={32} // Specify the height of the image
          className="h-8 w-auto"
        />
      </Link>

      <div className="flex items-center space-x-6 ml-4">
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-orange-500">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-orange-500">
            About
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white hover:text-orange-500"
            >
              Services
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <Link
                  href="/services/CC-Routes"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  CC Routes
                </Link>
                <Link
                  href="/services/CLI-Voice-Termination"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  CLI Voice Termination
                </Link>
                <Link
                  href="/services/DID-Voice-Solutions"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  DID Voice Solutions
                </Link>
              </div>
            )}
          </div>
          <Link href="/contacts" className="text-white hover:text-orange-500">
            Contact
          </Link>
          <Link href="/pricing" className="text-white hover:text-orange-500">
            Rates
          </Link>
          <Link href="/faq" className="text-white hover:text-orange-500">
            FAQ
          </Link>
        </div>

        {/* Search Bar without Button */}
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
              opacity: 0.3, // Reduced opacity for input field
            }}
          />
        </form>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#323F3F] shadow-lg z-10">
          <Link
            href="/"
            className="block px-4 py-2 text-white hover:bg-orange-500"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 text-white hover:bg-orange-500"
          >
            About
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full px-4 py-2 text-left text-white hover:bg-orange-500"
            >
              Services
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="pl-4">
                <Link
                  href="/services/CC-Routes"
                  className="block px-4 py-2 text-gray-200 hover:bg-orange-500"
                >
                  CC Routes
                </Link>
                <Link
                  href="/services/CLI-Voice-Termination"
                  className="block px-4 py-2 text-gray-200 hover:bg-orange-500"
                >
                  CLI Voice Termination
                </Link>
                <Link
                  href="/services/DID-Voice-Solutions"
                  className="block px-4 py-2 text-gray-200 hover:bg-orange-500"
                >
                  DID Voice Solutions
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/contacts"
            className="block px-4 py-2 text-white hover:bg-orange-500"
          >
            Contact
          </Link>
          <Link
            href="/pricing"
            className="block px-4 py-2 text-white hover:bg-orange-500"
          >
            Rates
          </Link>
          <Link
            href="/faq"
            className="block px-4 py-2 text-white hover:bg-orange-500"
          >
            FAQ
          </Link>
          <Link href="/auth/signup">
            <button className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md">
              SIGN UP
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="w-full px-4 py-2 text-white bg-orange-400 hover:bg-gray-500 rounded-md">
              LOGIN
            </button>
          </Link>
        </div>
      )}

      {/* Sign Up and Login buttons (for larger screens) */}
      <div className="hidden md:flex items-center space-x-2">
        <Link href="/auth/signup">
          <button className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md">
            SIGN UP
          </button>
        </Link>
        <Link href="/auth/login">
          <button className="px-4 py-2 text-white bg-orange-400 hover:bg-orange-500 rounded-md">
            LOGIN
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
