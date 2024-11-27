"use client";

import React from "react";
import Image from "next/image"; // Import the Image component from Next.js
import FAQ from "../components/FAQ";
import CustomizedQuotesForm from "../components/DIDQuotation";
import Header from "../components/Header";
import Footer from "../components/Footer";
const image1 = "/Banner/FAQ.png"; // Static image path

const FAQPage: React.FC = () => {
  return (<><Header/>
    <div>
      {/* Banner Image */}
      <div className="w-full mt-16">
        <Image
          src={image1}
          alt="FAQ Banner"
          className="w-full h-auto object-contain"
          width={1200} // Adjust width as needed
          height={400} // Adjust height as needed
          layout="responsive" // Make the image responsive
        />
      </div>

      {/* FAQ Component */}
      <FAQ />
      <CustomizedQuotesForm />
    </div><Footer></Footer></>
  );
};

export default FAQPage;
