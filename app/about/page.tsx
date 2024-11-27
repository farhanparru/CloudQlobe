import React from "react";
import styles from "./About.module.css";
import Image from "next/image"; // Import the Image component from Next.js
import aboutContent from "../../public/Strings/en_strings.json"; // Import the JSON file
import CustomizedQuotesForm from "../components/DIDQuotation";
import Footer from "../components/Footer";
import Header from "../components/Header";
const About: React.FC = () => {
  return (<><Header/>
    <div>
      {/* Banner Image */}
      <div className="w-full mt-16">
        <Image
          src={aboutContent["ABOUT_BANNER_IMAGE_SRC"]}
          alt={aboutContent["ABOUT_BANNER_IMAGE_ALT"]}
          layout="responsive"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className={styles.servicesBody}>
        {/* Section 1 */}
        <section className={styles.services}>
          <div className={styles.content}>
            <div className={styles.illustration}>
              <Image
               style={{height:'400px', width:'800px'}}
                src={aboutContent["ABOUT_SECTION_1_IMAGE_SRC"]}
                alt={aboutContent["ABOUT_SECTION_1_IMAGE_ALT"]}
                className={styles.illustrationImage}
                width={700}
                height={500}
              />
            </div>

            <div className={styles.textContent}>
              <p className={styles.serviceDescription}>
                {aboutContent["ABOUT_SECTION_1_DESCRIPTION"]}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className={styles.services} style={{paddingBottom:'3em'}}> 
          <div className={styles.content}>
            <div className={styles.textContent}>
              <p className={styles.serviceDescription}>
                {aboutContent["ABOUT_SECTION_2_DESCRIPTION"]}
              </p>
            </div>

            <div className={styles.illustration}>
              <Image
                src={aboutContent["ABOUT_SECTION_2_IMAGE_SRC"]}
                alt={aboutContent["ABOUT_SECTION_2_IMAGE_ALT"]}
                className={styles.illustrationImage}
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className={styles.services}>
          <div className={styles.content}>
            <div className={styles.illustration}>
              <Image
              style={{width:'450px'}}
                src={aboutContent["ABOUT_SECTION_3_IMAGE_SRC"]}
                alt={aboutContent["ABOUT_SECTION_3_IMAGE_ALT"]}
                className={styles.illustrationImage}
                width={500}
                height={300}
              />
            </div>

            <div className={styles.textContent}>
              <p className={styles.serviceDescription}>
                {aboutContent["ABOUT_SECTION_3_DESCRIPTION"]}
              </p>
            </div>
          </div>
        </section>
      </div>
      <CustomizedQuotesForm />
    </div><Footer/></>
  );
};

export default About;
