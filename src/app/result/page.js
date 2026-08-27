'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    setShowModal(true);
  };

  const handleAllowCamera = () => {
    setShowModal(false);
    router.push('/camera');
  };

  const handleDenyCamera = () => {
    setShowModal(false);
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      router.push('/select');
    }
  };

  return (
    <main className="relative min-h-screen bg-[#fbfbfb] text-black flex flex-col justify-between p-8 sm:p-12 font-sans select-none overflow-hidden">
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      
      <header className="flex justify-between items-start z-20">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-extrabold text-sm tracking-[0.15em] text-black hover:opacity-60 transition-opacity">
              SKINSTRIC
            </Link>
            <span className="text-[10px] tracking-[0.15em] text-gray-400 font-mono">
              [ INTRO ]
            </span>
          </div>
          <span className="text-[10px] tracking-[0.25em] text-black uppercase font-bold">
            TO START ANALYSIS
          </span>
        </div>

        <div className="flex flex-col items-end gap-6">
          <button className="bg-black text-white px-5 py-2 text-[10px] tracking-[0.2em] font-semibold uppercase hover:bg-gray-800 transition-all duration-300">
            ENTER CODE
          </button>
          
          <div className="flex flex-col items-start gap-1">
            <span className="text-[11px] tracking-[0.15em] text-gray-500 font-sans">Preview</span>
            <div className="w-32 h-32 border border-gray-200 bg-white shadow-2xs" />
          </div>
        </div>
      </header>

      
      <div className="flex-1 flex items-center justify-between max-w-5xl w-full mx-auto relative my-8 z-10 px-8 sm:px-16">
        
        {/* OPTION 1: SCAN FACE (CAMERA) */}
        <div className="relative group cursor-pointer flex flex-col items-center justify-center" onClick={handleCameraClick}>
          
          <div className="absolute w-[300px] h-[300px] border border-dashed border-gray-300 animate-spin-slow pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] border border-dashed border-gray-300 animate-spin-slow-reverse pointer-events-none" />

          <div className="relative w-36 h-36 rounded-full border border-gray-300 flex items-center justify-center bg-[#fbfbfb] z-10 transition-transform duration-300 group-hover:scale-105 group-hover:border-black">
            <div className="w-32 h-32 rounded-full border border-black flex items-center justify-center overflow-hidden p-6">
              <Image 
                src="/camera-icon.webp" 
                alt="Camera Icon" 
                width={64} 
                height={64} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute top-2 left-[130px] flex items-start pointer-events-none z-20 w-72">
            <svg className="w-16 h-12 overflow-visible" viewBox="0 0 60 40">
              <line x1="0" y1="35" x2="50" y2="5" stroke="black" strokeWidth="1.2" />
              <circle cx="50" cy="5" r="2.5" fill="white" stroke="black" strokeWidth="1.5" />
            </svg>
            <div className="flex flex-col -ml-1 text-left">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-black">ALLOW A.I.</span>
              <span className="text-[9px] tracking-[0.18em] font-medium text-gray-700 whitespace-nowrap">TO SCAN YOUR FACE</span>
            </div>
          </div>

          {showModal && (
            <div 
              className="absolute left-44 top-1/2 -translate-y-1/2 z-50 w-80 bg-[#1e1e1e] text-white p-5 shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-center mb-6 text-gray-200">
                ALLOW A.I. TO ACCESS YOUR CAMERA
              </p>
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                <button 
                  onClick={handleDenyCamera}
                  className="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors px-4 py-1"
                >
                  DENY
                </button>
                <button 
                  onClick={handleAllowCamera}
                  className="text-[10px] tracking-[0.2em] uppercase text-white font-bold hover:opacity-85 transition-opacity px-4 py-1"
                >
                  ALLOW
                </button>
              </div>
            </div>
          )}
        </div>

        
        <div className="relative group cursor-pointer flex flex-col items-center justify-center" onClick={handleGalleryClick}>
          
          <div className="absolute w-[300px] h-[300px] border border-dashed border-gray-300 animate-spin-slow pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] border border-dashed border-gray-300 animate-spin-slow-reverse pointer-events-none" />

          <div className="relative w-36 h-36 rounded-full border border-gray-300 flex items-center justify-center bg-[#fbfbfb] z-10 transition-transform duration-300 group-hover:scale-105 group-hover:border-black">
            <div className="w-32 h-32 rounded-full border border-black flex items-center justify-center overflow-hidden p-6">
              <Image 
                src="/gallery-icon.webp" 
                alt="Gallery Icon" 
                width={64} 
                height={64} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute bottom-2 right-[130px] flex items-end justify-end pointer-events-none z-20 w-72">
            <div className="flex flex-col -mr-1 text-right">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-black">ALLOW A.I.</span>
              <span className="text-[9px] tracking-[0.18em] font-medium text-gray-700 whitespace-nowrap">ACCESS GALLERY</span>
            </div>
            <svg className="w-16 h-12 overflow-visible" viewBox="0 0 60 40">
              <line x1="60" y1="5" x2="10" y2="35" stroke="black" strokeWidth="1.2" />
              <circle cx="10" cy="35" r="2.5" fill="white" stroke="black" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

      </div>

      
      <footer className="flex justify-between items-center z-20 relative">
        <Link 
          href="/testing" 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 border border-black rotate-45 flex items-center justify-center group-hover:bg-black transition-all">
            <span className="-rotate-45 text-[10px] text-black group-hover:text-white transition-colors">◀</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium">BACK</span>
        </Link>
      </footer>

    </main>
  );
}