"use client";
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import axiosInstance from '../../../utils/axiosinstance';
import Layout from '../../../layout/page';
import { User, Mail, Phone, Globe, MapPin, Calendar, Flag, RefreshCw, AlertTriangle, Briefcase, Users, Link, FileText } from 'lucide-react';

const LeadDetails = () => {
  const [leadData, setLeadData] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();
  const customerId = params?.customerId;
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedLeadInfo, setUpdatedLeadInfo] = useState({});

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axiosInstance.get(`v3/api/customers/${customerId}`);
        setLeadData(response.data);
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
    try {
      await axiosInstance.put(`v3/api/customers/${customerId}`, { customerType: type });
      setSuccessMessage("Conversion successful");
      setLeadData(prev => ({ ...prev, customerType: type }));
    } catch (error) {
      console.error("Error converting lead:", error);
      setError("Failed to convert lead.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLeadInfo({ ...updatedLeadInfo, [name]: value });
  };

  // Handle lead update
  const handleUpdateLead = async () => {
    try {
      const response = await axiosInstance.put(`v3/api/customers/${customerId}`, updatedLeadInfo);
      console.log('Lead updated successfully:', response.data);
      setUpdateModalOpen(false); // Close modal after update
      // Optionally refresh data or update local state
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };
  const handleStatusChange = async () => {
    try {
      await axiosInstance.put(`v3/api/customers/${customerId}`, { leadStatus: newStatus });
      setSuccessMessage("Lead status updated");
      setNewStatus("");
      setLeadData(prev => ({ ...prev, leadStatus: newStatus }));
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update lead status.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">{leadData?.companyName || "Company Name Not Available"}</h1>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p className="font-bold">Success</p>
              <p>{successMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoSection title="Company Information" icon={<Briefcase className="text-orange-500" />}>
              <InfoItem icon={<Globe className="text-blue-500" />} label="Company Name" value={leadData?.companyName || "Not Provided"} />
              <InfoItem icon={<Mail className="text-blue-500" />} label="Company Email" value={leadData?.companyEmail || "Not Provided"} />
              <InfoItem icon={<Phone className="text-blue-500" />} label="Company Phone" value={leadData?.companyPhone || "Not Provided"} />
              <InfoItem icon={<MapPin className="text-blue-500" />} label="Address" value={leadData?.address || "Not Provided"} />
              <InfoItem icon={<Globe className="text-blue-500" />} label="Country" value={leadData?.country || "Not Provided"} />
              <InfoItem 
                icon={<Link className="text-blue-500" />} 
                label="Website" 
                value={
                  leadData?.companyWebsite ? (
                    <a href={leadData.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {leadData.companyWebsite}
                    </a>
                  ) : "Not Provided"
                } 
              />
            </InfoSection>

            <InfoSection title="Contact Information" icon={<Users className="text-orange-500" />}>
              <InfoItem icon={<User className="text-blue-500" />} label="Contact Person" value={leadData?.contactPerson || "Not Provided"} />
              <InfoItem icon={<User className="text-blue-500" />} label="User First Name" value={leadData?.userFirstname || "Not Provided"} />
              <InfoItem icon={<User className="text-blue-500" />} label="User Last Name" value={leadData?.userLastname || "Not Provided"} />
              <InfoItem icon={<Mail className="text-blue-500" />} label="User Email" value={leadData?.userEmail || "Not Provided"} />
              <InfoItem icon={<Phone className="text-blue-500" />} label="User Mobile" value={leadData?.userMobile || "Not Provided"} />
              <InfoItem icon={<Mail className="text-blue-500" />} label="Support Email" value={leadData?.supportEmail || "Not Provided"} />
            </InfoSection>

            <InfoSection title="Lead Details" icon={<Flag className="text-orange-500" />}>
              <InfoItem icon={<Flag className="text-blue-500" />} label="Lead Type" value={leadData?.leadStatus || "Not Provided"} />
              <InfoItem icon={<Flag className="text-blue-500" />} label="User Type" value={leadData?.customerType || "Not Provided"} />
              <InfoItem icon={<Flag className="text-blue-500" />} label="Customer Status" value={  "Not Provided"} />
              <InfoItem icon={<Flag className="text-blue-500" />} label="Follow Up Status" value={  "Not Provided"} />
              <InfoItem icon={<Calendar className="text-blue-500" />} label="Created At" value={leadData?.createdAt ? new Date(leadData.createdAt).toLocaleString() : "Not Provided"} />
            </InfoSection>

            <InfoSection title="Technical Details" icon={<FileText className="text-orange-500" />}>
              <InfoItem icon={<Globe className="text-blue-500" />} label="SIP Support" value={leadData?.sipSupport || "Not Provided"} />
              <InfoItem icon={<FileText className="text-blue-500" />} label="Codex" value={leadData?.codex || "Not Provided"} />
              <InfoItem icon={<Globe className="text-blue-500" />} label="Switch IPs" value={leadData?.switchIps?.length > 0 ? leadData.switchIps.join(', ') : "No IPs Available"} />
              <InfoItem icon={<FileText className="text-blue-500" />} label="My Rates IDs" value={ "No Rates Available"} />
              <InfoItem icon={<FileText className="text-blue-500" />} label="Tickets IDs" value={ "No Tickets Available"} />
            </InfoSection>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lead Actions</h2>
            <div className="space-y-6">
              <div>
                  <div className="flex justify-end mt-4">
    <button 
      onClick={() => setUpdateModalOpen(true)} 
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >



      Update Details
    </button>
{/* Update Lead Modal */}
{updateModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-4/5 overflow-hidden">
      <h2 className="text-lg font-bold mb-4">Update Lead</h2>
      <div className="flex h-full">
        {/* Left Column */}
        <div className="w-1/2 p-2 overflow-y-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateLead(); }}>
            {/* Company Name */}
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input 
                type="text" 
                name="companyName" 
                value={updatedLeadInfo.companyName || leadData?.companyName || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Contact Person */}
            <div className="mb-4">
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input 
                type="text" 
                name="contactPerson" 
                value={updatedLeadInfo.contactPerson || leadData?.contactPerson || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Company Email */}
            <div className="mb-4">
              <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700">Company Email</label>
              <input 
                type="email" 
                name="companyEmail" 
                value={updatedLeadInfo.companyEmail || leadData?.companyEmail || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Company Phone */}
            <div className="mb-4">
              <label htmlFor="companyPhone" className="block text-sm font-medium text-gray-700">Company Phone</label>
              <input 
                type="text" 
                name="companyPhone" 
                value={updatedLeadInfo.companyPhone || leadData?.companyPhone || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input 
                type="text" 
                name="address" 
                value={updatedLeadInfo.address || leadData?.address || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Country */}
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input 
                type="text" 
                name="country" 
                value={updatedLeadInfo.country || leadData?.country || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        {/* Right Column */}
        <div className="w-1/2 p-2 overflow-y-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateLead(); }}>
            {/* User First Name */}
            <div className="mb-4">
              <label htmlFor="userFirstname" className="block text-sm font-medium text-gray-700">User First Name</label>
              <input 
                type="text" 
                name="userFirstname" 
                value={updatedLeadInfo.userFirstname || leadData?.userFirstname || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* User Last Name */}
            <div className="mb-4">
              <label htmlFor="userLastname" className="block text-sm font-medium text-gray-700">User Last Name</label>
              <input 
                type="text" 
                name="userLastname" 
                value={updatedLeadInfo.userLastname || leadData?.userLastname || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* User Email */}
            <div className="mb-4">
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">User Email</label>
              <input 
                type="email" 
                name="userEmail" 
                value={updatedLeadInfo.userEmail || leadData?.userEmail || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* User Mobile */}
            <div className="mb-4">
              <label htmlFor="userMobile" className="block text-sm font-medium text-gray-700">User Mobile</label>
              <input 
                type="text" 
                name="userMobile" 
                value={updatedLeadInfo.userMobile || leadData?.userMobile || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Support Email */}
            <div className="mb-4">
              <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700">Support Email</label>
              <input 
                type="email" 
                name="supportEmail" 
                value={updatedLeadInfo.supportEmail || leadData?.supportEmail || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Codex */}
            <div className="mb-4">
              <label htmlFor="codex" className="block text-sm font-medium text-gray-700">Codex</label>
              <input 
                type="text" 
                name="codex" 
                value={updatedLeadInfo.codex || leadData?.codex || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* SIP Support */}
            <div className="mb-4">
              <label htmlFor="sipSupport" className="block text-sm font-medium text-gray-700">SIP Support</label>
              <input 
                type="text" 
                name="sipSupport" 
                value={updatedLeadInfo.sipSupport || leadData?.sipSupport || ""}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Switch IPs */}
            <div className="mb-4">
              <label htmlFor="switchIps" className="block text-sm font-medium text-gray-700">Switch IPs</label>
              <input 
                type="text" 
                name="switchIps" 
                value={updatedLeadInfo.switchIps || (leadData?.switchIps?.join(', ') || "")}
                onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setUpdateModalOpen(false)} 
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
                <h3 className="text-lg font-semibold mb-2">Conversion Options</h3>
                <div className="flex space-x-4">
                  <button onClick={() => handleConversion("Customer")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Convert to Customer
                  </button>
                  {/* <button onClick={() => handleConversion("Carrier")} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                    Convert to Carrier
                  </button> */}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Change Lead Status</h3>
                <div className="flex items-center space-x-4">
                  <select 
                    value={newStatus} 
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="new">New</option>
                    <option value="hot">Hot</option>
                    <option value="dead">Dead</option>
                    <option value="junk">Junk</option>
                  </select>
                  <button onClick={handleStatusChange} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Change Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const InfoSection = ({ title, icon, children }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
      {icon}
      <span className="ml-2">{title}</span>
    </h2>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="text-sm text-gray-900">{value}</div>
    </div>
  </div>
);

export default LeadDetails;