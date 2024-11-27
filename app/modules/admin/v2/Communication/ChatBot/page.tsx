"use client";
import React, { useState, useEffect } from 'react';
import { Search, UserCircle2 } from 'lucide-react';
import axiosInstance from '../../utils/axiosinstance';
import Layout from '../../layout/page';
const ChatAdminList = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // State for the new message

  // Fetch customer data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get('/v3/api/customers');
        const customerData = response.data.map((customer) => ({
          id: customer._id,
          companyName: customer.companyName,
          customerId: customer.customerId,
          contactPerson: customer.contactPerson,
          companyEmail: customer.companyEmail,
        }));
        setCustomers(customerData);
        console.log(customerData)
      } catch (error) {
        console.error("Error fetching customers", error);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch messages when a customer is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedCustomerId) {
        try {
          const response = await axiosInstance.get('/v3/api/chat');
          const chatMessages = response.data || [];

          // Filter messages by selected customerId
          const filteredMessages = chatMessages.filter(
            (msg) => msg.customerId === selectedCustomerId
          );
          setMessages(filteredMessages);
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      }
    };

    fetchMessages();
  }, [selectedCustomerId]);

  // Handle sending a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Don't send empty messages

    try {
      // API request to send a new message
      const response = await axiosInstance.post('/v3/api/chat/create', {
        customerId: selectedCustomerId,
        senderID: 'admin',
        msg: newMessage,
        customerName:"name",
        cid:selectedCustomerId,
        messageStatus:"adminsend"
      });

      const createdMessage = response.data.data;

      // Update the chat with the newly sent message
      setMessages((prevMessages) => [...prevMessages, createdMessage]);
      setNewMessage(""); // Clear the message input
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <Layout>
    <div style={{ marginBottom: '3em' }} className="flex h-screen bg-gray-50">
      {/* Customer List */}
      <div className="w-96 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
          <div className="mt-4 flex gap-2">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="overflow-y-auto h-[calc(100vh-88px)]">
          {customers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => setSelectedCustomerId(customer.customerId)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50`}
            >
              <div className="flex items-center gap-3">
                <UserCircle2 className="h-10 w-10 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{customer.companyName}</h3>
                  <p className="text-sm text-gray-600">{customer.customerId}</p>
                  <p className="text-sm text-gray-500">{customer.contactPerson}</p>
                  <p className="text-sm text-gray-500">{customer.companyEmail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 bg-white flex flex-col">
        {selectedCustomerId ? (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.senderID !== 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-lg p-3 ${message.senderID !== 'admin' ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200'}`}>
                    {message.msg} <span className="text-xs text-gray-500">{new Date(message.time).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Send Message Section */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={sendMessage} className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a customer to view the conversation
          </div>
        )}
      </div>
    </div></Layout>
  );
};

export default ChatAdminList;
