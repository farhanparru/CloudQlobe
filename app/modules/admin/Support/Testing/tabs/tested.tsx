import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosinstance';

interface Customer {
  _id: string;
  companyName: string;
  country: string;
  customerId: string;
  rateTesting: string[];
  rateTested: string[];
}

interface Rate {
  _id: string;
  countryCode: string;
  country: string;
  rate: number;
}

const TestdPage: React.FC = () => {
  const [runningTests, setRunningTests] = useState<Customer[]>([]);
  const [completedTests, setCompletedTests] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);

        // Fetch all customers that have rateTesting and rateTested
        const customerRes = await axiosInstance('/v3/api/customers');
        const customers: Customer[] = await customerRes.data;

        // Filter customers who have ongoing rateTesting
        const runningCustomers = customers.filter(customer => customer.rateTesting.length > 0);
        // Filter customers who have completed rateTested
        const completedCustomers = customers.filter(customer => customer.rateTested.length > 0);

        // Fetch rate details for running tests
        const runningTestDetails = await Promise.all(
          runningCustomers.map(async (customer) => {
            const rateDetails = await Promise.all(
              customer.rateTesting.map(async (rateId) => {
                const rateRes = await axiosInstance(`/v3/api/rates/${rateId}`);
                return rateRes.data;
              })
            );
            return { ...customer, rateDetails };
          })
        );

        // Fetch rate details for completed tests
        const completedTestDetails = await Promise.all(
          completedCustomers.map(async (customer) => {
            const rateDetails = await Promise.all(
              customer.rateTested.map(async (rateId) => {
                const rateRes = await axiosInstance(`/v3/api/rates/${rateId}`);
                return rateRes.data;
              })
            );
            return { ...customer, rateDetails };
          })
        );

        setRunningTests(runningTestDetails);
        setCompletedTests(completedTestDetails);
      } catch (error) {
        console.error('Error fetching test data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Running Tests Table */}
      <h2 className="text-xl font-semibold mb-4">Running Tests</h2>
      {runningTests.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300 mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Customer ID</th>
              <th className="border border-gray-300 p-2 text-left">Company Name</th>
              <th className="border border-gray-300 p-2 text-left">Country</th>
              <th className="border border-gray-300 p-2 text-left">Rate Details</th>
            </tr>
          </thead>
          <tbody>
            {runningTests.map((test) => (
              <tr key={test._id} className="bg-white border-b border-gray-200">
                <td className="border border-gray-300 p-2">{test.customerId}</td>
                <td className="border border-gray-300 p-2">{test.companyName}</td>
                <td className="border border-gray-300 p-2">{test.country}</td>
                <td className="border border-gray-300 p-2">
                  <ul>
                    {test.rateDetails?.map((rate) => (
                      <li key={rate._id}>
                        {rate.countryCode} - {rate.country}: ${rate.rate}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No running tests found.</p>
      )}

      {/* Completed Tests Table */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Completed Tests</h2>
      {completedTests.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Customer ID</th>
              <th className="border border-gray-300 p-2 text-left">Company Name</th>
              <th className="border border-gray-300 p-2 text-left">Country</th>
              <th className="border border-gray-300 p-2 text-left">Rate Details</th>
            </tr>
          </thead>
          <tbody>
            {completedTests.map((test) => (
              <tr key={test._id} className="bg-white border-b border-gray-200">
                <td className="border border-gray-300 p-2">{test.customerId}</td>
                <td className="border border-gray-300 p-2">{test.companyName}</td>
                <td className="border border-gray-300 p-2">{test.country}</td>
                <td className="border border-gray-300 p-2">
                  <ul>
                    {test.rateDetails?.map((rate) => (
                      <li key={rate._id}>
                        {rate.countryCode} - {rate.country}: ${rate.rate}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No completed tests found.</p>
      )}
    </div>
  );
};

export default TestdPage;
