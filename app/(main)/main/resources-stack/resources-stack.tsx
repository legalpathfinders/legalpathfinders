'use client';

import NavigationStack from '@/lib/NavigationStack';
import ResourcesPage from './resources-page/page';
import LegalSeriesPage from './legal-series-page/page';

const resourcesStackNavLink = {
  resources_page: ResourcesPage,
  legal_series_page: LegalSeriesPage,
};

export const ResourcesStack = () => (
  <NavigationStack
    id="resources-stack"
    navLink={resourcesStackNavLink}
    entry="resources_page"
    syncHistory
    transition="slide"
    persist
  />
);
