"use client";

import React, { useState } from "react";

type Step = {
  number: number;
  label: string;
  color: string;
};

interface StepIndicatorProps {
  currentStep: number;
  setStep: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  setStep,
}) => {
  const steps: Step[] = [
    { number: 1, label: "Company Info", color: "blue" },
    { number: 2, label: "Technical Info", color: "orange" },
    { number: 3, label: "User Info", color: "green" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`w-1/3 text-center cursor-pointer`}
            onClick={() => setStep(step.number)}
          >
            <div
              className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= step.number
                  ? `bg-${step.color}-500 text-white`
                  : "bg-gray-300"
              }`}
            >
              {step.number}
            </div>
            <div
              className={`text-sm ${
                currentStep >= step.number
                  ? `text-${step.color}-500 font-semibold`
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`h-1 w-1/3 ${
              currentStep > index ? `bg-${step.color}-500` : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

interface CompanyInfoProps {
  onNext: () => void;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ onNext }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Company Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Company name"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Company Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Contact Person</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Country</label>
          <select className="w-full border rounded p-2" required>
            <option value="">Select</option>
            <option>India</option>
            {/* Add more countries */}
          </select>
        </div>
        <div>
          <label className="block mb-2">Company Phone</label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            placeholder="Phone"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Address</label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Address"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Company Website</label>
          <input
            type="url"
            className="w-full border rounded p-2"
            placeholder="Website"
            required
          />
        </div>
      </div>
      <button
        onClick={onNext}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};


const TechnicalInfo: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [ips, setIps] = useState<string[]>([]);
  const [codex, setCodex] = useState<string[]>([]);
  const [currentIp, setCurrentIp] = useState<string>("");
  const [currentCodex, setCurrentCodex] = useState<string>("");

  const handleAddIp = () => {
    if (currentIp && !ips.includes(currentIp)) {
      setIps([...ips, currentIp]);
      setCurrentIp("");
    }
  };

  const handleAddCodex = () => {
    if (currentCodex && !codex.includes(currentCodex)) {
      setCodex([...codex, currentCodex]);
      setCurrentCodex("");
    }
  };

  const handleRemoveIp = (ipToRemove: string) => {
    setIps(ips.filter((ip) => ip !== ipToRemove));
  };

  const handleRemoveCodex = (codexToRemove: string) => {
    setCodex(codex.filter((c) => c !== codexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: "ip" | "codex") => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      if (type === "ip" && currentIp) {
        handleAddIp();
      } else if (type === "codex" && currentCodex) {
        handleAddCodex();
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Technical Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Support Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="Support email"
            required
          />
        </div>
        <div>
          <label className="block mb-2">SIP Port</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="SIP port"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Switch IP</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Switch IP"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Codex</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Codex"
            required
          />
        </div>
        <div className="relative">
          <label className="block mb-2">IP</label>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter IP addresses"
              value={currentIp}
              onChange={(e) => setCurrentIp(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "ip")}
            />
            <button
              type="button"
              onClick={handleAddIp}
              className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              +
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {ips.map((ip, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
              >
                {ip}
                <button
                  type="button"
                  onClick={() => handleRemoveIp(ip)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <label className="block mb-2">Codex</label>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter Codex values"
              value={currentCodex}
              onChange={(e) => setCurrentCodex(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "codex")}
            />
            <button
              type="button"
              onClick={handleAddCodex}
              className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              +
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {codex.map((c, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
              >
                {c}
                <button
                  type="button"
                  onClick={() => handleRemoveCodex(c)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={onNext}
        className="mt-6 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Next
      </button>
    </div>
  );
};

interface UserInfoProps {
  onSubmit: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ onSubmit }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="First name"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Last name"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Mobile Number</label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            placeholder="Mobile"
            required
          />
        </div>
        <div>
          <label className="block mb-2">User Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="Confirm"
            required
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  );
};

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const handleSubmit = () => console.log("Form submitted");

  return (
    <div className="container mx-auto px-4">
      <StepIndicator currentStep={step} setStep={setStep} />
      {step === 1 && <CompanyInfo onNext={nextStep} />}
      {step === 2 && <TechnicalInfo onNext={nextStep} />}
      {step === 3 && <UserInfo onSubmit={handleSubmit} />}
    </div>
  );
};

export default MultiStepForm;
