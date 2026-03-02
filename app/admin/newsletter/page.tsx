'use client';

import AdminCRUD from '@/components/AdminCRUD/AdminCRUD';

export default function NewsletterAdmin() {
  return (
    <AdminCRUD
      table="newsletter_subscribers"
      title="Newsletter Subscribers"
      columns={[
        { key: 'email', label: 'Email', type: 'text', required: true },
        { key: 'is_confirmed', label: 'Confirmed', type: 'boolean' },
      ]}
    />
  );
}
