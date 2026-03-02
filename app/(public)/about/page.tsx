'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './about.module.css';

export default function AboutPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`${styles.page} ${styles[`page_${theme}`]}`}>
      <nav className={styles.nav}>
        <button onClick={() => router.push('/')} className={styles.backBtn}>
          <span>←</span>
          <span className={styles.backText}>{t('back')}</span>
        </button>
      </nav>

      <div className={styles.hero}>
        <h1 className={styles.title}>{t('about_us')}</h1>
        <p className={styles.subtitle}>{t('about_description')}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t('our_mission')}</h2>
            <p className={styles.cardText}>{t('mission_description')}</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t('our_vision')}</h2>
            <p className={styles.cardText}>{t('vision_description')}</p>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t('what_we_offer')}</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.icon}>🎯</span>
              <span>{t('offer_opportunities')}</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.icon}>📚</span>
              <span>{t('offer_resources')}</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.icon}>🤝</span>
              <span>{t('offer_services')}</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.icon}>📅</span>
              <span>{t('offer_events')}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
