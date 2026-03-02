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
        <svg fill="none" height="1.30em" viewBox="0 0 22 22" width="1.30em" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.75 0C1.232 0 0 1.12009 0 2.50021V4.8244C0.00058588 5.35913 0.158347 5.88399 0.456955 6.34467C0.755563 6.80535 1.18417 7.18511 1.6984 7.44462L8.0256 10.6429C6.70031 11.2512 5.63931 12.2479 5.014 13.4721C4.3887 14.6963 4.23562 16.0764 4.5795 17.3894C4.92338 18.7024 5.74413 19.8717 6.90915 20.7083C8.07417 21.5449 9.51541 22 11 22C12.4846 22 13.9258 21.5449 15.0908 20.7083C16.2559 19.8717 17.0766 18.7024 17.4205 17.3894C17.7644 16.0764 17.6113 14.6963 16.986 13.4721C16.3607 12.2479 15.2997 11.2512 13.9744 10.6429L20.3038 7.44662C20.818 7.18668 21.2463 6.8065 21.5445 6.34546C21.8428 5.88441 22 5.35927 22 4.8244V2.50021C22 1.12009 20.768 0 19.25 0H2.75ZM8.8 8.74473V2.00017H13.2V8.74473L11 9.85683L8.8 8.74473ZM15.4 16.0013C15.4 17.0623 14.9364 18.0798 14.1113 18.83C13.2861 19.5802 12.167 20.0017 11 20.0017C9.83305 20.0017 8.71389 19.5802 7.88873 18.83C7.06357 18.0798 6.6 17.0623 6.6 16.0013C6.6 14.9404 7.06357 13.9229 7.88873 13.1727C8.71389 12.4225 9.83305 12.001 11 12.001C12.167 12.001 13.2861 12.4225 14.1113 13.1727C14.9364 13.9229 15.4 14.9404 15.4 16.0013Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'services-stack',
      text: t('services') || 'Services',
      svg: (
        <svg fill="none" height="1.30em" viewBox="0 0 24 23" width="1.30em" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7898 0.0239615C10.9391 -0.0900544 9.08569 0.203904 7.37582 0.88264C5.66312 1.56162 4.14117 2.60795 2.93042 3.93881C1.71545 5.27218 0.842557 6.85253 0.37972 8.55681C-0.0831179 10.2611 -0.123415 12.0433 0.261965 13.7647C0.64436 15.4856 1.44274 17.0997 2.59471 18.4808C3.74391 19.8596 5.21594 20.9677 6.89507 21.718C8.57136 22.4679 10.4094 22.8387 12.2636 22.8011C14.1178 22.7635 15.9373 22.3185 17.578 21.5015C17.6306 21.4761 17.6894 21.4643 17.7483 21.4674C17.8073 21.4704 17.8644 21.4881 17.9137 21.5187C19.4718 22.5046 21.3097 23.0209 23.1847 22.9994C23.229 22.9996 23.2729 22.9915 23.3139 22.9756C23.3549 22.9598 23.3921 22.9363 23.4234 22.9067C23.4547 22.8771 23.4795 22.842 23.4964 22.8032C23.5132 22.7645 23.5217 22.723 23.5214 22.6812V18.8114C23.5219 18.7358 23.4941 18.6625 23.4429 18.6044C23.3916 18.5463 23.3203 18.5073 23.2415 18.4942C22.8558 18.4361 22.479 18.3334 22.1198 18.1885C22.0528 18.1601 21.9976 18.1117 21.9626 18.0507C21.9276 17.9898 21.9147 17.9196 21.9261 17.8511C21.9319 17.8054 21.9493 17.7617 21.9768 17.7237C23.1483 16.0575 23.8371 14.1302 23.9745 12.1341C24.1119 10.1379 23.693 8.14263 22.7598 6.34713C21.8289 4.55435 20.415 3.02469 18.6602 1.9119C16.9096 0.801584 14.8795 0.147982 12.7756 0.0172531L12.7898 0.0239615ZM4.74083 11.4024C4.73975 10.0373 5.16487 8.70216 5.96299 7.56423C6.76023 6.43006 7.89476 5.5441 9.22376 5.0179C10.5521 4.49286 12.0161 4.35449 13.4282 4.62049C14.8404 4.8865 16.1363 5.54478 17.15 6.51101C18.1672 7.47997 18.8594 8.71088 19.1399 10.0497C19.4204 11.3885 19.2769 12.7758 18.7272 14.0379C18.1773 15.2985 17.2445 16.377 16.0465 17.1371C14.6488 18.0223 12.9689 18.4207 11.2945 18.264C9.62016 18.1074 8.05553 17.4054 6.8687 16.2785C5.50474 14.9823 4.7381 13.2293 4.73576 11.4014L4.74083 11.4024Z" fill="currentColor" />
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
          onChange={(id) => setActive(id)}
          className={styles.mainNavigation}
        />
      </div>
    </div>
  );
}
