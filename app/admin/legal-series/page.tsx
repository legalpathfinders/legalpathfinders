'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function LegalSeriesAdmin() {
  return (
    <AdminCRUD
      table="legal_series"
      title="Legal Series"
      columns={[
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['law_aspirants', 'law_career_guide', 'study_guide', 'internship_guide', 'moot_guide', 'law_school_guide', 'podcast', 'ai_tools'], required: true },
        { key: 'content', label: 'Content', type: 'textarea' },
        { key: 'external_url', label: 'External URL', type: 'text' },
        { key: 'is_published', label: 'Published', type: 'boolean' },
      ]}
    />
  );
}
