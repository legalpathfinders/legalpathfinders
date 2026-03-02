'use client';

import NavigationStack from '@/lib/NavigationStack';
import ServicesPage from './services-page/page';

const servicesStackNavLink = {
  services_page: ServicesPage,
};

export const ServicesStack = () => (
  <NavigationStack
    id="services-stack"
    navLink={servicesStackNavLink}
    entry="services_page"
    syncHistory
    transition="slide"
    persist
  />
);
