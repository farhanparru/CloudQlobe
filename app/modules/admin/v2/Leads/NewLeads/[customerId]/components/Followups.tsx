import Link from "next/link";
import React, { useEffect, useState } from "react";

const FollowUpTab = ({ setActiveTab }) => {
  const [followups, setFollowups] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchFollowups = async () => {
      try {
        const response = await fetch("http://localhost:5000/v3/api/followups");
        const data = await response.json();
        setFollowups(data);
      } catch (error) {
        console.error("Error fetching followups:", error);
      }
    };

    fetchFollowups();
  }, []);

  return (
    <div className="flex flex-col items-center bg-white min-h-screen p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2">
          <h2 className="text-lg font-bold flex items-center">
            📄 Follow Up Information
          </h2>
        </div>
        {/* Scrollable follow-ups */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {followups.map((followup) => (
            <div
              key={followup._id}
              className="bg-blue-100 text-blue-800 p-3 rounded-lg shadow"
            >
              {/* Follow-up description */}
              <p className="font-medium">
                Description: {followup.followupDescription?.join(", ")}
              </p>
              {/* Follow-up time */}
              <p className="text-sm text-gray-600 mt-2">
                Time: {new Date(followup.followupTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setActiveTab("formfollow")}
        className="w-[45rem] px-3 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Add Follow-Up
      </button>
    </div>
  );
};

export default FollowUpTab;
