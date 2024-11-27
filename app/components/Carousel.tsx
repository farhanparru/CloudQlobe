"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Carousel: React.FC = () => {
  const images = [
    "/images/carousel_image.png",
    "/images/c4.png",
    "/images/c3.png",
    "/images/c5.png",
    "/images/c2.png",
    "/images/c1.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full mt-8 lg:mt-16">
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? "translate-x-0"
                : index < currentIndex
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <div className="relative w-full h-full flex items-start justify-center">
              <Image
                src={src}
                alt={`Carousel Image ${index + 1}`}
                layout="responsive"
                width={1920} // Example: adjust to match your image resolution
                height={1080} // Example: adjust to match your image resolution
                objectFit="contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
