'use client';

import { useNav } from '@/lib/NavigationStack';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuthContext } from '@/providers/AuthProvider';
import styles from './home-page.module.css';

export default function HomePage() {
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { session } = useAuthContext();

  return (
    <div className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back, {session?.user?.user_metadata?.name || 'User'}!</h1>
        <p className={styles.subtitle}>{t('legal_tagline')}</p>
      </header>

      <main className={styles.main}>
        <section className={styles.quickAccess}>
          <h2 className={styles.sectionTitle}>{t('quick_access')}</h2>
          <div className={styles.grid}>
            <div className={`${styles.card} ${styles[`card_${theme}`]}`} onClick={() => nav.push('opportunities_page')}>
              <span className={styles.icon}>🎯</span>
              <h3>{t('opportunities')}</h3>
              <p>{t('opportunities_desc')}</p>
            </div>

            <div className={`${styles.card} ${styles[`card_${theme}`]}`} onClick={() => nav.push('events_page')}>
              <span className={styles.icon}>📅</span>
              <h3>{t('events')}</h3>
              <p>{t('events_desc')}</p>
            </div>

            <div className={`${styles.card} ${styles[`card_${theme}`]}`} onClick={() => nav.push('organizations_page')}>
              <span className={styles.icon}>🏛️</span>
              <h3>{t('organizations')}</h3>
              <p>{t('organizations_desc')}</p>
            </div>

            <div className={`${styles.card} ${styles[`card_${theme}`]}`} onClick={() => nav.push('about_page')}>
              <span className={styles.icon}>ℹ️</span>
              <h3>{t('about_text')}</h3>
              <p>{t('about_description')}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
