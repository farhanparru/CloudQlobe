"use client";
import React, { useState, useEffect } from "react";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import axiosInstance from "@/app/modules/admin/utils/axiosinstance";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../dash_layout/page";


// Interfaces
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
  rtp : string;
  asr: string;
  acd: string;
}

interface Customer {
  myRatesId: string[];
  rateAddedtotest: string[];
  rateTested: string[];
  rateTesting: string[];
}

const NormalRatesPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sort, setSort] = useState("countryCode");
  const [normalRatesData, setNormalRatesData] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRates, setSelectedRates] = useState<Rate[]>([]);
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [showSelectColumn, setShowSelectColumn] = useState(false);
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const getCustomerIdFromToken = () => {
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
          const customerResponse = await axiosInstance.get(
            `/v3/api/customers/${customerId}`
          );
          setCustomerData(customerResponse.data);

          const ratesResponse = await axiosInstance("v3/api/clirates");
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

  // Get unique country names for dropdown options
  const countryOptions = Array.from(new Set(normalRatesData.map((item) => item.country))).sort();

  // Filter rates based on selected country
  const filteredData = selectedCountry
    ? normalRatesData.filter((item) => item.country === selectedCountry)
    : normalRatesData;

  const sortedData = filteredData.sort((a, b) => {
    return sort === "countryName"
      ? a.country.localeCompare(b.country)
      : a.countryCode.localeCompare(b.countryCode);
  });

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
    <DashboardLayout>
      <div className="p-0 bg-gray-100 text-gray-800">
        {/* Page Header */}
        <div className="text-left my-6"></div>

        <div className="flex items-center" style={{ marginLeft: "0em" }}>
            <div className="bg-orange-500 text-2xl rounded-lg text-white p-2 mr-2" style={{ paddingTop: ".25em", paddingLeft: ".8em", paddingRight: ".8em", paddingBottom: ".25em" }}>
              $
            </div>
            <div className="flex items-center p-2 py-2 rounded-lg bg-blue-500">
              <h1 className="text-lg font-regular text-white mb-0">Premium CLI Routes</h1>
            </div>
          </div>

        {/* Country Dropdown and Sort Section */}
        <div className="mt-6 flex items-center justify-between space-x-4">
          <div className="flex  ml-0 space-x-2" style={{width:"20em"}}>
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
            <div className="flex items-center">
                        <button style={{marginRight:"0em"}}
              onClick={() => setShowOnlySelected(!showOnlySelected)}
              className="px-7 h-10 bg-[#005F73] text-white rounded transition duration-200 ease-in-out hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              {/* Filter icon */}
              <FunnelIcon className="w-5 h-5" />
              <span className="ml-1">Filter</span> {/* Add text next to the icon */}
            </button>

              {/* Add your filter text here */}
            </div>

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
        <div className="tableContainer overflow-x-auto py-3 rounded-lg">
          <table className="rateTable w-full font-normal border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-[#005F73] text-white font-normal uppercase  rounded-lg">
                {showSelectColumn && (
                  <th className="p-2 text-center border rounded-lg border-gray-300">Select</th>
                )}
                <th className="p-2 text-center border border-gray-300 w-1/6">Country</th>
                <th className="p-2 text-center border border-gray-300 w-1/4">Quality Description</th>
                <th className="p-2 text-center border border-gray-300">RTP</th>
                <th className="p-2 text-center border border-gray-300">ASR</th>
                <th className="p-2 text-center border border-gray-300">ACD</th>
                <th className="p-2 text-center border border-gray-300">Rate ($)</th>
                <th className="p-2 text-center border border-gray-300">Status</th>

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
                  <td className="p-2 text-center border border-gray-300">{item.qualityDescription}</td>
                  <td className="p-2 text-center border border-gray-300">{item.rtp}</td>
                  <td className="p-2 text-center border border-gray-300">{item.asr}</td>
                  <td className="p-2 text-center border border-gray-300">{item.acd}</td>
                  <td className="p-2 text-center border border-gray-300">{item.rate}</td>
                  <td className={`${item.status.toLowerCase() === "active" ? "text-green-600" : "text-red-600"}`}>
                    {item.status?.charAt(0).toUpperCase() + item.status.slice(1)}
                  </td>
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

