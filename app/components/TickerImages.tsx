import React from "react";
import Image from "next/image"; // Import the Image component from Next.js
import styles from "./TickerImages.module.css";

// Define a type for the image prop to ensure type safety
interface ImageTickerProps {
  images: string[]; // Array of image URLs passed as prop
}

const TickerImages: React.FC<ImageTickerProps> = ({ images }) => {
  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.ticker}>
        {/* First set of images */}
        {images.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
          &nbsp; &nbsp;  <Image
              src={image}
              alt={`Image ${index + 1}`}
              className={styles.image}
              width={200} // Provide an appropriate width (adjust as needed)
              height={200} // Provide an appropriate height (adjust as needed)
              layout="intrinsic" // Optional, use 'intrinsic' layout to preserve aspect ratio
            />
          </div>
        ))}

        {/* Second set of images (duplicate) */}
        {images.map((image, index) => (
          <div key={`duplicate-${index}`} className={styles.imageContainer}>
            &nbsp; &nbsp;<Image
              src={image}
              alt={`Image ${index + 1}`}
              className={styles.image}
              width={200} // Provide an appropriate width (adjust as needed)
              height={200} // Provide an appropriate height (adjust as needed)
              layout="intrinsic" // Optional, use 'intrinsic' layout to preserve aspect ratio
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerImages;
