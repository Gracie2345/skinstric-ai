'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CameraCapturePage() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Camera access error:', err);
      }
    }
    if (!capturedImage) {
      startCamera();
    }
  }, [capturedImage]);

  const handleTakePic = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl);

      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleUsePhoto = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      router.push('/select');
    }, 2000);
  };

  return (
    <main className="relative h-screen w-screen bg-[#000000] text-white font-sans select-none overflow-hidden border-b-[16px] border-white">
      
      
      <header className="absolute top-0 left-0 w-full bg-[#ffffff] text-[#111111] px-8 sm:px-12 py-5 z-30 flex justify-between items-center shadow-xs">
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

      
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {!capturedImage ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        ) : (
          <img
            src={capturedImage}
            alt="Captured Preview"
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}
      </div>

      
      {!capturedImage && (
        <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 z-20 flex items-center gap-4">
          <span className="text-[11px] sm:text-[12px] tracking-[0.2em] font-bold uppercase text-white drop-shadow-md">
            TAKE PICTURE
          </span>
          
          <button
            onClick={handleTakePic}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Image 
              src="/takePictureIcon.webp" 
              alt="Take Picture" 
              width={80} 
              height={80} 
              className="w-full h-full object-contain pointer-events-none drop-shadow-md"
              priority
            />
          </button>
        </div>
      )}

      
      {capturedImage && (
        <>
          <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 text-center">
            <span className="text-xs tracking-[0.3em] font-bold uppercase text-white drop-shadow-md">
              GREAT SHOOT
            </span>
          </div>

          <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
            <span className="text-xs tracking-[0.2em] font-bold text-white uppercase drop-shadow">
              Preview
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRetake}
                disabled={isAnalyzing}
                className="bg-black/40 backdrop-blur-md border border-white/40 text-white px-6 py-2.5 text-[10px] tracking-[0.2em] font-semibold uppercase hover:bg-black/60 transition-all disabled:opacity-50 cursor-pointer"
              >
                RETAKE
              </button>
              <button
                onClick={handleUsePhoto}
                disabled={isAnalyzing}
                className="bg-white text-black px-6 py-2.5 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-gray-200 transition-all disabled:opacity-50 cursor-pointer"
              >
                USE THIS PHOTO
              </button>
            </div>
          </div>
        </>
      )}

      
      {isAnalyzing && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-white text-black px-10 py-6 border border-black flex flex-col items-center justify-center shadow-2xl">
            <span className="text-xs tracking-[0.25em] font-bold uppercase animate-pulse">
              ANALYZING IMAGE...
            </span>
          </div>
        </div>
      )}

      
      {!capturedImage && (
        <div className="absolute bottom-28 sm:bottom-36 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-center w-full pointer-events-none px-4">
          <span className="text-[11px] sm:text-[12px] tracking-[0.18em] font-bold text-white uppercase drop-shadow">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </span>
          <div className="flex items-center justify-center gap-6 text-[10px] sm:text-[11px] tracking-[0.15em] font-normal text-gray-200 uppercase drop-shadow">
            <span>◇ NEUTRAL EXPRESSION</span>
            <span>◇ FRONTAL POSE</span>
            <span>◇ ADEQUATE LIGHTING</span>
          </div>
        </div>
      )}

      
      <footer className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-30">
        <Link href="/camera" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 border border-white rotate-45 flex items-center justify-center group-hover:bg-white transition-all">
            <span className="-rotate-45 text-[10px] text-white group-hover:text-black">◀</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-white">BACK</span>
        </Link>
      </footer>
    </main>
  );
}