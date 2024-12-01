import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosinstance";

const SupportTab = ({ customerId }) => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supportResponse, customerResponse] = await Promise.all([
          axiosInstance.get(`http://localhost:5000/v3/api/customers/${customerId}/support`),
          axiosInstance.get(`http://localhost:5000/v3/api/customers/${customerId}`),
        ]);

        setSupportRequests(supportResponse.data);
        setCustomerDetails(customerResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchData();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Support Requests</h2>
      <table className="table-auto border-collapse border border-blue-500 w-full text-center">
        <thead>
          <tr className="bg-blue-500 rounded-lg text-white">
            <th className="border px-4 py-2">Customer ID</th>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Follow-Up Type</th>
            <th className="border px-4 py-2">Follow-Up Status</th>
          </tr>
        </thead>
        <tbody>
          {supportRequests.map((request) => (
            <tr key={request._id}>
              <td className="border px-4 py-2">{customerDetails?.customerId}</td>
              <td className="border px-4 py-2">{customerDetails?.companyName}</td>
              <td className="border px-4 py-2">{request.followupMethod}</td>
              <td className="border px-4 py-2">{request.followupStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {supportRequests.length === 0 && (
        <p className="mt-4 text-red-500">No support requests found for this customer.</p>
      )}
    </div>
  );
};

export default SupportTab;
