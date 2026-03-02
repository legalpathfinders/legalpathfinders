export type LegalSeriesCategory = 
  | 'law_aspirants'
  | 'law_career_guide'
  | 'study_guide'
  | 'internship_guide'
  | 'moot_guide'
  | 'law_school_guide'
  | 'podcast'
  | 'ai_tools';

export interface BackendLegalSeriesItem {
  id: string;
  title: string;
  category: LegalSeriesCategory;
  content?: string;
  external_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export class LegalSeriesItem {
  id: string;
  title: string;
  category: LegalSeriesCategory;
  content: string;
  externalUrl: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: BackendLegalSeriesItem | null) {
    this.id = data?.id ?? '';
    this.title = data?.title ?? '';
    this.category = data?.category ?? 'law_aspirants';
    this.content = data?.content ?? '';
    this.externalUrl = data?.external_url ?? null;
    this.isPublished = data?.is_published ?? false;
    this.publishedAt = data?.published_at ? new Date(data.published_at) : null;
    this.createdAt = data?.created_at ? new Date(data.created_at) : new Date();
    this.updatedAt = data?.updated_at ? new Date(data.updated_at) : new Date();
  }

  static from(data: any): LegalSeriesItem {
    if (data instanceof LegalSeriesItem) return data;
    return new LegalSeriesItem(data);
  }

  toBackend(): BackendLegalSeriesItem {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      content: this.content,
      external_url: this.externalUrl ?? undefined,
      is_published: this.isPublished,
      published_at: this.publishedAt?.toISOString(),
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }
}
