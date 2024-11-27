"use client";

import React, { useState } from "react";
import styles from "./FAQ.module.css";
import faqContent from "../../public/Strings/en_strings.json"; // Import the JSON file
// Defining the FAQ type
type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_QA: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Filtered FAQs based on search term
  const filteredFAQs = faqContent.FAQ_ITEMS.filter((faq: FAQItem) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <div className={styles.faqContainer}>
        <h1 className={styles.faqTitle}>{faqContent.FAQ_TITLE}</h1>
        <input
          type="text"
          placeholder={faqContent.FAQ_SEARCH_PLACEHOLDER}
          className={styles.faqSearchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="bg-white shadow-md rounded-lg">
          {filteredFAQs.length === 0 ? (
            <p className="text-center p-4">No results found.</p>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h2
                  className={styles.faqQuestion}
                  onClick={() => handleToggle(index)}
                >
                  {faq.question}
                </h2>
                {expandedIndex === index && (
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


const FAQ: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-200">
      {/* Left Column */}
      <div className="md:w-1/2 flex flex-col justify-between px-16">
        {/* Centered Image */}
        <div className="flex flex-1 items-center">
          <img
            src={faqContent.FAQ_IMAGE_SRC}
            alt={faqContent.FAQ_IMAGE_ALT}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 mt-10">
        <FAQ_QA />
      </div>
    </div>
  );
};

export default FAQ;