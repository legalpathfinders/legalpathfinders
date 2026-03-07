'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Opportunity, OpportunityType } from '@/models/Opportunity';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './opportunities.module.css';

export default function PublicOpportunitiesPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filter, setFilter] = useState<OpportunityType | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const { data, error } = await supabaseBrowser
        .from('opportunities')
        .select('*')
        .eq('is_active', true)
        .order('deadline', { ascending: true });
      if (!error && data) {
        setOpportunities(data.map(d => Opportunity.from(d)));
      }
      setLoading(false);
    };
    fetchOpportunities();
  }, []);

  const filteredOpportunities = filter === 'all' 
    ? opportunities 
    : opportunities.filter(o => o.type === filter);

  return (
    <div className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <nav className={styles.nav}>
        <button onClick={() => router.push('/')} className={styles.backBtn}>
          <span>←</span>
          <span className={styles.backText}>{t('back')}</span>
        </button>
      </nav>

      <div className={styles.content}>
        <div className={styles.topSection}>
          <h1 className={styles.title}>{t('opportunities') || 'Opportunities'}</h1>
        </div>

        <div className={styles.filters}>
          <button onClick={() => setFilter('all')} className={`${styles.filter} ${filter === 'all' ? styles.filterActive : ''}`}>All</button>
          <button onClick={() => setFilter('internship')} className={`${styles.filter} ${filter === 'internship' ? styles.filterActive : ''}`}>Internships</button>
          <button onClick={() => setFilter('job')} className={`${styles.filter} ${filter === 'job' ? styles.filterActive : ''}`}>Jobs</button>
          <button onClick={() => setFilter('scholarship')} className={`${styles.filter} ${filter === 'scholarship' ? styles.filterActive : ''}`}>Scholarships</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : filteredOpportunities.length === 0 ? (
          <div className={styles.empty}>No opportunities available</div>
        ) : (
          <div className={styles.grid}>
            {filteredOpportunities.map(opp => (
              <div key={opp.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
                <div className={styles.cardHeader}>
                  <h3>{opp.title}</h3>
                  <span className={`${styles.badge} ${styles[`badge_${theme}`]}`}>{opp.type}</span>
                </div>
                <p className={styles.org}>{opp.organization}</p>
                {opp.description && <p className={styles.desc}>{opp.description}</p>}
                {opp.deadline && <p className={styles.deadline}>Deadline: {new Date(opp.deadline).toLocaleDateString()}</p>}
                {opp.link && (
                  <a href={opp.link} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles[`link_${theme}`]}`}>
                    Apply →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
