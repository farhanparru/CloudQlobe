"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosinstance';

const TestingPage = () => {
  const [customerRateData, setCustomerRateData] = useState([]);
  const [testStatus, setTestStatus] = useState({});

  // Fetch customer data from the backend
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axiosInstance.get('v3/api/customers'); // Adjust the API endpoint as necessary
        const data = response.data;

        // Create an array to hold customer-rate combinations
        const combinedData = [];

        // Filter customers who have rateAddedtotest content
        const filteredCustomers = data.filter(customer => customer.rateAddedtotest.length > 0);

        for (const customer of filteredCustomers) {
          for (const rateId of customer.rateAddedtotest) {
            const rateResponse = await axiosInstance.get(`v3/api/rates/${rateId}`); // Fetch rate details
            const rate = rateResponse.data;

            combinedData.push({
              customerId: customer.customerId,
              companyName: customer.companyName,
              country: customer.country,
              rateId: rate._id,
              countryCode: rate.countryCode,
              rateCountry: rate.country,
              rate: rate.rate,
              customerIdRef: customer._id,
            });
          }
        }

        setCustomerRateData(combinedData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  // Approve test request, move rateId from rateAddedtotest to rateTesting
  const handleApproveTestRequest = async (rateId, customerId) => {
    try {
      // Update customer on the backend
      await axiosInstance.post(`/v3/api/customers/${customerId}/start-test`, { rateId });

      // Update local state
      setTestStatus(prevStatus => ({
        ...prevStatus,
        [rateId]: 'Test initiated'
      }));

      // After 2 minutes, move rateId to rateTested and update message
      setTimeout(async () => {
        await axiosInstance.post(`/v3/api/customers/${customerId}/complete-test`, { rateId });

        setTestStatus(prevStatus => ({
          ...prevStatus,
          [rateId]: 'Test over'
        }));
      }, 2 * 60 * 1000); // 2 minutes delay
    } catch (error) {
      console.error('Error approving test request:', error);
    }
  };

  // Stop testing manually
  const handleStopTestRequest = async (rateId, customerId) => {
    try {
      // Manually stop the test by moving rateId to rateTested
      await axiosInstance.post(`/v3/api/customers/${customerId}/complete-test`, { rateId });

      // Update local state
      setTestStatus(prevStatus => ({
        ...prevStatus,
        [rateId]: 'Test over (manually stopped)'
      }));
    } catch (error) {
      console.error('Error stopping test request:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-900">
      <h2 className="text-xl font-bold">Customer Management</h2>
      <p className="text-gray-600 mt-2">Manage customer data and approve test requests.</p>

      {/* Data Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Customer ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Company Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Country</th>
              <th className="py-2 px-4 border-b border-gray-200">Rate Country Code</th>
              <th className="py-2 px-4 border-b border-gray-200">Rate Country</th>
              <th className="py-2 px-4 border-b border-gray-200">Rate (USD)</th>
              <th className="py-2 px-4 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {customerRateData.length > 0 ? (
              customerRateData.map((data) => (
                <tr key={data.rateId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200">{data.customerId}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{data.companyName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{data.country}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{data.countryCode}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{data.rateCountry}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{data.rate}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {testStatus[data.rateId] === 'Test over' ? (
                      <span className="text-green-600">Test over</span>
                    ) : (
                      <>
                        {testStatus[data.rateId] === 'Test initiated' ? (
                          <>
                            <span className="text-blue-600">Test initiated</span>
                            <button
                              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleStopTestRequest(data.rateId, data.customerIdRef)}
                            >
                              Stop Test
                            </button>
                          </>
                        ) : (
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => handleApproveTestRequest(data.rateId, data.customerIdRef)}
                          >
                            Approve Test Request
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No customers with rate added to test.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestingPage;
