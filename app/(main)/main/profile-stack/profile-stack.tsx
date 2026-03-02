'use client';

import NavigationStack from '@/lib/NavigationStack';
import ProfilePage from './profile-page/page';

const profileStackNavLink = {
  profile_page: ProfilePage,
};

export const ProfileStack = () => (
  <NavigationStack
    id="profile-stack"
    navLink={profileStackNavLink}
    entry="profile_page"
    syncHistory
    transition="slide"
    persist
  />
);
