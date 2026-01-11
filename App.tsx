import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SectorFilter from './components/SectorFilter';
import NewsCard from './components/NewsCard';
import AdCard from './components/AdCard';
import Footer from './components/Footer';
import { Sector, NewsItem, AdItem, FeedItem } from './types';
import { fetchNewsBySector } from './services/geminiService';
import { Loader2, Info } from 'lucide-react';

const AD_FREQUENCY = 5; // Show an ad every 5 items

// Sample Ads
const SAMPLE_ADS: AdItem[] = [
  {
    type: 'ad',
    title: '시네마틱 퀄리티로 완성하는 3D 캐릭터',
    description: '현직 아티스트 김경수가 알려주는 블렌더 캐릭터 모델링의 정수. 지금 바로 시작하세요.',
    ctaText: 'Visit Site',
    sponsor: 'Coloso',
    imageUrl: 'https://picsum.photos/seed/ad1/800/600'
  },
  {
    type: 'ad',
    title: '차세대 AI 반도체 투자 전략',
    description: '급변하는 시장 속에서 놓치지 말아야 할 핵심 밸류체인 분석 리포트를 무료로 받아보세요.',
    ctaText: 'Learn More',
    sponsor: 'FutureVest',
    imageUrl: 'https://picsum.photos/seed/ad2/800/600'
  }
];

const App: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<Sector>('ALL');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async (sector: Sector) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedNews = await fetchNewsBySector(sector);
      setNews(fetchedNews);
    } catch (err) {
      console.error(err);
      setError("Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadNews(selectedSector);
  }, [selectedSector, loadNews]);

  // Mix news and ads
  useEffect(() => {
    if (news.length === 0) {
      setFeedItems([]);
      return;
    }

    const items: FeedItem[] = [];
    news.forEach((item, index) => {
      items.push(item);
      // Inject Ad
      if ((index + 1) % AD_FREQUENCY === 0) {
        const adIndex = Math.floor((index + 1) / AD_FREQUENCY) % SAMPLE_ADS.length;
        items.push(SAMPLE_ADS[adIndex]);
      }
    });
    setFeedItems(items);
  }, [news]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100">
      <Header />
      
      <main>
        {/* Banner / Info Area */}
        <div className="bg-gray-900 text-white py-3 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
             <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3 relative z-10">
                <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm shrink-0">
                    <Info className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                    <p className="font-semibold text-sm sm:text-base">December Market Update</p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                        AI-curated insights across 9 key investment sectors. The feed format has been improved for better readability.
                    </p>
                </div>
             </div>
             {/* Abstract BG Pattern */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        </div>

        <SectorFilter 
          selectedSector={selectedSector} 
          onSelectSector={setSelectedSector} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {selectedSector === 'ALL' ? 'Trending Now' : `${selectedSector} News`}
              <span className="text-gray-400 font-normal text-sm bg-gray-200 px-2 py-0.5 rounded-full">
                {news.length}
              </span>
            </h2>
            <div className="flex gap-2 text-sm text-gray-500">
                <span className="cursor-pointer hover:text-gray-900 transition">Share</span>
                <span>•</span>
                <span className="cursor-pointer hover:text-gray-900 transition">Select</span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-96 gap-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-gray-500 text-sm animate-pulse">Collecting latest insights from the web...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center h-64 bg-white rounded-2xl border border-red-100">
              <p className="text-red-500 font-medium mb-2">{error}</p>
              <button 
                onClick={() => loadNews(selectedSector)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-black transition"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {feedItems.map((item, idx) => {
                if (item.type === 'ad') {
                  return <AdCard key={`ad-${idx}`} item={item} />;
                }
                return <NewsCard key={item.id} item={item} />;
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
