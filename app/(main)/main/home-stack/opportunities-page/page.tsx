'use client';

import { useNav } from '@/lib/NavigationStack';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Opportunity, OpportunityType } from '@/models/Opportunity';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useDemandState } from '@/lib/state-stack';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import styles from './opportunities-page.module.css';

export default function OpportunitiesPage() {
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [opportunities, demandOpportunities] = useDemandState<Opportunity[]>([], {
    key: 'opportunities',
    persist: true,
    ttl: 300
  });
  const [filter, setFilter] = useState<OpportunityType | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    demandOpportunities(async ({ set }) => {
      const { data, error } = await supabaseBrowser
        .from('opportunities')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      set(data?.map(d => Opportunity.from(d)) || []);
      setLoading(false);
    });
  }, [demandOpportunities]);

  const filteredOpportunities = filter === 'all' 
    ? opportunities 
    : opportunities.filter(o => o.type === filter);

  return (
    <main className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <header className={`${styles.header} ${styles[`header_${theme}`]}`}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={() => nav.pop()} aria-label="Go back">
            <svg className={styles.backIcon} viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0424 0.908364L1.01887 8.84376C0.695893 9.12721 0.439655 9.46389 0.264823 9.83454C0.089992 10.2052 0 10.6025 0 11.0038C0 11.405 0.089992 11.8024 0.264823 12.173C0.439655 12.5437 0.695893 12.8803 1.01887 13.1638L10.0424 21.0992C12.2373 23.0294 16 21.6507 16 18.9239V3.05306C16 0.326231 12.2373 -1.02187 10.0424 0.908364Z" fill="currentColor" />
            </svg>
          </button>
          <h1 className={styles.title}>{t('opportunities')}</h1>
        </div>
      </header>

      <div className={styles.innerBody}>
        <div className={styles.filters}>
          <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.filterActive : styles.filter}>All</button>
          <button onClick={() => setFilter('internship')} className={filter === 'internship' ? styles.filterActive : styles.filter}>Internships</button>
          <button onClick={() => setFilter('job')} className={filter === 'job' ? styles.filterActive : styles.filter}>Jobs</button>
          <button onClick={() => setFilter('scholarship')} className={filter === 'scholarship' ? styles.filterActive : styles.filter}>Scholarships</button>
        </div>

        {loading ? (
          <LoadingSpinner size="large" text={t('loading')} />
        ) : filteredOpportunities.length === 0 ? (
          <div className={styles.empty}>{t('no_opportunities')}</div>
        ) : (
          filteredOpportunities.map(opp => (
            <div key={opp.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
              <div className={styles.cardHeader}>
                <h3>{opp.title}</h3>
                <span className={styles.badge}>{opp.type}</span>
              </div>
              <p className={styles.org}>{opp.organization}</p>
              {opp.description && <p className={styles.desc}>{opp.description}</p>}
              {opp.deadline && (
                <p className={styles.deadline}>Deadline: {new Date(opp.deadline).toLocaleDateString()}</p>
              )}
              {opp.link && (
                <a href={opp.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Learn More →
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
