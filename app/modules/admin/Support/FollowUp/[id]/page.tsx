"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // Import useParams to get the dynamic ID from the URL
import DatePicker from 'react-datepicker'; // Import the new date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker CSS
import axiosInstance from '../../../utils/axiosinstance'; // Import your axios instance

const FollowUpDetails = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [followUp, setFollowUp] = useState(null); // Initial state for followUp
  const [customer, setCustomer] = useState(null); // Initial state for customer
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [nextFollowUpType, setNextFollowUpType] = useState('call');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch follow-up details based on the ID
  useEffect(() => {
    const fetchFollowUp = async () => {
      try {
        const response = await axiosInstance.get(`v3/api/followups/${id}`); // Fetch follow-up by ID
        setFollowUp(response.data);
        setStatus(response.data.followupStatus);
        // Fetch customer details using customerId from the follow-up response
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
    if (!followUp) return; // Ensure followUp is available

    // Prepare the updated follow-up data
    const updatedFollowUpData = {
      ...followUp,
      followupStatus: status,
      followupHistory: [
        ...(followUp.followupHistory || []),
        `${status} -**- ${note} -**- ${new Date(followUp.followupTime).toLocaleString()}` // Append new entry
      ],
      followupTime: nextFollowUpDate.toISOString(), // Update the follow-up time
    };

    try {
      // Make the API call to update the follow-up
      await axiosInstance.put(`v3/api/followups/${id}`, updatedFollowUpData);
      setFollowUp(updatedFollowUpData); // Update local state with new data
      alert('Follow-up updated successfully!');
      setShowDialog(false); // Close the dialog after updating status
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNote = () => {
    if (note.trim() === '') {
      return alert('Note cannot be empty.');
    }
    alert(`Note added: ${note}`);
    setNote(''); // Clear the note input
  };

  const handleNextFollowUp = () => {
    const followUpData = {
      type: nextFollowUpType,
      followUpDate: nextFollowUpDate.toISOString(),
    };
    alert(`Next follow-up scheduled as a ${followUpData.type} on ${followUpData.followUpDate}`);
    setShowDialog(false); // Close the dialog after scheduling
  };

  const renderFollowUpHistory = () => {
    return followUp.followupHistory.map((entry, index) => {
      // Split the entry into status, description, and time
      const [entryStatus, entryDescription, entryTime] = entry.split(' -**- ');

      return (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-2">
          <p className="font-semibold">Status: <span className="font-normal">{entryStatus}</span></p>
          <p className="font-semibold">Description: <span className="font-normal">{entryDescription || 'N/A'}</span></p>
          <p className="font-semibold">Time: <span className="font-normal">{new Date(entryTime).toLocaleString()}</span></p>
        </div>
      );
    });
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error fetching data: {error}</div>;
  }

  if (!followUp) {
    return <div className="text-center py-4 text-gray-600">Follow-up not found.</div>;
  }

  return (
    <div className="p-8 bg-gray-50 text-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Follow-Up Details</h2>

      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 mb-6">
        <h3 className="font-semibold text-lg">Follow-Up Information</h3>
        <p><strong>Follow-Up ID:</strong> {followUp.followupId}</p>
        <p><strong>Customer ID:</strong> {followUp.customerId}</p>
        <p><strong>Description:</strong> {followUp.followupDescription.join(', ')}</p>
        <p><strong>Follow-Up Date:</strong> {new Date(followUp.followupTime).toLocaleString()}</p>
        <p><strong>Status:</strong> 
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="ml-2">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={() => setShowDialog(true)} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Update Status</button>
        </p>
      </div>

      {/* Display Customer Information */}
      {customer && (
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 mb-6">
          <h3 className="font-semibold text-lg">Customer Information</h3>
          <p><strong>Company Name:</strong> {customer.companyName}</p>
          <p><strong>Customer Type:</strong> {customer.customerType}</p>
          <p><strong>Email:</strong> {customer.companyEmail}</p>
          <p><strong>Contact Person:</strong> {customer.contactPerson}</p>
          <p><strong>Phone:</strong> {customer.companyPhone}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Website:</strong> <a href={customer.companyWebsite} target="_blank" rel="noopener noreferrer">{customer.companyWebsite}</a></p>
          <p><strong>LinkedIn:</strong> <a href={customer.companyLinkedIn} target="_blank" rel="noopener noreferrer">{customer.companyLinkedIn}</a></p>
        </div>
      )}

      {/* Display Follow-Up History */}
      {followUp.followupHistory && followUp.followupHistory.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 mb-6">
          <h3 className="font-semibold text-lg">Follow-Up History</h3>
          {renderFollowUpHistory()}
        </div>
      )}

      {/* Show dialog box if needed */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="font-semibold text-lg mb-4">Add Note and Schedule Next Follow-Up</h3>
            
            {/* Notes Section */}
            <div className="mb-4">
              <h4 className="font-semibold">Add Note</h4>
              <input
                type="text"
                placeholder="Enter your note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            {/* Next Follow-Up Section */}
            {status !== "Completed" && (
              <div>
                <h4 className="font-semibold">Schedule Next Follow-Up</h4>
                <select
                  value={nextFollowUpType}
                  onChange={(e) => setNextFollowUpType(e.target.value)}
                  className="mb-2 border border-gray-300 rounded"
                >
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                  <option value="chat">Chat</option>
                </select>
                <DatePicker
                  selected={nextFollowUpDate}
                  onChange={(date) => setNextFollowUpDate(date)}
                  className="mb-2 border border-gray-300 rounded p-2 w-full"
                />
              </div>
            )}

            <div className="flex justify-end mt-4">
              {/* <button onClick={handleAddNote} className="mr-2 px-4 py-2 bg-green-600 text-white rounded">Add Note</button> */}
              <button onClick={handleUpdateStatus} className="mr-2 px-4 py-2 bg-blue-600 text-white rounded">Update Status</button>
              {/* <button onClick={handleNextFollowUp} className="px-4 py-2 bg-blue-600 text-white rounded">Schedule Next Follow-Up</button> */}
              <button onClick={() => setShowDialog(false)} className="ml-2 px-4 py-2 bg-red-600 text-white rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpDetails;
