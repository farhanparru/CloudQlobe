// components/VoIPRatesTable.js
import Footer from "../components/Footer";
import Header from "../components/Header";
import RatesNavbar from "../components/RatesNavbar";
import VoIPRatesTable from "../components/RatesTable";
import CustomizedQuotesForm from "@/app/components/DIDQuotation";
import Head from 'next/head';

const VoIPRates = () => {

  return(  <><Header/>
    <div style={{overflow:'hidden'}}>

      <VoIPRatesTable/>
      <CustomizedQuotesForm />

    </div>      <Footer/></>
  )
}



export default VoIPRates;













// // components/VoIPRatesTable.js

// import React, { useState, useEffect, useMemo } from 'react';
// import debounce from 'lodash.debounce';
// import styles from './Pricing.module.css'; // Import the CSS module

// const VoIPRatesTable = () => {
//   // Preset Data to be used when API is unavailable
//   const PRESET_DATA = [
//     { code: 'US', name: 'United States', platinum: '$0.02', gold: '$0.025', silver: '$0.03' },
//     { code: 'CA', name: 'Canada', platinum: '$0.022', gold: '$0.027', silver: '$0.032' },
//     { code: 'GB', name: 'United Kingdom', platinum: '$0.023', gold: '$0.028', silver: '$0.033' },
//     { code: 'AU', name: 'Australia', platinum: '$0.024', gold: '$0.029', silver: '$0.034' },
//     { code: 'DE', name: 'Germany', platinum: '$0.025', gold: '$0.03', silver: '$0.035' },
//     { code: 'FR', name: 'France', platinum: '$0.026', gold: '$0.031', silver: '$0.036' },
//     { code: 'JP', name: 'Japan', platinum: '$0.027', gold: '$0.032', silver: '$0.037' },
//     { code: 'IN', name: 'India', platinum: '$0.028', gold: '$0.033', silver: '$0.038' },
//     { code: 'BR', name: 'Brazil', platinum: '$0.029', gold: '$0.034', silver: '$0.039' },
//     { code: 'CN', name: 'China', platinum: '$0.03', gold: '$0.035', silver: '$0.04' },
//     // Add more preset data as needed
//   ];

//   // State Variables
//   const [rates, setRates] = useState([]); // Current rates to display
//   const [searchQuery, setSearchQuery] = useState(''); // Search input
//   const [currentPage, setCurrentPage] = useState(1); // Current page number
//   const [totalPages, setTotalPages] = useState(1); // Total number of pages
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [usingPresetData, setUsingPresetData] = useState(false); // Flag to indicate if preset data is being used

//   const pageSize = 5; // Number of items per page

//   // Fetch VoIP Rates from API
//   const fetchRates = async (query = '', page = 1, limit = pageSize) => {
//     setLoading(true);
//     setError(null);
//     setUsingPresetData(false);

//     try {
//       const response = await fetch(`/api/voip-rates?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      
//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       const data = await response.json();
//       setRates(data.data);
//       setTotalPages(data.totalPages);
//     } catch (err) {
//       console.error('Failed to fetch data from API:', err);
//       setError('Failed to fetch data from API. Displaying preset data.');
//       setRates(PRESET_DATA);
//       setTotalPages(Math.ceil(PRESET_DATA.length / pageSize));
//       setUsingPresetData(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize data on component mount and when searchQuery or currentPage changes
//   useEffect(() => {
//     fetchRates(searchQuery, currentPage, pageSize);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchQuery, currentPage]);

//   // Debounced search function
//   const debouncedSearch = useMemo(
//     () =>
//       debounce((query) => {
//         setCurrentPage(1); // Reset to first page on new search
//         setSearchQuery(query);
//       }, 500), // 500ms debounce delay
//     []
//   );

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     debouncedSearch(value);
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   // Cleanup debounced function on unmount
//   useEffect(() => {
//     return () => {
//       debouncedSearch.cancel();
//     };
//   }, [debouncedSearch]);

//   // Determine the data to display (either API data or preset data)
//   const displayData = usingPresetData ? PRESET_DATA.slice((currentPage - 1) * pageSize, currentPage * pageSize) : rates;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Wholesale VoIP Rates</h1>

//       {/* Notification for using preset data */}
//       {usingPresetData && (
//         <div className={styles.notification}>
//           Unable to fetch live data. Displaying preset rates.
//         </div>
//       )}

//       {/* Search Bar */}
//       <div className={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Search by country name or code..."
//           onChange={handleSearchChange}
//           className={styles.searchInput}
//         />
//       </div>

//       {/* Table */}
//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Country Code</th>
//               <th>Country Name</th>
//               <th>Platinum Rate</th>
//               <th>Gold Rate</th>
//               <th>Silver Rate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className={styles.loading}>
//                   Loading...
//                 </td>
//               </tr>
//             ) : displayData.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className={styles.noResults}>
//                   No results found.
//                 </td>
//               </tr>
//             ) : (
//               displayData.map((rate) => (
//                 <tr key={rate.code} className={styles.tableRow}>
//                   <td className={styles.tableCell}>{rate.code}</td>
//                   <td className={styles.tableCell}>{rate.name}</td>
//                   <td className={styles.tableCell}>{rate.platinum}</td>
//                   <td className={styles.tableCell}>{rate.gold}</td>
//                   <td className={styles.tableCell}>{rate.silver}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
//         >
//           Previous
//         </button>

//         {/* Page Numbers */}
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => handlePageChange(page)}
//             className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VoIPRatesTable;
