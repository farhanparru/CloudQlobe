import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosinstance";

const FollowUpTab = ({ customerId }) => {
  const [followUpData, setFollowUpData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowUpData = async () => {
      try {
        const response = await axiosInstance.get(`/v3/api/customers/${customerId}/followup`);
        setFollowUpData(response.data);
      } catch (error) {
        console.error("Error fetching follow-up data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchFollowUpData();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Follow Up Information</h2>
      {/* Render follow-up data */}
      {followUpData.map(followUp => (
        <div key={followUp.id}>{followUp.status} - {followUp.date}</div>
      ))}
    </div>
  );
};

export default FollowUpTab;
