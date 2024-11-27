"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image"; // Import the Image component from Next.js
import { MapPin, Phone, Mail } from "lucide-react";
import CustomizedQuotesForm from "../components/DIDQuotation";
import axiosInstance from "../modules/admin/utils/axiosinstance";
import Header from "../components/Header";
import Footer from "../components/Footer";

const image1 = "/Banner/contact_us.png"; // Static image path

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "contact"
  });

  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null); // Reset submit status
    setLoading(true); // Set loading to true

    try {
      const response = await axiosInstance.post('v3/api/inquiries', formData);
      if (response.status === 201) {
        setSubmitStatus("Your message has been sent successfully!");
        // Reset form fields
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      setSubmitStatus("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (<><Header></Header>
    <div>
      {/* Banner Image */}
      <div className="w-full mt-16">
        <Image
          src={image1}
          alt="Contact Us Banner"
          className="w-full h-auto object-contain"
          width={1200} // Adjust width as needed
          height={400} // Adjust height as needed
          layout="responsive" // Ensure it scales responsively
        />
      </div>

      {/* Contact Information and Form Section */}
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-6xl bg-white mx-auto relative" style={{ marginTop: "3em" }}>
          {/* Contact Info Cards - Positioned to overlap */}
          <div className="grid grid-cols-2 gap-6 absolute left-8 top-1/2 -translate-y-1/2 z-10 w-[400px]">
            {/* Address Card */}
            <div className="aspect-square bg-white p-6 border-2 border-orange-400 rounded-lg flex flex-col items-center justify-center">
              <MapPin className="text-orange-400 w-8 h-8 mb-4" />
              <p className="text-gray-700 text-center">
                44 Heung Yip Road,
                <br />
                Southern District, HK
              </p>
            </div>

            {/* Phone Card */}
            <div className="aspect-square bg-white p-6 border-2 border-orange-400 rounded-lg flex flex-col items-center justify-center">
              <Phone className="text-orange-400 w-8 h-8 mb-4" />
              <p className="text-gray-700 text-center">+44 741836587</p>
            </div>

            {/* Skype Card */}
            <div className="aspect-square bg-white p-6 border-2 border-orange-400 rounded-lg flex flex-col items-center justify-center">
              <svg
                className="w-8 h-8 text-orange-400 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324m11.084-4.882l-.029.135-.044-.24c.015.045.044.074.059.12.12-.675.181-1.363.181-2.052 0-1.529-.301-3.012-.898-4.42-.569-1.348-1.395-2.562-2.427-3.596-1.049-1.033-2.247-1.856-3.595-2.426-1.318-.631-2.801-.93-4.328-.93-.72 0-1.444.07-2.143.204l.119.06-.239-.033.119-.025C8.91.274 7.829 0 6.731 0c-1.789 0-3.47.698-4.736 1.967C.729 3.235.032 4.923.032 6.716c0 1.143.292 2.265.844 3.258l.02-.124.041.239-.06-.115c-.114.645-.172 1.299-.172 1.955 0 1.53.3 3.017.884 4.416.568 1.362 1.378 2.576 2.427 3.609 1.034 1.05 2.247 1.857 3.595 2.442 1.394.6 2.877.898 4.404.898.659 0 1.334-.06 1.977-.179l-.119-.062.24.046-.135.03c1.002.569 2.126.871 3.294.871 1.783 0 3.459-.69 4.733-1.963 1.259-1.259 1.962-2.951 1.962-4.749 0-1.138-.299-2.262-.853-3.266" />
              </svg>
              <p className="text-gray-700 text-center break-all text-sm">
                live:.cid.809c84eeee9e0db1
              </p>
            </div>

            {/* Email Card */}
            <div className="aspect-square bg-white p-6 border-2 border-orange-400 rounded-lg flex flex-col items-center justify-center">
              <Mail className="text-orange-400 w-8 h-8 mb-4" />
              <p className="text-gray-700 text-center break-all text-sm">
                marketing@cloudqlobe.com
              </p>
            </div>
          </div>

          {/* Contact Form Section - Full width with left padding for cards */}
          <div className="w-full bg-gradient-to-br from-[#323F3F] to-[#83A5A5] rounded-lg ml-auto pl-[450px] min-h-[600px]">
            <div className="p-12">
              <h2 className="text-4xl font-bold text-white mb-8">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name" // Set the name attribute
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-3 rounded-lg bg-white"
                    required // Make it a required field
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email" // Set the name attribute
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-3 rounded-lg bg-white"
                    required // Make it a required field
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject" // Set the name attribute
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full p-3 rounded-lg bg-white"
                    required // Make it a required field
                  />
                </div>
                <div>
                  <textarea
                    name="message" // Set the name attribute
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={4}
                    className="w-full p-3 rounded-lg bg-white resize-none"
                    required // Make it a required field
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-lg transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500'}`}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
              {/* Submit status message */}
              {submitStatus && <p className="mt-4 text-white">{submitStatus}</p>}
            </div>
          </div>
        </div>
      </div>
      <CustomizedQuotesForm />
    </div><Footer/></>
  );
};

export default ContactForm;
