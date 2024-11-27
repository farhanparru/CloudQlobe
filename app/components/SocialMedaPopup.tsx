"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn, FaSkype, FaTelegramPlane } from 'react-icons/fa'; // Make sure to import the new icons
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi'; // Import arrow icons

// Define the SocialMediaItem type
type SocialMediaItem = {
  name: string;
  icon: React.ElementType;
  color: string;
  hoverWidth: string;
  link: string;
};

const socialMediaData: SocialMediaItem[] = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    color: "#4267B2",

    link: "https://www.facebook.com/cloudqlobe",
    hoverWidth: ''
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "#25D366",

    link: "https://wa.me/9876543210",
    hoverWidth: ''
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    color: "#0077B5",

    link: "https://www.linkedin.com/cloud-qlobe",
    hoverWidth: ''
  },
  {
    name: "Skype",
    icon: FaSkype,
    color: "#00AFF0",

    link: "https://www.skype.com/cloudqlobe",
    hoverWidth: ''
  },
  {
    name: "Telegram",
    icon: FaTelegramPlane,
    color: "#0088cc",

    link: "https://telegram.org",
    hoverWidth: ''
  },
];

const SocialMediaTabs = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 rounded-lg p-4">
      <button 
        onClick={toggleMinimize} 
        className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
        style={{ backgroundColor: 'lightgray' }} // Optional: Style for button
      >
        {isMinimized ? <HiArrowRight size={24} /> : <HiArrowLeft size={24} />}
      </button>
      {!isMinimized && (
        <div className="flex flex-col space-y-4">
          {socialMediaData.map((item) => (
            <Link key={item.name} href={item.link} passHref>
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-full transition-transform transform hover:translate-x-2 hover:-translate-y-1" 
                style={{ backgroundColor: item.color, width: item.hoverWidth }}
              >
                <item.icon color="white" size={24} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialMediaTabs;
