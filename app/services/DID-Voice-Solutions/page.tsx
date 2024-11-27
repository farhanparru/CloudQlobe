"use client";

import React from "react";
import Image from "next/image";
import CustomizedQuotesForm from "@/app/components/DIDQuotation";
import didVoiceSolutionsContent from "../../../public/Strings/en_strings.json"; // Import the JSON file
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

const DID_Voice_Solutions = () => {
  return (<><Header/>
    <div>
      {/* Banner Image */}
      <div className="w-full mt-16">
        <Image
          src={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_BANNER_IMAGE_SRC"]}
          alt={didVoiceSolutionsContent["DID_VOICE_SOLUTIONS_BANNER_IMAGE_ALT"]}
          layout="responsive"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="bg-white">
        {/* First section */}
        <section className="max-w-5xl mx-auto p-8 bg-white">
          <div className="flex items-center gap-8"  style={{marginTop:'1.5em'}}>
            <div className="flex-1">
              <Image
               style={{marginRight:'4em'}}
                src={
                  didVoiceSolutionsContent[
                    "DID_VOICE_SOLUTIONS_SECTION_1_IMAGE_SRC"
                  ]
                }
                alt={
                  didVoiceSolutionsContent[
                    "DID_VOICE_SOLUTIONS_SECTION_1_IMAGE_ALT"
                  ]
                }
                className="w-full h-auto max-w-[450px]"
                width={500}
                height={300}
              />
            </div>

            <div className="flex-1">
              <p className="text-gray-600 leading-6">
                {
                  didVoiceSolutionsContent[
                    "DID_VOICE_SOLUTIONS_SECTION_1_DESCRIPTION"
                  ]
                }
              </p>
            </div>
          </div>
        </section>

        {/* Second section */}
        <section className="max-w-5xl mx-auto p-8 bg-white">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <p className="text-gray-600 leading-6">
                {
                  didVoiceSolutionsContent[
                    "DID_VOICE_SOLUTIONS_SECTION_2_DESCRIPTION"
                  ]
                }
              </p>
            </div>

            <div className="flex-1">
              <Image
                src={
                  didVoiceSolutionsContent[
                    "DID_VOICE_SOLUTIONS_SECTION_2_IMAGE_SRC"
                  ]
                }
                alt={
                  didVoiceSolutionsContent[
                    "DID_VOICE_SOLUTIONS_SECTION_2_IMAGE_ALT"
                  ]
                }
                className="w-full h-auto max-w-[450px]"
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Customized Form */}
      <div>
        <CustomizedQuotesForm />
      </div>
    </div><Footer/></>
  );
};

export default DID_Voice_Solutions;
