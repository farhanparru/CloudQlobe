"use client"; // Ensure this is at the very top
import React, { useState } from 'react';
import TroubleTickets from '../TroubleTickets/page';
import Testing from './Testing/page';
import FollowUp from './FollowUp/page';
import SupportTask from './SupportTask/page';

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('trouble-tickets');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trouble-tickets':
        return <TroubleTickets />;
      case 'testing':
        return <Testing />;
      case 'follow-up':
        return <FollowUp />;
      case 'support-task':
        return <SupportTask />;
      default:
        return <TroubleTickets />;
    }
  };

  return (
    <div className="p-8 bg-gray-50 text-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Support Page</h1>
      <div className="flex mb-6 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('trouble-tickets')}
          className={`px-4 py-2 transition-colors duration-300 rounded-t-lg ${activeTab === 'trouble-tickets' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500`}
        >
          Trouble Tickets
        </button>
        <button
          onClick={() => setActiveTab('testing')}
          className={`px-4 py-2 transition-colors duration-300 rounded-t-lg ${activeTab === 'testing' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 ml-2`}
        >
          Testing
        </button>
        <button
          onClick={() => setActiveTab('follow-up')}
          className={`px-4 py-2 transition-colors duration-300 rounded-t-lg ${activeTab === 'follow-up' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 ml-2`}
        >
          Follow-up
        </button>
        <button
          onClick={() => setActiveTab('support-task')}
          className={`px-4 py-2 transition-colors duration-300 rounded-t-lg ${activeTab === 'support-task' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 ml-2`}
        >
          Support Task
        </button>
      </div>

      {/* Render active tab content */}
      {renderTabContent()}
    </div>
  );
};

export default SupportPage;
