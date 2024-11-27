"use client"; // Ensure this is at the very top
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const SendEmailPage = () => {
  const [email, setEmail] = useState('');
  const router = useRouter(); // Initialize router

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to send the email
    console.log("Sending reset email to:", email);
    router.push('/modules/customer/pages/forgotPassword/EnterCode'); 
  };

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <div className="m-auto max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
        <p className="text-gray-600 text-center mb-4">Enter your email address to receive a password reset code.</p>
        <form onSubmit={handleSendEmail}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-300"
          >
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmailPage;
