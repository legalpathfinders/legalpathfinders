'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './terms.module.css';

export default function TermsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`${styles.page} ${styles[`page_${theme}`]}`}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <button onClick={() => router.push('/')} className={styles.backBtn}>
            <span>←</span>
            <span className={styles.backText}>{t('back')}</span>
          </button>
          <span className={styles.lastUpdated}>{t('last_updated')}: January 2025</span>
        </div>
      </nav>

      <div className={styles.hero}>
        <h1 className={styles.title}>{t('terms_of_service')}</h1>
        <p className={styles.subtitle}>{t('terms_description')}</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms_acceptance_title')}</h2>
          <p className={styles.sectionText}>{t('terms_acceptance_text')}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms_eligibility_title')}</h2>
          <p className={styles.sectionText}>{t('terms_eligibility_text')}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms_account_title')}</h2>
          <ul className={styles.list}>
            <li>{t('terms_account_accurate')}</li>
            <li>{t('terms_account_secure')}</li>
            <li>{t('terms_account_responsible')}</li>
            <li>{t('terms_account_notify')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms_conduct_title')}</h2>
          <ul className={styles.list}>
            <li>{t('terms_conduct_cheat')}</li>
            <li>{t('terms_conduct_abuse')}</li>
            <li>{t('terms_conduct_violate')}</li>
            <li>{t('terms_conduct_impersonate')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms_ip_title')}</h2>
          <p className={styles.sectionText}>{t('terms_ip_text')}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms_liability_title')}</h2>
          <p className={styles.sectionText}>{t('terms_liability_text')}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('terms_contact_title')}</h2>
          <p className={styles.sectionText}>{t('terms_contact_text')}</p>
          <p className={styles.sectionText}><strong>legal@legalpathfinders.com</strong></p>
        </section>
      </div>
    </div>
  );
}
