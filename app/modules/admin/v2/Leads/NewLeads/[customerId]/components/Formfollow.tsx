import React, { useState} from "react";
import axiosInstance from "../../../../utils/axiosinstance";
import { Calendar, Phone, Mail, MessageSquare, User, Briefcase } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormFollowUpTab = ({setActiveTab}) => {

  const [followUpDetails, setFollowUpDetails] = useState({
    customerId: "",
    companyId: "",
    followupDescription: "",
    followupMethod: "call",
    followupStatus: "pending",
    followupCategory: "leads",
    followupTime: new Date(),
    appointedPerson: "not now",
  });



  

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("v3/api/followups", followUpDetails);      
      if (response.status === 201) {
       toast.success("Follow-up added successfully!");
      } else {
        alert("Error adding follow-up.");
      }
    } catch (error) {
      console.error("Error submitting follow-up:", error);
      alert("Failed to submit follow-up.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFollowUpDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <div>
      <ToastContainer/>
      <h2>Follow Up Information</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">Follow-Up Description</label>
                <textarea
                  name="followupDescription"
                  value={followUpDetails.followupDescription}
                  onChange={handleInputChange}
                  placeholder="Enter follow-up description..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  required
                  rows="4"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Follow-Up Method</label>
                  <div className="relative">
                    <select
                      name="followupMethod"
                      value={followUpDetails.followupMethod}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                      <option value="call">Call</option>
                      <option value="email">Email</option>
                      <option value="chat">Chat</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      {followUpDetails.followupMethod === 'call' && <Phone className="h-5 w-5 text-blue-500" />}
                      {followUpDetails.followupMethod === 'email' && <Mail className="h-5 w-5 text-blue-500" />}
                      {followUpDetails.followupMethod === 'chat' && <MessageSquare className="h-5 w-5 text-blue-500" />}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Follow-Up Category</label>
                  <div className="relative">
                    <select
                      name="followupCategory"
                      value={followUpDetails.followupCategory}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      required
                    >
                      <option value="">Select a category</option>
                      {/* <option value="General">General</option> */}
                      <option value="Leads">Leads</option>
                      {/* <option value="Customers">Customers</option>
                      <option value="Carriers">Carriers</option> */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <User className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">Next Follow-Up Time</label>
                <div className="relative">
                  <DatePicker
                    selected={followUpDetails.followupTime}
                    onChange={(date) =>
                      setFollowUpDetails((prev) => ({ ...prev, followupTime: date }))
                    }
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                onClick={() => setActiveTab("followup")}
              >
                Add Follow-Up
              </button>
            </form>
   
    </div>
  );
};

export default FormFollowUpTab;
