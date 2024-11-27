"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axiosInstance from "../../admin/utils/axiosinstance";

// Step Indicator Component
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

// Company Info Component
interface CompanyInfoProps {
  onNext: () => void;
  formData: any; // Adjust the type based on your needs
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ onNext, formData, setFormData }) => {
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
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Company Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="Email"
            value={formData.companyEmail}
            onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Contact Person</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Name"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Country</label>
          <select
            className="w-full border rounded p-2"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
          >
            <option value="">Select</option>
            <option value="India">India</option>
            {/* Add more countries */}
          </select>
        </div>
        <div>
          <label className="block mb-2">Company Phone</label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            placeholder="Phone"
            value={formData.companyPhone}
            onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Address</label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Address"
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Company Website</label>
          <input
            type="url"
            className="w-full border rounded p-2"
            placeholder="Website"
            value={formData.companyWebsite}
            onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
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

interface TechnicalInfoProps {
  onNext: () => void;
  formData: {
    supportEmail: string;
    sipSupport: string;
    switchIps: string[];
    codex: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const TechnicalInfo: React.FC<TechnicalInfoProps> = ({ onNext, formData, setFormData }) => {
  const [ips, setIps] = useState<string[]>(formData.switchIps || []);
  const [currentIp, setCurrentIp] = useState<string>("");
  const [currentCodex, setCurrentCodex] = useState<string>(formData.codex || "");

  const handleAddIp = () => {
    if (currentIp && !ips.includes(currentIp) && ips.length < 30) {
      setIps([...ips, currentIp]);
      setCurrentIp("");
    }
  };

  const handleRemoveIp = (ipToRemove: string) => {
    setIps(ips.filter((ip) => ip !== ipToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      handleAddIp();
    }
  };

  const handleNext = () => {
    setFormData({ ...formData, switchIps: ips, codex: currentCodex });
    onNext();
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
            value={formData.supportEmail}
            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">SIP Port</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="SIP port"
            value={formData.sipSupport} // Use the correct field
            onChange={(e) => setFormData({ ...formData, sipSupport: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Switch IP</label>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter Switch IP"
              value={currentIp}
              onChange={(e) => setCurrentIp(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleAddIp}
            >
              Add IP
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {ips.map((ip, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
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
        <div>
          <label className="block mb-2">Codex</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Codex"
            value={currentCodex}
            onChange={(e) => setCurrentCodex(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleNext}
        className="mt-6 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Next
      </button>
    </div>
  );
};


// User Info Component
const UserInfo: React.FC<{ onSubmit: () => void; formData: any; setFormData: React.Dispatch<React.SetStateAction<any>>; }> = ({ onSubmit, formData, setFormData }) => {
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
            value={formData.userFirstname}
            onChange={(e) => setFormData({ ...formData, userFirstname: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Last name"
            value={formData.userLastname}
            onChange={(e) => setFormData({ ...formData, userLastname: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="Email"
            value={formData.userEmail}
            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Mobile Number</label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            placeholder="Mobile"
            value={formData.userMobile}
            onChange={(e) => setFormData({ ...formData, userMobile: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

// Main MultiStepForm Component
const MultiStepForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    contactPerson: "",
    country: "",
    companyPhone: "",
    address: "",
    companyWebsite: "",
    supportEmail: "",
    sipSupport: "",
    switchIps: [],
    codex: "",
    userFirstname: "",
    userLastname: "",
    username: "",
    userEmail: "",
    userMobile: "",
    password: "",
  });

  const nextStep = () => setStep(step + 1);

  const handleSubmit = async () => {
    try {
      console.log("Submitting form with data:", formData); 
      const response = await axiosInstance.post(`/v3/api/customers`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Form submitted successfully:", );
      router.push("/modules/auth/Base/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div className="container mx-auto px-4">
      <StepIndicator currentStep={step} setStep={setStep} />
      {step === 1 && <CompanyInfo onNext={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && <TechnicalInfo onNext={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 3 && <UserInfo onSubmit={handleSubmit} formData={formData} setFormData={setFormData} />}
    </div>
  );
};

export default MultiStepForm;
