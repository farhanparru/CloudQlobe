"use client";
import React, { useState, useEffect } from "react";
import { Sparkles, Crown, DollarSign } from "lucide-react";

// Define the type for a single rate entry
type CountryRate = {
  country: string;
  qualityDescription: "ivr" | "inbound"; // Restrict 'qualityDescription' field to these two values
  rate: number;
  category: string; // Add category field
};

const CountryRatesTable: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [data, setData] = useState<CountryRate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const rowsPerPage = 6;
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
      const filteredData = fetchedData.filter((rate) => rate.category === "specialrate"); // Filter based on category
      setData(filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const sortData = (key: keyof CountryRate) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key as keyof CountryRate] < b[sortConfig.key as keyof CountryRate]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key as keyof CountryRate] > b[sortConfig.key as keyof CountryRate]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedData = getSortedData();

  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div
      className={`bg-transparent mx-auto p-1 rounded-lg transition-transform duration-300 ${
        isVisible ? "slide-in-right" : "translate-x-full"
      }`}
    >
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

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }
      `}</style>

      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-orange-500 animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="bg-white shadow-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-amber-500">
                {["Country Name", "Quality Description", "Rate"].map((header, index) => (
                  <th
                    key={index}
                    onClick={() => sortData(header.toLowerCase().replace(" ", "") as keyof CountryRate)}
                    className="py-4 px-6 text-left text-white font-light tracking-wider cursor-pointer hover:bg-amber-600 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{header}</span>
                      {sortConfig?.key === header.toLowerCase().replace(" ", "") && (
                        <span className="transition-transform duration-300">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {currentRows.map((item, index) => (
                <tr key={index} className="transition-all duration-300 hover:bg-amber-50">
                  <td className="py-3 px-6">{item.country}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 text-sm ${
                        item.qualityDescription === "ivr"
                          ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500"
                          : "bg-emerald-50 text-emerald-700 border-l-2 border-emerald-500"
                      }`}
                    >
                      {item.qualityDescription}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-amber-800">${item.rate.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <a
              href="#"
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1 ? "cursor-not-allowed text-gray-400" : "text-orange-600 hover:bg-orange-500 hover:text-white"
              }`}
            >
              &laquo; Previous
            </a>
            {Array.from({ length: totalPages }, (_, index) => (
              <a
                key={index + 1}
                href="#"
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1 ? "font-bold text-orange-600" : "text-orange-600 hover:bg-orange-500 hover:text-white"
                }`}
              >
                {index + 1}
              </a>
            ))}
            <a
              href="#"
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages ? "cursor-not-allowed text-gray-400" : "text-orange-600 hover:bg-orange-500 hover:text-white"
              }`}
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

  useEffect(() => {
    document.body.style.overflow = isCardOpen ? "hidden" : "auto";
  }, [isCardOpen]);

  return (
    <div>
      <div className="fixed right-5 top-1/3 -translate-y-1/2">
        <button
          className="w-16 h-16 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition flex items-center justify-center"
          onClick={handleClick}
        >
          <DollarSign />
        </button>
      </div>
      {/* <CountryRatesTable isVisible={isCardOpen} /> */}
    </div>
  );
};

export default FloatingButton;
