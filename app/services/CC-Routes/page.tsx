import React from "react";
import Image from "next/image";
import ccRoutesContent from "../../../public/Strings/en_strings.json"; // Import the JSON file
import CustomizedQuotesForm from "@/app/components/DIDQuotation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const CC_Routes: React.FC = () => {
  return ( <> <Header/>
    <div>
   
      {/* Banner Image */}
      <div className="w-full mt-16">
        <Image
          src={ccRoutesContent["CC_ROUTES_BANNER_IMAGE_SRC"]}
          alt={ccRoutesContent["CC_ROUTES_BANNER_IMAGE_ALT"]}
          layout="responsive"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="bg-white" >
        {/* First section */}
        <section className="max-w-5xl mx-auto p-8 bg-white" >
          <div className="flex items-center gap-8 " style={{marginTop:'3em'}}>
            <div className="flex-1">
              <Image

                src={ccRoutesContent["CC_ROUTES_SECTION_1_IMAGE_SRC"]}
                alt={ccRoutesContent["CC_ROUTES_SECTION_1_IMAGE_ALT"]}
                className="w-full h-auto max-w-[350px]"
                width={500}
                height={300}
              />
            </div>

            <div className="flex-1">
              <p className="text-gray-600 leading-6">
                {ccRoutesContent["CC_ROUTES_SECTION_1_DESCRIPTION"]}
              </p>
            </div>
          </div>
        </section>

        {/* Second section */}
        <section className="max-w-5xl mx-auto p-8 bg-white">
          <div className="flex items-center gap-10"  style={{marginTop:'3em'}}>
            <div className="flex-1">
              <p className="text-gray-600 leading-6">
                {ccRoutesContent["CC_ROUTES_SECTION_2_DESCRIPTION"]}
              </p>
            </div>

            <div className="flex-1">
              <Image
                src={ccRoutesContent["CC_ROUTES_SECTION_2_IMAGE_SRC"]}
                alt={ccRoutesContent["CC_ROUTES_SECTION_2_IMAGE_ALT"]}
                className="w-full h-auto max-w-[490px]"
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>
      </div>
      <CustomizedQuotesForm />
     
    </div> <Footer /></> 
  );
};

export default CC_Routes;
