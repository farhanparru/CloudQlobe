"use client"; // Ensure this is at the very top
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const EnterCodePage = () => {
  const [resetCode, setResetCode] = useState('');
  const router = useRouter(); // Initialize router

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to verify the reset code
    console.log("Entered reset code:", resetCode);
    router.push('/modules/customer/pages/forgotPassword/EnterPassword'); 
  };

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <div className="m-auto max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Enter Reset Code</h2>
        <p className="text-gray-600 text-center mb-4">We have sent a reset code to your email. Please enter it below.</p>
        <form onSubmit={handleSubmitCode}>
          <div className="mb-4">
            <label htmlFor="resetCode" className="block text-gray-700 mb-2">Reset Code</label>
            <input
              type="text"
              id="resetCode"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the reset code"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-300"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterCodePage;
