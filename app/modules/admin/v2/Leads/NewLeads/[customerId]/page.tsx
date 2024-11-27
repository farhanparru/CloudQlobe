"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { 
  User, 
  ShoppingCart, 
  CreditCard, 
  HelpCircle, 
  MessageCircle, 
  DollarSign 
} from "lucide-react";
import clsx from "clsx";
import Layout from "../../../layout/page";
import ProfileTab from "./components/Profile";
import CartTab from "./components/AddedRates";
import PaymentsTab from "./components/Payments";
import SupportTab from "./components/Support";
import FollowUpTab from "./components/Followups";
import Rates from "./components/Rates";
import PrivateRates from "./components/PrivateRates";

const LeadDetails = () => {
  const params = useParams();
  const customerId = params?.customerId;
  const [activeTab, setActiveTab] = useState("profile");
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    { name: "profile", label: "Profile", icon: User, color: "blue" },
    {
      name: "rates",
      label: "Rates",
      icon: DollarSign,
      color: "pink",
      subItems: [
        { name: "rates1", label: "Rates" },
        { name: "rates2", label: "Private Rates" },
      ],
    },
    { name: "cart", label: "Cart", icon: ShoppingCart, color: "green" },
    { name: "payments", label: "Payments", icon: CreditCard, color: "purple" },
    { name: "support", label: "Support", icon: HelpCircle, color: "orange" },
    { name: "followup", label: "Follow Up", icon: MessageCircle, color: "rose" },
  ];

  const handleTabClick = (tab) => {
    if (tab.subItems) {
      setShowDropdown((prev) => !prev);
    } else {
      setActiveTab(tab.name);
      setShowDropdown(false); 
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveTab(subItem.name);
    setShowDropdown(false);
  };

  return (
    <Layout>
      <div className="min-h-screen p-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Tabs Navigation */}
          <div className="flex justify-center space-x-6 mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;

              return (
                <div key={tab.name} className="relative">
                  <button
                    onClick={() => handleTabClick(tab)}
                    className={clsx(
                      "flex items-center space-x-3 px-6 py-3 rounded-xl text-lg font-semibold transform transition-all duration-300 ease-in-out",
                      {
                        [`bg-${tab.color}-500 text-white scale-105 shadow-xl`]: isActive && !tab.subItems,
                        [`bg-${tab.color}-100 text-${tab.color}-600 hover:bg-${tab.color}-200 hover:scale-105`]: !isActive,
                      }
                    )}
                  >
                    <Icon size={24} />
                    <span>{tab.label}</span>
                  </button>

                  {/* Submenu for Rates */}
                  {tab.subItems && showDropdown && activeTab !== tab.name && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-lg z-10">
                      {tab.subItems.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleSubItemClick(subItem)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm w-full text-left"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="border-2 p-6 rounded-lg shadow-lg bg-gray-50">
            {activeTab === "profile" && <ProfileTab customerId={customerId} />}
            {activeTab === "rates1" && <Rates customerId={customerId} />}
            {activeTab === "rates2" && <PrivateRates customerId={customerId} />}
            {activeTab === "cart" && <CartTab customerId={customerId} />}
            {activeTab === "payments" && <PaymentsTab customerId={customerId} />}
            {activeTab === "support" && <SupportTab customerId={customerId} />}
            {activeTab === "followup" && <FollowUpTab customerId={customerId} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetails;
