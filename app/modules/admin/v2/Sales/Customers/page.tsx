"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Layout from '../../layout/page';
import axiosInstance from '../../utils/axiosinstance';


interface Customer {
  customerId: string;
  companyName: string;
  companyEmail: string;
  contactPerson: string;
  country: string;
  companyPhone: string;
  address: string;
  companyWebsite?: string;
  userFirstname: string;
  userLastname: string;
  username: string;
  userEmail: string;
  userMobile: string;
  password: string;
  supportEmail: string;
  sipSupport?: boolean;
  codex?: string[];
  ipdbid?: string[];
  createdAt: Date;
  customerType: string;
  customerStatus: string;
  leadStatus: string;
  leadType?: string;
  cartId?: string;
  ticketsId?: string[];
  followupStatus?: string;
  privateRateId?: string;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('customerId');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'leadDetails' | 'followUp'>('leadDetails'); // Active Tab
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('v3/api/customers');
        const filteredCustomers = response.data.filter(customer => customer.customerType === 'Customer');
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleSort = (field: string) => setSort(field);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  const handleRowClick = (customerId: string) => router.push(`/modules/admin/v2/Sales/Customers/${customerId}`);

  const handleAddLead = () => router.push('/modules/admin/Leads/AddLead');

  const filteredAndSortedCustomers = customers
    .filter(customer =>
      Object.values(customer).some(value =>
        Array.isArray(value)
          ? value.join(', ').toLowerCase().includes(search.toLowerCase())
          : value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sort] || '';
      const bValue = b[sort] || '';
      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue);
      } else if (Array.isArray(aValue)) {
        return aValue.join(', ').localeCompare(bValue.join(', '));
      }
      return 0;
    });

  return (
    <Layout>
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-black">Customer Management</h1>
      <p className="text-gray-600 mb-6">Manage Customers here.</p>

      {/* Add Lead Button */}
     

      {/* Tab Navigation */}
      <div className="mb-6">
        {/* <button
          onClick={() => setActiveTab('leadDetails')}
          className={`px-4 py-2 ${activeTab === 'leadDetails' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-t-lg`}
        >
          Lead Details
        </button>
        <button
          onClick={() => setActiveTab('followUp')}
          className={`px-4 py-2 ${activeTab === 'followUp' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-t-lg`}
        >
          Follow-Up
        </button> */}
      </div>

      {/* Tab Content */}
      {activeTab === 'leadDetails' && (
        <div>
      <div className="mb-4 flex">
  <input
    type="text"
    value={search}
    onChange={handleSearch}
    placeholder="Search by any parameter..."
    className="flex-grow bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
  <button
    onClick={() => {handleSearch}} // Update this to your search function
    className="bg-orange-500 text-white px-8 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    Search
  </button>
</div>

          {loading ? (
            <p className="text-center text-black">Loading...</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full table-auto ">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('customerId')}>Customer ID</th>
                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('companyName')}>Company Name</th>
                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('contactPerson')}>Contact Person</th>
                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('country')}>Country</th>
                    {/* <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('leadStatus')}>Lead Status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedCustomers.map((customer, index) => (
                   <tr
                   key={index}
                   className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer transition duration-200"
                   onClick={() => handleRowClick(customer._id)}
                 >
                   <td className="py-3 px-4 text-gray-800 border-r border-gray-300">{customer.customerId}</td>
                   <td className="py-3 px-4 text-gray-800 border-r border-gray-300">{customer.companyName}</td>
                   <td className="py-3 px-4 text-gray-800 border-r border-gray-300">{customer.contactPerson}</td>
                   <td className="py-3 px-4 text-gray-800">{customer.country}</td>
                   {/* <td className="py-3 px-4 text-gray-800">{customer.leadStatus}</td> */}
                 </tr>
                 
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'followUp' && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Follow-Up Actions</h2>
          {/* Placeholder for Follow-Up content, can be enhanced further */}
          <p className="text-gray-600">Here you can manage follow-up actions related to your leads.</p>
          {/* Add more follow-up specific content here */}
        </div>
      )}
    </div></Layout>
  );
};

export default CustomersPage;
