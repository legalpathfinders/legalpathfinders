export interface BackendServiceItem {
  id: string;
  title: string;
  description?: string;
  cta_label?: string;
  cta_link?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class ServiceItem {
  id: string;
  title: string;
  description: string;
  ctaLabel: string | null;
  ctaLink: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: BackendServiceItem | null) {
    this.id = data?.id ?? '';
    this.title = data?.title ?? '';
    this.description = data?.description ?? '';
    this.ctaLabel = data?.cta_label ?? null;
    this.ctaLink = data?.cta_link ?? null;
    this.sortOrder = data?.sort_order ?? 0;
    this.isActive = data?.is_active ?? true;
    this.createdAt = data?.created_at ? new Date(data.created_at) : new Date();
    this.updatedAt = data?.updated_at ? new Date(data.updated_at) : new Date();
  }

  static from(data: any): ServiceItem {
    if (data instanceof ServiceItem) return data;
    return new ServiceItem(data);
  }

  toBackend(): BackendServiceItem {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      cta_label: this.ctaLabel ?? undefined,
      cta_link: this.ctaLink ?? undefined,
      sort_order: this.sortOrder,
      is_active: this.isActive,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }
}
