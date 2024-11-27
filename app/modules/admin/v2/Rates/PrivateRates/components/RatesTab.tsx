"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosinstance';
import Layout from '../../layout/page';

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
    category: 'privaterate'  // Default category is privaterate
  });

  // Update state whenever initialData changes
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
        category: 'privaterate'
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
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">{initialData ? 'Update Rate' : 'Add New Rate'}</h3>
        <form onSubmit={handleAddLead}>
          {/* Input fields */}
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

const RatesTab = () => {
  const [rateData, setRateData] = useState([]);
  const [customerData, setCustomerData] = useState([]); // To store customer data
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('country');
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch rates and customers data from the backend
  useEffect(() => {
    const fetchRatesAndCustomers = async () => {
      try {
        const rateResponse = await axiosInstance.get('v3/api/rates');
        const customerResponse = await axiosInstance.get('v3/api/customers'); // Assuming this is your customer API
        setRateData(rateResponse.data.filter(rate => rate.category === 'privaterate')); // Filter by privaterate
        setCustomerData(customerResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRatesAndCustomers();
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

  // Sort the filtered data
  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'country') {
      return a.country.localeCompare(b.country);
    } else if (sort === 'rate') {
      return a.rate - b.rate;
    }
    return 0;
  });

  // Find customer details for the rate
  const findCustomer = (customerId) => {
    return customerData.find(customer => customer._id === customerId);
  };

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
      setSuccessMessage(isUpdateMode ? 'Rate updated successfully!' : 'Rate added successfully!');
      setErrorMessage('');
      setModalOpen(false);
      setIsUpdateMode(false);
      setCurrentRate(null);
    } catch (error) {
      setErrorMessage('Failed to add/update rate. Please try again.');
    }
  };

  return (
    
      <div className="p-6 text-gray-900">
        <h2 className="text-xl font-bold">Private Rates</h2>

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

        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={() => console.log('Search triggered')}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="country">Sort by Country</option>
            <option value="rate">Sort by Rate</option>
          </select>
        </div>

        <table className="mt-4 w-full border-collapse shadow-md bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Country</th>
              <th className="border border-gray-300 px-4 py-2">Rate</th>
              <th className="border border-gray-300 px-4 py-2">Profile</th>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((rate) => {
              const customer = findCustomer(rate.customerId);
              return (
                <tr key={rate._id}>
                  <td className="border border-gray-300 px-4 py-2">{rate.country}</td>
                  <td className="border border-gray-300 px-4 py-2">{rate.rate}</td>
                  <td className="border border-gray-300 px-4 py-2">{rate.profile}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {customer ? customer.companyName : 'Unknown'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setIsUpdateMode(true);
                        setCurrentRate(rate);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        await axiosInstance.delete(`v3/api/rates/${rate._id}`);
                        setRateData(prev => prev.filter(r => r._id !== rate._id));
                      }}
                      className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddLead}
          initialData={isUpdateMode ? currentRate : null}
        />
      </div>
    
  );
};

export default RatesTab;
