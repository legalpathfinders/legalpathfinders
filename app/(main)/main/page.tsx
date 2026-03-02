'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './page.module.css';
import { GroupNavigationStack, scrollBroadcaster } from '@/lib/NavigationStack';
import NavigationBar from '@/lib/NavigationBar';
import SideBar from '@/lib/SideBar';
import { HomeStack } from './home-stack/home-stack';
import { ResourcesStack } from './resources-stack/resources-stack';
import { ServicesStack } from './services-stack/services-stack';
import { ProfileStack } from './profile-stack/profile-stack';
import AdminStack from './admin-stack/admin-stack';

export default function Main() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [active, setActive] = useState('home-stack');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabaseBrowser.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabaseBrowser
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    setIsAdmin(profile?.role === 'admin');
  };

  const navStackMap = new Map([
    ['home-stack', <HomeStack key="home-stack" />],
    ['resources-stack', <ResourcesStack key="resources-stack" />],
    ['services-stack', <ServicesStack key="services-stack" />],
    ['profile-stack', <ProfileStack key="profile-stack" />],
    ['admin-stack', <AdminStack key="admin-stack" />],
  ]);

  const baseNavigationItems = [
    {
      id: 'home-stack',
      text: t('home') || 'Home',
      svg: (
        <svg fill="none" height="1.30em" viewBox="0 0 24 22" width="1.30em" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M11.056 0.357854C11.3064 0.12872 11.646 0 12 0C12.354 0 12.6936 0.12872 12.944 0.357854L20.9549 7.69127L23.6252 10.1357C23.8684 10.3663 24.003 10.675 24 10.9955C23.9969 11.3159 23.8565 11.6225 23.6089 11.8491C23.3614 12.0757 23.0265 12.2043 22.6764 12.207C22.3264 12.2098 21.9891 12.0866 21.7373 11.864L21.3461 11.5059V19.5555C21.3461 20.2038 21.0648 20.8256 20.564 21.284C20.0632 21.7425 19.384 22 18.6758 22H14.6703C14.3162 22 13.9766 21.8712 13.7262 21.642C13.4758 21.4128 13.3352 21.1019 13.3352 20.7778V17.1111H10.6648V20.7778C10.6648 21.1019 10.5242 21.4128 10.2738 21.642C10.0234 21.8712 9.68379 22 9.32969 22H5.32422C4.61601 22 3.9368 21.7425 3.43602 21.284C2.93524 20.8256 2.65391 20.2038 2.65391 19.5555V11.5059L2.2627 11.864C2.01089 12.0866 1.67363 12.2098 1.32355 12.207C0.973481 12.2043 0.638607 12.0757 0.391058 11.8491C0.14351 11.6225 0.00309252 11.3159 5.04724e-05 10.9955C-0.00299157 10.675 0.131585 10.3663 0.374794 10.1357L3.04511 7.69127L11.056 0.357854Z" fill="currentColor" fillRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'resources-stack',
      text: t('resources') || 'Resources',
      svg: (
        <svg fill="none" height="1.30em" viewBox="0 0 24 24" width="1.30em" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H13V17H11V12H7L12 7L17 12Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'services-stack',
      text: t('services') || 'Services',
      svg: (
        <svg fill="none" height="1.30em" viewBox="0 0 24 24" width="1.30em" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'profile-stack',
      text: t('profile') || 'Profile',
      svg: (
        <svg fill="none" height="1.30em" viewBox="0 0 22 22" width="1.30em" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M6.11111 4.88889C6.11111 3.59227 6.62619 2.34877 7.54303 1.43192C8.45988 0.515078 9.70339 0 11 0C12.2966 0 13.5401 0.515078 14.457 1.43192C15.3738 2.34877 15.8889 3.59227 15.8889 4.88889C15.8889 6.18550 15.3738 7.42901 14.457 8.34586C13.5401 9.26270 12.2966 9.77778 11 9.77778C9.70339 9.77778 8.45988 9.26270 7.54303 8.34586C6.62619 7.42901 6.11111 6.18550 6.11111 4.88889ZM6.11111 12.2222C4.49034 12.2222 2.93596 12.8661 1.78990 14.0121C0.643847 15.1582 0 16.7126 0 18.3333C0 19.3058 0.386309 20.2384 1.07394 20.9261C1.76158 21.6137 2.69421 22 3.66667 22H18.3333C19.3058 22 20.2384 21.6137 20.9261 20.9261C21.6137 20.2384 22 19.3058 22 18.3333C22 16.7126 21.3562 15.1582 20.2101 14.0121C19.0640 12.8661 17.5097 12.2222 15.8889 12.2222H6.11111Z" fill="currentColor" fillRule="evenodd" />
        </svg>
      ),
    },
  ];

  const navigationItems = isAdmin
    ? [
        ...baseNavigationItems,
        {
          id: 'admin-stack',
          text: 'Admin',
          svg: (
            <svg fill="none" height="1.30em" viewBox="0 0 24 24" width="1.30em" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor" />
            </svg>
          ),
        },
      ]
    : baseNavigationItems;

  const backgroundColor = theme === 'light' ? "#ffffff" : "#3a3a3a";
  const borderColor = theme === 'light' ? "#d4cfc4" : "#4a4a4a";
  const textColor = theme === 'light' ? "#2d2d2d" : "#f5f0e8";

  return (
    <div className={`${styles.mainContainer} ${styles[`mainContainer_${theme}`]}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.sidebarContainer}>
          <SideBar
            navKeys={navigationItems}
            activeId={active}
            activeColor={theme === 'light' ? "#2563eb" : "#3b82f6"}
            inactiveColor={theme === 'light' ? "#6b7280" : "#c4bfb3"}
            hoverColor={theme === 'light' ? "#1d4ed8" : "#60a5fa"}
            backgroundColor={backgroundColor}
            textSize="14px"
            fontWeight={600}
            iconSize="18px"
            widthExpanded="220px"
            widthCollapsed="60px"
            onChange={(id) => setActive(id)}
            className={styles.mainSide}
          />
        </div>

        <div className={styles.contentArea}>
          <GroupNavigationStack
            id="main-group"
            navStack={navStackMap}
            current={active}
            onCurrentChange={setActive}
            persist
          />
        </div>
      </div>

      <div className={styles.navigationContainer}>
        <NavigationBar
          navKeys={navigationItems}
          mode="autohide"
          activeId={active}
          activeColor={theme === 'light' ? "#2563eb" : "#3b82f6"}
          inactiveColor={theme === 'light' ? "#6b7280" : "#c4bfb3"}
          hoverColor={theme === 'light' ? "#1d4ed8" : "#60a5fa"}
          backgroundColor={backgroundColor}
          normalHeight="70px"
          shrinkHeight="0px"
          iconSize="18px"
          textSize="12px"
          fontWeight={600}
          itemSpacing="8px"
          paddingY="0px"
          paddingX="0px"
          breakpointSpacing={{
            '800': '32px',
            '500': '24px',
            '0': '16px',
          }}
          onScroll={(callback) => scrollBroadcaster.subscribe(callback)}
          barBorderTop={`1.5px solid ${borderColor}`}
          barBorderRadius="16px 16px 0 0"
          barShadow={theme === 'light' ? "0 -4px 20px rgba(45,45,45,0.1)" : "0 -4px 20px rgba(0,0,0,0.3)"}

                    /* Floating button */
          floatingButton={
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="1.5em"
              width="1.5em"
              fill="currentColor">
              <path d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          }
          floatingButtonPosition="left"
          floatingButtonBottom="16px"
          floatingButtonPadding="16px"
          floatingButtonColor={theme === 'light' ? "#10b981" : "#059669"}
          floatingButtonTextColor="#fff"
          floatingButtonRadius="50%"
          floatingButtonShadow={theme === 'light' ? "0 6px 12px rgba(0,0,0,0.25)" : "0 6px 12px rgba(0,0,0,0.4)"}
          onChange={(id) => setActive(id)}
          className={styles.mainNavigation}
        />
      </div>
    </div>
  );
}
