"use client";

import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import styles from "./RateTable.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Ticker from "./Ticker";
import RateTable from "./SpecialRates"; // Import the reusable RateTable component

export type Rate = {
  countryCode: string;
  countryName: string;
  qualityDescription: string;
  rate: string;
  profile: string;
  status: "active" | "inactive";
};

const VoIPRatesTable: React.FC = () => {


  
  // State Variables
  const [rates, setRates] = useState<Rate[]>([]); // Current rates to display
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [usingPresetData, setUsingPresetData] = useState(false); // Flag for preset data

  const pageSize = 5; // Number of items per page

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setCurrentPage(1); // Reset to first page on new search
        setSearchQuery(query);
      }, 500), // 500ms debounce delay
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleSearchClick = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleJoinClick = () => {
    console.log("Join Now clicked");
  };

  const closeErrorNotification = () => {
    setError(null);
  };

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Determine the data to display (either API data or preset data)
  const displayData = usingPresetData
    ? PRESET_DATA.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : rates;

  return (
    <div className={styles.container}>
     
      {/* Use RateTable component to display the table */}
      <RateTable loading={loading} error={error} data={displayData} />
    </div>
  );
};

export default VoIPRatesTable;
