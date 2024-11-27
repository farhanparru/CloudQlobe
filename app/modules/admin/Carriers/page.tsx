"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../utils/axiosinstance';

// Define the interface for Carrier data
interface Carrier {
  _id: string;
  companyName: string;
  companyEmail: string;
  contactPerson: string;
  country: string;
  companyPhone: string;
  userFirstname: string;
  userLastname: string;
  username: string;
  userEmail: string;
  userMobile: string;
  sipSupport: string;
  codex: string;
  switchIps: string[];
  customerType: string;
  customerStatus: string;
  leadStatus: string;
  leadType: string;
  customerId: string;
  createdAt: string;
}

const CarriersPage: React.FC = () => {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'name' | 'company' | 'status'>('name');
  const [activeTab, setActiveTab] = useState<'details' | 'followup'>('details'); // State for active tab
  const router = useRouter();

  useEffect(() => {
    // Fetch the carriers from the backend
    const fetchCarriers = async () => {
      try {
        const response = await axiosInstance.get('v3/api/customers/');
        const data = await response.data;
        setCarriers(data);
      } catch (error) {
        console.error('Error fetching carriers:', error);
      }
    };

    fetchCarriers();
  }, []);

  // Filter carriers where customerType is 'carrier'
  const filteredCarriers = carriers
    .filter(carrier => carrier.customerType === 'carrier')
    .filter(carrier =>
      carrier.userFirstname.toLowerCase().includes(search.toLowerCase()) ||
      carrier.companyName.toLowerCase().includes(search.toLowerCase())
    );

  const sortedCarriers = filteredCarriers.sort((a, b) => {
    if (sort === 'name') {
      return a.userFirstname.localeCompare(b.userFirstname);
    } else if (sort === 'company') {
      return a.companyName.localeCompare(b.companyName);
    } else {
      return a.customerStatus.localeCompare(b.customerStatus);
    }
  });

  // Navigate to the carrier's details page
  const handleCarrierClick = (id: string) => {
    router.push(`/modules/admin/Carriers/${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Carriers Management</h1>
      <p className="text-gray-600 mb-6">Manage and configure carriers here.</p>

      <div className="mt-4 flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by carrier or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as 'name' | 'company' | 'status')}
          className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="name">Sort by Name</option>
          <option value="company">Sort by Company</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('details')}
          className={`mr-4 px-4 py-2 rounded-lg ${activeTab === 'details' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Carrier Details
        </button>
        <button
          onClick={() => setActiveTab('followup')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'followup' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Follow Up
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'details' ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Carriers List</h2>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-2 px-4 text-left">Carrier Name</th>
                  <th className="py-2 px-4 text-left">Company</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedCarriers.map((carrier) => (
                  <tr
                    key={carrier._id}
                    className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
                    onClick={() => handleCarrierClick(carrier._id)}
                  >
                    <td className="py-2 px-4">{carrier.userFirstname} {carrier.userLastname}</td>
                    <td className="py-2 px-4">{carrier.companyName}</td>
                    <td className={`py-2 px-4 ${carrier.customerStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {carrier.customerStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Follow-Up Information</h2>
            {/* Implement your follow-up information display here */}
            <p>No follow-up data available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarriersPage;
