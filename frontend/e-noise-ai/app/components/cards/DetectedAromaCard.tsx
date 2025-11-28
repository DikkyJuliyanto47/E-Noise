"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function DetectedAromaCard() {
  const [confidence, setConfidence] = useState(0);

  // sementara data masih statis
  const data = {
    aroma: "Arabica / Robusta",
    confidence: 91,
    cluster: 2,
    image: "/coffee.png",
  };

  useEffect(() => {
    // animasi naik pelan
    const timeout = setTimeout(() => {
      setConfidence(data.confidence);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-[#181818] p-6 rounded-xl border border-[#242424] hover:border-[#CDAF6F] transition-all duration-300">
      
      <p className="text-sm opacity-60 mb-2">Detected Aroma</p>

      <div className="flex items-center gap-6">
        
        {/* Image */}
        <div className="relative w-20 h-20">
          <Image
            src={data.image}
            alt="Detected Aroma"
            fill
            className="object-cover rounded-full border border-[#CDAF6F]/40 shadow-md"
          />
        </div>

        {/* Circular Progress */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <svg className="rotate-[-90deg]" width="80" height="80">
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#222"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#CDAF6F"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 30}
              strokeDashoffset={2 * Math.PI * 30 * (1 - confidence / 100)}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>

          <span className="absolute text-lg font-semibold text-[#CDAF6F]">
            {confidence}%
          </span>
        </div>
      </div>

      {/* Text Info */}
      <h3 className="text-xl font-semibold text-[#CDAF6F] mt-4">
        {data.aroma}
      </h3>

      <p className="text-sm opacity-60 mt-1">
        Cluster: <span className="text-[#CDAF6F]">{data.cluster}</span>
      </p>

    </div>
  );
}
