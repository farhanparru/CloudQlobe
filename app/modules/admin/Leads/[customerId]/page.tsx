"use client";
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosinstance";

const LeadDetails = () => {
  const [leadData, setLeadData] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();
  const customerId = params?.customerId;

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axiosInstance.get(`v3/api/customers/${customerId}`);
        setLeadData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching lead details:", error);
        setError("Failed to fetch lead details.");
      } finally {
        setLoading(false);
      }
    };
    
    if (customerId) fetchLeadData();
    
    return () => {
      setLeadData(null);
      setError(null);
      setSuccessMessage("");
    };
  }, [customerId]);

  const handleConversion = async (type) => {
    console.log(`Attempting to convert to: ${type}`);
    try {
      console.log(customerId);
      const response = await axiosInstance.put(`v3/api/customers/${customerId}`, { customerType: type });
      console.log("Conversion response:", response);
      setSuccessMessage("Conversion successful");
      setLeadData(prev => ({ ...prev, customerType: type })); // Update local state if needed
    } catch (error) {
      console.error("Error converting lead:", error);
      setError("Failed to convert lead.");
    }
  };

  const handleStatusChange = async () => {
    console.log(`Attempting to change status to: ${newStatus}`);
    try {
      const response = await axiosInstance.put(`v3/api/customers/${customerId}`, { leadStatus: newStatus });
      console.log("Status change response:", response);
      setSuccessMessage("Lead status updated");
      setNewStatus("");
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update lead status.");
    }
  };

 // if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Lead Details: {leadData?.companyName}</h1>
      
      {/* Error Message */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      {/* Success Message */}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

      {/* Display Lead Info */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Lead Information</h2>
        <p><strong>Contact Person:</strong> {leadData?.contactPerson}</p>
        <p><strong>Company Email:</strong> {leadData?.companyEmail}</p>
        <p><strong>Company Phone:</strong> {leadData?.companyPhone}</p>
        <p><strong>Country:</strong> {leadData?.country}</p>
        <p><strong>Address:</strong> {leadData?.address}</p>
        <p><strong>Website:</strong> <a href={leadData?.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{leadData?.companyWebsite}</a></p>
        {/* <p><strong>Customer ID:</strong> {leadData?.customerId}</p> */}
        {/* <p><strong>Lead Status:</strong> {leadData?.leadStatus}</p> */}
        <p><strong>Lead Type:</strong> {leadData?.leadStatus}</p>
        <p><strong>Created At:</strong> {leadData && new Date(leadData.createdAt).toLocaleString()}</p>
      </div>

      {/* Conversion Options */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Conversion Options</h2>
        <button 
          onClick={() => handleConversion("Customer")} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 mr-4"
        >
          Convert to Customer
        </button>
        <button 
          onClick={() => handleConversion("Carrier")} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Convert to Carrier
        </button>
      </div>

      {/* Status Change Option */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Change Lead Status</h2>
        <select 
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="bg-gray-100 px-4 py-2 rounded-lg w-full mb-4"
        >
          <option value="">Select Status</option>
          <option value="new">New</option>
          <option value="hot">Hot</option>
          <option value="dead">Dead</option>
          <option value="junk">Junk</option>
        </select>
        <button 
          onClick={handleStatusChange} 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Change Status
        </button>
      </div>
    </div>
  );
};

export default LeadDetails;
