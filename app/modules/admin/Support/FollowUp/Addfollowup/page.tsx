"use client"; // Ensure this is at the very top
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker"; // Import the new date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker CSS
import axiosInstance from "../../../utils/axiosinstance"; // Import your custom axios instance

const AddFollowUp = () => {
  const router = useRouter();

  // State for customers and selected customer
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  
  // Follow-up form state
  const [followUpDetails, setFollowUpDetails] = useState({
    customerId: "",
    companyId: "",
    followupDescription: "",
    followupMethod: "call",
    followupStatus: "pending",
    followupCategory: "general",
    followupTime: new Date(),
    appointedPerson: "not now",
  });

  // Fetch customer data on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get("v3/api/customers"); // Use axiosInstance to fetch customer data
        setCustomers(response.data); // Assuming response.data is an array of customer objects
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFollowUpDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission using axiosInstance
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("v3/api/followups", followUpDetails); // POST request using axiosInstance

      if (response.status === 201) {
        alert("Follow-up added successfully!");
        router.push("/modules/admin/dashboard"); // Redirect to follow-ups list
      } else {
        console.error("Error adding follow-up");
        alert("Error adding follow-up.");
      }
    } catch (error) {
      console.error("Error submitting follow-up:", error);
      alert("Failed to submit follow-up.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 text-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Add Follow-Up</h2>

      {/* Customer Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select Customer</label>
        <select
          className="p-2 border border-gray-300 rounded w-full"
          value={selectedCustomer}
          onChange={(e) => {
            const customer = customers.find(c => c._id === e.target.value);
            setSelectedCustomer(e.target.value);
            setFollowUpDetails({
              ...followUpDetails,
              customerId: customer._id,
              companyId: customer.customerId,
            });
          }}
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.companyName} ({customer.customerType})
            </option>
          ))}
        </select>
      </div>

      {/* Follow-Up Form */}
      {selectedCustomer && (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded border border-gray-200">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Follow-Up Description</label>
            <textarea
              name="followupDescription"
              value={followUpDetails.followupDescription}
              onChange={handleInputChange}
              placeholder="Enter follow-up description..."
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Follow-Up Method</label>
            <select
              name="followupMethod"
              value={followUpDetails.followupMethod}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="chat">Chat</option>
            </select>
          </div>

          <div className="mb-4">
  <label className="block mb-2 font-semibold">Follow-Up Category</label>
  <select
    name="followupCategory"
    value={followUpDetails.followupCategory}
    onChange={handleInputChange}
    className="w-full p-2 border border-gray-300 rounded"
    required
  >
    <option value="">Select a category</option>
    <option value="General">General</option>
    <option value="Leads">Leads</option>
    <option value="Customers">Customers</option>
    <option value="Carriers">Carriers</option>
  </select>
</div>

{/*
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Appointed Person</label>
            <input
              type="text"
              name="appointedPerson"
              value={followUpDetails.appointedPerson}
              onChange={handleInputChange}
              placeholder="Enter appointed person..."
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div> */}

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Next Follow-Up Time</label>
            <DatePicker
              selected={followUpDetails.followupTime}
              onChange={(date: Date) =>
                setFollowUpDetails((prev) => ({ ...prev, followupTime: date }))
              }
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Follow-Up
          </button>
        </form>
      )}
    </div>
  );
};

export default AddFollowUp;
