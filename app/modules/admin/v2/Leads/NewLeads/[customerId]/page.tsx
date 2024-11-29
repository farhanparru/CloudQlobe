"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  User,
  ShoppingCart,
  CreditCard,
  HelpCircle,
  MessageCircle,
  DollarSign,
  ChevronDown,
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

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    color: "rose",
  },
  {
    id: "rates",
    label: "Rates",
    icon: DollarSign,
    color: "blue",
    submenu: [
      { id: "rates1", label: "Rates", path: "Rates" },
      { id: "rates2", label: "Private Rates", path: "PrivateRates" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    color: "amber",
  },
  {
    id: "support",
    label: "Support",
    icon: HelpCircle,
    color: "purple",
  },
  {
    id: "followup",
    label: "Follow Up",
    icon: MessageCircle,
    color: "slate",
  },
];

const LeadDetails = () => {
  const params = useParams();
  const customerId = params?.customerId;
  const [activeTab, setActiveTab] = useState("profile");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    if (tab.submenu) {
      setDropdownOpen((prev) => (prev === tab.id ? null : tab.id));
    } else {
      setActiveTab(tab.id);
      setDropdownOpen(false);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveTab(subItem.id);
    setDropdownOpen(false);
  };

 

  return (
    <Layout>
      <div className="min-h-screen p-12 bg-gray-50">
        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-6 mb-12">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative">
              <motion.button
                className={clsx(
                  "flex items-center p-3 rounded-xl transition-all",
                  activeTab === tab.id
                    ? `bg-${tab.color}-100 text-${tab.color}-600`
                    : `hover:bg-${tab.color}-50`
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabClick(tab)}
              >
                <tab.icon
                  size={24}
                  className={`mr-2 ${
                    activeTab === tab.id
                      ? `text-${tab.color}-600`
                      : `text-${tab.color}-500`
                  }`}
                />
                <span className="font-medium">{tab.label}</span>
                {tab.submenu && (
                  <ChevronDown
                    className={clsx(
                      "ml-2 transition-transform",
                      dropdownOpen === tab.id ? "rotate-180" : ""
                    )}
                    size={16}
                  />
                )}
              </motion.button>

              {tab.submenu && dropdownOpen === tab.id && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  {tab.submenu.map((subItem) => (
                    <motion.button
                      key={subItem.id}
                      className="block w-full text-left p-3 rounded-lg text-gray-600 hover:bg-gray-50"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSubItemClick(subItem)}
                    >
                      {subItem.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="p-6 bg-white rounded-lg shadow-md">
        {activeTab === "profile" && <ProfileTab customerId={customerId} />}
            {activeTab === "rates1" && <Rates customerId={customerId} />}
            {activeTab === "rates2" && <PrivateRates customerId={customerId} />}
            {activeTab === "payments" && <PaymentsTab customerId={customerId} />}
            {activeTab === "support" && <SupportTab customerId={customerId} />}
            {activeTab === "followup" && <FollowUpTab customerId={customerId} />}
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetails;