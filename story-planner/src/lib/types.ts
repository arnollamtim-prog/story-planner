export type ContentType = 'youtube' | 'shorts';
export type ContentStatus = 'ide' | 'draft' | 'produksi' | 'selesai';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  date: string; // YYYY-MM-DD
  description?: string;
  tags?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface NarasiScene {
  id: string;
  contentId?: string;
  title: string;
  narasi: string;
  scene: string;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface IdeaItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  priority: 'rendah' | 'sedang' | 'tinggi';
  tags?: string[];
  createdAt: number;
}

export interface CaptionDraft {
  id: string;
  contentId?: string;
  title: string;
  caption: string;
  hashtags: string;
  platform: ContentType;
  createdAt: number;
  updatedAt: number;
}

export interface PromptItem {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags?: string[];
  createdAt: number;
}

export interface JurnalEntry {
  id: string;
  date: string;
  konten: string;
  pencapaian: string;
  tantangan: string;
  rencanaBesok: string;
  mood: 1 | 2 | 3 | 4 | 5;
  createdAt: number;
  updatedAt: number;
}
