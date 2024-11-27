"use client";
import React, { FormEvent, useState } from "react";
import axiosInstance from "../modules/admin/utils/axiosinstance";
// adjust path to your axiosInstance

const CustomizedQuotesForm: React.FC = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    meetingTime: "",
    companyName: "",
    email: "",
    noOfUsers: "",
    meetingDate: "",
    country: "",
    contactNumber: "",
    timeZone: "",
    noOfDID: "",
    type:"did"
  });
  const [isLoading, setIsLoading] = useState(false); // loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // submission success state

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Define the form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitted(false);

    try {
      await axiosInstance.post("/v3/api/inquiries", formData);
      setIsSubmitted(true); // show success message
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center p-4">
      <div className="bg-gray-200 p-8 px-16 rounded-lg shadow-md w-full">
        {isSubmitted ? (
          <div className="text-center text-green-600 text-lg font-semibold">
            Thank you! Our team will contact you shortly.
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-center mb-8">
              Buy DID Number
            </h1>
            <form
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <input
                type="time" // Changed to time input
                name="meetingTime"
                placeholder="Time of Meeting"
                value={formData.meetingTime}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <input
                type="number"
                name="noOfUsers"
                placeholder="No of Users"
                value={formData.noOfUsers}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <input
                type="date"
                name="meetingDate"
                placeholder="Date of Meeting"
                value={formData.meetingDate}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="">Select Country for DID</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                {/* Add more country options as needed */}
              </select>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              <select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="">Time Zone (IST / PST..)</option>
                <option value="IST">IST (India Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="CET">CET (Central European Time)</option>
                <option value="GMT">GMT (Greenwich Mean Time)</option>
                {/* Add more time zones as needed */}
              </select>
              <input
                type="number"
                name="noOfDID"
                placeholder="No of DID"
                value={formData.noOfDID}
                onChange={handleChange}
                className="border rounded-md p-2 md:col-start-2 md:col-span-1"
              />
              <div className="md:col-start-2 md:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 mb-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Quote"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomizedQuotesForm;
