"use client"
import React, { useState } from 'react';
import TestingPage from '../Testing/tabs/testing';
import TestdPage from './tabs/tested';
const TestingTabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'management' | 'ongoing'>('management');

  const handleTabClick = (tab: 'management' | 'ongoing') => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Tab header */}
      <div className="flex justify-around mb-6">
        <button
          className={`w-full py-2 font-semibold text-lg text-center transition-colors duration-300 ${
            activeTab === 'management'
              ? 'border-b-4 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
          onClick={() => handleTabClick('management')}
        >
          Test Management
        </button>
        <button
          className={`w-full py-2 font-semibold text-lg text-center transition-colors duration-300 ${
            activeTab === 'ongoing'
              ? 'border-b-4 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
          onClick={() => handleTabClick('ongoing')}
        >
          Test Status
        </button>
      </div>

      {/* Tab content */}
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
        {activeTab === 'management' ? (
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Test Management</h2>
            <p className="text-gray-700">Manage your tests from here. Create, update, or delete tests as needed.</p>
            {/* Add more UI content as needed */}
            <TestingPage></TestingPage>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Ongoing Testings</h2>
            <p className="text-gray-700">Here you can view all the ongoing tests. Monitor and manage their progress.</p>
            {/* Add more UI content as needed */}
            <TestdPage></TestdPage>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestingTabPage;
