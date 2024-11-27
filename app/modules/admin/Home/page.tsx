"use client"
import React, { useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

// Sample data for the dashboard
const dashboardData = {
  rateIncrease: 20, // example percentage
  customerConversion: 75, // example percentage
  leadGeneration: 150, // example number of leads
  supportTickets: 35, // example number of tickets
};

// Sample data for charts
const leadGenerationData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Leads Generated',
      data: [40, 50, 30, 70], // example lead data
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const rateIncreaseData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Rate Increase (%)',
      data: [10, 15, 20, 25, 30], // example rate increase data
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    },
  ],
};

// const supportTicketsData = {
//   labels: ['Open', 'In Progress', 'Resolved'],
//   datasets: [
//     {
//       label: 'Support Tickets',
//       data: [15, 10, 10], // example ticket data
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.6)',
//         'rgba(54, 162, 235, 0.6)',
//         'rgba(75, 192, 192, 0.6)',
//       ],
//     },
//   ],
// };

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome to the admin portal.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Rate Increase Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Rate Increase</h2>
          <p className="text-2xl font-bold text-green-600">{dashboardData.rateIncrease}%</p>
          <p className="text-gray-500">From last month</p>
        </div>

        {/* Customer Conversion Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Customer Conversion</h2>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.customerConversion}%</p>
          <p className="text-gray-500">Conversion Rate</p>
        </div>

        {/* Lead Generation Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Lead Generation</h2>
          <p className="text-2xl font-bold text-yellow-600">{dashboardData.leadGeneration}</p>
          <p className="text-gray-500">New Leads This Month</p>
        </div>

        {/* Support Tickets Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Support Tickets</h2>
          <p className="text-2xl font-bold text-red-600">{dashboardData.supportTickets}</p>
          <p className="text-gray-500">Open Tickets</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Bar Chart for Lead Generation */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Lead Generation Over Time</h3>
          <Bar data={leadGenerationData} options={{ responsive: true }} />
        </div>

        {/* Line Chart for Rate Increase */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Rate Increase Over Time</h3>
          <Line data={rateIncreaseData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Doughnut Chart for Support Tickets */}


    </div>
  );
};

export default AdminHomePage;
