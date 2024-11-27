"use client";
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../admin/utils/axiosinstance';
// Define the Ticket interface
interface Ticket {
  _id: string;
  ticketId: string;
  issueTitle: string;
  issueDescription: string;
  assignedPerson: string;
  assignedDepartment: string;
  priority: string;
  customerId: string;
  contactType: string;
  contactDetails: string;
  scheduledTime: string;
  status: string;
  notes: string;
}

const TroubleTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [followUpText, setFollowUpText] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch tickets from the backend API
  const fetchTickets = async () => {
    try {
      const response = await axiosInstance('v3/api/tickets');
      const data: Ticket[] = await response.data;
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets(); // Fetch tickets on component mount
  }, []);

  // Add follow-up note to the selected ticket via API
  const handleFollowUp = async (ticketId: string) => {
    setLoading(true);
    const updatedNotes = `\nFollow-up: ${followUpText}`;

    try {
      const response = await fetch(`v3/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes: updatedNotes }),
      });
      if (response.ok) {
        // Update the ticket notes locally
        const updatedTickets = tickets.map(ticket => {
          if (ticket._id === ticketId) {
            return { ...ticket, notes: ticket.notes + updatedNotes };
          }
          return ticket;
        });
        setTickets(updatedTickets);
        setFollowUpText('');
        setSelectedTicket(null); // Reset selected ticket after follow-up
      } else {
        console.error("Failed to update ticket");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Trouble Tickets</h2>
      <p>View and manage trouble tickets here.</p>

      {/* Trouble Tickets List */}
      <div className="mt-4 space-y-4">
        {tickets.map(ticket => (
          <div key={ticket._id} className="bg-white rounded-lg p-4 shadow-md border border-gray-300">
            <h3 className="font-semibold">Service ID: {ticket.ticketId}</h3>
            <p><strong>Issue:</strong> {ticket.issueTitle}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Notes:</strong> {ticket.notes}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => setSelectedTicket(ticket._id)}
            >
              Add Follow-up
            </button>
          </div>
        ))}
      </div>

      {/* Follow-up Input Section */}
      {selectedTicket && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <h3 className="text-lg font-bold">Add Follow-up</h3>
          <textarea
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            rows={3}
            className="w-full bg-gray-100 text-gray-900 rounded-lg p-2 mt-2 border border-gray-300"
            placeholder="Enter follow-up notes..."
          />
          <button
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => handleFollowUp(selectedTicket)}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Follow-up'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TroubleTickets;
