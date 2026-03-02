'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function OrganizationsAdmin() {
  return (
    <AdminCRUD
      table="organizations"
      title="Organizations"
      columns={[
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'website', label: 'Website', type: 'text' },
        { key: 'logo_url', label: 'Logo URL', type: 'text' },
        { key: 'is_active', label: 'Active', type: 'boolean' },
      ]}
    />
  );
}
