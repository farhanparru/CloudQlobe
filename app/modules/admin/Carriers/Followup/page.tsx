"use client"; // Ensure this is at the very top
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Sample data
const sampleData = {
  calls: [
    { customerId: 'C001', time: '10:00 AM', date: '2024-10-12', status: 'Completed' },
    { customerId: 'C002', time: '11:00 AM', date: '2024-10-12', status: 'In Progress' },
  ],
  emails: [
    { customerId: 'E001', time: '09:30 AM', date: '2024-10-12', status: 'Sent' },
    { customerId: 'E002', time: '10:30 AM', date: '2024-10-12', status: 'Pending' },
  ],
  chats: [
    { customerId: 'H001', time: '09:00 AM', date: '2024-10-12', status: 'Resolved' },
    { customerId: 'H002', time: '11:30 AM', date: '2024-10-12', status: 'Pending' },
  ],
};

// Row Component
const DataRow = ({ item, onClick }) => {
  return (
    <tr
      className="hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
      role="button" // For accessibility
      tabIndex={0} // Allow keyboard navigation
      onKeyPress={(e) => { if (e.key === 'Enter') onClick(); }} // Trigger on Enter key
    >
      <td className="py-2 border-b">{item.customerId}</td>
      <td className="py-2 border-b">{item.time}</td>
      <td className="py-2 border-b">{item.date}</td>
      <td className={`py-2 border-b font-bold ${item.status === 'Completed' ? 'text-green-500' : item.status === 'In Progress' ? 'text-yellow-500' : 'text-gray-500'}`}>
        {item.status}
      </td>
    </tr>
  );
};

const FollowUp = () => {
  const router = useRouter(); // Initialize useRouter
  const [activeTab, setActiveTab] = useState('calls');

  const handleRowClick = () => {
    console.log('Row clicked'); // Debugging log
    router.push(`/modules/admin/Support/FollowUp/detail`);
  };

  const renderTabContent = () => {
    return (
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 border-b"onClick={handleRowClick}>Customer ID</th>
            <th className="py-2 border-b">Time</th>
            <th className="py-2 border-b">Date</th>
            <th className="py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleData[activeTab].map((item, index) => (
            <DataRow key={index} item={item} onClick={handleRowClick} />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-8 bg-gray-50 text-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Follow-up</h2>
      <p className="text-gray-600 mb-6">View and manage follow-up tasks here.</p>

      {/* Tabs Navigation */}
      <div className="flex mb-4 border-b">
        {['calls', 'emails', 'chats'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 border-b-2 transition duration-300 ${
              activeTab === tab ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-700'
            }`}
          >
            {tab?.charAt(0)?.toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="overflow-x-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FollowUp;
