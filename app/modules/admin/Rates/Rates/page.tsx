"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosinstance';

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Initialize newLead state using initialData
  const [newLead, setNewLead] = useState(initialData || {
    countryCode: '',
    country: '',
    qualityDescription: '',
    rate: '',
    status: 'na',
    testStatus: 'na',
    profile: '',
    testControl: 'na',
  });

  // Update state whenever initialData changes (useEffect will trigger on prop change)
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
      });
    }
  }, [initialData]); // Run this effect when initialData changes

  const handleAddLead = (e) => {
    e.preventDefault();
    onSubmit(newLead);
    // Reset form fields after submission
    setNewLead({ 
      countryCode: '',
      country: '',
      qualityDescription: '',
      rate: '',
      status: 'na',
      testStatus: 'na',
      profile: '',
      testControl: 'na',
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
              {initialData ? 'Update Rate' : 'Add Lead'}
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
  const [sort, setSort] = useState('country'); // Default sort by country
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch rates data from the backend
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

  // Filter the data based on search input
  const filteredData = rateData.filter((rate) => {
    const country = rate.country || '';
    const profile = rate.profile || '';
    return (
      country.toLowerCase().includes(search.toLowerCase()) ||
      profile.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Sort the filtered data based on selected sort option
  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'country') {
      return a.country.localeCompare(b.country);
    } else if (sort === 'rate') {
      return a.rate - b.rate;
    } else if (sort === 'status') {
      return a.status.localeCompare(b.status);
    } else if (sort === 'testStatus') {
      return a.testStatus.localeCompare(b.testStatus);
    }
    return 0;
  });

  // Handle new lead submission
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
      setModalOpen(false); // Close modal after successful addition
      setIsUpdateMode(false); // Reset to add mode
      setCurrentRate(null); // Clear current rate
    } catch (error) {
      console.error('Error adding/updating lead:', error);
      setErrorMessage('Failed to add/update lead. Please try again.');
      setSuccessMessage('');
    }
  };

  // Handle update button click
  const handleUpdateClick = (rate) => {
    setCurrentRate(rate);
    setIsUpdateMode(true);
    setModalOpen(true);
  };

  // Handle delete button click
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
    <div className="p-6 bg-gray-50 text-gray-900">
      <h2 className="text-xl font-bold">Rates</h2>
      <p className="text-gray-600 mt-2">Here you can view, filter, and sort rates.</p>

      {/* Add Rate Button */}
      <button
        onClick={() => {
          setModalOpen(true);
          setIsUpdateMode(false); // Reset to add mode
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Add Rate
      </button>

      {/* Success and Error Messages */}
      {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
      {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}

      {/* Search and Sort Options */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mr-2"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2">
          <option value="country">Sort by Country</option>
          <option value="rate">Sort by Rate</option>
          {/* <option value="status">Sort by Status</option>
          <option value="testStatus">Sort by Test Status</option> */}
        </select>
      </div>

      {/* Rates Table */}
      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Country Code</th>
            <th className="border border-gray-300 px-4 py-2">Country</th>
            <th className="border border-gray-300 px-4 py-2">Quality Description</th>
            <th className="border border-gray-300 px-4 py-2">Rate</th>
            {/* <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Test Status</th> */}
            <th className="border border-gray-300 px-4 py-2">Profile</th>
            {/* <th className="border border-gray-300 px-4 py-2">Test Control</th> */}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((rate) => (
            <tr key={rate._id}>
              <td className="border border-gray-300 px-4 py-2">{rate.countryCode}</td>
              <td className="border border-gray-300 px-4 py-2">{rate.country}</td>
              <td className="border border-gray-300 px-4 py-2">{rate.qualityDescription}</td>
              <td className="border border-gray-300 px-4 py-2">{rate.rate}</td>
              {/* <td className="border border-gray-300 px-4 py-2">{rate.status}</td>
              <td className="border border-gray-300 px-4 py-2">{rate.testStatus}</td> */}
              <td className="border border-gray-300 px-4 py-2">{rate.profile}</td>
              {/* <td className="border border-gray-300 px-4 py-2">{rate.testControl}</td> */}
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleUpdateClick(rate)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(rate._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Updating Rate */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsUpdateMode(false);
          setCurrentRate(null);
        }}
        onSubmit={handleAddLead}
        initialData={isUpdateMode ? currentRate : null}
      />
    </div>
  );
};

export default RatesPage;
