"use client";
import { useState, useEffect } from 'react';
import Layout from '../../layout/page';
import axiosInstance from '../../../utils/axiosinstance';

export default function DidInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async () => {
    try {
      const { data } = await axiosInstance.get('/v3/api/inquiries');
      const didInquiries = data.filter(inquiry => inquiry.type === 'did');
      setInquiries(didInquiries);
      setFilteredInquiries(didInquiries);
    } catch (error) {
      console.error('Error fetching DID inquiries:', error);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleFilterChange = () => {
    const filtered = inquiries.filter(inquiry => (statusFilter ? inquiry.status === statusFilter : true));
    setFilteredInquiries(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [statusFilter, inquiries]);

  const handleStatusUpdate = async (id, newStatus) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/v3/api/inquiries/${id}`, { status: newStatus });
      fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'Contacted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">DID Inquiries</h1>

        <div className="mb-4">
          <label className="text-gray-700 mr-2">Filter by Status:</label>
          <select
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-md shadow-sm"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Contacted">Contacted</option>
          </select>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <th className="px-8 py-2 border-b border-gray-200">Type</th>
                <th className="px-10 py-2 border-b border-gray-200">Name</th>
                <th className="px-8 py-2 border-b border-gray-200">Email</th>
                <th className="px-8 py-2 border-b border-gray-200">Company</th>
                <th className="px-8 py-2 border-b border-gray-200">Contact Number</th>
                <th className="px-8 py-2 border-b border-gray-200">Notes</th>
                <th className="px-8 py-2 border-b border-gray-200">Status</th>
                <th className="px-8 py-2 border-b border-gray-200">Meeting Time</th>
                <th className="px-8 py-2 border-b border-gray-200">No. of Users</th>
                <th className="px-8 py-2 border-b border-gray-200">Meeting Date</th>
                <th className="px-8 py-2 border-b border-gray-200">Country</th>
                <th className="px-8 py-2 border-b border-gray-200">Time Zone</th>
                <th className="px-8 py-2 border-b border-gray-200">No. of DID</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredInquiries.map(inquiry => (
                <tr key={inquiry._id} className="hover:bg-gray-100">
                  <td className="px-10 py-2">{(inquiry.type || 'N/A').toUpperCase()}</td>
                  <td className="px-18 py-2">{inquiry.name || 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.email || 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.companyName || 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.contactNumber || 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.notes || 'N/A'}</td>
                  <td className="px-10 py-2">
                    {loading ? (
                      <div className="spinner-border animate-spin w-4 h-4 border-2 rounded-full text-blue-500" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <select 
                        value={inquiry.status} 
                        onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)} 
                        className={`p-2 rounded ${getStatusColor(inquiry.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Contacted">Contacted</option>
                      </select>
                    )}
                  </td>
                  <td className="px-10 py-2">{inquiry.meetingTime || 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.noOfUsers || 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.meetingDate ? new Date(inquiry.meetingDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.country || 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.timeZone || 'N/A'}</td>
                  <td className="px-10 py-2">{inquiry.noOfDID || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
