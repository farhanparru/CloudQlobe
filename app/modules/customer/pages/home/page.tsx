"use client";
import React, { useState , useEffect,useRef } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  ChevronUp,
  Bell,
  Settings,
  Building2,
  Edit,
  ExternalLink,
  Hash,
  Mail,
  Users, 
  Network,
   Globe,
    Activity ,
    Signal,Trophy
} from 'lucide-react'; // Ensure these icons are available in lucide-react or replace with similar icons
import DashboardLayout from '../dash_layout/page';
import Ticker from '@/app/components/Ticker';
import axiosInstance from '@/app/modules/admin/utils/axiosinstance';
import{ jwtDecode} from 'jwt-decode';

type CountryRate = {
  country: string;
  qualityDescription: 'ivr' | 'inbound';
  rate: number;
  category: string;
};



const Dashboard = () => {


  
  const [selectedCard, setSelectedCard] = useState(0);

  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await axiosInstance.get('/v3/api/clirates');
        setTickerData(response.data); // Assuming the API returns an array of ticker items
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }
    };

    fetchTickerData();
  }, []);
  const stats = [
    { icon: Users, label: 'Active Users', value: '500', trend: '+12%' },                 // Users icon for "Active Users"
    { icon: Trophy, label: 'Success Ratio', value: '98%', trend: '+1%' },                // Network icon for "Total Routes"
    { icon: Globe, label: 'Destinations', value: '50', trend: '+8%' },                   // Globe icon for "Destinations"
    { icon: Activity, label: 'Carriers Interconnections', value: '250+', trend: '+2%' }, // Activity icon for "Carriers Interconnections"
  ];


  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
//table
useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const customerId = decoded.id;
        const response = await axiosInstance.get(`v3/api/customers/${customerId}`);
        setProfileData(response.data);
      
      }
    } catch (error) {
      console.error("Error fetching profile data", error);
    } finally {
      setLoading(false);
    }
  };
  fetchProfileData();
}, []);
const company = {
  id: profileData?.customerId ||"NA",
  name: profileData?.companyName ||"NA",
  email: profileData?.companyEmail ||"NA",
  country: profileData?.country ||"NA"
};
const [data, setData] = useState<CountryRate[]>([]);
const [currentPage, setCurrentPage] = useState<number>(1);

const rowsPerPage = 6;
const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

const fetchData = async (): Promise<void> => {
  setLoading(true);
  try {
    const response = await fetch("https://cloudqlobe-server.onrender.com/v3/api/rates");
    if (!response.ok) throw new Error("Failed to fetch data");

    const fetchedData: CountryRate[] = await response.json();
    const filteredData = fetchedData.filter(rate => rate.category === "specialrate");
    setData(filteredData);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);

const sortData = (key: string) => {
  let direction = 'ascending';
  if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
};

const getSortedData = () => {
  if (!sortConfig) return data;
  return [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });
};


const scrollerRef = useRef(null);
const [scrollWidth, setScrollWidth] = useState(0);

useEffect(() => {
  if (scrollerRef.current) {
    // Get the total width of one set of items
    setScrollWidth(scrollerRef.current.offsetWidth);
  }
}, []);

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;
const currentRows = getSortedData().slice(indexOfFirstRow, indexOfLastRow);
const totalPages = Math.ceil(data.length / rowsPerPage);

const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//table over


  return (
    <DashboardLayout>
   <div className="min-h-screen  w-full">
   <div className="flex flex-col bg-white items-center space-y-8 px-4 py-4 mx-auto" style={{width:"80em"}}>
                  {/* <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center p-2">
              <div className="flex justify-end items-center space-x-2 w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                  />
                </div>
                <button
                  type="button"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </div>
          </header> */}


          <div className=" " style ={{maxWidth:"100%", width:"100%"}}>
          <div className="flex bg-gray-200 rounded-lg shadow-lg p-6 gap-6">
              {/* Welcome Section */}
              <div className="w-1/3 flex flex-col justify-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="text-orange-600" size={28} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome back to our<br/>
                   dashboard 👋
                </h1>
                <p className="text-gray-500">Stay updated with our latest Updates</p>
                <div className="flex space-x-2 mt-4">
                
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px bg-gray-100" />

              {/* Company Details Section */}
              <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Hash size={18} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-500">Customer ID</span>
                  </div>
                  <p className="text-gray-800 font-medium pl-7">{company.id}</p>
                </div>

                <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Building2 size={18} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-500">Company Name</span>
                  </div>
                  <p className="text-gray-800 font-medium pl-7">{company.name}</p>
                </div>

                <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail size={18} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-500">Contact Email</span>
                  </div>
                  <p className="text-gray-800 font-medium pl-7">{company.email}</p>
                </div>

                <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Globe size={18} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-500">Country</span>
                  </div>
                  <p className="text-gray-800 font-medium pl-7">{company.country}</p>
                </div>
              </div>
            </div>




            <div className="relative rounded-lg">
      {/* Original scrolling content */}

      
      <div className="relative w-full">
      <div className="mt-4 mb-4"> <Ticker/> </div>
      </div>
      
      {/* Left fade gradient */}
      <div className="absolute left-0  top-0 h-full w-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, white, transparent)'
        }}
      />
      
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 h-full w-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, white, transparent)'
        }}
      />
    </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
  {stats.map((stat, index) => {
    const Icon = stat.icon;
    const backgroundColors = [
      
      'bg-green-500', 
      'bg-orange-400',    // Vibrant indigo
      'bg-blue-400',  // Deep emerald green
        // Rich amber yellow
       // Intense violet
      'bg-rose-500'      // Bold rose
    ];
    
    return (
      <div
        key={index}
        className={`p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
          selectedCard === index ? 'ring-2 ring-white-500' : ''
        } ${backgroundColors[index % backgroundColors.length]}`}
        onClick={() => setSelectedCard(index)}
      >
        <div className="flex items-center justify-between">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Icon className="text-orange-600" size={24} />
          </div>
          <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-white' : 'text-red-500'}`}>
            {stat.trend}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mt-4">{stat.value}</h3>
        <p className="text-white text-sm">{stat.label}</p>
      </div>
    );
  })}
