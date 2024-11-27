"use client";

import React from "react";
import Image from "next/image"; // Import the Image component from Next.js
import styles from "./VoiceOfferings.module.css";

interface Offering {
  icon?: string;
  subtitle?: string;
}

const VoiceOfferings: React.FC = () => {
  const offerings: Offering[] = [
    {
      icon: "/services/QuickSettings.png",
      subtitle: "Quick Setup",
    },
    {
      icon: "/services/QuickLive.png",
      subtitle: "Quick Live in 10 minutes",
    },
    {
      icon: "/services/Payments.png",
      subtitle: "Multiple Payment Option",
    },
    {
      icon: "/services/Freecredit.png",
      subtitle: "Free $2 Credit",
    },
    {
      icon: "/services/No Balance Limit.png",
      subtitle: "No Balance Limit",
    },
    {
      icon: "/services/Helpdesk.png",
      subtitle: "24/7 Helpdesk",
    },
  ];

  return (
    <div className={styles.voiceOfferingsContainer}>
      <section className={styles.voiceOfferings}>
        <div className={styles.offeringsGrid}>
          {offerings.map((offering, index) => (
            <div key={index} className={styles.offeringItem}>
              {offering.icon && (
                <Image
                  src={offering.icon}
                  alt={offering.subtitle || `Offering ${index + 1}`} // Fallback alt text if subtitle is not available
                  className={styles.offeringIcon}
                  width={122} // Adjust width as needed
                  height={122} // Adjust height as needed
                  layout="intrinsic" // Maintain aspect ratio of the image
                />
              )}
              {offering.subtitle && (
                <p className={styles.offeringSubtitle}>{offering.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VoiceOfferings;
