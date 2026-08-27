'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#fbfbfb] text-black flex flex-col justify-between p-8 sm:p-12 font-sans select-none overflow-hidden">
      
      {/* HEADER SECTION */}
      <header className="flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <span className="font-bold text-xs tracking-[0.2em] text-black uppercase">
            SKINSTRIC
          </span>
          <span className="text-[11px] tracking-[0.15em] text-gray-400 font-mono">
            [ INTRO ]
          </span>
        </div>

        <button className="bg-black text-white px-6 py-2.5 text-[10px] tracking-[0.2em] font-medium uppercase hover:bg-neutral-800 transition-all duration-300">
          ENTER CODE
        </button>
      </header>

      
      <div className="flex-1 flex items-center justify-center relative my-8 z-10">
        
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <line 
            x1="0" y1="0" x2="15%" y2="50%" 
            stroke="#111111" strokeWidth="0.75" strokeDasharray="3 3" 
            className="transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            opacity={hoveredBtn === 'right' ? "0" : hoveredBtn === 'left' ? "0.6" : "0.25"} 
          />
          <line 
            x1="0" y1="100%" x2="15%" y2="50%" 
            stroke="#111111" strokeWidth="0.75" strokeDasharray="3 3" 
            className="transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            opacity={hoveredBtn === 'right' ? "0" : hoveredBtn === 'left' ? "0.6" : "0.25"} 
          />
          <line 
            x1="100%" y1="0" x2="85%" y2="50%" 
            stroke="#111111" strokeWidth="0.75" strokeDasharray="3 3" 
            className="transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            opacity={hoveredBtn === 'left' ? "0" : hoveredBtn === 'right' ? "0.6" : "0.25"} 
          />
          <line 
            x1="100%" y1="100%" x2="85%" y2="50%" 
            stroke="#111111" strokeWidth="0.75" strokeDasharray="3 3" 
            className="transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            opacity={hoveredBtn === 'left' ? "0" : hoveredBtn === 'right' ? "0.6" : "0.25"} 
          />
        </svg>

        
        <div 
          onMouseEnter={() => setHoveredBtn('left')}
          onMouseLeave={() => setHoveredBtn(null)}
          className={`absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 flex items-center gap-4 cursor-pointer group z-20 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            hoveredBtn === 'right' ? 'opacity-0 pointer-events-none -translate-x-12 scale-95' : 'opacity-100 translate-x-0 scale-100'
          }`}
        >
          
          <div className="w-8 h-8 border border-black rotate-45 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <span className="-rotate-45 text-[8px]">◀</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium hidden sm:inline">
            DISCOVER A.I.
          </span>
        </div>

        
        <div 
          className="text-center max-w-4xl px-4 z-10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
          style={{
            transform: hoveredBtn === 'left' 
              ? 'translate3d(260px, 0, 0)' 
              : hoveredBtn === 'right' 
              ? 'translate3d(-260px, 0, 0)' 
              : 'translate3d(0px, 0, 0)'
          }}
        >
          
          <h1 
            className={`text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1.08] text-[#111111] transition-all duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-85 blur-md'
            }`}
          >
            Sophisticated<br />skincare
          </h1>
        </div>

        
        <Link
          href="/testing"
          onMouseEnter={() => setHoveredBtn('right')}
          onMouseLeave={() => setHoveredBtn(null)}
          className={`absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 flex items-center gap-4 cursor-pointer group z-20 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            hoveredBtn === 'left' ? 'opacity-0 pointer-events-none translate-x-12 scale-95' : 'opacity-100 translate-x-0 scale-100'
          }`}
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium hidden sm:inline">
            TAKE TEST
          </span>
          
          <div className="w-8 h-8 border border-black rotate-45 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <span className="-rotate-45 text-[8px]">▶</span>
          </div>
        </Link>

        
        <div className="absolute left-4 sm:left-12 bottom-2 max-w-xs text-[10px] font-medium uppercase tracking-[0.18em] text-gray-800 leading-relaxed hidden sm:block">
          sKINsTRIC developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
        </div>
      </div>

      <footer className="min-h-[16px]" />
    </main>
  );
}