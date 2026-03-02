'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import NavigationStack from '@/lib/NavigationStack';
import AdminPage from './admin-page/page';
import OpportunitiesAdmin from '@/app/admin/opportunities/page';
import ResourcesAdmin from '@/app/admin/resources/page';
import LegalSeriesAdmin from '@/app/admin/legal-series/page';
import ServicesAdmin from '@/app/admin/services/page';
import EventsAdmin from '@/app/admin/events/page';
import NewsAdmin from '@/app/admin/news/page';
import OrganizationsAdmin from '@/app/admin/organizations/page';
import MembersAdmin from '@/app/admin/members/page';
import NewsletterAdmin from '@/app/admin/newsletter/page';

const adminStackNavLink = {
  admin_page: AdminPage,
  opportunities_admin: OpportunitiesAdmin,
  resources_admin: ResourcesAdmin,
  legal_series_admin: LegalSeriesAdmin,
  services_admin: ServicesAdmin,
  events_admin: EventsAdmin,
  news_admin: NewsAdmin,
  organizations_admin: OrganizationsAdmin,
  members_admin: MembersAdmin,
  newsletter_admin: NewsletterAdmin,
};

const AdminStack = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabaseBrowser.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data: profile } = await supabaseBrowser
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    setIsAdmin(profile?.role === 'admin');
  };

  if (isAdmin === null) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (!isAdmin) return null;

  return (
    <NavigationStack
      id="admin-stack"
      navLink={adminStackNavLink}
      entry="admin_page"
      syncHistory
      transition="fade"
      persist
    />
  );
};

export default AdminStack;
