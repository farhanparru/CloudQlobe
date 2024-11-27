"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from 'react';
import Layout from '../../layout/page';
import axiosInstance from '../../utils/axiosinstance';

const PrivateRatePage = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
    const [rates, setRates] = useState<any[]>([]);
    const [privateRates, setPrivateRates] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [rateSearchTerm, setRateSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRate, setSelectedRate] = useState<any | null>(null);  // For selected rate to update
    const [updatedRate, setUpdatedRate] = useState<number | string>('');  // For new rate input
    const [isDialogOpen, setIsDialogOpen] = useState(false);  // Dialog visibility state
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null); // For storing selected customer

    // Fetch all customers on page load
    useEffect(() => {
        axiosInstance.get('/v3/api/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error("Error fetching customers:", error));
    }, []);

    // Fetch all rates (unfiltered) after customer is selected
    useEffect(() => {
        if (selectedCustomerId) {
            axiosInstance.get('/v3/api/rates')
                .then(response => setRates(response.data))
                .catch(error => console.error("Error fetching rates:", error));

            // Fetch private rates associated with the selected customer
            axiosInstance.get(`/v3/api/private-rates?customerId=${selectedCustomerId}`)
                .then(response => {
                    const filteredRates = response.data.filter(rate => rate.customerId === selectedCustomerId);
                    setPrivateRates(filteredRates);
                })
                .catch(error => console.error("Error fetching private rates:", error));

            // Fetch the selected customer's details
            const customer = customers.find(customer => customer._id === selectedCustomerId);
            setSelectedCustomer(customer);
        } else {
            setPrivateRates([]); // Clear private rates when no customer is selected
            setSelectedCustomer(null); // Clear selected customer info
        }
    }, [selectedCustomerId, customers]);

    // Add rate to private rates for the selected customer
    const addPrivateRate = async (rate: any) => {
        if (!selectedCustomerId) return;
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/v3/api/private-rates', { ...rate, customerId: selectedCustomerId });
            const newPrivateRate = response.data;

            // Update customer's privateRatesId array
            await axiosInstance.put(`/v3/api/customers/${selectedCustomerId}`, {
                privateRatesId: newPrivateRate._id
            });

            setPrivateRates(prevRates => [...prevRates, newPrivateRate]);
        } catch (error) {
            console.error("Error adding private rate:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Update private rate for the selected customer
    const updatePrivateRate = async () => {
        if (!selectedCustomerId || !selectedRate) return;
        setIsLoading(true);
        try {
            const updatedRateData = { ...selectedRate, rate: updatedRate };
            await axiosInstance.put(`/v3/api/private-rates/${selectedRate._id}`, updatedRateData);

            setPrivateRates(prevRates => prevRates.map(rate =>
                rate._id === selectedRate._id ? updatedRateData : rate
            ));

            setIsDialogOpen(false);  // Close the dialog
        } catch (error) {
            console.error("Error updating private rate:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete private rate for the selected customer
    const deletePrivateRate = async (privateRateId: string) => {
        if (!selectedCustomerId) return;
        setIsLoading(true);
        try {
            await axiosInstance.delete(`/v3/api/private-rates/${privateRateId}`);
            await axiosInstance.put(`/v3/api/customers/${selectedCustomerId}`, {
                privateRatesId: privateRateId
            });

            setPrivateRates(prevRates => prevRates.filter(rate => rate._id !== privateRateId));
        } catch (error) {
            console.error("Error deleting private rate:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter customers based on search term
    const filteredCustomers = customers.filter(customer =>
        customer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter rates based on search term
    const filteredRates = rates.filter(rate =>
        rate.country.toLowerCase().includes(rateSearchTerm.toLowerCase()) ||
        rate.qualityDescription.toLowerCase().includes(rateSearchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="p-6 text-gray-900">
                <h2 className="text-xl font-bold">Private Rates</h2>

                {/* Customer Search */}
                <div className="mt-4 flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search customers"
                        className="p-2 border rounded w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Customer Table */}
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="p-2 border">Customer Name</th>
                                <th className="p-2 border">Customer ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr
                                    key={customer._id}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedCustomerId(customer._id)}
                                >
                                    <td className="p-2">{customer.companyName}</td>
                                    <td className="p-2">{customer._id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Display Selected Customer Info */}
                {selectedCustomer && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Selected Customer</h3>
                        <div className="mt-2">
                            <p><strong>Customer ID:</strong> {selectedCustomer.customerId}</p>
                            <p><strong>Company Name:</strong> {selectedCustomer.companyName}</p>
                        </div>
                    </div>
                )}

                {/* Private Rates Section */}
                {selectedCustomerId && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Private Rates for Selected Customer</h3>
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-2 border">Country</th>
                                        <th className="p-2 border">Quality Description</th>
                                        <th className="p-2 border">Rate</th>
                                        <th className="p-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {privateRates.map((privateRate) => (
                                        <tr key={privateRate._id} className="border-t">
                                            <td className="p-2">{privateRate.country}</td>
                                            <td className="p-2">{privateRate.qualityDescription}</td>
                                            <td className="p-2">${privateRate.rate}</td>
                                            <td className="p-2 flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedRate(privateRate);
                                                        setUpdatedRate(privateRate.rate);
                                                        setIsDialogOpen(true);
                                                    }}
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => deletePrivateRate(privateRate._id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded"
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
                )}

                {/* Display Rates (after selecting a customer) */}
                {selectedCustomerId && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Available Rates</h3>
                        {/* Rate Search */}
                        <div className="mt-2 flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search rates"
                                className="p-2 border rounded w-80"
                                value={rateSearchTerm}
                                onChange={(e) => setRateSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-2 border">Country</th>
                                        <th className="p-2 border">Quality Description</th>
                                        <th className="p-2 border">Rate</th>
                                        <th className="p-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRates.map((rate) => (
                                        <tr key={rate._id}>
                                            <td className="p-2">{rate.country}</td>
                                            <td className="p-2">{rate.qualityDescription}</td>
                                            <td className="p-2">${rate.rate}</td>
                                            <td className="p-2">
                                                <button
                                                    onClick={() => addPrivateRate(rate)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                                >
                                                    Add to Private Rates
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PrivateRatePage;
