"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { 
  UserCircle, Building2, Cog, Trash2, Plus, 
  CheckCircle, Mail, Phone, Globe, MapPin, 
  Hash, Edit, ExternalLink 
} from 'lucide-react';
import DashboardLayout from '../dash_layout/page';
import axiosInstance from '@/app/modules/admin/v2/utils/axiosinstance';

const ProfileCard = ({ title, description, icon: Icon, children, accentColor }) => (
  <motion.div
    initial={{ scale: 0.98, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    <div className="bg-white border-l-4 border-t border-r border-b shadow-sm hover:shadow-md transition-shadow duration-200" 
         style={{ borderLeftColor: accentColor }}>
      <motion.div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <Icon className="text-white" size={16} />
            </motion.div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">{title}</h2>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {children}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const InfoItem = ({ icon: Icon, label, value, accentColor }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className="bg-gray-50 rounded p-3 border border-gray-100"
  >
    <div className="flex items-center space-x-2 mb-1">
      <Icon size={14} style={{ color: accentColor }} />
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
    <p className="text-sm text-gray-800 font-medium pl-6">{value}</p>
  </motion.div>
);

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editableIps, setEditableIps] = useState([]);
  const [newIp, setNewIp] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ... (keep existing data fetching and handling functions)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const customerId = decoded.id;
          const response = await axiosInstance.get(`v3/api/customers/${customerId}`);
          setProfileData(response.data);
          setEditableIps(response.data.switchIps);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleIpChange = (index, value) => {
    const updatedIps = [...editableIps];
    updatedIps[index] = value;
    setEditableIps(updatedIps);
  };

  const handleRemoveIp = (index) => {
    const updatedIps = editableIps.filter((_, ipIndex) => ipIndex !== index);
    setEditableIps(updatedIps);
    updateIpsInBackend(updatedIps);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setNewIp('');
    setIsModalOpen(false);
  };

  const handleAddIp = () => {
    if (newIp) {
      const updatedIps = [...editableIps, newIp];
      setEditableIps(updatedIps);
      updateIpsInBackend(updatedIps);
      handleCloseModal();
    }
  };

  const updateIpsInBackend = async (ips) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const customerId = decoded.id;
      await axiosInstance.put(`v3/api/customers/${customerId}`, { switchIps: ips });
      alert("IPs updated successfully!");
    } catch (error) {
      console.error("Error updating IP addresses", error);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!profileData) return null;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-6 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto space-y-4"
        >
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-white p-6 flex items-center justify-center space-x-2 border border-l-4 border-l-emerald-500 shadow-sm"
          >
            <CheckCircle className="text-emerald-500" size={24} />
            <span className="font-medium text-md text-gray-800">Verified Account</span>
          </motion.div>

          <ProfileCard 
            title="User Information" 
            description="Personal account details" 
            icon={UserCircle}
            accentColor="#f97316"
          >
            <InfoItem icon={UserCircle} label="Full Name" value={`${profileData.userFirstname} ${profileData.userLastname}`} accentColor="#f97316" />
            <InfoItem icon={Mail} label="Email" value={profileData.userEmail} accentColor="#f97316" />
            <InfoItem icon={Hash} label="Username" value={profileData.username} accentColor="#f97316" />
            <InfoItem icon={Phone} label="Mobile" value={profileData.userMobile} accentColor="#f97316" />
          </ProfileCard>

          <ProfileCard 
            title="Company Details" 
            description="Manage company information" 
            icon={Building2}
            accentColor="#f43f5e"
          >
            <InfoItem icon={Hash} label="Customer ID" value={profileData.customerId} accentColor="#f43f5e" />
            <InfoItem icon={Building2} label="Company Name" value={profileData.companyName} accentColor="#f43f5e" />
            <InfoItem icon={Mail} label="Company Email" value={profileData.companyEmail} accentColor="#f43f5e" />
            <InfoItem icon={Globe} label="Country" value={profileData.country} accentColor="#f43f5e" />
            <InfoItem icon={Phone} label="Phone" value={profileData.companyPhone} accentColor="#f43f5e" />
            <InfoItem icon={MapPin} label="Address" value={profileData.address} accentColor="#f43f5e" />
          </ProfileCard>

          <ProfileCard 
            title="Technical Settings" 
            description="Manage technical configurations" 
            icon={Cog}
            accentColor="#10b981"
          >
            <InfoItem icon={Mail} label="Support Email" value={profileData.supportEmail} accentColor="#10b981" />
            <InfoItem icon={Cog} label="SIP Support" value={profileData.sipSupport} accentColor="#10b981" />
            <InfoItem icon={Cog} label="Codex" value={profileData.codex} accentColor="#10b981" />
            
            <div className="col-span-2">
              <h3 className="text-sm font-bold text-gray-800 mb-2">Switch IPs</h3>
              <div className="space-y-2">
                <AnimatePresence>
                  {editableIps.map((ip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={ip}
                        onChange={(e) => handleIpChange(index, e.target.value)}
                        className="px-3 py-2 bg-gray-50 border text-sm text-gray-800 w-full focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                      />
                      {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemoveIp(index)}
                        className="p-2 rounded bg-red-50 text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </motion.button> */}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleOpenModal}
                className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded text-sm flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add IP</span>
              </motion.button>
            </div>
          </ProfileCard>
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white p-4 rounded w-full max-w-md shadow-lg border"
              >
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Add New IP Address</h3>
                <input
                  type="text"
                  value={newIp}
                  onChange={(e) => setNewIp(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border rounded text-sm text-gray-800 w-full mb-3 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Enter new IP"
                />
                <div className="flex justify-end space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleCloseModal}
                    className="px-3 py-2 bg-gray-100 text-sm text-gray-700 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAddIp}
                    className="px-3 py-2 bg-orange-500 text-sm text-white rounded hover:bg-orange-600"
                  >
                    Add IP
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;