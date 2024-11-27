"use client";
import React from "react";
 // Import the Navbar component
import Header from "@/app/modules/auth/Header";
import Footer from "../auth/HeaderAndFooter/Footer";
import Navbar from "./sidebar/sidebar";
import Chatbot from "@/app/chatbot/page";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen   text-gray-800 " style={{marginTop:"10em"}}>
      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-grow">
        <main className="flex-grow p-1 mt-2">
          <div className="max-w-screen  mx-auto sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    <Chatbot/>
      {/* Footer */}
      

      {/* Custom Styling */}
      <style jsx>{`
        main {
          border-radius: 1rem;
        }

        nav:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
