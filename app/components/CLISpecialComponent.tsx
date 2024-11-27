"use client";
import React, { useState } from "react";
import Ticker from "./TickerCli";
import FreeTestPopup from "./FreeTestEnquiry";
import EnquiryPopup from "./Enquiry";
import Chatbot from '../chatbot/page'
const CliVoiceTerminationSpecialComponent: React.FC = () => {
  const [popupType, setPopupType] = useState<"freeTest" | "enquiry" | "chatInfo" | null>(null);

  const handleFreeTestClick = () => {
    setPopupType("freeTest");
  };

  const handleEnquiryClick = () => {
    setPopupType("enquiry");
  };

  const handleChatClick = () => {
    setPopupType("chatInfo");
  };

  const handleClosePopup = () => {
    setPopupType(null);
  };

  return (
    <div className="min-h-[400px] w-full bg-gradient-to-br from-[#323F3F] to-[#83A5A5] flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-semibold text-white mb-12 mt-12">
        CLI Voice Termination
      </h1>

      <div className="flex flex-wrap justify-center gap-16 mb-12">
        <button
          onClick={handleFreeTestClick}
          className="px-12 py-2 bg-[#E78D44] hover:bg-[#d17c33] text-white rounded-md transition-colors duration-300 font-medium"
        >
          FREE TEST
        </button>

        <button
          onClick={handleEnquiryClick}
          className="px-12 py-2 bg-[#4DA0E4] hover:bg-[#3c8fd3] text-white rounded-md transition-colors duration-300 font-medium"
        >
          ENQUIRY
        </button>

     
      </div>

      <Ticker />

      {/* Conditional rendering of Popups */}
      {popupType === "freeTest" && <FreeTestPopup onClose={handleClosePopup} />}
      {popupType === "enquiry" && <EnquiryPopup onClose={handleClosePopup} />}

      {/* Chat Information Popup */}
      {popupType === "chatInfo" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md relative flex flex-col items-center">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            >
              X
            </button>
            <p className="text-lg font-semibold mb-4 text-center">
              Check the bottom right corner for the chat option!
            </p>
            <div className="flex items-center">
             
            </div>
            <Chatbot/>
            <button
              onClick={handleClosePopup}
              className="mt-6 w-full bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CliVoiceTerminationSpecialComponent;
