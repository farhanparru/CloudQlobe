"use client";

import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import { useRouter } from 'next/navigation';

const AddCustomerPage = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    companyEmail: '',
    contactPerson: '',
    country: '',
    companyPhone: '',
    address: '',
    companyWebsite: '',
  });

  const [userDetails, setUserDetails] = useState({
    userFirstname: '',
    userLastname: '',
    username: '',
    userEmail: '',
    userMobile: '',
    password: '',
  });

  const [technicalDetails, setTechnicalDetails] = useState({
    supportEmail: '',
    sipSupport: '',
    codex: '',
    ipAddresses: [''], // Allow up to 30 IP addresses
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const { name, value } = event.target;

    if (category === 'company') {
      setCompanyDetails({ ...companyDetails, [name]: value });
    } else if (category === 'user') {
      setUserDetails({ ...userDetails, [name]: value });
    } else if (category === 'technical') {
      setTechnicalDetails({ ...technicalDetails, [name]: value });
    }
  };

  const handleAddIPAddress = () => {
    if (technicalDetails.ipAddresses.length < 30) {
      setTechnicalDetails({ ...technicalDetails, ipAddresses: [...technicalDetails.ipAddresses, ''] });
    }
  };

  const handleIPAddressChange = (index: number, value: string) => {
    const newIPs = [...technicalDetails.ipAddresses];
    newIPs[index] = value;
    setTechnicalDetails({ ...technicalDetails, ipAddresses: newIPs });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Merge all details into a single object
      const mergedData = {
        ...companyDetails,
        ...userDetails,
        ...technicalDetails,
      };

      const response = await axiosInstance.post('v3/api/customers', mergedData);
      console.log(response.data); // Handle the response from the backend
      router.push('/modules/admin/Dashboard'); // Redirect to customers page
    } catch (error) {
      console.error('Error adding customer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Add New Customer</h1>

      <form onSubmit={handleSubmit}>
        {/* Company Details */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Company Details</h2>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={companyDetails.companyName}
          onChange={(e) => handleChange(e, 'company')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="email"
          name="companyEmail"
          placeholder="Company Email"
          value={companyDetails.companyEmail}
          onChange={(e) => handleChange(e, 'company')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          value={companyDetails.contactPerson}
          onChange={(e) => handleChange(e, 'company')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={companyDetails.country}
          onChange={(e) => handleChange(e, 'company')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="companyPhone"
          placeholder="Company Phone"
          value={companyDetails.companyPhone}
          onChange={(e) => handleChange(e, 'company')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={companyDetails.address}
          onChange={(e) => handleChange(e, 'company')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="companyWebsite"
          placeholder="Company Website"
          value={companyDetails.companyWebsite}
          onChange={(e) => handleChange(e, 'company')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />

        {/* User Details */}
        <h2 className="text-xl font-semibold mt-6 mb-2">User Details</h2>
        <input
          type="text"
          name="userFirstname"
          placeholder="First Name"
          value={userDetails.userFirstname}
          onChange={(e) => handleChange(e, 'user')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="userLastname"
          placeholder="Last Name"
          value={userDetails.userLastname}
          onChange={(e) => handleChange(e, 'user')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userDetails.username}
          onChange={(e) => handleChange(e, 'user')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="email"
          name="userEmail"
          placeholder="User Email"
          value={userDetails.userEmail}
          onChange={(e) => handleChange(e, 'user')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="userMobile"
          placeholder="User Mobile"
          value={userDetails.userMobile}
          onChange={(e) => handleChange(e, 'user')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={(e) => handleChange(e, 'user')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />

        {/* Technical Information */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Technical Information</h2>
        <input
          type="email"
          name="supportEmail"
          placeholder="Support Email"
          value={technicalDetails.supportEmail}
          onChange={(e) => handleChange(e, 'technical')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="sipSupport"
          placeholder="SIP Support"
          value={technicalDetails.sipSupport}
          onChange={(e) => handleChange(e, 'technical')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="codex"
          placeholder="Codex"
          value={technicalDetails.codex}
          onChange={(e) => handleChange(e, 'technical')}
          className="mb-4 w-full border border-gray-300 p-2 rounded"
          required
        />

        <h3 className="text-lg font-semibold mb-2">IP Addresses</h3>
        {technicalDetails.ipAddresses.map((ip, index) => (
          <input
            key={index}
            type="text"
            placeholder={`IP Address ${index + 1}`}
            value={ip}
            onChange={(e) => handleIPAddressChange(index, e.target.value)}
            className="mb-2 w-full border border-gray-300 p-2 rounded"
          />
        ))}
        <button type="button" onClick={handleAddIPAddress} className="mb-4 text-blue-600">
          Add IP Address
        </button>

        <button
          type="submit"
          className={`mt-4 w-full bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
};

export default AddCustomerPage;
