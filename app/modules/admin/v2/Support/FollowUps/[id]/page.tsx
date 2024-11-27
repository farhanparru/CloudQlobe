"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from '../../../utils/axiosinstance';
import Layout from '../../../layout/page';
import { Calendar, Phone, Mail, MessageSquare } from 'lucide-react';

const FollowUpDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [followUp, setFollowUp] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [nextFollowUpType, setNextFollowUpType] = useState('call');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowUp = async () => {
      try {
        const response = await axiosInstance.get(`v3/api/followups/${id}`);
        setFollowUp(response.data);
        setStatus(response.data.followupStatus);
        const customerResponse = await axiosInstance.get(`v3/api/customers/${response.data.customerId}`);
        setCustomer(customerResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUp();
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!followUp) return;

    const updatedFollowUpData = {
      ...followUp,
      followupStatus: status,
      followupHistory: [
        ...(followUp.followupHistory || []),
        `${status} -**- ${note} -**- ${new Date(followUp.followupTime).toLocaleString()}`
      ],
      followupTime: nextFollowUpDate.toISOString(),
    };

    try {
      await axiosInstance.put(`v3/api/followups/${id}`, updatedFollowUpData);
      setFollowUp(updatedFollowUpData);
      alert('Follow-up updated successfully!');
      setShowDialog(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderFollowUpHistory = () => {
    return followUp.followupHistory.map((entry, index) => {
      const [entryStatus, entryDescription, entryTime] = entry.split(' -**- ');

      return (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-2 border-l-4 border-blue-500">
          <p className="font-semibold text-black-600">Status: <span className="font-normal text-gray-700">{entryStatus}</span></p>
          <p className="font-semibold text-black-600">Description: <span className="font-normal text-gray-700">{entryDescription || 'N/A'}</span></p>
          <p className="font-semibold text-black-600">Time: <span className="font-normal text-gray-700">{new Date(entryTime).toLocaleString()}</span></p>
        </div>
      );
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-blue-600">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600">Error fetching data: {error}</div>;
  }

  if (!followUp) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Follow-up not found.</div>;
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-black-50 to-orange-50 min-h-screen p-8">
        <h2 className="text-3xl font-bold mb-6 text-black-800">Follow-Up Details</h2>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200 mb-6">
          <h3 className="font-semibold text-xl mb-4 text-black-700">Follow-Up Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-semibold text-black-600">Follow-Up ID:</span> {followUp.followupId}</p>
            <p><span className="font-semibold text-black-600">Customer ID:</span> {followUp.customerId}</p>
            <p><span className="font-semibold text-black-600">Description:</span> {followUp.followupDescription.join(', ')}</p>
            <p><span className="font-semibold text-black-600">Follow-Up Date:</span> {new Date(followUp.followupTime).toLocaleString()}</p>
          </div>
          <div className="mt-4">
            <span className="font-semibold text-black-600">Status:</span>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="ml-2 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button 
              onClick={() => setShowDialog(true)} 
              className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
            >
              Update Status
            </button>
          </div>
        </div>

        {customer && (
          <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200 mb-6">
            <h3 className="font-semibold text-xl mb-4 text-black-700">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold text-black-600">Company Name:</span> {customer.companyName}</p>
              <p><span className="font-semibold text-black-600">Customer Type:</span> {customer.customerType}</p>
              <p><span className="font-semibold text-black-600">Email:</span> {customer.companyEmail}</p>
              <p><span className="font-semibold text-black-600">Contact Person:</span> {customer.contactPerson}</p>
              <p><span className="font-semibold text-black-600">Phone:</span> {customer.companyPhone}</p>
              <p><span className="font-semibold text-black-600">Address:</span> {customer.address}</p>
              <p><span className="font-semibold text-black-600">Website:</span> <a href={customer.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">{customer.companyWebsite}</a></p>
              <p><span className="font-semibold text-black-600">LinkedIn:</span> <a href={customer.companyLinkedIn} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">{customer.companyLinkedIn}</a></p>
            </div>
          </div>
        )}

        {followUp.followupHistory && followUp.followupHistory.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200 mb-6">
            <h3 className="font-semibold text-xl mb-4 text-black-700">Follow-Up History</h3>
            {renderFollowUpHistory()}
          </div>
        )}

        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
              <h3 className="font-semibold text-xl mb-4 text-black">Add Note and Schedule Next Follow-Up</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-black">Add Note</h4>
                <input
                  type="text"
                  placeholder="Enter your note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-1 p-2 border border-blue-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {status !== "Completed" && (
                <div>
                  <h4 className="font-semibold text-black mb-2">Schedule Next Follow-Up</h4>
                  <div className="flex items-center mb-2">
                    <select
                      value={nextFollowUpType}
                      onChange={(e) => setNextFollowUpType(e.target.value)}
                      className="p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="call">Call</option>
                      <option value="email">Email</option>
                      <option value="chat">Chat</option>
                    </select>
                    {nextFollowUpType === 'call' && <Phone className="ml-2 text-orange-500" />}
                    {nextFollowUpType === 'email' && <Mail className="ml-2 text-orange-500" />}
                    {nextFollowUpType === 'chat' && <MessageSquare className="ml-2 text-orange-500" />}
                  </div>
                  <div className="flex items-center">
                    <DatePicker
                      selected={nextFollowUpDate}
                      onChange={(date) => setNextFollowUpDate(date)}
                      className="p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <Calendar className="ml-2 text-orange-500" />
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button onClick={handleUpdateStatus} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Update Status</button>
                <button onClick={() => setShowDialog(false)} className="ml-2 px-4 py-2 bg-red-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FollowUpDetails;