'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SelectPage() {
  const [hoveredItem, setHoveredItem] = useState(null);

  
  let backgroundDottedStyle = "opacity-0 scale-95 pointer-events-none";
  if (hoveredItem === 'demographics') {
    backgroundDottedStyle = "opacity-100 scale-100 -inset-8 pointer-events-none";
  } else if (hoveredItem === 'cosmetic') {
    backgroundDottedStyle = "opacity-100 scale-110 -inset-12 pointer-events-none";
  } else if (hoveredItem === 'skin') {
    backgroundDottedStyle = "opacity-100 scale-105 -inset-10 translate-y-2 pointer-events-none";
  } else if (hoveredItem === 'weather') {
    backgroundDottedStyle = "opacity-100 scale-120 -inset-14 pointer-events-none";
  }

  return (
    <main className="relative h-screen w-screen bg-[#ffffff] text-[#111111] font-sans select-none overflow-hidden p-8 sm:p-12 flex flex-col justify-between">
  
      <header className="flex justify-between items-start z-20 w-full">
        <div className="flex flex-col gap-5">
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-bold text-[13px] tracking-[0.05em] text-[#111111] hover:opacity-70 transition-opacity uppercase"
            >
              SKINSTRIC
            </Link>
            <span className="text-[12px] tracking-[0.05em] text-[#888888] font-normal">
              [ INTRO ]
            </span>
          </div>

          
          <div className="flex flex-col gap-1.5 mt-2">
            <h1 className="text-xl sm:text-1xl font-bold tracking-tight uppercase text-[#111111]">
              A.I. ANALYSIS
            </h1>
            <p className="text-[12px] text-[#111111] font-normal uppercase leading-tight">
              A.I. HAS ESTIMATED THE FOLLOWING.
            </p>
            <p className="text-[12px] text-[#111111] font-normal uppercase leading-tight">
              FIX ESTIMATED INFORMATION IF NEEDED.
            </p>
          </div>
        </div>

        
        <button className="bg-[#000000] text-white px-5 py-2.5 text-[11px] tracking-[0.15em] font-semibold uppercase hover:bg-neutral-800 transition-all cursor-pointer">
          ENTER CODE
        </button>
      </header>

      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] flex items-center justify-center">
          
        
          <div className={`absolute border border-dashed border-gray-400 transition-all duration-300 ease-out rotate-45 ${backgroundDottedStyle}`} />

          
          <div className="relative w-full h-full rotate-45 grid grid-cols-2 grid-rows-2 gap-2 p-2">
            
            
            <Link
              href="/summary"
              onMouseEnter={() => setHoveredItem('demographics')}
              onMouseLeave={() => setHoveredItem(null)}
              className="bg-[#f3f3f3] hover:bg-[#111111] transition-all duration-200 flex items-center justify-center cursor-pointer group/item overflow-hidden"
            >
              <span className="-rotate-45 text-[11px] sm:text-[12px] tracking-[0.15em] font-bold text-center uppercase text-[#111111] group-hover/item:text-white px-2">
                DEMOGRAPHICS
              </span>
            </Link>

            
            <div
              onMouseEnter={() => setHoveredItem('skin')}
              onMouseLeave={() => setHoveredItem(null)}
              className="bg-[#f3f3f3] hover:bg-gray-200 transition-all duration-200 flex items-center justify-center cursor-not-allowed overflow-hidden"
            >
              <span className="-rotate-45 text-[11px] sm:text-[12px] tracking-[0.15em] font-bold text-center uppercase text-[#111111] px-2 pointer-events-none">
                SKIN TYPE DETAILS
              </span>
            </div>

            
            <div
              onMouseEnter={() => setHoveredItem('cosmetic')}
              onMouseLeave={() => setHoveredItem(null)}
              className="bg-[#f3f3f3] hover:bg-gray-200 transition-all duration-200 flex items-center justify-center cursor-not-allowed overflow-hidden"
            >
              <span className="-rotate-45 text-[11px] sm:text-[12px] tracking-[0.15em] font-bold text-center uppercase text-[#111111] px-2 leading-tight pointer-events-none">
                COSMETIC CONCERNS
              </span>
            </div>

            
            <div
              onMouseEnter={() => setHoveredItem('weather')}
              onMouseLeave={() => setHoveredItem(null)}
              className="bg-[#f3f3f3] hover:bg-gray-200 transition-all duration-200 flex items-center justify-center cursor-not-allowed overflow-hidden"
            >
              <span className="-rotate-45 text-[11px] sm:text-[12px] tracking-[0.15em] font-bold text-center uppercase text-[#111111] px-2 pointer-events-none">
                WEATHER
              </span>
            </div>

          </div>
        </div>
      </div>

      
      <footer className="flex justify-between items-center z-20 w-full">
        
        <Link
          href="/camera/capture"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 border border-[#111111] rotate-45 flex items-center justify-center group-hover:bg-[#111111] transition-all">
            <span className="-rotate-45 text-[10px] text-[#111111] group-hover:text-white">
              ◀
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#111111]">
            BACK
          </span>
        </Link>

        
        <Link
          href="/summary"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#111111]">
            GET SUMMARY
          </span>
          <div className="w-10 h-10 border border-[#111111] rotate-45 flex items-center justify-center group-hover:bg-[#111111] transition-all">
            <span className="-rotate-45 text-[10px] text-[#111111] group-hover:text-white">
              ▶
            </span>
          </div>
        </Link>
      </footer>
    </main>
  );
}