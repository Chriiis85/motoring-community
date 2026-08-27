import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]/95 backdrop-blur-sm text-white font-['F1Regular']">
      <div className="relative flex flex-col items-center">
        {/* Animated F1 Speed Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-6">
          {/* Outer glowing pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#00b9ff]/20 animate-ping opacity-25"></div>
          {/* Rotating cyan spinner */}
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-[#00b9ff] border-r-[#00b9ff] animate-spin"></div>
          {/* Inner counter-rotating red/white accent */}
          <div className="absolute w-12 h-12 rounded-full border-2 border-transparent border-b-[#dc0000] border-l-white animate-[spin_1.5s_linear_infinite_reverse]"></div>
          {/* Center core dot */}
          <div className="w-3 h-3 bg-[#00b9ff] rounded-full shadow-[0_0_12px_#00b9ff]"></div>
        </div>

        {/* Text & Status */}
        <h2 className="text-xl md:text-2xl font-['F1RegularBold'] tracking-widest text-white mb-2">
          MOTORING COMMUNITY
        </h2>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 font-['F1Regular'] uppercase tracking-wider">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00b9ff] animate-pulse"></span>
          <span>Loading telemetry & data...</span>
        </div>

        {/* F1 Speed bar line */}
        <div className="w-48 h-1 bg-[#222] rounded-full overflow-hidden mt-5">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00b9ff] to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full"></div>
        </div>
      </div>
    </div>
  );
}
