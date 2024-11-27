"use client";
import React, { useState, useEffect } from "react";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline"; // FunnelIcon for filter
import { motion } from "framer-motion"; // for animation
import axiosInstance from "@/app/modules/admin/utils/axiosinstance";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../../dash_layout/page";

// Interface for Rate
interface Rate {
  _id: string;
  countryCode: string;
  country: string;
  qualityDescription: string;
  rate: number;
  status: string;
  testStatus: string;
  profile: string;
  testControl: string;
  addedTime: string;
}

// Interface for Customer Response
interface Customer {
  myRatesId: string[];
  rateAddedtotest: string[];
  rateTested: string[];
  rateTesting: string[];
}

const NormalRatesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("countryCode");
  const [normalRatesData, setNormalRatesData] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRates, setSelectedRates] = useState<Rate[]>([]);
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [showSelectColumn, setShowSelectColumn] = useState(false); // Default to hidden
  const [showOnlySelected, setShowOnlySelected] = useState(false); // Toggle to show only selected

  // Extract customerId from token
  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded: { id: string } = jwtDecode(token);
    return decoded.id;
  };

  // Fetch customer details and rates on component mount
  useEffect(() => {
    const fetchCustomerAndRates = async () => {
      setLoading(true);
      try {
        const customerId = getCustomerIdFromToken();
        if (customerId) {
          // Fetch customer details
          const customerResponse = await axiosInstance.get(
            `/v3/api/customers/${customerId}`
          );
          setCustomerData(customerResponse.data);

          // Fetch rates
          const ratesResponse = await axiosInstance("v3/api/rates");
          const specialRates = ratesResponse.data.filter((rate: Rate) => rate.category === "specialrate");
          setNormalRatesData(specialRates);
        }
      } catch (error) {
        console.error("Error fetching customer or rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAndRates();
  }, []);

  // Add selected rates to My Rates
  const handleAddSelectedToMyRates = async () => {
    const id = getCustomerIdFromToken();
    if (!id) {
      console.error("Customer ID not found in token");
      return;
    }

    const selectedRateIds = selectedRates.map((rate) => rate._id);

    try {
      const response = await axiosInstance.put(
        `v3/api/customers/updatemyrate/${id}`,
        {
          myRatesId: selectedRateIds,
        }
      );

      console.log("Selected rates successfully added to My Rates:", response.data);
      window.alert("Rate(s) added Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding selected rates to My Rates:", error);
    }
  };

  // Check if a rate is disabled based on customer's data
  const isRateDisabled = (rateId: string) => {
    if (!customerData) return false;
    const { myRatesId, rateAddedtotest, rateTested, rateTesting } = customerData;

    return (
      myRatesId.includes(rateId) ||
      rateAddedtotest.includes(rateId) ||
      rateTested.includes(rateId) ||
      rateTesting.includes(rateId)
    );
  };

  // Filter and sort rates
  const filteredData = normalRatesData.filter((item) =>
    item.country.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    return sort === "countryName"
      ? a.country.localeCompare(b.country)
      : a.countryCode.localeCompare(b.countryCode);
  });

  // If "showOnlySelected" is active, show only selected rates
  const displayedData = showOnlySelected ? selectedRates : sortedData;

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-orange-300 border-solid rounded-full"
        />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 text-gray-800">
        {/* Page Header */}
        <div className="text-left my-6"></div>

        {/* Search and Sort Section */}
        <div className="mt-6 flex items-center justify-between space-x-4">
          <div className="flex w-2/3 ml-5 space-x-2">
            <input
              type="text"
              placeholder="Search by country name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-orange-600 text-white font-regular rounded-lg hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
              Search
            </button>
          </div>

          <div className="flex items-center space-x-1">
            {/* Button to toggle "Select" column */}
            <button
              onClick={() => setShowSelectColumn(!showSelectColumn)}
              className="px-6 py-2 bg-green-600 text-white font-regular mr-5 rounded-lg hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {showSelectColumn ? "Hide Select Rates" : "Select Rates"}
            </button>

            {/* Filter Icon Button to show only selected rates */}
            <button
            style={{marginRight:"2em"}}
  onClick={() => setShowOnlySelected(!showOnlySelected)}
  className="w-10 h-10 bg-[#005F73] text-white rounded-full hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
>
  {/* Different filter icon */}
  <FunnelIcon className="w-5 h-5" />
</button>
          </div>
        </div>

        {showOnlySelected && selectedRates.length > 0 && (
          <div className="mt-6 flex justify-left ml-4">
            <button
              onClick={handleAddSelectedToMyRates}
              className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center space-x-2 shadow-md hover:bg-green-700"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Selected to My Rates</span>
            </button>
          </div>
        )}

        {/* Rates Table */}
        <div className="tableContainer overflow-x-auto p-5 rounded-lg">
          <table className="rateTable w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-[#005F73] text-white uppercase tracking-wider rounded-lg">
                {showSelectColumn && (
                  <th className="p-2 text-center border border-gray-300">Select</th>
                )}
                <th className="p-2 text-center border border-gray-300 w-1/6">Country Code</th>
                <th className="p-2 text-center border border-gray-300 w-1/4">Country Name</th>
                <th className="p-2 text-center border border-gray-300">Quality Description</th>
                <th className="p-2 text-center border border-gray-300">Rate</th>
                <th className="p-2 text-center border border-gray-300">Profile</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-[#dde0e5]" : "bg-[#FFFFFF]"
                  } hover:bg-[#b5b8bc] transition duration-200 ease-in-out`}
                >
                  {showSelectColumn && (
                    <td className="p-2 text-center border border-gray-300">
                      <input
                        type="checkbox"
                        disabled={isRateDisabled(item._id)}
                        checked={selectedRates.some((rate) => rate._id === item._id)}
                        onChange={() => {
                          if (selectedRates.some((rate) => rate._id === item._id)) {
                            setSelectedRates(
                              selectedRates.filter((rate) => rate._id !== item._id)
                            );
                          } else {
                            setSelectedRates([...selectedRates, item]);
                          }
                        }}
                      />
                    </td>
                  )}
                  <td className="p-2 text-center border border-gray-300">{item.countryCode}</td>
                  <td className="p-2 text-center border border-gray-300">{item.country}</td>
                  <td className="p-2 text-center border border-gray-300">{item.qualityDescription}</td>
                  <td className="p-2 text-center border border-gray-300">{item.rate}</td>
                  <td className="p-2 text-center border border-gray-300">{item.profile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NormalRatesPage;

