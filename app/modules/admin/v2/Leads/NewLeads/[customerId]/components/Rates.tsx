"use client";
import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Fix import (remove destructuring)
import axiosInstance from "@/app/modules/admin/utils/axiosinstance";

const MyRatesPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("countryCode"); // Default sort option
  const [myRatesData, setMyRatesData] = useState([]); // Initialize myRatesData as empty
  const [customerData, setCustomerData] = useState(null); // Initialize customerData as null
  const [testsData, setTestsData] = useState([]); // State to store tests data
  const [statusFilter, setStatusFilter] = useState("all"); // Status filter
  const [selectedRates, setSelectedRates] = useState([]); // Track selected rates
  const [showCheckboxes, setShowCheckboxes] = useState(false); // Controls whether checkboxes are visible
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [dataNotFound, setDataNotFound] = useState(false); // Track if no data is found

  // Fetch customer details
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = token ? jwtDecode(token) : null;
        const customerId = decodedToken ? decodedToken.id : null;

        if (customerId) {
          const response = await axiosInstance.get(`/v3/api/customers/${customerId}`);
          setCustomerData(response.data);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);

  // Fetch tests based on customer ID
  useEffect(() => {
    const fetchTests = async () => {
      if (customerData) {
        try {
          const response = await axiosInstance.get(`/v3/api/tests`);
          const allTests = response.data;

          const filteredTests = allTests.filter((test) => test.customerId === customerData._id);
          setTestsData(filteredTests);
        } catch (error) {
          console.error("Error fetching tests:", error);
        }
      }
    };

    fetchTests();
  }, [customerData]);

  // Fetch rates based on myRatesId from customer data
  useEffect(() => {
    const fetchMyRates = async () => {
      if (customerData?.myRatesId?.length>0) {
        try {
          const rateFetchPromises = customerData?.myRatesId?.map(async (rateId) => {
            const response = await axiosInstance.get(`/v3/api/rates/${rateId}`);
            return response.data.rate;
          });
          const ratesDataArray = await Promise.all(rateFetchPromises);
          setMyRatesData(ratesDataArray.flat());
        } catch (error) {
          console.error("Error fetching rates:", error);
        }
      }
    };

    fetchMyRates();
  }, [customerData]);

  // Loading and no-data states
  useEffect(() => {
    const hasData = myRatesData.length || testsData.length;
    setLoading(!hasData);
    setDataNotFound(!hasData);
  }, [myRatesData, testsData]);

  // Handle "Request Test" for selected items
  const handleRequestTest = async () => {
    try {
      const requestPromises = selectedRates.map(async (rate) => {
        const correspondingTest = testsData.find(
          (test) => test.rateCustomerId === `${customerData._id}hi${rate._id}`
        );

        const testReason = correspondingTest?.testReason || "Requested";

        return axiosInstance.post(`/v3/api/tests`, {
          rateId: rate._id,
          customerId: customerData._id,
          rateCustomerId: `${customerData._id}hi${rate._id}`,
          testStatus: "test requested",
          testReason,
        });
      });

      await Promise.all(requestPromises);
      alert("Tests Requested Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error requesting tests:", error);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (rate) => {
    const isSelected = selectedRates.some((item) => item._id === rate._id);

    setSelectedRates((prev) =>
      isSelected ? prev.filter((item) => item._id !== rate._id) : [...prev, rate]
    );
  };

  // Combine rates and tests data
  const combinedData = myRatesData.map((rate) => {
    const test = testsData.find(
      (test) => test.rateCustomerId === `${customerData._id}hi${rate._id}`
    );

    return {
      ...rate,
      testStatus: test?.testStatus || rate.status,
      testReason: test?.testReason || "N/A",
    };
  });

  // Apply filters and sorting
  const filteredData = combinedData.filter(
    (item) =>
      item.country.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "all" || item.testStatus === statusFilter)
  );

  const sortedData = filteredData.sort((a, b) => {
    return sort === "countryName"
      ? a.country.localeCompare(b.country)
      : a.countryCode.localeCompare(b.countryCode);
  });

  // Render
  return (
    <div className="p-6 text-gray-800">
      <div className="flex justify-between items-start w-full">
        <h2 className="text-2xl font-bold">My Rates</h2>
        {customerData && (
          <div className="flex flex-col items-end">
            <p className="font-regular">
              Company Name: <span className="font-bold">{customerData.companyName}</span>
            </p>
            <p className="font-regular mt-1">
              Customer ID: <span className="font-bold">{customerData.customerId}</span>
            </p>
          </div>
        )}
      </div>
      <p className="text-gray-600 mt-2">Manage your rates here.</p>

      {/* Search and Filters */}
      <div className="mt-8 flex items-center justify-between space-x-4">
        <input
          type="text"
          placeholder="Search by country name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 bg-white px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="Test Requested">Test Requested</option>
          <option value="No Test Requested">No Test Requested</option>
        </select>
        {!showCheckboxes && (
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setShowCheckboxes(true)}
          >
            Select Rates
          </button>
        )}
      </div>

      {/* Loading or Table */}
      {loading ? (
        <p>Loading rates...</p>
      ) : dataNotFound ? (
        <p>No data found.</p>
      ) : (
        <table className="min-w-full mt-6 border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#005F73] text-white">
              {showCheckboxes && <th className="px-4 py-2"></th>}
              <th className="px-4 py-2">Country Code</th>
              <th className="px-4 py-2">Country Name</th>
              <th className="px-4 py-2">Quality Description</th>
              <th className="px-4 py-2">Rate</th>
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((rate) => (
              <tr key={rate._id} className="text-gray-700">
                {showCheckboxes && (
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(rate)}
                    />
                  </td>
                )}
                <td className="px-4 py-2">{rate.countryCode}</td>
                <td className="px-4 py-2">{rate.country}</td>
                <td className="px-4 py-2">{rate.qualityDescription}</td>
                <td className="px-4 py-2">{rate.rate}</td>
                <td className="px-4 py-2">{rate.profile}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full text-sm px-3 py-1 ${
                      rate.testStatus === "test requested"
                        ? "bg-blue-200"
                        : "bg-gray-200"
                    }`}
                  >
                    {rate.testStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Request Test Button */}
      {showCheckboxes && (
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleRequestTest}
          >
            Request Test
          </button>
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => setShowCheckboxes(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRatesPage;
