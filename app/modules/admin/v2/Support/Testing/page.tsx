"use client"; // Ensure this is at the top
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/modules/admin/utils/axiosinstance";
import DashboardLayout from "../../layout/page";

const TestingPage = () => {
  const [testsData, setTestsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [ratesData, setRatesData] = useState([]); // New state for rates data
  const [openCustomerId, setOpenCustomerId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  // Fetch customer details
  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const response = await axiosInstance.get("v3/api/customers");
        setCustomersData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomersData();
  }, []);

  // Fetch test data
  useEffect(() => {
    const fetchTestsData = async () => {
      try {
        const response = await axiosInstance.get("v3/api/tests");
        setTestsData(response.data);
      } catch (error) {
        console.error("Error fetching tests data:", error);
      }
    };

    fetchTestsData();
  }, []);

  // Fetch rates data
  useEffect(() => {
    const fetchRatesData = async () => {
      try {
        const response = await axiosInstance.get("v3/api/rates");
        setRatesData(response.data);
      } catch (error) {
        console.error("Error fetching rates data:", error);
      }
    };

    fetchRatesData();
  }, []);

  // Find customer by customerId from the test data
  const findCustomerById = (customerId) => {
    return customersData.find((customer) => customer._id === customerId) || {};
  };

  // Find test details by customer ID
  const findTestsByCustomerId = (customerId) => {
    return testsData.filter((test) => test.customerId === customerId);
  };

  // Find rate details by rateId from the rates data
  const findRateById = (rateId) => {
    return ratesData.find((rate) => rate._id === rateId) || {};
  };

  // Toggle the collapsible section
  const toggleCustomerView = (customerId) => {
    setOpenCustomerId(openCustomerId === customerId ? null : customerId);
  };

  // Handle status update
  const handleStatusUpdate = async (testId) => {
    try {
      await axiosInstance.put(`v3/api/tests/${testId}`, { testStatus: newStatus, testReason: reason });
      alert("Status and reason updated successfully!");
      setIsModalOpen(false); // Close the modal after updating
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Open modal for status update
  const openModal = (testId) => {
    setSelectedTest(testId);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 text-gray-800">
        <h2 className="text-2xl font-bold">Testing Page</h2>

        {/* Displaying customer details with "Service Engineer" and "Test Status" */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">Customer ID</th>
                <th className="py-2 px-4 border-b border-gray-300">Company Name</th>
                <th className="py-2 px-4 border-b border-gray-300">Service Engineer</th>
                <th className="py-2 px-4 border-b border-gray-300">Status</th>
                <th className="py-2 px-4 border-b border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((customer) => {
                const tests = findTestsByCustomerId(customer._id);
                const testStatus = tests.length > 0 ? tests[0].testStatus : "Test Initiated"; // Default status
                return (
                  <React.Fragment key={customer._id}>
                    <tr className="hover:bg-green-200 transition duration-200">
                      <td className="py-2 px-4 border-b border-gray-300">{customer.customerId}</td>
                      <td className="py-2 px-4 border-b border-gray-300">{customer.companyName || "N/A"}</td>
                      <td className="py-2 px-4 border-b border-gray-300">Not assigned</td>
                      <td className="py-2 px-4 border-b border-gray-300">{testStatus}</td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                          onClick={() => toggleCustomerView(customer._id)}
                        >
                          {openCustomerId === customer._id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {/* Collapsible section for rate details and status change */}
                    {openCustomerId === customer._id && (
                      <tr>
                        <td colSpan="5" className="py-4 px-4 border-b border-gray-300">
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold">Rates for {customer.companyName}</h3>
                            <div className="mt-4">
                              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                <thead className="bg-green-500 text-white">
                                  <tr>
                                    <th className="py-2 px-4 border-b border-gray-300">Country Code</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Country</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Price</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Description</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Profile</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Status</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Test Status</th>
                                    <th className="py-2 px-4 border-b border-gray-300">Change Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tests.map((test) => {
                                    const rate = findRateById(test.rateId); // Get rate details using rateId
                                    const testStatus = test.testStatus || "N/A"; // Get the test status for the current test
                                    return (
                                      <tr key={test._id}>
                                        <td className="py-2 px-4 border-b border-gray-300">{rate.countryCode || "N/A"}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{rate.country || "N/A"}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{rate.rate || "N/A"}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{rate.qualityDescription || "N/A"}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{rate.profile || "N/A"}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{rate.status || "N/A"}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{testStatus}</td> {/* Display the test status */}
                                        <td className="py-2 px-4 border-b border-gray-300">
                                          <button
                                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() => openModal(test._id)}
                                          >
                                            Update
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for status update */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Update Test Status</h3>
            <label className="block mb-2">Status</label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Test Accepted">Test Accepted</option>
              <option value="Test Started">Test Started</option>
              <option value="Processing">Test Processing</option>
              <option value="Completed">Test Completed</option>
              <option value="Failed">Test Failed</option>
            </select>

            <label className="block mb-2">Reason</label>
            <textarea
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>

            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleStatusUpdate(selectedTest)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TestingPage;
