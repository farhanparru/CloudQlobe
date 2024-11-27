// CallTab.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosinstance'; // Adjust the path as necessary

const CallTab = () => {
  const [followUpData, setFollowUpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowUpData = async () => {
      try {
        const response = await axiosInstance.get('v3/api/followups'); // Adjust the endpoint as necessary
        // Filter for follow-ups of type "call"
        const calls = response.data.filter(item => item.followupMethod === 'call');
        setFollowUpData(calls);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUpData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Calls</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Customer ID</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {followUpData.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.customerId}</td>
              <td className="border px-4 py-2">{new Date(item.followupTime).toLocaleTimeString()}</td>
              <td className="border px-4 py-2">{new Date(item.followupTime).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{item.followupStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallTab;
