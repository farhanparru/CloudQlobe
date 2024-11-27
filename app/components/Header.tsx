"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  Globe,
  LogOut,
  LayoutDashboard,
  UserPlus,
  LogIn
} from "lucide-react";

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleLanguageDropdown = () => setLanguageDropdownOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
    if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
      setLanguageDropdownOpen(false);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setLanguageDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItemClasses = "text-white hover:text-orange-500 px-3 py-1 border border-transparent  hover:scale-110 transition-all duration-200";
  const buttonBaseClasses = "flex items-center space-x-4 px-6 py-2 text-white rounded-md transition-all duration-200 hover:scale-110 hover:space-x-6";

  return (
    <nav className="flex justify-between items-center p-0 bg-[#323F3F] shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      {/* Left Section */}
      <div className="flex items-center" style ={{marginLeft:"1em"}}>
        <Link href="/" className="block p-0  hover:scale-110 transition-all duration-200">
          <Image
            src="/images/logohh.svg"
            alt="Cloudqlobe"
            width={32}
            height={32}
            className="h-16 w-48"
          />
        </Link>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-1">
        <div className="hidden md:flex items-center space-x-0" style={{marginRight:"1em"}}>
          <Link href="/" className={navItemClasses}>
            <span>Home</span>
          </Link>
          <Link href="/about" className={navItemClasses}>
            <span>About</span>
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={navItemClasses + " flex items-center"}
            >
              <span>Services</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <Link href="/services/CC-Routes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  CC Routes
                </Link>
                <Link href="/services/CLI-Voice-Termination" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  CLI Voice Termination
                </Link>
                <Link href="/services/DID-Voice-Solutions" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  DID Voice Solutions
                </Link>
              </div>
            )}
          </div>
          <Link href="/contacts" className={navItemClasses}>
            <span>Contact</span>
          </Link>
          <Link href="/pricing" className={navItemClasses}>
            <span>Rates</span>
          </Link>
          <Link href="/faq" className={navItemClasses}>
            <span>FAQ</span>
          </Link>
        </div>
        <div className="relative" ref={languageRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center text-white hover:text-orange-500 px-8 py-1 border border-gray-400 hover:border-orange-500 bg-transparent rounded-md hover:scale-110 transition-all duration-200"
          >
            <Globe size={20} className="mr-2" />
            {selectedLanguage}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {["English", "German", "Spanish", "French", "Italian", "Chinese", "Japanese"].map(
                (language) => (
                  <button
                    key={language}
                    onClick={() => handleLanguageChange(language)}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-transform duration-200 text-left"
                  >
                    {language}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3"  style ={{marginRight:"1em"}}>
        {isLoggedIn ? (
          <>
            <Link href="https://www.cloudqlobe.com/modules/customer/pages/home">
              <button className={`${buttonBaseClasses} bg-blue-600 hover:bg-blue-700`}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className={`${buttonBaseClasses} bg-red-600 hover:bg-red-700`}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link href="https://www.cloudqlobe.com/modules/auth/Base/Signup">
              <button className={`${buttonBaseClasses} bg-green-600 hover:bg-green-700`}>
                <UserPlus size={18} />
                <span>SIGN UP</span>
              </button>
            </Link>
            <Link href="https://www.cloudqlobe.com/modules/auth/Base/login">
              <button className={`${buttonBaseClasses} bg-orange-400 hover:bg-orange-500`}>
                <LogIn size={18} />
                <span>LOGIN</span>
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;