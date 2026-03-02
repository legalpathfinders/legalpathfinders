'use client';

import { useNav } from '@/lib/NavigationStack';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './about.module.css';

export default function AboutPage() {
  const router = useRouter();
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <main className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <header className={`${styles.header} ${styles[`header_${theme}`]}`}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={() => nav.pop()} aria-label="Go back">
            <svg className={styles.backIcon} viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0424 0.908364L1.01887 8.84376C0.695893 9.12721 0.439655 9.46389 0.264823 9.83454C0.089992 10.2052 0 10.6025 0 11.0038C0 11.405 0.089992 11.8024 0.264823 12.173C0.439655 12.5437 0.695893 12.8803 1.01887 13.1638L10.0424 21.0992C12.2373 23.0294 16 21.6507 16 18.9239V3.05306C16 0.326231 12.2373 -1.02187 10.0424 0.908364Z" fill="currentColor" />
            </svg>
          </button>
          <h1 className={styles.title}>{t('about_text')}</h1>
        </div>
      </header>

      <div className={styles.innerBody}>
        <section className={styles.section}>
          <h2>{t('our_mission')}</h2>
          <p>
            Legal Pathfinders is dedicated to empowering legal professionals and students 
            with opportunities, resources, and knowledge to excel in their careers.
          </p>
        </section>

        <section className={styles.section}>
          <h2>{t('what_we_offer')}</h2>
          <ul className={styles.list}>
            <li>Internship and job opportunities</li>
            <li>Scholarships and fellowships</li>
            <li>Legal resources and research materials</li>
            <li>Educational content and guides</li>
            <li>Professional services</li>
            <li>Legal events and conferences</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
