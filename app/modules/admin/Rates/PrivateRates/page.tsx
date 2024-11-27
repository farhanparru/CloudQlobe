"use client"; // Ensure this is at the very top
import React, { useState } from 'react';

const PrivateRatesPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('countryCode'); // Default sort option
  const [isOpen, setIsOpen] = useState(false);
  const [newRate, setNewRate] = useState({
    countryCode: '',
    countryName: '',
    qualityDescription: '',
    rate: '',
    status: 'Active',
    profile: '',
    testControl: true,
    testStatus: 'Passed',
  });

  // Example data (replace with your actual data)
  const [privateRatesData, setPrivateRatesData] = useState([
    { countryCode: 'GB', countryName: 'United Kingdom', qualityDescription: 'High', rate: 120, status: 'Active', profile: 'Profile C', testControl: true, testStatus: 'Passed' },
    { countryCode: 'AU', countryName: 'Australia', qualityDescription: 'Medium', rate: 90, status: 'Inactive', profile: 'Profile D', testControl: false, testStatus: 'Failed' },
    // Add more rows as needed
  ]);

  const filteredData = privateRatesData.filter(item =>
    item.countryName.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'countryName') {
      return a.countryName.localeCompare(b.countryName);
    }
    return a.countryCode.localeCompare(b.countryCode); // Default sort by country code
  });

  const handleAddRate = () => {
    setPrivateRatesData([...privateRatesData, newRate]);
    setNewRate({
      countryCode: '',
      countryName: '',
      qualityDescription: '',
      rate: '',
      status: 'Active',
      profile: '',
      testControl: true,
      testStatus: 'Passed',
    });
    setIsOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 text-gray-800 min-h-screen">
      <h2 className="text-xl font-bold text-blue-600">Private Rates</h2>
      <p className="text-gray-500 mt-2">Manage your private rates here.</p>

      {/* Title Bar with Search and Sort */}
      <div className="mt-4 flex items-center justify-between">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search by country name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg focus:outline-none"
          />
        </div>
        <select 
          value={sort} 
          onChange={(e) => setSort(e.target.value)} 
          className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg"
        >
          <option value="countryCode">Sort by Country Code</option>
          <option value="countryName">Sort by Country Name</option>
        </select>
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add Private Rate
        </button>
      </div>

      {/* Data Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Country Code</th>
              <th className="py-2 px-4 border-b border-gray-300">Country Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Quality Description</th>
              <th className="py-2 px-4 border-b border-gray-300">Rate</th>
              <th className="py-2 px-4 border-b border-gray-300">Status</th>
              <th className="py-2 px-4 border-b border-gray-300">Profile</th>
              <th className="py-2 px-4 border-b border-gray-300">Test Control</th>
              <th className="py-2 px-4 border-b border-gray-300">Test Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-300">{item.countryCode}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.countryName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.qualityDescription}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.rate}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.status}</td>
                <td className="py-2 px-4 border-b border-gray-300">{item.profile}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button 
                    className={`px-2 py-1 rounded-lg ${item.testControl ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                  >
                    {item.testControl ? 'On' : 'Off'}
                  </button>
                </td>
                <td className="py-2 px-4 border-b border-gray-300">{item.testStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog Box for Adding Private Rate */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-blue-600">Add Private Rate</h3>
            <div className="mb-4">
              <label className="block text-sm mb-1">Country Code</label>
              <input
                type="text"
                value={newRate.countryCode}
                onChange={(e) => setNewRate({ ...newRate, countryCode: e.target.value })}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Country Name</label>
              <input
                type="text"
                value={newRate.countryName}
                onChange={(e) => setNewRate({ ...newRate, countryName: e.target.value })}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Quality Description</label>
              <input
                type="text"
                value={newRate.qualityDescription}
                onChange={(e) => setNewRate({ ...newRate, qualityDescription: e.target.value })}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Rate</label>
              <input
                type="number"
                value={newRate.rate}
                onChange={(e) => setNewRate({ ...newRate, rate: e.target.value })}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Profile</label>
              <input
                type="text"
                value={newRate.profile}
                onChange={(e) => setNewRate({ ...newRate, profile: e.target.value })}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={newRate.testControl}
                onChange={() => setNewRate({ ...newRate, testControl: !newRate.testControl })}
                className="mr-2"
              />
              <label className="text-sm text-gray-800">Test Control</label>
            </div>
            <div className="flex justify-between">
              <button 
                onClick={() => setIsOpen(false)} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRate} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Rate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateRatesPage;
