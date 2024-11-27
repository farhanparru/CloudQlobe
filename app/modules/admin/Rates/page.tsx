"use client"; // Ensure this is at the very top
import React, { useState } from 'react';
import NormalRatesPage from './Rates/page';
import PrivateRatesPage from './PrivateRates/page';
import SpecialRatesPage from './SpecialRates/page'; // Import your Special Rates component

// Main Rates Page Component
const RatesPage = () => {
  const [activeTab, setActiveTab] = useState<'normalRates' | 'specialRates'>('normalRates'); // Updated state to include specialRates

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Rates Management</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('normalRates')}
          className={`px-4 py-2 rounded-lg text-lg font-semibold focus:outline-none transition-colors duration-200 
            ${activeTab === 'normalRates' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-100'}`}
        >
          Base Rates
        </button>

        {/* <button
          onClick={() => setActiveTab('specialRates')}
          className={`px-4 py-2 rounded-lg text-lg font-semibold focus:outline-none transition-colors duration-200 
            ${activeTab === 'specialRates' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-100'}`}
        >
          Special Rates
        </button> */}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activeTab === 'normalRates' && <NormalRatesPage />}
        {activeTab === 'specialRates' && <SpecialRatesPage />} {/* Add the Special Rates component */}
      </div>
    </div>
  );
};

export default RatesPage;
