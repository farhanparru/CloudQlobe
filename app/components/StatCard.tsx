"use client";

import { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface StatCardProps {
  title: string;
  value: string;
  color: string;
  percentage: number;
  icon: string;
}

const StatCard = ({ title, value, color, percentage, icon }: StatCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentCardRef = cardRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCurrentPercentage((prev) => {
          if (prev < percentage) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 20);

      return () => clearInterval(timer);
    }
  }, [isVisible, percentage]);

  return (
    <div className="flex flex-col items-center space-y-4" ref={cardRef}>
      <div className="text-center">
        <h2 className="text-4xl font-bold" style={{ color }}>
          {value}
        </h2>
        <p className="text-gray-600">{title}</p>
      </div>

      <div className="relative w-32 h-32">
        <CircularProgressbar
          value={currentPercentage}
          
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: "#e6e6e6",
            strokeLinecap: 'round',
          })}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl" style={{ color }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
