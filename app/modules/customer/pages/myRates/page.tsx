"use client";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import axiosInstance from '@/app/modules/admin/utils/axiosinstance';
import DashboardLayout from '../dash_layout/page';

const MyRatesPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('countryCode'); // Default sort option
  const [myRatesData, setMyRatesData] = useState([]); // Initialize myRatesData as empty
  const [customerData, setCustomerData] = useState(null); // Initialize customerData as null
  const [testsData, setTestsData] = useState([]); // State to store tests data
  const [statusFilter, setStatusFilter] = useState('all'); // Status filter
  const [selectedRates, setSelectedRates] = useState([]); // Track selected rates
  const [showCheckboxes, setShowCheckboxes] = useState(false); // Controls whether checkboxes are visible
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [dataNotFound, setDataNotFound] = useState(false); // Track if no data is found

  // Fetch customer details
  useEffect(() => {
    const fetchCustomerData = async () => {
      const token = localStorage.getItem('token'); // Adjust according to where you store your token
      const customerId = token ? jwtDecode(token).id : null; // Adjust this field according to your token's structure
      if (customerId) {
        try {
          const response = await axiosInstance.get(`v3/api/customers/${customerId}`);
          setCustomerData(response.data);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      }
    };
    fetchCustomerData();
  }, []);

  // Fetch tests based on customer ID
  useEffect(() => {
    const fetchTests = async () => {
      if (customerData) {
        try {
          const response = await axiosInstance.get(`v3/api/tests`); // Adjust the endpoint to fetch tests
          const allTests = response.data;

          const filteredTests = allTests.filter(test => test.customerId === customerData._id);
          setTestsData(filteredTests);
        } catch (error) {
          console.error('Error fetching tests:', error);
        }
      }
    };
    fetchTests();
  }, [customerData]);

  // Fetch rates based on myRatesId from customer data
  useEffect(() => {
    const fetchMyRates = async () => {
      if (customerData && customerData.myRatesId.length) {
        try {
          const rateFetchPromises = customerData.myRatesId.map(async (rateId) => {
            const ratesResponse = await axiosInstance.get(`v3/api/rates/${rateId}`);
            return ratesResponse.data;
          });
          const ratesDataArray = await Promise.all(rateFetchPromises);
          setMyRatesData(ratesDataArray.flat());
        } catch (error) {
          console.error('Error fetching rates:', error);
        }
      }
    };
    fetchMyRates();
  }, [customerData]);

  // Loading state handling
  useEffect(() => {
    setLoading(!myRatesData.length && !testsData.length); // Set loading based on data presence
    setDataNotFound(myRatesData.length === 0 && testsData.length === 0); // If no rates or tests found
  }, [myRatesData, testsData]);

  // Handle "Request Test" for selected items
  const handleRequestTest = async () => {
    try {
      const requestPromises = selectedRates.map(async (rate) => {
        const correspondingTest = testsData.find(test => test.rateCustomerId === `${customerData._id}hi${rate._id}`);

        const testStatus = correspondingTest ? correspondingTest.testStatus : rate.status; // Use rate status if no test found
        const testReason = 'Requested'; // Or set a different reason as needed

        return axiosInstance.post(`v3/api/tests`, {
          rateId: rate._id,
          customerId: customerData._id,
          rateCustomerId: `${customerData._id}hi${rate._id}`,
          testStatus: "test requested",
          testReason: testReason,
        });
      });

      await Promise.all(requestPromises);
      alert('Tests Requested Successfully');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error('Error requesting tests:', error);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (rate) => {
    if (selectedRates.some(item => item._id === rate._id)) {
      setSelectedRates(selectedRates.filter(item => item._id !== rate._id));
    } else {
      setSelectedRates([...selectedRates, rate]);
    }
  };

  // Combine rates and tests data
  const combinedData = myRatesData.map(rate => {
    const test = testsData.find(test => test.rateCustomerId === `${customerData._id}hi${rate._id}`);
    return {
      ...rate,
      testStatus: test ? test.testStatus : rate.status, // Use rate status if no test found
      testReason: test ? test.testReason : 'N/A',
    };
  });

  const filteredData = combinedData.filter(item =>
    item.country?.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'all' || item.testStatus === statusFilter)
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'countryName') {
      return a.country.localeCompare(b.country);
    }
    return a.countryCode.localeCompare(b.countryCode); // Default sort by country code
  });

  const displayedData = sortedData;

  return (
    <DashboardLayout>
      <div className="p-6 text-gray-800">
        <div className="flex justify-between items-start w-full">
          <h2 className="text-2xl font-bold">My Rate</h2>
          {customerData && (
            <div className="flex flex-col items-end">
              <p className="text-gray-800 font-regular">
                Company Name: <span className="text-gray-600 font-bold">{customerData.companyName}</span>
              </p>
              <p className="text-gray-800 font-regular mt-1">
                Customer ID: <span className="text-gray-600 font-bold">{customerData.customerId}</span>
              </p>
            </div>
          )}
        </div>
        <p className="text-gray-600 mt-2">Manage your rates here.</p>

        {/* Title Bar with Search and Sort */}
        <div className="mt-8 flex items-center justify-between space-x-4">
          {/* Search Bar Section */}
          <div className="relative w-1/2 flex items-center">
            <input
              type="text"
              placeholder="Search by country name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
              className="ml-2 bg-orange text-white px-4 py-2 rounded-lg hover:bg-[#f0c14b] transition"
            >
              Search
            </button>
          </div>

          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="Test Requested">Test Requested</option>
            <option value="No Test Requested">No Test Requested</option>
          </select>

       
          {!showCheckboxes && (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowCheckboxes(true)}
            >
              Select Rates
            </button>
          )}
        </div>

        {/* Loading State or No Data Found */}
        {loading ? (
          <p>Loading rates...</p>
        ) : dataNotFound ? (
          <p>No data found.</p>
        ) : (
          <table className="min-w-full mt-6 rateTable border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#005F73] text-white">
                {showCheckboxes && <th className="border border-gray-300"></th>}
                <th className="border border-gray-300 px-4 py-2">Country Code</th>
                <th className="border border-gray-300 px-4 py-2">Country Name</th>
                <th className="border border-gray-300 px-4 py-2">Quality Description</th>
                <th className="border border-gray-300 px-4 py-2">Rate</th>
                <th className="border border-gray-300 px-4 py-2">Profile</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((rate) => (
                <tr key={rate._id} className="text-gray-700">
                  {showCheckboxes && (
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(rate)}
                      />
                    </td>
                  )}
                  <td className="border border-gray-300 px-4 py-2">{rate.countryCode}</td>
                  <td className="border border-gray-300 px-4 py-2">{rate.country}</td>
                  <td className="border border-gray-300 px-4 py-2">{rate.qualityDescription}</td>
                  <td className="border border-gray-300 px-4 py-2">{rate.rate}</td>
                  <td className="border border-gray-300 px-4 py-2">{rate.profile}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white ${
                        rate.testStatus === 'Test Requested' ? 'bg-yellow-400' : 'bg-green-500'
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
      </div>
    </DashboardLayout>
  );
};

export default MyRatesPage;
