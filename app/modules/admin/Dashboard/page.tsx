/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { useState } from 'react';
import { 
  TruckIcon, 
  UsersIcon, 
  BanknotesIcon, 
  ChartBarIcon, 
  ExclamationCircleIcon, 
  ClipboardDocumentIcon, 
  HomeIcon, 
  CogIcon
} from '@heroicons/react/24/outline';

import CarriersPage from '../Carriers/page';
import CustomersPage from '../Customers/page';
import LeadsPage from '../Leads/page';
import PaymentsPage from '../Payments/page';
import RatesPage from '../Rates/page';
import AdminHomePage from '../Home/page';
import SupportPage from '../Support/page';
import SettingsPage from '../Settings/page';

const DashboardPage = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard' : return <AdminHomePage />;
      case 'carriers': return <CarriersPage />;
      case 'customers': return <CustomersPage />;
      case 'leads': return <LeadsPage />;
      case 'payments': return <PaymentsPage />;
      case 'rates': return <RatesPage />;
      case 'support': return <SupportPage />;
      case 'settings': return <SettingsPage />;
      default: return <AdminHomePage />;
    }
  };

  const NavButton = ({ name, icon: Icon }) => (
    <button
      onClick={() => setActivePage(name.toLowerCase())}
      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 
        ${activePage === name.toLowerCase() 
          ? 'bg-indigo-100 text-indigo-800 shadow-md' 
          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {name}
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      <aside className="w-64 bg-white shadow-xl transition-all duration-300 transform hover:translate-x-1 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-600">Admin Panel</h2>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              {[
                { name: 'Dashboard', icon: HomeIcon },
                { name: 'Carriers', icon: TruckIcon },
                { name: 'Customers', icon: UsersIcon },
                { name: 'Leads', icon: ClipboardDocumentIcon },
                { name: 'Rates', icon: ChartBarIcon },
                { name: 'Support', icon: ExclamationCircleIcon },
                { name: 'Payments', icon: BanknotesIcon },
              ].map((item) => (
                <li key={item.name}>
                  <NavButton {...item} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="p-4">
          <hr className="border-gray-200 my-4" />
          <NavButton name="Settings" icon={CogIcon} />
        </div>
      </aside>

      <main className="flex-grow p-8 overflow-auto bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;