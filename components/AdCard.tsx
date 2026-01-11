import React from 'react';
import { AdItem } from '../types';
import { ArrowRight } from 'lucide-react';

interface AdCardProps {
  item: AdItem;
}

const AdCard: React.FC<AdCardProps> = ({ item }) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
       <div className="absolute top-0 right-0 p-0">
          <div className="bg-gray-100 text-[10px] font-bold text-gray-400 px-2 py-1 rounded-bl-xl uppercase tracking-widest">
            Ad
          </div>
       </div>

      <div className="h-48 sm:h-56 overflow-hidden relative">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
             <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                {item.sponsor}
             </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
            {item.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-3">
            {item.description}
            </p>
        </div>

        <button className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-blue-200 shadow-lg">
            {item.ctaText}
            <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdCard;
