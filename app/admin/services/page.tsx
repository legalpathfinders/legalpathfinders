'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function ServicesAdmin() {
  return (
    <AdminCRUD
      table="services"
      title="Services"
      columns={[
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'cta_label', label: 'CTA Label', type: 'text' },
        { key: 'cta_link', label: 'CTA Link', type: 'text' },
        { key: 'sort_order', label: 'Sort Order', type: 'number' },
        { key: 'is_active', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}
