'use client';

import { useNav } from '@/lib/NavigationStack';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Organization } from '@/models/Organization';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useDemandState } from '@/lib/state-stack';
import styles from './organizations-page.module.css';

export default function OrganizationsPage() {
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [organizations, demandOrganizations] = useDemandState<Organization[]>([], {
    key: 'organizations',
    persist: true,
    ttl: 300
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    demandOrganizations(async ({ set }) => {
      const { data, error } = await supabaseBrowser
        .from('organizations')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });
      if (error) throw error;
      set(data?.map(d => Organization.from(d)) || []);
      setLoading(false);
    });
  }, [demandOrganizations]);

  return (
    <main className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <header className={`${styles.header} ${styles[`header_${theme}`]}`}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={() => nav.pop()} aria-label="Go back">
            <svg className={styles.backIcon} viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0424 0.908364L1.01887 8.84376C0.695893 9.12721 0.439655 9.46389 0.264823 9.83454C0.089992 10.2052 0 10.6025 0 11.0038C0 11.405 0.089992 11.8024 0.264823 12.173C0.439655 12.5437 0.695893 12.8803 1.01887 13.1638L10.0424 21.0992C12.2373 23.0294 16 21.6507 16 18.9239V3.05306C16 0.326231 12.2373 -1.02187 10.0424 0.908364Z" fill="currentColor" />
            </svg>
          </button>
          <h1 className={styles.title}>{t('organizations')}</h1>
        </div>
      </header>

      <div className={styles.innerBody}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : organizations.length === 0 ? (
          <div className={styles.empty}>No organizations available</div>
        ) : (
          <div className={styles.grid}>
            {organizations.map(org => (
              <div key={org.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
                {org.logoUrl && (
                  <img src={org.logoUrl} alt={org.name} className={styles.logo} />
                )}
                <h3 className={styles.name}>{org.name}</h3>
                {org.description && <p className={styles.desc}>{org.description}</p>}
                {org.website && (
                  <a href={org.website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Visit Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
