import React from "react";
import MultiStepForm from "./MultiLevelForm";

const SignUpPage = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F7F5F4] p-8 rounded-lg shadow-md max-w-6xl mx-auto mt-24 mb-8">
      {/* Left Column */}
      <div className="md:w-1/2 flex flex-col justify-between px-16">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

        {/* Centered Image */}
        <div className="flex flex-1 items-center">
          <img
            src="/images/SignUp.png"
            alt="Sign In Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 mt-10">
        <MultiStepForm />
      </div>
    </div>
  );
};
export default SignUpPage;
