import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  User,
  BarChart3,
  Wallet,
  LifeBuoy,
  Settings,
  ChevronDown,
  Monitor,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react";

const BASE_PATH = "/modules/customer/pages";

const menuItems = [
  { 
    id: "home", 
    icon: Home, 
    label: "Home", 
    path: `${BASE_PATH}/home`,
    color: "emerald"
  },
  { 
    id: "profile", 
    icon: User, 
    label: "Profile", 
    path: `${BASE_PATH}/profile-page`,
    color: "rose"
  },
  {
    id: "rates",
    icon: BarChart3,
    label: "Rates",
    color: "blue",
    submenu: [
      { id: "ccRates", label: "CC Rates", icon: LineChart, path: `${BASE_PATH}/rates_page/Rates` },
      { id: "myRates", label: "My Rates", icon: PieChart, path: `${BASE_PATH}/myRates` },
      { id: "privateRates", label: "Private Rates", icon: TrendingUp, path: `${BASE_PATH}/rates_page/PrivateRates` },
      { id: "cliRates", label: "CLI Rates", icon: Monitor, path: `${BASE_PATH}/cliRates` },
    ],
  },
  { 
    id: "payments", 
    icon: Wallet, 
    label: "Payments", 
    path: `${BASE_PATH}/payments_page`,
    color: "amber"
  },
  { 
    id: "trouble", 
    icon: LifeBuoy, 
    label: "Support", 
    path: `${BASE_PATH}/trouble_page`,
    color: "purple"
  },
  { 
    id: "settings", 
    icon: Settings, 
    label: "Settings", 
    path: `${BASE_PATH}/settings`,
    color: "slate"
  },
];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const getBackgroundColor = (color, isActive) => {
    const colors = {
      emerald: isActive ? "bg-emerald-100" : "hover:bg-emerald-50",
      rose: isActive ? "bg-rose-100" : "hover:bg-rose-50",
      blue: isActive ? "bg-blue-100" : "hover:bg-blue-50",
      amber: isActive ? "bg-amber-100" : "hover:bg-amber-50",
      purple: isActive ? "bg-purple-100" : "hover:bg-purple-50",
      slate: isActive ? "bg-slate-100" : "hover:bg-slate-50",
    };
    return colors[color];
  };

  const getIconColor = (color, isActive) => {
    const colors = {
      emerald: isActive ? "text-emerald-600" : "text-emerald-500",
      rose: isActive ? "text-rose-600" : "text-rose-500",
      blue: isActive ? "text-blue-600" : "text-blue-500",
      amber: isActive ? "text-amber-600" : "text-amber-500",
      purple: isActive ? "text-purple-600" : "text-purple-500",
      slate: isActive ? "text-slate-600" : "text-slate-500",
    };
    return colors[color];
  };

  return (
    <div className="fixed top-16 left-0 w-full bg-white shadow-lg z-50 p-4">
     <div className="flex items-center justify-between gap-x-4">

        {menuItems.map((item) => (
          <div key={item.id} className="relative">
            {item.submenu ? (
              <div className="group">
                <motion.button
                  className={`flex items-center p-3 rounded-xl transition-all ${getBackgroundColor(item.color, activeItem === item.id)}`}
                  onClick={() => setIsDropdownOpen(isDropdownOpen === item.id ? null : item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon size={24} className={`${getIconColor(item.color, activeItem === item.id)}`} />
                  <span className="ml-2 font-medium text-gray-600">{item.label}</span>
                  <ChevronDown 
                    className={`ml-2 transition-transform ${isDropdownOpen === item.id ? "rotate-180" : ""}`} 
                    size={16}
                  />
                </motion.button>

                {isDropdownOpen === item.id && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                    {item.submenu.map((subItem) => (
                      <Link key={subItem.id} href={subItem.path}>
                        <motion.div
                          className={`flex items-center p-2 rounded-lg space-x-3 ${getBackgroundColor(item.color, activeItem === subItem.id)}`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveItem(subItem.id)}
                        >
                          <subItem.icon size={18} className={getIconColor(item.color, activeItem === subItem.id)} />
                          <span className="font-medium text-gray-600">{subItem.label}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link href={item.path}>
                <motion.div
                  className={`flex items-center p-3 rounded-xl transition-all ${getBackgroundColor(item.color, activeItem === item.id)}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveItem(item.id)}
                >
                  <item.icon size={24} className={getIconColor(item.color, activeItem === item.id)} />
                  <span className="ml-2 font-medium text-gray-600">{item.label}</span>
                </motion.div>
              </Link>
            )}
          </div>
        ))}
<motion.a
  href="http://69.197.162.230:2047/customer/eng/index.html"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center p-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all ml-auto"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <Monitor size={24} />
  <span className="ml-2 font-medium">CDR Panel</span>
</motion.a>

      </div>
    </div>
  );
};

export default Navbar;
