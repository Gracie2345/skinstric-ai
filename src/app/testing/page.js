'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestingPage() {
  const [currentStep, setCurrentStep] = useState('intro'); 
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  const handleNameSubmit = (e) => {
    if (e.key === 'Enter' && name.trim() !== '') {
      setCurrentStep('city');
    }
  };

  const handleCitySubmit = (e) => {
    if (e.key === 'Enter' && city.trim() !== '') {
      setCurrentStep('processing');
      setTimeout(() => {
        setCurrentStep('success');
      }, 2500);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#fbfbfb] text-black flex flex-col justify-between p-8 sm:p-12 font-sans select-none overflow-hidden">
      
      
      <style jsx global>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinSlowReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 35s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spinSlowReverse 45s linear infinite;
        }

        .step-transition {
          animation: fadeInSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Matches original website PROCEED button transition speed & direction */
        @keyframes proceedSlideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-45px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .proceed-slide-in {
          animation: proceedSlideInFromLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      
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

        <button className="bg-black text-white px-5 py-2 text-[10px] tracking-[0.2em] font-semibold uppercase hover:bg-gray-800 transition-all duration-300">
          ENTER CODE
        </button>
      </header>

      
      <div className="flex-1 flex items-center justify-center relative my-8 z-10">
        
        
        <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] border border-dashed border-gray-300 animate-spin-slow pointer-events-none" />
        <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] border border-dashed border-gray-300 animate-spin-slow-reverse pointer-events-none" />

        
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
          
          <div className="absolute inset-0 border border-dotted border-gray-400 rotate-45 animate-spin-slow bg-white/70 backdrop-blur-[2px] transition-all duration-500 shadow-xs pointer-events-none" />

          
          <div className="relative z-10 text-center flex flex-col items-center justify-center p-6 w-full max-w-sm">
            
            
            {currentStep === 'intro' && (
              <div className="flex flex-col items-center w-full step-transition">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-4 font-medium">
                  CLICK TO TYPE
                </span>
                <div className="relative w-full flex flex-col items-center">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Introduce Yourself"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleNameSubmit}
                    className="w-full bg-transparent text-center text-2xl sm:text-3xl font-extralight tracking-tight text-black outline-none pb-1 placeholder-gray-400 caret-black border-b border-black uppercase"
                  />
                </div>
              </div>
            )}

            
            {currentStep === 'city' && (
              <div className="flex flex-col items-center w-full step-transition">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-4 font-medium">
                  CLICK TO TYPE
                </span>
                <div className="relative w-full flex flex-col items-center">
                  <input
                    type="text"
                    autoFocus
                    placeholder="YOUR CITY NAME"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleCitySubmit}
                    className="w-full bg-transparent text-center text-2xl sm:text-3xl font-extralight tracking-tight text-black outline-none pb-1 placeholder-gray-400 caret-black border-b border-black uppercase"
                  />
                </div>
              </div>
            )}

            
            {currentStep === 'processing' && (
              <div className="flex flex-col items-center space-y-3 step-transition">
                <p className="text-[11px] tracking-[0.25em] text-black uppercase font-bold">
                  PROCESSING SUBMISSION...
                </p>
                <div className="flex space-x-1.5 pt-1">
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></span>
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            
            {currentStep === 'success' && (
              <div className="flex flex-col items-center space-y-2 step-transition">
                <h3 className="text-2xl sm:text-3xl font-light text-black tracking-normal">
                  Thank you!
                </h3>
                <p className="text-xs text-gray-600 font-light tracking-wide">
                  Proceed for the next step
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      
      <footer className="flex justify-between items-center z-20">
        <Link 
          href="/" 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 border border-black rotate-45 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
            <span className="-rotate-45 text-[10px]">◀</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium">BACK</span>
        </Link>

        
        <div className="flex items-center min-h-[44px]">
          {currentStep === 'success' && (
            <Link
              href="/result"
              className="flex items-center gap-4 cursor-pointer group proceed-slide-in"
            >
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">PROCEED</span>
              <div className="w-11 h-11 flex items-center justify-center">
                <div className="w-9 h-9 border border-black rotate-45 flex items-center justify-center group-hover:bg-black transition-all duration-300">
                  <span className="-rotate-45 text-[10px] text-black group-hover:text-white transition-colors">▶</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </footer>

    </main>
  );
}