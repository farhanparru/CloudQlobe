"use client";
import React, { useState, useEffect } from "react";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import axiosInstance from "@/app/modules/admin/utils/axiosinstance";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

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

const PrivateRates = () => {
  const [normalRatesData, setNormalRatesData] = useState<Rate[]>([]);
  const [selectedRates, setSelectedRates] = useState<Rate[]>([]);
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sort, setSort] = useState("countryCode");
  const [showSelectColumn, setShowSelectColumn] = useState(false);
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  // Extract customer ID from the token
  const getCustomerIdFromToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded: { id: string } = jwtDecode(token);
    return decoded.id;
  };

  useEffect(() => {
    const fetchCustomerAndRates = async () => {
      setLoading(true);
      try {
        const customerId = getCustomerIdFromToken();
        if (customerId) {
          const customerResponse = await axiosInstance.get(`/v3/api/customers/${customerId}`);
          setCustomerData(customerResponse.data);

          const ratesResponse = await axiosInstance.get(`/v3/api/rates`);
          setNormalRatesData(ratesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching customer or rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAndRates();
  }, []);

  // Handle adding selected rates to My Rates
  const handleAddSelectedToMyRates = async () => {
    const customerId = getCustomerIdFromToken();
    if (!customerId) {
      console.error("Customer ID not found in token");
      return;
    }

    const selectedRateIds = selectedRates.map((rate) => rate._id);
    try {
      const response = await axiosInstance.put(`/v3/api/customers/updatemyrate/${customerId}`, {
        myRatesId: selectedRateIds,
      });
      console.log("Selected rates successfully added to My Rates:", response.data);
      window.alert("Rate(s) added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding selected rates to My Rates:", error);
    }
  };

  // Check if a rate is disabled
  const isRateDisabled = (rateId: string): boolean => {
    if (!customerData) return false;
    const { myRatesId, rateAddedtotest, rateTested, rateTesting } = customerData;
    return (
      myRatesId.includes(rateId) ||
      rateAddedtotest.includes(rateId) ||
      rateTested.includes(rateId) ||
      rateTesting.includes(rateId)
    );
  };

  // Get unique country options for the dropdown
  const countryOptions = Array.from(new Set(normalRatesData.map((rate) => rate.country))).sort();

  // Filter and sort rates
  const filteredData = selectedCountry
    ? normalRatesData.filter((rate) => rate.country === selectedCountry)
    : normalRatesData;

  const sortedData = filteredData.sort((a, b) =>
    sort === "countryName"
      ? a.country.localeCompare(b.country)
      : a.countryCode.localeCompare(b.countryCode)
  );

  const displayedData = showOnlySelected ? selectedRates : sortedData;

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
    <div className="p-4 bg-gray-100 text-gray-800">
      {/* Page Header */}
      <div className="flex items-center mb-6">
        <div className="bg-orange-500 text-2xl rounded-lg text-white px-4 py-2 mr-2">$</div>
        <h1 className="text-lg font-medium bg-blue-500 text-white px-4 py-2 rounded-lg">
          My Rates 
        </h1>
      </div>


      {/* Country Dropdown and Sort Section */}
      <div className="flex items-center justify-between space-x-4 mb-6">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="flex-grow bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a country</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowSelectColumn(!showSelectColumn)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {showSelectColumn ? "Hide Select Rates" : "Select Rates"}
        </button>

        <button
          onClick={() => setShowOnlySelected(!showOnlySelected)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FunnelIcon className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>

      {/* Add Selected to My Rates Button */}
      {showOnlySelected && selectedRates.length > 0 && (
        <button
          onClick={handleAddSelectedToMyRates}
          className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Selected to My Rates
        </button>
      )}

      {/* Rates Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              {showSelectColumn && <th className="p-2">Select</th>}
              <th className="p-2">Country Code</th>
              <th className="p-2">Country Name</th>
              <th className="p-2">Quality Description</th>
              <th className="p-2">Rate</th>
              <th className="p-2">Profile</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((rate, index) => (
              <tr
                key={rate._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                {showSelectColumn && (
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      disabled={isRateDisabled(rate._id)}
                      checked={selectedRates.some((selected) => selected._id === rate._id)}
                      onChange={() => {
                        setSelectedRates((prev) =>
                          prev.some((selected) => selected._id === rate._id)
                            ? prev.filter((selected) => selected._id !== rate._id)
                            : [...prev, rate]
                        );
                      }}
                    />
                  </td>
                )}
                <td className="p-2 text-center">{rate.countryCode}</td>
                <td className="p-2 text-center">{rate.country}</td>
                <td className="p-2 text-center">{rate.qualityDescription}</td>
                <td className="p-2 text-center">{rate.rate}</td>
                <td className="p-2 text-center">{rate.profile}</td>
                <td className="p-2 text-center">{rate.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrivateRates;
