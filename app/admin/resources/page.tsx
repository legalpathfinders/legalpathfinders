'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function ResourcesAdmin() {
  return (
    <AdminCRUD
      table="resources"
      title="Resources"
      columns={[
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['article', 'research', 'adr_series', 'legal_notes', 'template', 'study_tools', 'video_materials'], required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'file_url', label: 'File URL', type: 'text' },
        { key: 'external_url', label: 'External URL', type: 'text' },
        { key: 'is_active', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}
