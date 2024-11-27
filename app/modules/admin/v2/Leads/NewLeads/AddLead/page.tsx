"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../layout/page";
import axiosInstance from "../../../utils/axiosinstance";
import { PlusIcon } from "@heroicons/react/24/outline"; // Heroicons for better button icons

const AddCustomerPage = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyEmail: "",
    contactPerson: "",
    country: "",
    companyPhone: "",
    address: "",
    companyWebsite: "",
  });

  const [userDetails, setUserDetails] = useState({
    userFirstname: "",
    userLastname: "",
    username: "",
    userEmail: "",
    userMobile: "",
    password: "",
  });

  const [technicalDetails, setTechnicalDetails] = useState({
    supportEmail: "",
    sipSupport: "",
    codex: "",
    switchIps: [""],
    futureUseOne: "no",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    const { name, value } = event.target;

    if (category === "company") {
      setCompanyDetails({ ...companyDetails, [name]: value });
    } else if (category === "user") {
      setUserDetails({ ...userDetails, [name]: value });
    } else if (category === "technical") {
      setTechnicalDetails({ ...technicalDetails, [name]: value });
    }
  };

  const handleAddIPAddress = () => {
    if (technicalDetails.switchIps.length < 30) {
      setTechnicalDetails({
        ...technicalDetails,
        switchIps: [...technicalDetails.switchIps, ""],
      });
    }
  };

  const handleIPAddressChange = (index: number, value: string) => {
    const newIPs = [...technicalDetails.switchIps];
    newIPs[index] = value;
    setTechnicalDetails({ ...technicalDetails, switchIps: newIPs });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("admin");

    if (!token) {
      alert("Please log in to add a customer.");
      setLoading(false);
      return;
    }

    try {
      const mergedData = {
        ...companyDetails,
        ...userDetails,
        ...technicalDetails,
        futureUseOne: token, // Set futureUseOne to the admin token value
      };

      const response = await axiosInstance.post("v3/api/customers", mergedData);
      console.log(response.data);
      router.push("/modules/admin/v2/Dashboard");
    } catch (error) {
      console.error("Error adding customer:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-8 text-black text-start">
          Add New Customer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Details: Full Width */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-regular text-gray-700 mb-4">
              Company Details
            </h2>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={companyDetails.companyName}
              onChange={(e) => handleChange(e, "company")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-200 mb-4"
              required
            />
            <input
              type="email"
              name="companyEmail"
              placeholder="Company Email"
              value={companyDetails.companyEmail}
              onChange={(e) => handleChange(e, "company")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
              required
            />
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={companyDetails.contactPerson}
              onChange={(e) => handleChange(e, "company")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={companyDetails.country}
              onChange={(e) => handleChange(e, "company")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
              required
            />
            <input
              type="text"
              name="companyPhone"
              placeholder="Company Phone"
              value={companyDetails.companyPhone}
              onChange={(e) => handleChange(e, "company")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={companyDetails.address}
              onChange={(e) => handleChange(e, "company")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
              required
            />
            <input
              type="text"
              name="companyWebsite"
              placeholder="Company Website"
              value={companyDetails.companyWebsite}
              onChange={(e) => handleChange(e, "company")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          {/* Bottom Section: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Information */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-regular text-gray-700 mb-4">
                Technical Information
              </h2>
              <input
                type="email"
                name="supportEmail"
                placeholder="Support Email"
                value={technicalDetails.supportEmail}
                onChange={(e) => handleChange(e, "technical")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
                required
              />
              <input
                type="text"
                name="sipSupport"
                placeholder="SIP Support"
                value={technicalDetails.sipSupport}
                onChange={(e) => handleChange(e, "technical")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
              />
              <input
                type="text"
                name="codex"
                placeholder="Codex"
                value={technicalDetails.codex}
                onChange={(e) => handleChange(e, "technical")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
              />
              <div className="space-y-2">
                {technicalDetails.switchIps.map((ip, index) => (
                  <input
                    key={index}
                    type="text"
                    value={ip}
                    placeholder="Switch IP"
                    onChange={(e) => handleIPAddressChange(index, e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200"
                  />
                ))}
                <button
                  type="button"
                  onClick={handleAddIPAddress}
                  className="w-full flex items-center justify-center p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mt-2"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add IP Address
                </button>
              </div>
            </div>

            {/* User Information */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-regular text-gray-700 mb-4">
                User Details
              </h2>
              <input
                type="text"
                name="userFirstname"
                placeholder="First Name"
                value={userDetails.userFirstname}
                onChange={(e) => handleChange(e, "user")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
                required
              />
              <input
                type="text"
                name="userLastname"
                placeholder="Last Name"
                value={userDetails.userLastname}
                onChange={(e) => handleChange(e, "user")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userDetails.username}
                onChange={(e) => handleChange(e, "user")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
                required
              />
              <input
                type="email"
                name="userEmail"
                placeholder="Email"
                value={userDetails.userEmail}
                onChange={(e) => handleChange(e, "user")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
                required
              />
              <input
                type="text"
                name="userMobile"
                placeholder="Mobile Number"
                value={userDetails.userMobile}
                onChange={(e) => handleChange(e, "user")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200 mb-4"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={(e) => handleChange(e, "user")}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCustomerPage;
