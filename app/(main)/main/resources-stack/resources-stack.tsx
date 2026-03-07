'use client';

import NavigationStack from '@/lib/NavigationStack';
import ResourcesPage from './resources-page/page';

const resourcesStackNavLink = {
  resources_page: ResourcesPage
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
