'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CameraLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      router.push('/camera/capture');
    }, 2400);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative h-screen w-screen bg-[#ffffff] text-[#111111] font-sans select-none overflow-hidden">
      
      <style jsx global>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow-1 {
          animation: spinSlow 36s linear infinite;
        }
        .animate-spin-reverse {
          animation: spinReverse 44s linear infinite;
        }
        .animate-spin-slow-2 {
          animation: spinSlow 28s linear infinite;
        }

        @keyframes loadProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loadProgress 4s linear forwards;
        }
      `}</style>

      
      <header className="absolute top-0 left-0 w-full bg-[#ffffff] text-[#111111] px-8 sm:px-12 py-5 z-30 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-[13px] tracking-[0.05em] text-[#111111] hover:opacity-70 transition-opacity uppercase">
            SKINSTRIC
          </Link>
          <span className="text-[12px] tracking-[0.05em] text-[#888888] font-normal">
            [ INTRO ]
          </span>
        </div>

        <button className="bg-[#000000] text-white px-5 py-2.5 text-[11px] tracking-[0.15em] font-semibold uppercase hover:bg-neutral-800 transition-all cursor-pointer">
          ENTER CODE
        </button>
      </header>

      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pb-8">
        <div className="relative flex flex-col items-center justify-center">
          
          
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            
            
            <div className="absolute -inset-4 border border-dotted border-gray-400/70 rotate-45 animate-spin-reverse" />
            
            
            <div className="absolute inset-0 border border-dotted border-gray-400/90 rotate-45 animate-spin-slow-1" />
            
            
            <div className="absolute inset-4 border border-dotted border-gray-400/60 rotate-45 animate-spin-slow-2" />
            
            
            <div className="flex flex-col items-center justify-center z-10">
              
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 animate-spin-slow-1 flex items-center justify-center mb-6 relative">
                <Image 
                  src="/camera-icon.webp" 
                  alt="Camera Loading Icon" 
                  width={80} 
                  height={80}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              {/* Status Text */}
              <span className="text-[11px] sm:text-[12px] tracking-[0.2em] font-bold uppercase text-[#111111] whitespace-nowrap">
                SETTING UP CAMERA...
              </span>
            </div>

          </div>

          
          <div className="mt-10 flex flex-col items-center gap-2.5 text-center w-full pointer-events-none px-4">
            <span className="text-[9.5px] sm:text-[10.5px] tracking-[0.2em] font-bold text-[#111111] uppercase whitespace-nowrap">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </span>
            
            <div className="flex items-center justify-center gap-4 sm:gap-7 text-[8.5px] sm:text-[9.5px] tracking-[0.16em] font-normal text-[#555555] uppercase whitespace-nowrap">
              <span>◇ NEUTRAL EXPRESSION</span>
              <span>◇ FRONTAL POSE</span>
              <span>◇ ADEQUATE LIGHTING</span>
            </div>

            
            <div className="w-[340px] sm:w-[400px] h-[1.5px] bg-gray-200 mt-2.5 overflow-hidden relative">
              <div className="h-full bg-[#111111] animate-loading-bar" />
            </div>
          </div>

        </div>
      </div>

      
      <footer className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-30">
        <Link href="/result" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 border border-[#111111] rotate-45 flex items-center justify-center group-hover:bg-[#111111] transition-all">
            <span className="-rotate-45 text-[10px] text-[#111111] group-hover:text-white transition-colors">◀</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#111111]">BACK</span>
        </Link>
      </footer>
    </main>
  );
}