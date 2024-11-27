import React from "react";
import Image from "next/image"; // Import the Image component from Next.js
import styles from "./Services.module.css";
import servicesContent from "../../public/Strings/en_strings.json"; // Import the JSON file

const Services: React.FC = () => {
  return (
    <div className={styles.servicesBody}>
      {/* Section 1 */}
      <section className={styles.services}>
        <h2 className={styles.heading}>Our Services</h2>

        <div className={styles.content}>
          <div className={styles.illustration}>
            <Image
              src={servicesContent["SERVICES_SECTION-1_IMAGE_SRC"]}
              alt={servicesContent["SERVICES_SECTION-1_IMAGE_ALT"]}
              className={styles.illustrationImage}
              width={500} // Specify the width of the image (adjust as needed)
              height={300} // Specify the height of the image (adjust as needed)
            />
          </div>

          <div className={styles.textContent}>
            <h3 className={styles.serviceTitle}>
              {servicesContent["SERVICES_SECTION-1_TITLE"]}
            </h3>
            <p className={styles.serviceDescription}>
              {servicesContent["SERVICES_SECTION-1_DESCRIPTION"]}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className={styles.services}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h3 className={styles.serviceTitle}>
              {servicesContent["SERVICES_SECTION-2_TITLE"]}
            </h3>
            <p className={styles.serviceDescription}>
              {servicesContent["SERVICES_SECTION-2_DESCRIPTION"]}
            </p>
          </div>

          <div className={styles.illustration}>
            <Image
              src={servicesContent["SERVICES_SECTION-2_IMAGE_SRC"]}
              alt={servicesContent["SERVICES_SECTION-2_IMAGE_ALT"]}
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
          <div className={styles.illustration} >
            <Image
            style={{height:"300px"}}
              src={servicesContent["SERVICES_SECTION-3_IMAGE_SRC"]}
              alt={servicesContent["SERVICES_SECTION-3_IMAGE_ALT"]}
              className={styles.illustrationImage}
              width={400}
              height={200}
            />
          </div>

          <div className={styles.textContent} style={{marginTop: "2em"}}>
            <h3 className={styles.serviceTitle}>
              {servicesContent["SERVICES_SECTION-3_TITLE"]}
            </h3>
            <p className={styles.serviceDescription}>
              {servicesContent["SERVICES_SECTION-3_DESCRIPTION"]}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
