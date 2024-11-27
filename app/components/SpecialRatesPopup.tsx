"use client";
import React, { useState, useEffect } from "react";
import { Sparkles, Crown,DollarSign } from 'lucide-react';
// Define the type for a single rate entry
type CountryRate = {
  country: string;
  qualityDescription: 'ivr' | 'inbound'; // Restrict 'quality' field to these two values
  rate: number;
  category: string; // Add category field
};

const CountryRatesTable: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [data, setData] = useState<CountryRate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const rowsPerPage = 6; // Set to 7 rows per page
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  // Fetch data from API
  const fetchData = async (): Promise<void> => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch("https://cloudqlobe-server.onrender.com/v3/api/rates");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const fetchedData: CountryRate[] = await response.json();
      const filteredData = fetchedData.filter(rate => rate.category === "specialrate"); // Filter based on category
      setData(filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const sortData = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig) return data;
    return [...data].sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };
  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const sortedData = getSortedData();
 
  return (
    <div className={`bg-transparent  mx-auto p-1 rounded-lg transition-transform duration-300 ${isVisible ? 'slide-in-right' : 'translate-x-full'}`}>
      <style jsx>{`
        .slide-in-right {
          animation: slide-in-right 0.5s forwards;
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        table {
          border-radius: 0px; /* Round edges of the table */
          overflow: hidden; /* Ensure rounded edges are visible */
        }

        th, td {
      
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px; /* Adjust height for the loading indicator */
        }
      `}</style>
      
      {loading ? (
    <div className="flex items-center justify-end gap-3">
    <div className="relative w-6 h-6">
      {/* Outer rotating square */}
      <div className="absolute inset-0 border-2 border-orange-500 animate-spin" />
  
      {/* Inner pulsing square */}
      <div className="absolute inset-1.5 bg-orange-400 animate-pulse" />
  
      {/* Decorative corner dots */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150" />
    </div>
    
    {/* Optional loading text */}
    <span className="text-sm font-medium text-orange-500 animate-pulse">
      Loading
    </span>
  </div>
  
      ) : (
        <div className={"bg-white  shadow-lg  "} >
            <table className="min-w-full bg-white " >
              <thead>
                <tr className="bg-amber-500">
                  {['Country Name', 'Quality Description', 'Rate'].map((header, index) => (
                    <th key={index}
                        onClick={() => sortData(header.toLowerCase().replace(' ', ''))}
                        className="py-4 px-6 text-left text-white font-light tracking-wider rounded-none cursor-pointer
                                 hover:bg-amber-600 transition-colors duration-300">
                      <div className="flex items-center space-x-2">
                        <span>{header}</span>
                        {sortConfig?.key === header.toLowerCase().replace(' ', '') && (
                          <span className="transition-transform duration-300">
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {currentRows.map((item, index) => (
                  <tr key={index}
                      className="transition-all duration-300 hover:bg-amber-50 group">
                    <td className="py-3 px-6 font-light">{item.country}</td>
                    <td className="py-3 px-6">
                      <span className={`px-3 py-1 text-sm 
                        ${item.qualityDescription === 'ivr' 
                          ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' 
                          : 'bg-emerald-50 text-emerald-700 border-l-2 border-emerald-500'
                        } transition-all duration-300`}>
                        {item.qualityDescription}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <span className="font-light text-amber-800 group-hover:text-amber-900">
                        ${item.rate.toFixed(3)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          {/* Pagination */}
          <div className="flex justify-center  bg-white items-center  space-x-2 mt-0" style ={{paddingBottom:"1em"}}>
            <a 
              href="#"
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className={`px-4 py-2 rounded-md bg-gray-200 shadow-md transition duration-300 
                ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'text-orange-600 hover:bg-orange-500 hover:text-white'}`}
            >
              &laquo; Previous
            </a>

            {Array.from({ length: totalPages }, (_, index) => (
              <a
                key={index + 1}
                href="#"
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md bg-gray-200 shadow-md transition duration-300
                  ${currentPage === index + 1 ? 'font-bold text-orange-600' : 'text-orange-600 hover:bg-orange-500 hover:text-white'}`}
              >
                {index + 1}
              </a>
            ))}
            
            <a 
              href="#"
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              className={`px-4 py-2 rounded-md bg-gray-200 shadow-md transition duration-300 
                ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'text-orange-600 hover:bg-orange-500 hover:text-white'}`}
            >
              Next &raquo;
            </a>
          </div>
        </div>
      )}
    </div>
  );
};


const FloatingButton: React.FC = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleClick = () => {
    setIsCardOpen(!isCardOpen);
  };

  // Add useEffect to handle transitions when card is opening/closing
  useEffect(() => {
    if (isCardOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCardOpen]);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      {/* Floating Button */}
      <>
      <style>{`
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes reverse-rotate {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.7); opacity: 0; }
          50% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(-45deg); }
          100% { transform: translateX(100%) rotate(-45deg); }
        }

        .dollar-ring::before {
          content: '$';
          position: absolute;
          font-size: 10px;
          color: #fb923c;
          text-shadow: 0 0 10px rgba(251, 146, 60, 0.5);
          animation: rotate 3s linear infinite;
        }

        .magical-dollar-btn::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: linear-gradient(45deg, #fb923c, #ea580c, #fb923c, #ea580c);
          border-radius: 50%;
          z-index: -1;
          filter: blur(1px);
          animation: rotate 3s linear infinite;
        }

        .shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        .inner-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(251, 146, 60, 0.2), transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
      `}</style>

      <div className="fixed right-5 top-1/3 -translate-y-1/2">
        {/* Pulsing rings */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-orange-400 rounded-full"
                style={{
                  animation: `pulse-ring 2s infinite ${i * 0.3}s`,
                }}
              />
            ))}

            {/* Orbiting dollar signs */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="dollar-ring absolute inset-0"
                style={{
                  transform: `rotate(${i * 45}deg) translateX(${30}px)`,
                }}
              />
            ))}
          </>
        )}

        {/* Main button */}
        <button
          className="magical-dollar-btn relative flex items-center justify-center
                     w-16 h-16 rounded-full
                     bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600
                     text-white
                     shadow-lg shadow-orange-500/30
                     hover:shadow-orange-500/50
                     transition-all duration-300 ease-out
                     overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          aria-label="View Special Rates"
        >
          {/* Center content */}
          <div className={`relative z-10 transition-transform duration-300 
                          ${isHovered ? 'scale-110' : 'scale-100'}`}>
            <DollarSign 
              className="w-8 h-8 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" 
              strokeWidth={2.5} 
            />
          </div>

          {/* Inner glow effect */}
          <div className={`inner-glow ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

          {/* Shine effect */}
          <div className="shimmer" />

          {/* Inner spinning ring */}
          <div className={`absolute inset-2 border-2 border-dashed border-white/30 rounded-full
                          transition-opacity duration-300
                          ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{ animation: 'reverse-rotate 8s linear infinite' }}
          />

          {/* Hover tooltip */}
          <div className={`absolute -top-12 whitespace-nowrap
                          bg-gradient-to-r from-orange-900/90 to-orange-800/90 
                          text-orange-100 text-xs px-3 py-1.5 rounded-full
                          border border-orange-500/30 backdrop-blur-sm
                          shadow-lg shadow-orange-500/20
                          transition-all duration-300
                          ${isHovered ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2'}`}>
            Premium Rates
          </div>
        </button>

        {/* Bottom glow */}
        <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 
                        w-12 h-1 bg-orange-500/20 rounded-full blur-md
                        transition-opacity duration-300
                        ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
        />
      </div>
    </>

      {/* Conditional rendering of the CountryRatesTable directly */}
      {isCardOpen && (
        <>
          <div className="fixed inset-0   z-40 
                          duration-50"
               onClick={() => setIsCardOpen(false)} />
          <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50" style={{width:"35em", marginRight:"0em",marginBottom:"3em"}}>
            <CountryRatesTable isVisible={isCardOpen} />
          </div>
        </>
      )}
    
    </div>
  );
};

export default FloatingButton;
