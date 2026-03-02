export type EventType = 'conference' | 'webinar' | 'workshop' | 'competition' | 'other';

export interface BackendEvent {
  id: string;
  title: string;
  type: EventType;
  description?: string;
  event_date?: string;
  location?: string;
  link?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class Event {
  id: string;
  title: string;
  type: EventType;
  description: string;
  eventDate: string | null;
  location: string | null;
  link: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: BackendEvent | null) {
    this.id = data?.id ?? '';
    this.title = data?.title ?? '';
    this.type = data?.type ?? 'other';
    this.description = data?.description ?? '';
    this.eventDate = data?.event_date ?? null;
    this.location = data?.location ?? null;
    this.link = data?.link ?? null;
    this.isActive = data?.is_active ?? true;
    this.createdAt = data?.created_at ? new Date(data.created_at) : new Date();
    this.updatedAt = data?.updated_at ? new Date(data.updated_at) : new Date();
  }

  static from(data: any): Event {
    if (data instanceof Event) return data;
    return new Event(data);
  }

  toBackend(): BackendEvent {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      description: this.description,
      event_date: this.eventDate ?? undefined,
      location: this.location ?? undefined,
      link: this.link ?? undefined,
      is_active: this.isActive,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }
}
