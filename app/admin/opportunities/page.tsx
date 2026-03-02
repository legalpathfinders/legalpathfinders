'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function OpportunitiesAdmin() {
  return (
    <AdminCRUD
      table="opportunities"
      title="Opportunities"
      columns={[
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'type', label: 'Type', type: 'select', options: ['internship', 'job', 'scholarship', 'fellowship', 'call_for_papers', 'moot_court', 'adr_competition', 'other'], required: true },
        { key: 'organization', label: 'Organization', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'deadline', label: 'Deadline', type: 'date' },
        { key: 'link', label: 'Link', type: 'text' },
        { key: 'is_active', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}
