
export interface User {
  name: string;
  grade: string;
  totalItems: number;
  hopePoints: number;
  badges: string[];
}

export interface CollectionEntry {
  id: string;
  studentName: string;
  grade: string;
  amount: number;
  timestamp: number;
  photoUrl?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
}

export type AppView = 'login' | 'home' | 'collect' | 'leaderboard' | 'stats' | 'about';