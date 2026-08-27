'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DemographicsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('race'); 

  
  const [apiData, setApiData] = useState({
    race: { "black": 0.35, "east asian": 0.25, "white": 0.20, "latino hispanic": 0.10, "south asian": 0.05, "southeast asian": 0.03, "middle eastern": 0.02 },
    age: { "20-29": 0.40, "30-39": 0.30, "10-19": 0.15, "40-49": 0.10, "50-59": 0.05 },
    gender: { "male": 0.50, "female": 0.50 }
  });

  // User selections per tab
  const [selections, setSelections] = useState({
    race: 'black',
    age: '20-29',
    gender: 'male'
  });

  
  const getSortedItems = (data, categoryKey) => {
    if (!data || !data[categoryKey]) return [];
    const currentCategory = data[categoryKey];
    return Object.entries(currentCategory)
      .map(([label, score]) => ({
        label,
        percentage: Math.round(score * 100),
        rawScore: score
      }))
      .sort((a, b) => b.rawScore - a.rawScore);
  };

  
  useEffect(() => {
    const fetchDemographics = async () => {
      const storedImage = localStorage.getItem('user_captured_image');
      const imagePayload = storedImage || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...';

      try {
        const res = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imagePayload })
        });

        const result = await res.json();

        if (result && result.data) {
          const freshData = result.data;
          setApiData(freshData);

          
          const sortedRace = getSortedItems(freshData, 'race');
          const sortedAge = getSortedItems(freshData, 'age');
          const sortedGender = getSortedItems(freshData, 'gender');

          const topRace = sortedRace[0]?.label || 'black';
          const topAge = sortedAge[0]?.label || '20-29';
          const topGender = sortedGender[0]?.label || 'male';

          
          setSelections({
            race: topRace,
            age: topAge,
            gender: topGender
          });
        }
      } catch (err) {
        console.error("Failed to fetch API demographics:", err);
      }
    };

    fetchDemographics();
  }, []);

  const sortedList = getSortedItems(apiData, activeTab);
  const activeSelectionLabel = selections[activeTab] || (sortedList[0]?.label ?? '');
  const activeItemObj = sortedList.find(
    (item) => item.label.toLowerCase() === activeSelectionLabel.toLowerCase()
  ) || sortedList[0];

  const activePercentage = activeItemObj ? activeItemObj.percentage : 0;

  
  const radius = 170;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * activePercentage) / 100;

  
  const formatDisplayLabel = (label, category) => {
    if (category === 'age' && !label.toLowerCase().includes('y.o.')) {
      return `${label} y.o.`;
    }
    return label;
  };

  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#111111] flex flex-col justify-between p-6 sm:p-10 font-sans select-none">
      
      
      <header className="flex justify-between items-start z-20 w-full mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <Link 
              href="/" 
              className="font-black text-[12px] tracking-[0.12em] text-[#000000] hover:opacity-70 transition-opacity uppercase"
            >
              SKINSTRIC
            </Link>
            <span className="text-[12px] tracking-[0.1em] text-[#71717A] font-medium">
              [ INTRO ]
            </span>
          </div>

          <span className="text-[12px] tracking-[0.08em] text-[#000000] font-bold uppercase mb-1">
            A.I. ANALYSIS
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#000000] uppercase leading-none my-1">
            DEMOGRAPHICS
          </h1>

          <span className="text-[12px] tracking-[0.08em] text-[#3F3F46] font-medium uppercase mt-2">
            PREDICTED RACE & AGE
          </span>
        </div>

        <button className="bg-[#000000] text-white px-5 py-2.5 text-[11px] tracking-[0.15em] font-semibold uppercase hover:bg-neutral-800 transition-all">
          ENTER CODE
        </button>
      </header>

      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch my-4 z-10 w-full">
        
        
        <div className="md:col-span-2 flex flex-col gap-4 justify-start">
          {/* RACE TAB */}
          <button
            onClick={() => setActiveTab('race')}
            className={`flex flex-col justify-between text-left p-6 h-36 transition-all duration-200 ${
              activeTab === 'race'
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#f3f3f3] text-[#111111] hover:bg-gray-200'
            }`}
          >
            <span className={`text-[14px] font-medium capitalize ${activeTab === 'race' ? 'text-white' : 'text-[#111111]'}`}>
              {selections.race}
            </span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
              RACE
            </span>
          </button>

          
          <button
            onClick={() => setActiveTab('age')}
            className={`flex flex-col justify-between text-left p-6 h-36 transition-all duration-200 ${
              activeTab === 'age'
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#f3f3f3] text-[#111111] hover:bg-gray-200'
            }`}
          >
            <span className={`text-[14px] font-medium uppercase ${activeTab === 'age' ? 'text-white' : 'text-[#111111]'}`}>
              {selections.age}
            </span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
              AGE
            </span>
          </button>

          
          <button
            onClick={() => setActiveTab('gender')}
            className={`flex flex-col justify-between text-left p-6 h-36 transition-all duration-200 ${
              activeTab === 'gender'
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#f3f3f3] text-[#111111] hover:bg-gray-200'
            }`}
          >
            <span className={`text-[14px] font-medium uppercase ${activeTab === 'gender' ? 'text-white' : 'text-[#111111]'}`}>
              {selections.gender}
            </span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
              SEX
            </span>
          </button>
        </div>

        
        <div className="md:col-span-7 bg-[#f3f3f3] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between min-h-[480px]">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight capitalize text-[#111111] self-start md:self-top">
            {formatDisplayLabel(activeSelectionLabel, activeTab)}
          </h2>

          <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center shrink-0 my-auto">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 400 400">
              <circle
                cx="200"
                cy="200"
                r={radius}
                className="stroke-[#e2e2e2]"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="200"
                cy="200"
                r={radius}
                className="stroke-[#111111] transition-all duration-500 ease-out"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl font-light text-[#111111] tracking-tight">
                {activePercentage}<span className="text-3xl font-light">%</span>
              </span>
            </div>
          </div>
        </div>

        
        <div className="md:col-span-3 bg-[#f3f3f3] p-6 flex flex-col justify-start min-h-[480px]">
          <div className="flex justify-between items-center pb-3 mb-2 border-b border-gray-300 text-[10px] tracking-[0.15em] font-semibold text-[#111111] uppercase">
            <span>{activeTab === 'gender' ? 'SEX' : activeTab}</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          <div className="flex flex-col">
            {sortedList.map((item) => {
              const isSelected = item.label.toLowerCase() === activeSelectionLabel.toLowerCase();
              return (
                <button
                  key={item.label}
                  onClick={() =>
                    setSelections((prev) => ({
                      ...prev,
                      [activeTab]: item.label
                    }))
                  }
                  className={`flex items-center justify-between p-3 text-xs transition-colors w-full ${
                    isSelected
                      ? 'bg-[#111111] text-white font-medium'
                      : 'hover:bg-gray-200 text-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px]">{isSelected ? '◆' : '◇'}</span>
                    <span className="capitalize text-[13px] tracking-wide">{item.label}</span>
                  </div>
                  <span className="text-[13px] font-normal">{item.percentage}%</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      
      <footer className="flex justify-between items-center z-20 pt-4">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-3 cursor-pointer group bg-transparent border-none p-0"
        >
          <div className="w-10 h-10 border border-[#111111] rotate-45 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-all">
            <span className="-rotate-45 text-[10px]">◀</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#111111]">BACK</span>
        </button>

        <span className="text-[11px] text-[#888888] tracking-[0.12em] hidden sm:inline font-normal">
          If A.I. estimate is wrong, select the correct one.
        </span>

        <Link 
          href="/" 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#111111]">HOME</span>
          <div className="w-10 h-10 border border-[#111111] rotate-45 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-all">
            <span className="-rotate-45 text-[10px]">▶</span>
          </div>
        </Link>
      </footer>

    </main>
  );
}