</div>


            {/* Ticker Scroller */}
            <div className="bg-white p-4 mx-4 rounded-xl shadow-sm overflow-hidden">
  <style>
    {`
      .custom-ticker-container {
        overflow: hidden;
        position: relative;
        white-space: nowrap;
      }
      .custom-scroller-content {
        display: inline-flex;
        animation: custom-scroll 25s linear infinite;
      }
      @keyframes custom-scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      .custom-ticker-item {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem;
        margin: 0 1rem;
        background-color: #FFF7ED;
        border-radius: 0.5rem;
        transition: transform 0.3s ease;
      }
      .custom-ticker-item:hover {
        transform: scale(1.05);
      }
      .custom-ticker-route {
        font-weight: 600;
        color: #1F2937;

      }
      .custom-ticker-rate {
        color: #EA580C;
        margin-left:.5rem;
      }
      .custom-ticker-trend-positive {
        color: #16A34A;
          margin-left:.5rem;
      }
      .custom-ticker-trend-negative {
        color: #DC2626;
      }
    `}
  </style>

  <div className="custom-ticker-container">
    <div ref={scrollerRef} className="custom-scroller-content">
      {/* Render the items twice for seamless scroll */}
      {[...tickerData, ...tickerData].map((item, index) => (
        <div
          key={index}
          className="custom-ticker-item"
        >
          <span className="custom-ticker-route">{item.country}</span>
          <span className="custom-ticker-rate">${item.rate}</span>
          <span className={item.qualityDescription? 'custom-ticker-trend-positive' : 'custom-ticker-trend-negative'}>
            {item.qualityDescription}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>


    

            {/* Main Chart */}
            {/* <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
  

            <div className="bg-transparent mx-auto p-2 rounded-lg">
      <style jsx>{`
        .slide-in-right {
          animation: slide-in-right 0.5s forwards;
        }
        table {
          border-radius: 8px;
          overflow: hidden;
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }
      `}</style>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="shadow-lg  rounded-lg">

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="flex items-center" style={{ marginLeft: "0em" , marginBottom: "1em"}}>
                <div className="bg-orange-500 text-2xl rounded-lg text-white p-2 mr-2" style={{ paddingTop: ".25em", paddingLeft: ".8em", paddingRight: ".8em", paddingBottom: ".25em" }}>
                  $
                </div>
                <div className="flex items-center p-2 py-2 rounded-lg bg-blue-500">
                  <h1 className="text-lg font-regular text-white mb-0">Premium CC Routes</h1>
                </div>
          </div>
</div>
        */}
{/* 
          <table className="min-w-full rounded- p-6 bg-white">
            <thead classNmae ="rounded-lg">
              <tr className="bg-orange-600 rounded-lg">
                {['Country Name', 'Quality Description','Profile','Rate'].map((header, index) => (
                  <th
                    key={index}
                    onClick={() => sortData(header.toLowerCase().replace(' ', ''))}
                    className="py-4  px-6 text-left text-white font-light tracking-wider cursor-pointer hover:bg-orange-700 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{header}</span>
                      {sortConfig?.key === header.toLowerCase().replace(' ', '') && (
                        <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {currentRows.map((item, index) => (
                <tr key={index} className="hover:bg-amber-50 group">
                  <td className="py-3 px-6 font-light">{item.country}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 text-sm ${
                        item.qualityDescription === 'ivr'
                          ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                          : 'bg-emerald-50 text-emerald-700 border-l-2 border-emerald-500'
                      }`}
                    >
                      {item.qualityDescription}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                  <span
                      className={`px-3 py-1 text-sm ${
                        item.profile === 'IVR'
                          ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                          : 'bg-yellow-50 text-yellow-700 border-l-2 border-emerald-500'
                      }`}
                    >{item.profile}</span>
                  </td>
                  <td className="py-3 px-6">
                    <span className="font-light text-amber-600">${item.rate.toFixed(3)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}

                  {/* <div className="flex justify-center items-center space-x-2 mt-4">
                    <a
                      href="#"
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'text-gray-400' : 'text-orange-600'}`}
                    >
                      &laquo; Previous
                    </a>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <a
                        key={index + 1}
                        href="#"
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'font-bold text-orange-600' : 'text-orange-600'}`}
                      >
                        {index + 1}
                      </a>
                    ))}
                    <a
                      href="#"
                      onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                      className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'text-gray-400' : 'text-orange-600'}`}
                    >
                      Next &raquo;
                    </a>
                  </div>
                </div>
              )}
            </div>
            </div> */}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
