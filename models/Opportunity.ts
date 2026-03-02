export type OpportunityType = 
  | 'internship'
  | 'job'
  | 'scholarship'
  | 'fellowship'
  | 'call_for_papers'
  | 'moot_court'
  | 'adr_competition'
  | 'other';

export interface BackendOpportunity {
  id: string;
  title: string;
  type: OpportunityType;
  organization: string;
  description?: string;
  deadline?: string;
  link?: string;
  tags?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  organization: string;
  description: string;
  deadline: string | null;
  link: string | null;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: BackendOpportunity | null) {
    this.id = data?.id ?? '';
    this.title = data?.title ?? '';
    this.type = data?.type ?? 'other';
    this.organization = data?.organization ?? '';
    this.description = data?.description ?? '';
    this.deadline = data?.deadline ?? null;
    this.link = data?.link ?? null;
    this.tags = data?.tags ?? [];
    this.isActive = data?.is_active ?? true;
    this.createdAt = data?.created_at ? new Date(data.created_at) : new Date();
    this.updatedAt = data?.updated_at ? new Date(data.updated_at) : new Date();
  }

  static from(data: any): Opportunity {
    if (data instanceof Opportunity) return data;
    return new Opportunity(data);
  }

  toBackend(): BackendOpportunity {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      organization: this.organization,
      description: this.description,
      deadline: this.deadline ?? undefined,
      link: this.link ?? undefined,
      tags: this.tags,
      is_active: this.isActive,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }
}
