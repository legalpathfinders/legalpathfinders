export type ResourceCategory =
  | 'article'
  | 'research'
  | 'adr_series'
  | 'legal_notes'
  | 'template'
  | 'study_tools'
  | 'video_materials';

export interface BackendResource {
  id: string;
  title: string;
  category: ResourceCategory;
  description?: string;
  file_url?: string;
  external_url?: string;
  is_active: boolean;
  uploaded_at: string;
  updated_at: string;
}

export class Resource {
  id: string;
  title: string;
  category: ResourceCategory;
  description: string;
  fileUrl: string | null;
  externalUrl: string | null;
  isActive: boolean;
  uploadedAt: Date;
  updatedAt: Date;

  constructor(data?: BackendResource | null) {
    this.id = data?.id ?? '';
    this.title = data?.title ?? '';
    this.category = data?.category ?? 'article';
    this.description = data?.description ?? '';
    this.fileUrl = data?.file_url ?? null;
    this.externalUrl = data?.external_url ?? null;
    this.isActive = data?.is_active ?? true;
    this.uploadedAt = data?.uploaded_at ? new Date(data.uploaded_at) : new Date();
    this.updatedAt = data?.updated_at ? new Date(data.updated_at) : new Date();
  }

  static from(data: any): Resource {
    if (data instanceof Resource) return data;
    return new Resource(data);
  }

  toBackend(): BackendResource {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      description: this.description,
      file_url: this.fileUrl ?? undefined,
      external_url: this.externalUrl ?? undefined,
      is_active: this.isActive,
      uploaded_at: this.uploadedAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }
}
