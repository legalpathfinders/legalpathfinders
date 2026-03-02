'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function NewsAdmin() {
  return (
    <AdminCRUD
      table="news_items"
      title="News Items"
      columns={[
        { key: 'headline', label: 'Headline', type: 'text', required: true },
        { key: 'source', label: 'Source', type: 'text' },
        { key: 'published_at', label: 'Published At', type: 'date' },
        { key: 'link', label: 'Link', type: 'text' },
        { key: 'is_active', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}
