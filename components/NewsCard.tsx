import React from 'react';
import { NewsItem } from '../types';
import { Share2, Bookmark, ExternalLink, Zap } from 'lucide-react';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* Sector Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-gray-900 shadow-sm border border-gray-200">
             <Zap className="w-3 h-3 mr-1 text-red-500 fill-current" />
             {item.sector}
          </span>
        </div>
        
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
           <button className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white text-gray-700 shadow-sm">
             <Bookmark className="w-4 h-4" />
           </button>
           <button className="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white text-gray-700 shadow-sm">
             <Share2 className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.source}</span>
            <span className="text-xs text-gray-400">{item.date}</span>
        </div>
        
        <a href={item.url} className="block group-hover:text-blue-600 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
            {item.title}
            </h3>
        </a>

        {/* Key Takeaway Section */}
        <div className="mt-auto bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                <span className="font-semibold text-gray-900 block mb-1 text-xs uppercase tracking-wide">💡 핵심 (Key Takeaway)</span>
                {item.summary}
            </p>
        </div>
        
        {/* Footer Link */}
        <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
            <button className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                Read full story <ExternalLink className="w-3 h-3" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
