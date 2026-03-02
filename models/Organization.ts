export interface BackendOrganization {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class Organization {
  id: string;
  name: string;
  description: string;
  website: string | null;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: BackendOrganization | null) {
    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
    this.description = data?.description ?? '';
    this.website = data?.website ?? null;
    this.logoUrl = data?.logo_url ?? null;
    this.isActive = data?.is_active ?? true;
    this.createdAt = data?.created_at ? new Date(data.created_at) : new Date();
    this.updatedAt = data?.updated_at ? new Date(data.updated_at) : new Date();
  }

  static from(data: any): Organization {
    if (data instanceof Organization) return data;
    return new Organization(data);
  }

  toBackend(): BackendOrganization {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      website: this.website ?? undefined,
      logo_url: this.logoUrl ?? undefined,
      is_active: this.isActive,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }
}
