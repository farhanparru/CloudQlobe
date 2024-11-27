"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  ClipboardList,
  User,
  Settings,
  DollarSign,
  ChevronDown,
  Menu,
  X,
  ShoppingBag,
  Truck,
  MessageSquare,
  LogOut,
  Hexagon,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null); // Track the currently open menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const toggleMenu = (menu: string) => {
    // Toggle the menu: if the same menu is clicked, close it, otherwise open the new menu
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("https://www.cloudqlobe.com");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenMenu(null); // Close all menus when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const BASE_URL = "/modules/admin/v2";

  const menuItems = [
    {
      name: "Leads",
      icon: Users,
      color: "#10B981",
      subItems: [
        { name: "New Leads", href: `${BASE_URL}/Leads/NewLeads` },
        { name: "Followup", href: `${BASE_URL}/Leads/Followups` },
      ],
    },
    {
      name: "Sales",
      icon: ShoppingBag,
      color: "#F59E0B",
      subItems: [
        { name: "Leads", href: `${BASE_URL}/Sales/Leads` },
        { name: "Customers", href: `${BASE_URL}/Sales/Customers` },
        { name: "Followups", href: `${BASE_URL}/Sales/Followups` },
        { name: "Emails", href: `${BASE_URL}/Sales/Emails` },
        { name: "Reports", href: `${BASE_URL}/Sales/Reports` },
        { name: "Messages", href: `${BASE_URL}/Sales/Messages` },
        { name: "Internal Assistance", href: `${BASE_URL}/Sales/InternalAssistance` },
      ],
    },
    {
      name: "Carriers",
      icon: Truck,
      color: "#6366F1",
      subItems: [
        { name: "Leads", href: `${BASE_URL}/Carriers/Leads` },
        { name: "Carriers", href: `${BASE_URL}/Carriers/Carriers` },
        { name: "Followups", href: `${BASE_URL}/Carriers/Followups` },
        { name: "Email", href: `${BASE_URL}/Carriers/Email` },
        { name: "Reports", href: `${BASE_URL}/Carriers/Reports` },
        { name: "Messages", href: `${BASE_URL}/Carriers/Messages` },
        { name: "Internal Assistance", href: `${BASE_URL}/Carriers/InternalAssistance` },
      ],
    },
    {
      name: "Rates",
      icon: DollarSign,
      color: "#EC4899",
      subItems: [
        { name: "CC Rates", href: `${BASE_URL}/Rates/CCRates` },
        { name: "Special Rates", href: `${BASE_URL}/Rates/SpecialRates` },
        { name: "Cli Rates", href: `${BASE_URL}/Rates/CLIRates` },
        { name: "Private Rates", href: `${BASE_URL}/Rates/PrivateRates` },
      ],
    },
    {
      name: "Support",
      icon: User,
      color: "#8B5CF6",
      subItems: [
        { name: "Trouble Tickets", href: `${BASE_URL}/Support/TroubleTickets` },
        { name: "Followups", href: `${BASE_URL}/Support/FollowUps` },
        { name: "Testing", href: `${BASE_URL}/Support/Testing` },
        { name: "Tasks", href: `${BASE_URL}/Support/Tasks` },
        { name: "Messages", href: `${BASE_URL}/Support/Messages` },
        { name: "Internal Assistance", href: `${BASE_URL}/Support/InternalAssistance` },
      ],
    },
    {
      name: "Communication",
      icon: MessageSquare,
      color: "#EF4444",
      subItems: [
        { name: "Enquiries", href: `${BASE_URL}/Communication/Enquiries` },
        { name: "DID Number", href: `${BASE_URL}/Communication/DIDEnquiries` },
        { name: "Emails", href: `${BASE_URL}/Communication/EmailDashboard` },
        { name: "Chat Panel", href: `${BASE_URL}/Communication/ChatBot` },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      color: "#3B82F6",
      subItems: [
        { name: "User Management", href: `${BASE_URL}/Settings` },
        { name: "CRM Management", href: `${BASE_URL}/CustomerManagement` },
      ],
    },
  ];

  return (
    <div className="bg-white shadow-lg" ref={dropdownRef}>
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div
              className="flex-shrink-0 mr-2 cursor-pointer"
              onClick={() => router.push("/modules/admin/v2/Dashboard")}
            >
              <LayoutDashboard className="h-8 w-8 text-indigo-500" />
            </div>

            <nav className="flex space-x-4">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <item.icon className="h-5 w-5 mr-4" style={{ color: item.color }} />
                    <span>{item.name}</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>

                  <AnimatePresence>
                    {openMenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="px-4 flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Hexagon className="h-8 w-8 text-indigo-500" />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2 px-2 pt-2 pb-3 sm:px-3"
            >
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="w-full text-left text-gray-700 hover:bg-gray-200 px-3 py-2 text-base font-medium rounded-md"
                  >
                    <item.icon className="h-5 w-5 mr-4" style={{ color: item.color }} />
                    <span>{item.name}</span>
                  </button>

                  {openMenu === item.name && (
                    <div className="pl-8 mt-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-gray-700 px-3 py-2 rounded-md text-base"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Topbar;
