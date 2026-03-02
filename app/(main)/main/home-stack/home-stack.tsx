'use client';

import NavigationStack from '@/lib/NavigationStack';
import HomePage from './home-page/page';
import OpportunitiesPage from './opportunities-page/page';
import EventsPage from './events-page/page';
import OrganizationsPage from './organizations-page/page';
import AboutPage from './about-page/page';

const homeStackNavLink = {
  home_page: HomePage,
  opportunities_page: OpportunitiesPage,
  events_page: EventsPage,
  organizations_page: OrganizationsPage,
  about_page: AboutPage,
};

export const HomeStack = () => (
  <NavigationStack
    id="home-stack"
    navLink={homeStackNavLink}
    entry="home_page"
    syncHistory
    transition="slide"
    persist
  />
);
