export type Sector =
  | 'ALL'
  | 'AI'
  | 'Big Tech'
  | 'Robotics'
  | 'Energy'
  | 'Nuclear Fusion'
  | 'Data Center'
  | 'Chips'
  | 'Space';

export interface NewsItem {
  id: string;
  title: string;
  sector: Sector;
  summary: string;
  url: string;
  source: string;
  date: string;
  imageUrl?: string;
}

export interface AdItem {
  type: 'ad';
  title: string;
  description: string;
  ctaText: string;
  imageUrl: string;
  sponsor: string;
}

export type FeedItem = NewsItem | AdItem;

export const SECTORS: { key: Sector; label: string }[] = [
  { key: 'ALL', label: '전체' },
  { key: 'AI', label: 'AI' },
  { key: 'Big Tech', label: '빅테크' },
  { key: 'Robotics', label: '로봇' },
  { key: 'Energy', label: '에너지' },
  { key: 'Nuclear Fusion', label: '핵융합' },
  { key: 'Data Center', label: '데이터센터' },
  { key: 'Chips', label: '칩' },
  { key: 'Space', label: '우주' },
];
