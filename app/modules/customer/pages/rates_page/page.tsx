"use client"; // Ensure this is at the very top
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faStar,
  faCheckCircle,
  faPlusCircle,
  faFilter,
  faUserCircle,
  faClipboardList,
  faClipboardCheck,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import NormalRatesPage from './Rates/page';
import SpecialRatesPage from './SpecialRates/page';
import CLIRatesPage from '../cliRates/page'; // Import for CLI Rates
import PrivateRatesPage from './PrivateRates/page'; // Import for Private Rates
import MyRatesPage from '../myRates/page'; // Import for My Rates
import DashboardLayout from '../dash_layout/page';

// RatesNavbar Component
const RatesNavbar: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => {
  return (
    <header className="flex justify-between items-center p-5 bg-gray-300 text-black shadow-lg mt-4">
      <nav className="flex justify-between items-center flex-grow gap-5">
        <div className="flex items-center gap-5">
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('ccRates')}
          >
            <FontAwesomeIcon icon={faChartLine} className="h-5 w-5" />
            <span className="text-base">CC Rates</span>
          </div>
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('myRates')}
          >
            <FontAwesomeIcon icon={faClipboardCheck} className="h-5 w-5" />
            <span className="text-base">My Rates</span>
          </div>
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('specialRates')}
          >
            <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
            <span className="text-base">Special Rates</span>
          </div>
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('privateRates')}
          >
            <FontAwesomeIcon icon={faClipboardCheck} className="h-5 w-5" />
            <span className="text-base">Private Rates</span>
          </div>
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('cliRates')}
          >
            <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5" />
            <span className="text-base">CLI Rates</span>
          </div>
        </div>
        {/* <div className="ml-auto font-semibold text-[#005F73] flex items-center text-base">
          Guest &ensp;<FontAwesomeIcon icon={faUserCircle} className="h-5 w-5" />
        </div> */}
      </nav>
    </header>
  );
};

// Main Rates Page Component
const RatesPage = () => {
  const [activeTab, setActiveTab] = useState<'ccRates' | 'myRates' | 'specialRates' | 'privateRates' | 'cliRates'>('ccRates');
  const [search] = useState('');

  return (
    <DashboardLayout>
      <RatesNavbar onTabChange={setActiveTab} /> {/* Pass the state updater */}
      <div className="min-h bg-gray-100 p-6">
        {/* Tabs Bar (Optional) */}
        <div className="flex justify-center items-center space-x-4 mt-4 relative">
          {/* You can keep the tabs here if you want them visible */}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'ccRates' && <NormalRatesPage searchQuery={search} />} {/* Replace with your actual component */}
          {activeTab === 'myRates' && <MyRatesPage searchQuery={search} />} {/* Render My Rates */}
          {activeTab === 'specialRates' && <SpecialRatesPage searchQuery={search} />} {/* Render Special Rates */}
          {activeTab === 'privateRates' && <PrivateRatesPage searchQuery={search} />} {/* Render Private Rates */}
          {activeTab === 'cliRates' && <CLIRatesPage searchQuery={search} />} {/* Render CLI Rates */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RatesPage;
