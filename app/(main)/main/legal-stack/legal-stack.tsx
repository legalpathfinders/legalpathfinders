'use client';

import NavigationStack from '@/lib/NavigationStack';
import LegalSeriesPage from './legal-series-page/page';

const legalStackNavLink = {
  legal_series_page: LegalSeriesPage,
};

export const LegalStack = () => (
  <NavigationStack
    id="legal-stack"
    navLink={legalStackNavLink}
    entry="legal_series_page"
    syncHistory
    transition="slide"
    persist
  />
);
