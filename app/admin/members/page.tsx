'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function MembersAdmin() {
  return (
    <AdminCRUD
      table="profiles"
      title="Members"
      columns={[
        { key: 'full_name', label: 'Name', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'select', options: ['user', 'admin'], required: true },
      ]}
    />
  );
}
