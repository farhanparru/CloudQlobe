"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from 'react';
import Layout from '../../layout/page';
import axiosInstance from '../../../utils/axiosinstance';

const CustomersTab: React.FC = () => {
    const [customerData, setCustomerData] = useState([]);
    const [rateData, setRateData] = useState([]); // State to store all rates
    const [searchId, setSearchId] = useState(''); // State for search input
    const [selectedCustomer, setSelectedCustomer] = useState(null); // State to hold the selected customer

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axiosInstance.get('v3/api/customers');
                setCustomerData(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    // Fetch rates data when the component mounts
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axiosInstance.get('v3/api/rates');
                setRateData(response.data.filter(rate => rate.category === 'privaterate')); // Filter for privaterate
            } catch (error) {
                console.error('Error fetching rates:', error);
            }
        };
        fetchRates();
    }, []);

    const handleSearch = () => {
        const customer = customerData.find(c => c.customerId === searchId);
        setSelectedCustomer(customer || null);
    };

    const addRateToCustomer = async (rateId: string) => {
        try {
            const updatedRatesId = [...selectedCustomer.privateRatesId, rateId];
            const response = await axiosInstance.put(`v3/api/customers/${selectedCustomer._id}`, {
                privateRatesId: updatedRatesId
            });
            setSelectedCustomer({ ...selectedCustomer, privateRatesId: updatedRatesId });
            console.log('Rate added to customer:', response.data);
        } catch (error) {
            console.error('Error adding rate to customer:', error);
        }
    };

    const removeRateFromCustomer = async (rateId: string) => {
        try {
            const updatedRatesId = selectedCustomer.privateRatesId.filter(id => id !== rateId);
            const response = await axiosInstance.put(`v3/api/customers/${selectedCustomer._id}`, {
                privateRatesId: updatedRatesId
            });
            setSelectedCustomer({ ...selectedCustomer, privateRatesId: updatedRatesId });
            console.log('Rate removed from customer:', response.data);
        } catch (error) {
            console.error('Error removing rate from customer:', error);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Search Customer by ID</h3>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Enter Customer ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="border border-gray-300 px-4 py-2 mr-2 rounded-lg"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Search
                </button>
            </div>

            {selectedCustomer && (
                <div>
                    <h4 className="text-lg font-semibold mb-2">Rates for {selectedCustomer.companyName}</h4>

                    {/* Display selected rates */}
                    <h5 className="text-md font-semibold mb-2">Selected Rates</h5>
                    <table className="mt-4 w-full border-collapse shadow-md bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Country</th>
                                <th className="border border-gray-300 px-4 py-2">Rate</th>
                                <th className="border border-gray-300 px-4 py-2">Quality Description</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rateData
                                .filter(rate => selectedCustomer.privateRatesId.includes(rate._id))
                                .map((rate) => (
                                    <tr key={rate._id}>
                                        <td className="border border-gray-300 px-4 py-2">{rate.country}</td>
                                        <td className="border border-gray-300 px-4 py-2">{rate.rate}</td>
                                        <td className="border border-gray-300 px-4 py-2">{rate.qualityDescription}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => removeRateFromCustomer(rate._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                            >
                                                Remove Rate
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    {/* Display available rates */}
                    <h5 className="text-md font-semibold mb-2 mt-8">Available Rates</h5>
                    <table className="mt-4 w-full border-collapse shadow-md bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Country</th>
                                <th className="border border-gray-300 px-4 py-2">Rate</th>
                                <th className="border border-gray-300 px-4 py-2">Quality Description</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rateData
                                .filter(rate => !selectedCustomer.privateRatesId.includes(rate._id))
                                .map((rate) => (
                                    <tr key={rate._id}>
                                        <td className="border border-gray-300 px-4 py-2">{rate.country}</td>
                                        <td className="border border-gray-300 px-4 py-2">{rate.rate}</td>
                                        <td className="border border-gray-300 px-4 py-2">{rate.qualityDescription}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => addRateToCustomer(rate._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                                            >
                                                Add Rate
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomersTab;
