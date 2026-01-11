import React, { useRef, useEffect } from 'react';
import { Sector, SECTORS } from '../types';

interface SectorFilterProps {
  selectedSector: Sector;
  onSelectSector: (sector: Sector) => void;
}

const SectorFilter: React.FC<SectorFilterProps> = ({ selectedSector, onSelectSector }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Styling for the active vs inactive pill
  const getButtonClass = (isActive: boolean) => {
    const baseClass = "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out flex items-center gap-1.5 border";
    if (isActive) {
      return `${baseClass} bg-gray-900 text-white border-gray-900 shadow-md transform scale-105`;
    }
    return `${baseClass} bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900`;
  };

  return (
    <div className="w-full bg-gray-50/50 backdrop-blur-sm sticky top-16 z-40 py-4 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-3 overflow-x-auto pb-1 no-scrollbar scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SECTORS.map((sector) => {
            const isActive = selectedSector === sector.key;
            return (
              <button
                key={sector.key}
                onClick={() => onSelectSector(sector.key)}
                className={getButtonClass(isActive)}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
                {sector.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectorFilter;
