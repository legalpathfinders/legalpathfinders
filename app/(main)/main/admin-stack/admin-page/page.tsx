'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNav } from '@/lib/NavigationStack';
import styles from './admin-page.module.css';

export default function AdminPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const nav = useNav();

  const tables = [
    { name: 'Opportunities', page: 'opportunities_admin', icon: '💼' },
    { name: 'Resources', page: 'resources_admin', icon: '📚' },
    { name: 'Legal Series', page: 'legal_series_admin', icon: '📖' },
    { name: 'Services', page: 'services_admin', icon: '⚖️' },
    { name: 'Events', page: 'events_admin', icon: '📅' },
    { name: 'News Items', page: 'news_admin', icon: '📰' },
    { name: 'Organizations', page: 'organizations_admin', icon: '🏛️' },
    { name: 'Members', page: 'members_admin', icon: '👥' },
    { name: 'Newsletter', page: 'newsletter_admin', icon: '📧' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topSection}>
          <h1 className={styles.title}>Admin Dashboard</h1>
        </div>

        <div className={styles.grid}>
          {tables.map(table => (
            <button
              key={table.page}
              onClick={() => nav.push(table.page)}
              className={`${styles.card} ${styles[`card_${theme}`]}`}
            >
              <span className={styles.icon}>{table.icon}</span>
              <h3>{table.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
