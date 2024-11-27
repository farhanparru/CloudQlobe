"use client"; // Ensure this is at the very top
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import axiosInstance from "../../../admin/utils/axiosinstance"; // Adjust the path to your axios instance

const Login = () => {
  const router = useRouter(); // Initialize router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to navigate to signup page
  const handleSignUp = () => {
    router.push('/modules/customer/pages/signup_one'); // Navigate to the sign-up page
  };

  // Function to navigate to Forgot Password page
  const handlePassword = () => {
    router.push('/modules/customer/pages/forgotPassword/SendEmail'); // Navigate to Forgot Password page
  };

  // Function to handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("v3/api/customers/login", { username: email, password }); // Adjust the API URL accordingly
      const { token, customer } = response.data;

      // Store token and customer data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("customer", JSON.stringify(customer));

      // Redirect to the dashboard
      router.push("/modules/customer/pages/dash_layout");
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Main container divided into two columns */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        
        {/* Left side with graphic */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="text-center px-8 py-12">
            <img 
              src="/your-graphic.svg" 
              alt="Login Illustration" 
              className="w-full max-w-sm mx-auto"
            />
            <h2 className="text-3xl font-bold text-white mt-6">Welcome Back!</h2>
            <p className="text-gray-200 mt-2">
              Connect with us for an amazing experience.
            </p>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="p-8 md:p-12">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Display error message if login fails */}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                User Id:
              </label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full mt-1 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
              />
            </div>
            
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password:
              </label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="w-full mt-1 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button 
                type="button"
                onClick={handlePassword} 
                className="text-blue-500 hover:underline"
              >
                Forget Password?
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 hover:shadow-lg transition duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
          </form>

          {/* Sign-up link */}
          <p className="text-gray-400 text-center mt-6">
            Don’t have an account?{" "}
            <button 
              onClick={handleSignUp} 
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
