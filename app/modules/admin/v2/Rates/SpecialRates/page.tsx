"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import Layout from '../../layout/page';

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Initialize newLead state including category
  const [newLead, setNewLead] = useState(initialData || {
    countryCode: '',
    country: '',
    qualityDescription: '',
    rate: '',
    status: 'na',
    testStatus: 'na',
    profile: '',
    testControl: 'na',
    category: "specialrate", // Add category field (false for non-specialrate)
  });

  useEffect(() => {
    if (initialData) {
      setNewLead(initialData);
    } else {
      setNewLead({
        countryCode: '',
        country: '',
        qualityDescription: '',
        rate: '',
        status: 'na',
        testStatus: 'na',
        profile: '',
        testControl: 'na',
        category: false, // Reset category to false
      });
    }
  }, [initialData]);

  const handleAddLead = (e) => {
    e.preventDefault();
    onSubmit(newLead);
    setNewLead({ 
      countryCode: '',
      country: '',
      qualityDescription: '',
      rate: '',
      status: 'na',
      testStatus: 'na',
      profile: '',
      testControl: 'na',
      category: false, // Reset category to false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">{initialData ? 'Update Rate' : 'Add New Rate'}</h3>
        <form onSubmit={handleAddLead}>
          <input
            type="text"
            placeholder="Country Code"
            value={newLead.countryCode}
            onChange={(e) => setNewLead({ ...newLead, countryCode: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={newLead.country}
            onChange={(e) => setNewLead({ ...newLead, country: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Quality Description"
            value={newLead.qualityDescription}
            onChange={(e) => setNewLead({ ...newLead, qualityDescription: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Rate"
            value={newLead.rate}
            onChange={(e) => setNewLead({ ...newLead, rate: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Profile"
            value={newLead.profile}
            onChange={(e) => setNewLead({ ...newLead, profile: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          {/* Checkbox for specialrate category */}
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={newLead.category} // Checked if it's specialrate
              onChange={(e) => setNewLead({ ...newLead, category: e.target.checked })}
              className="mr-2"
            />
            <label>Special Rate</label>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {initialData ? 'Update Rate' : 'Add Rate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RatesPage = () => {
  const [rateData, setRateData] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('country');
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axiosInstance.get('v3/api/rates'); // Update with your API endpoint
        setRateData(response.data); // Set fetched data into the state
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };
    fetchRates();
  }, []);

  // Filter to include only rates with category 'specialrate'
  const filteredData = rateData.filter((rate) => rate.category === 'specialrate' && (
    rate.country.toLowerCase().includes(search.toLowerCase()) || 
    rate.profile.toLowerCase().includes(search.toLowerCase())
  ));

  // Sort the filtered data based on selected sort option
  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'country') {
      return a.country.localeCompare(b.country);
    } else if (sort === 'rate') {
      return a.rate - b.rate;
    }
    return 0;
  });

  const handleAddLead = async (leadData) => {
    try {
      let response;
      if (isUpdateMode) {
        response = await axiosInstance.put(`v3/api/rates/${currentRate._id}`, leadData);
      } else {
        response = await axiosInstance.post('v3/api/rates', leadData);
      }
      setRateData((prev) => 
        isUpdateMode 
          ? prev.map(rate => (rate._id === currentRate._id ? response.data : rate)) 
          : [...prev, response.data]
      );
      setSuccessMessage(isUpdateMode ? 'Rate updated successfully!' : 'Lead added successfully!');
      setErrorMessage('');
      setModalOpen(false);
      setIsUpdateMode(false);
      setCurrentRate(null);
    } catch (error) {
      console.error('Error adding/updating lead:', error);
      setErrorMessage('Failed to add/update lead. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleUpdateClick = (rate) => {
    setCurrentRate(rate);
    setIsUpdateMode(true);
    setModalOpen(true);
  };

  const handleDeleteClick = async (rateId) => {
    try {
      await axiosInstance.delete(`v3/api/rates/${rateId}`);
      setRateData((prev) => prev.filter(rate => rate._id !== rateId));
      setSuccessMessage('Rate deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting rate:', error);
      setErrorMessage('Failed to delete rate. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <Layout>
      <div className="p-6 text-gray-900">
        <h2 className="text-xl font-bold">Special Rates</h2>
        <button
          onClick={() => {
            setModalOpen(true);
            setIsUpdateMode(false);
          }}
          className="bg-green-500 mt-8 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Add Rate
        </button>

        {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
        {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}

        {/* Search and Sort Options */}
        <div className="mt-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="country">Sort by Country</option>
            <option value="rate">Sort by Rate</option>
          </select>
        </div>

        <div className="mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((rate) => (
                <tr key={rate._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{rate.countryCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rate.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rate.qualityDescription}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rate.rate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{rate.profile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdateClick(rate)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(rate._id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsUpdateMode(false);
          setCurrentRate(null);
        }}
        onSubmit={handleAddLead}
        initialData={currentRate}
      />
    </Layout>
  );
};

export default RatesPage;
