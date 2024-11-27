"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const adminData = [
  { name: "Rithika", role: "admin", password: "rithi@123" },
  { name: "Amal", role: "admin", password: "amal@123" },
  { name: "Allen", role: "admin", password: "allen@123" },
];

const AdminSignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if the admin is already authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem("admin");

    if (adminToken) {
      // If the admin token exists, redirect to the admin dashboard
      router.push("/modules/admin/v2/Dashboard");
    }
  }, [router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check the admin data for valid credentials
      const admin = adminData.find(
        (admin) => admin.name.toLowerCase() === username.toLowerCase() && admin.password === password
      );

      if (admin) {
        // Save admin token with the admin's name
        localStorage.setItem("admin", admin.name);

        // Redirect to admin dashboard
        router.push("/modules/admin/v2/Dashboard");
      } else {
        throw new Error("Invalid username or password.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#F7F5F4] p-8 rounded-lg bg-gray-100 shadow-md max-w-6xl mx-auto mt-24 mb-8">
      <div className="md:w-1/2 mb-8 md:mb-0 px-16">
        <h1 className="text-3xl font-semibold mb-6">Admin Sign In</h1>
        <img
          src="/images/15.svg"
          alt="Admin Sign In Illustration"
          className="w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 ml-5 mt-10">
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Admin Name
            </label>
            <input
              style={{ width: "20em" }}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 border rounded-md"
              required
              disabled={loading}
            />
          </div>
          <div className="mt-5" style={{ marginTop: "2em" }}>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              style={{ width: "20em" }}
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border rounded-md w-full"
              required
              disabled={loading}
            />{" "}
            &nbsp;
            <button
              type="button"
              className="mt-2 text-sm text-gray-600 hover:underline focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        <div className="mt-4">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-grey bg-opacity-75">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12"></div>
        </div>
      )}
    </div>
  );
};

export default AdminSignInPage;
