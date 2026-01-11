import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem, Sector } from "../types";

// Initialize the Gemini client
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = 'gemini-3-flash-preview';

// Helper: Map API string to Sector type
function mapSector(apiSector: string): Sector {
  const normalized = apiSector.toLowerCase();
  if (normalized.includes('ai')) return 'AI';
  if (normalized.includes('tech')) return 'Big Tech';
  if (normalized.includes('robot')) return 'Robotics';
  if (normalized.includes('nuclear')) return 'Nuclear Fusion';
  if (normalized.includes('data')) return 'Data Center';
  if (normalized.includes('chip') || normalized.includes('semi')) return 'Chips';
  if (normalized.includes('space')) return 'Space';
  if (normalized.includes('energy')) return 'Energy';
  return 'Big Tech'; // Default fallback
}

// Helper: Generate placeholder image
function getPlaceholderImage(sector: string, index: number): string {
  const seed = `${sector}-${index}`;
  return `https://picsum.photos/seed/${seed}/800/600`;
}

// Helper: Fallback data
function getFallbackData(sector: Sector): NewsItem[] {
  const dummyNews: NewsItem[] = [
    {
      id: '1',
      title: 'NVIDIA, 차세대 AI 칩 블랙웰 생산 가속화',
      sector: 'AI',
      summary: '생산 수율 문제가 해결되면서 데이터센터 수요에 맞춘 대규모 공급이 시작될 전망입니다. 주가에 긍정적 영향이 기대됩니다.',
      source: 'Bloomberg',
      date: '1시간 전',
      url: 'https://www.bloomberg.com',
      imageUrl: 'https://picsum.photos/seed/ai1/800/600'
    },
    {
      id: '2',
      title: 'MS, 데이터센터용 소형 원자로 계약 체결',
      sector: 'Energy',
      summary: 'AI 구동을 위한 막대한 전력 수요를 충당하기 위해 원자력 에너지 스타트업과 장기 공급 계약을 맺었습니다.',
      source: 'TechCrunch',
      date: '3시간 전',
      url: 'https://techcrunch.com',
      imageUrl: 'https://picsum.photos/seed/energy1/800/600'
    },
    {
      id: '3',
      title: '스페이스X, 스타십 6차 비행 성공적',
      sector: 'Space',
      summary: '재사용 로켓 기술의 완성도가 높아지며 우주 인터넷망 구축 비용이 획기적으로 절감될 것으로 보입니다.',
      source: 'SpaceNews',
      date: '5시간 전',
      url: 'https://spacenews.com',
      imageUrl: 'https://picsum.photos/seed/space1/800/600'
    },
    {
      id: '4',
      title: '휴머노이드 로봇, 테슬라 공장 투입 임박',
      sector: 'Robotics',
      summary: '옵티머스 로봇이 실제 생산 라인에서 단순 반복 작업을 수행하는 테스트를 통과했습니다.',
      source: 'Reuters',
      date: '12시간 전',
      url: 'https://www.reuters.com',
      imageUrl: 'https://picsum.photos/seed/robot1/800/600'
    },
     {
      id: '5',
      title: '핵융합 발전, 상용화 시점 5년 앞당겨진다',
      sector: 'Nuclear Fusion',
      summary: '새로운 초전도체 기술 적용으로 플라즈마 유지 시간이 획기적으로 늘어났습니다.',
      source: 'ScienceDaily',
      date: '1일 전',
      url: 'https://www.sciencedaily.com',
      imageUrl: 'https://picsum.photos/seed/nuclear1/800/600'
    }
  ];
  
  if (sector === 'ALL') return dummyNews;
  return dummyNews.filter(n => n.sector === sector || (sector === 'Chips' && n.sector === 'AI'));
}

export const fetchNewsBySector = async (sector: Sector): Promise<NewsItem[]> => {
  const searchQuery = sector === 'ALL'
    ? "latest investment news in AI, Big Tech, Energy, and Space sectors"
    : `latest investment news and breakthroughs in ${sector} sector`;

  const prompt = `
    You are a professional investment analyst.
    Task: Search for the latest, most impactful news regarding "${searchQuery}".
    
    Return exactly 6 distinct news items in JSON format.
    For each item, provide:
    1. title: A catchy, concise title (in Korean).
    2. sector: The specific sector (Choose strictly from: AI, Big Tech, Robotics, Energy, Nuclear Fusion, Data Center, Chips, Space).
    3. summary: A "Key Takeaway" summary (max 2 sentences, in Korean) explaining why this is important for investors.
    4. source: A plausible source name (e.g., Bloomberg, TechCrunch).
    5. date: A relative date (e.g., '2 hours ago').
    6. url: The URL to the news article if found, otherwise use a placeholder.

    Ensure the tone is professional, insightful, and concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              sector: { type: Type.STRING },
              summary: { type: Type.STRING },
              source: { type: Type.STRING },
              date: { type: Type.STRING },
              url: { type: Type.STRING }
            },
            required: ["title", "sector", "summary", "source", "date", "url"],
          },
        },
      },
    });

    if (response.text) {
      let jsonStr = response.text.trim();
      // Remove markdown code blocks if present
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }

      const rawData = JSON.parse(jsonStr);
      
      return rawData.map((item: any, index: number) => ({
        id: `news-${Date.now()}-${index}`,
        title: item.title,
        sector: mapSector(item.sector),
        summary: item.summary,
        source: item.source,
        date: item.date,
        url: item.url || '#',
        imageUrl: getPlaceholderImage(item.sector, index)
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return getFallbackData(sector);
  }
};
