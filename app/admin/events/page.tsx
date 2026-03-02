'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function EventsAdmin() {
  return (
    <AdminCRUD
      table="events"
      title="Events"
      columns={[
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'type', label: 'Type', type: 'select', options: ['conference', 'webinar', 'workshop', 'competition', 'other'], required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'event_date', label: 'Event Date', type: 'date' },
        { key: 'location', label: 'Location', type: 'text' },
        { key: 'link', label: 'Link', type: 'text' },
        { key: 'is_active', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}
