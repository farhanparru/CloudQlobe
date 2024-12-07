import React, { useState, useEffect, useRef } from "react";
import { ArrowUpIcon, ArrowDownIcon, Globe } from "lucide-react";

const CurrencyTicker = () => {
  const [tickerData, setTickerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [cloneCount, setCloneCount] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cctResponse = await fetch("https://cloudqlobe-server.onrender.com/v3/api/clt");
        if (!cctResponse.ok) throw new Error("Failed to fetch rate IDs");
        const cctData = await cctResponse.json();
        const uniqueRateIds = [...new Set(cctData.flatMap(item => item.rateids))];
        const rateResponses = await Promise.all(
          uniqueRateIds.map(id =>
            fetch(`https://cloudqlobe-server.onrender.com/v3/api/clirates/${id}`).then(res => res.json())
          )
        );
        setTickerData(rateResponses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && tickerData.length > 0) {
      const calculateCloneCount = () => {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const cardWidth = 280; // Increased card width
        const visibleCards = Math.ceil(containerWidth / cardWidth);
        return Math.max(2, Math.ceil(visibleCards / tickerData.length) + 1);
      };

      const updateCloneCount = () => {
        setCloneCount(calculateCloneCount());
      };

      updateCloneCount();
      window.addEventListener('resize', updateCloneCount);
      return () => window.removeEventListener('resize', updateCloneCount);
    }
  }, [loading, tickerData]);

  const RateCard = React.memo(({ data }) => (
    <div className="relative rate-card flex-shrink-0 rounded-xl p-4 mx-3 min-w-[260px] bg-white/40 backdrop-blur-sm border border-orange-100 hover:border-orange-200">
      <div className="w-full space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{data.country}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
            ${data.status === "active" 
              ? "bg-orange-100 text-orange-700 hover:bg-orange-200" 
              : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
            {data.status}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center bg-white/60 rounded-lg p-3 transition-all hover:bg-white/80">
            <span className="font-medium text-sm text-gray-800">{data.qualityDescription || "N/A"}</span>
          </div>
          
          <div className="flex justify-between items-center bg-white/60 rounded-lg p-3 transition-all hover:bg-white/80">
            <span className="text-sm text-gray-600">Rate</span>
            <span className="font-medium flex items-center text-sm">
              {data.rate} {data.currency || "USD"}
              {data.status === "active" ? (
                <ArrowUpIcon className="h-4 w-4 text-orange-500 ml-2" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-green-500 ml-2" />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  ));

  if (loading) return (
    <div className="flex items-center justify-center p-6 space-x-3">
      <Globe className="animate-spin h-6 w-6 text-orange-500" />
      <span className="text-gray-600 font-medium">Loading rates...</span>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 text-red-500 rounded-lg border border-red-100">
      Error: {error}
    </div>
  );

  const cardWidth = 280;
  const totalWidth = tickerData.length * cardWidth;

  return (
    <div className="relative w-full overflow-hidden " ref={containerRef}>
      <style>
        {`
          @keyframes smoothScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
          }
          
          .ticker-content {
            animation: smoothScroll ${tickerData.length * 8}s linear infinite;
            will-change: transform;
            display: flex;
          }
          
          .ticker-container:hover .ticker-content {
            animation-play-state: paused;
          }
          
          .rate-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .rate-card:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 24px -8px rgba(255, 153, 0, 0.15);
          }
        `}
      </style>
      
      <div className="ticker-container py-6">
        <div className="ticker-content">
          {Array.from({ length: cloneCount }).map((_, cloneIndex) => (
            <div key={`clone-${cloneIndex}`} className="flex">
              {tickerData.map((data, index) => (
                <RateCard 
                  key={`${cloneIndex}-${data._id || index}`} 
                  data={data} 
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyTicker;