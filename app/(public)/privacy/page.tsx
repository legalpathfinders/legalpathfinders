'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './privacy.module.css';

export default function PrivacyPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`${styles.page} ${styles[`page_${theme}`]}`}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button onClick={() => router.push('/')} className={styles.backBtn}>
            <span>←</span>
            <span className={styles.backText}>{t('back')}</span>
          </button>
          <span className={styles.lastUpdated}>{t('last_updated')}: January 2025</span>
        </div>
      </header>

      <div className={styles.hero}>
        <h1 className={styles.title}>{t('privacy_policy')}</h1>
        <p className={styles.subtitle}>{t('privacy_description')}</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacy_intro_title')}</h2>
          <p className={styles.sectionText}>{t('privacy_intro_text')}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacy_data_collection_title')}</h2>
          <p className={styles.sectionText}>{t('privacy_data_collection_text')}</p>
          <ul className={styles.list}>
            <li>{t('privacy_data_personal')}</li>
            <li>{t('privacy_data_usage')}</li>
            <li>{t('privacy_data_device')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacy_data_use_title')}</h2>
          <ul className={styles.list}>
            <li>{t('privacy_use_service')}</li>
            <li>{t('privacy_use_improve')}</li>
            <li>{t('privacy_use_communicate')}</li>
            <li>{t('privacy_use_security')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacy_security_title')}</h2>
          <p className={styles.sectionText}>{t('privacy_security_text')}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('privacy_contact_title')}</h2>
          <p className={styles.sectionText}>{t('privacy_contact_text')}</p>
          <p className={styles.sectionText}><strong>contact@legalpathfinders.com</strong></p>
        </section>
      </div>
    </div>
  );
}
