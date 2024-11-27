import React from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F7F5F4] p-8 rounded-lg shadow-md max-w-6xl mx-auto mt-24 mb-8">
      <div className="md:w-1/2 mb-8 md:mb-0 px-16">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <img
          src="/images/SignIn.png"
          alt="Sign In Illustration"
          className="w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 mt-10">
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username or E-mail
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="keepSignedIn" className="mr-2" />
            <label htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Sign In
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
