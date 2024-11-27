"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../layout/page';
import axiosInstance from '../../../utils/axiosinstance';
const FollowUp = () => {
  const router = useRouter(); // Initialize useRouter
  const [activeTab, setActiveTab] = useState('calls');
  const [followUpData, setFollowUpData] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigate to the add follow-up page
 

  // Fetch follow-up data and then fetch customer data based on customerId
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch follow-up data
        const followUpsResponse = await axiosInstance.get('v3/api/followups'); // Adjust the endpoint as necessary
        setFollowUpData(followUpsResponse.data);

        // Step 2: Prepare a list of customer IDs to fetch
        const customerIds = [...new Set(followUpsResponse.data.map(item => item.customerId))];

        // Step 3: Fetch customer data for each customerId
        const customers = {};
        for (const customerId of customerIds) {
          const response = await axiosInstance.get(`v3/api/customers/${customerId}`); // Assuming this endpoint fetches a single customer by ID
          customers[customerId] = response.data;
        }
        setCustomerData(customers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTabContent = () => {
    if (loading) {
      return <div className="text-center py-4 text-gray-600">Loading...</div>;
    }

    if (error) {
      return <div className="text-center py-4 text-gray-600">Error fetching data: {error}</div>;
    }
    const excludedCategories = ['General', 'Sales', 'Carriers', 'Leads'];
    // Filter follow-ups based on the active tab
    const filteredFollowUps = followUpData.filter(item => item.followupMethod === activeTab && !excludedCategories.includes(item.followupCategory));

    if (filteredFollowUps.length === 0) {
      return (
        <div className="text-center py-4 text-gray-600">
          No data available for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </div>
      );
    }

    return (
      <table className="min-w-full mt-4 bg-white border shadow-lg border-gray-300">
        <thead >
          <tr className = "bg-blue-500 rounded-lg text-white ">
            <th className="border px-4 py-2">Customer ID</th>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Follow-Up Type</th>
            <th className="border px-4 py-2">Follow-Up Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFollowUps.map((followUp) => {
            // Find customer details based on customerId
            const customer = customerData[followUp.customerId] || {}; // Access customer data using customerId

            return (
              <tr
                key={followUp.id} // Use a unique identifier for the key (e.g., followUp.id)
                className="cursor-pointer hover:bg-gray-100" // Add hover effect for rows
                onClick={() => router.push(`/modules/admin/v2/Support/FollowUps/FollowupDetails/${followUp.id}`)} // Navigate to details page
              >
                <td className="border px-4 py-2">{customer.customerId || 'N/A'}</td>
                <td className="border px-4 py-2">
                  <a
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click from triggering
                      router.push(`/modules/admin/v2/Support/FollowUps/${followUp._id}`); // Link to customer details
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.companyName || 'N/A'}
                  </a>
                </td>
                <td className="border px-4 py-2">{followUp.followupMethod?.charAt(0).toUpperCase() + followUp.followupMethod.slice(1)}</td>
                <td className="border px-4 py-2">{followUp.followupStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <Layout>
    <div className="p-8  text-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Trouble Ticket</h2>
      <p className="text-gray-600 mb-6">View and manage Trouble here.</p>

      {/* Add Follow-up Button */}
    
      {/* Tabs Navigation */}
    {/* Tabs Navigation */}
<div className="flex justify-center mb-6">
  {['call', 'email', 'chat'].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`relative flex-1 text-center py-3 transition-colors duration-300 focus:outline-none ${
        activeTab === tab
          ? 'text-black-600 font-bold'
          : 'text-white-500 hover:text-orange-600'
      }`}
    >
      {tab?.charAt(0).toUpperCase() + tab.slice(1)}

      {/* Active Tab Indicator */}
      {activeTab === tab && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-orange-600 rounded-t-lg transition-all duration-300"></span>
      )}
    </button>
  ))}
</div>


      {/* Tab Content */}
      <div className="overflow-x-auto">{renderTabContent()}</div>
    </div></Layout>
  );
};

export default FollowUp;
