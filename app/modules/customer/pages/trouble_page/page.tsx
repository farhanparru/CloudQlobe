"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  Plus,
  Loader2,
  Building2,
  Sparkles,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../dash_layout/page";
import axiosInstance from "@/app/modules/admin/utils/axiosinstance";

// Tab Button component for selecting different views
const TabButton = ({ active, children, onClick, color }) => {
  const colorClasses = {
    blue: "border-blue-600",
    rose: "border-amber-600",
    orange: "border-orange-600",
    emerald: "border-emerald-600",
  };

  return (
    <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-4 text-sm font-bold transition-all relative rounded-xl shadow-sm border-2 ${
      active
        ? `${colorClasses[color]} text-gray-900`
        : "border-transparent bg-white text-gray-600 hover:text-gray-800"
    }`}
    style={{
      boxShadow: active ? `0 4px 12px -2px rgba(0, 0, 0, 0.08)` : undefined,
    }}
    onClick={onClick}
  >
    <div className="flex items-center space-x-2">
      {children}
    </div>
  </motion.button>
  );
};

// Table row component for displaying ticket data
const TicketTable = ({ ticket, customerData, onClick, onCellEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-red-100 text-red-700 border-red-200",
      inProgress: "bg-amber-100 text-amber-700 border-amber-200",
      resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <motion.tr
      key={ticket.id}
      whileHover={{ backgroundColor: "#f9fafb" }}
      onClick={() => onClick(ticket.id)}
      className="cursor-pointer transition duration-200"
    >
      <td className="px-4 py-2 text-gray-900 font-medium border">{customerData[ticket.customerId]?.companyName || "N/A"}</td>
      <td className="px-4 py-2 text-gray-500 border">{ticket.companyId}</td>
    
      <td className="px-4 py-2 border">
        <span
          className="text-gray-900 font-medium cursor-pointer"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onCellEdit(ticket.id, "followupMethod", e.target.textContent)}
        >
          {ticket.followupMethod}
        </span>
      </td>
      <td className="px-4 py-2 border">
        <span
          className="text-gray-900 font-medium cursor-pointer"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onCellEdit(ticket.id, "appointedPerson", e.target.textContent)}
        >
          {ticket.appointedPerson}
        </span>
      </td>
      <td className="px-4 py-2 border">
        <span className="text-gray-900 font-medium">{formatDate(ticket.followupTime)}</span>
      </td>
      <td className="px-4 py-2 border">
        <div
          className={`px-3 py-1 rounded-full border ${getStatusColor(ticket.followupStatus)}`}
        >
          <span className="text-sm font-medium">
            {ticket.followupStatus?.charAt(0).toUpperCase() +
              ticket.followupStatus.slice(1)}
          </span>
        </div>
      </td>
    </motion.tr>
  );
};

const FollowUp = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [followUpData, setFollowUpData] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setCustomerId(decodedToken.customerId);
      setCompanyName(decodedToken.companyName || "");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!customerId) return;

      try {
        const followUpsResponse = await axiosInstance.get("v3/api/followups");
        const filteredData = followUpsResponse.data.filter(
          (item) =>
            item.followupCategory === "General" && item.companyId === customerId
        );
        setFollowUpData(filteredData);

        const customerIds = [
          ...new Set(filteredData.map((item) => item.customerId)),
        ];
        const customers = {};
        for (const id of customerIds) {
          const response = await axiosInstance.get(`v3/api/customers/${id}`);
          customers[id] = response.data;
        }
        setCustomerData(customers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  const getFilteredTickets = () => {
    return followUpData.filter((ticket) => {
      if (activeTab === "all") return true;
      return ticket.followupStatus === activeTab;
    });
  };

  const handleRowClick = (ticketId) => {
    router.push(`/modules/customer/trouble_page/FollowUpDetails/${ticketId}`);
  };

  const handleCellEdit = (ticketId, field, value) => {
    setFollowUpData((prevData) =>
      prevData.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const filteredTickets = getFilteredTickets();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl  mx-auto">
            <div className="flex items-center   justify-between px-8 py-6 border-b border-gray-100">
              <div className="flex items-center  space-x-4">
                <div className="bg-orange-400 p-3 rounded-xl shadow-sm">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {companyName || "Ticket Dashboard"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Company ID: {customerId || "Loading..."}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  router.push("/modules/customer/pages/trouble_page/Addfollowup")
                }
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-sm hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="font-bold">Create Ticket</span>
              </motion.button>
            </div>

            <div className="flex space-x-4 px-8 py-6 overflow-x-auto">
              <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")} color="blue">
                All Tickets
              </TabButton>
              <TabButton active={activeTab === "pending"} onClick={() => setActiveTab("pending")} color="rose">
                Pending
              </TabButton>
              <TabButton active={activeTab === "inProgress"} onClick={() => setActiveTab("inProgress")} color="orange">
                In Progress
              </TabButton>
              <TabButton active={activeTab === "resolved"} onClick={() => setActiveTab("resolved")} color="emerald">
                Resolved
              </TabButton>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Company ID</th>
                     
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Support Assistance</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Technical Engineer</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estimated Time</th>
                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredTickets.map((ticket) => (
                        <TicketTable
                          key={ticket.id}
                          ticket={ticket}
                          customerData={customerData}
                          onClick={handleRowClick}
                          onCellEdit={handleCellEdit}
                        />
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FollowUp;
