'use client';

import { useNav } from '@/lib/NavigationStack';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { LegalSeriesItem, LegalSeriesCategory } from '@/models/LegalSeriesItem';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useDemandState } from '@/lib/state-stack';
import styles from './legal-series-page.module.css';

export default function LegalSeriesPage() {
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [items, demandItems] = useDemandState<LegalSeriesItem[]>([], {
    key: 'legal-series',
    persist: true,
    ttl: 300
  });
  const [filter, setFilter] = useState<LegalSeriesCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    demandItems(async ({ set }) => {
      const { data, error } = await supabaseBrowser
        .from('legal_series')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (error) throw error;
      set(data?.map(d => LegalSeriesItem.from(d)) || []);
      setLoading(false);
    });
  }, [demandItems]);

  const filteredItems = filter === 'all' ? items : items.filter(i => i.category === filter);

  return (
    <main className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <header className={`${styles.header} ${styles[`header_${theme}`]}`}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={() => nav.pop()} aria-label="Go back">
            <svg className={styles.backIcon} viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0424 0.908364L1.01887 8.84376C0.695893 9.12721 0.439655 9.46389 0.264823 9.83454C0.089992 10.2052 0 10.6025 0 11.0038C0 11.405 0.089992 11.8024 0.264823 12.173C0.439655 12.5437 0.695893 12.8803 1.01887 13.1638L10.0424 21.0992C12.2373 23.0294 16 21.6507 16 18.9239V3.05306C16 0.326231 12.2373 -1.02187 10.0424 0.908364Z" fill="currentColor" />
            </svg>
          </button>
          <h1 className={styles.title}>{t('legal_series')}</h1>
        </div>
      </header>

      <div className={styles.innerBody}>
        <div className={styles.filters}>
          <button onClick={() => setFilter('all')} className={`${styles.filter} ${filter === 'all' ? styles.filterActive : ''}`}>All</button>
          <button onClick={() => setFilter('law_career_guide')} className={`${styles.filter} ${filter === 'law_career_guide' ? styles.filterActive : ''}`}>Career Guide</button>
          <button onClick={() => setFilter('study_guide')} className={`${styles.filter} ${filter === 'study_guide' ? styles.filterActive : ''}`}>Study Guide</button>
          <button onClick={() => setFilter('podcast')} className={`${styles.filter} ${filter === 'podcast' ? styles.filterActive : ''}`}>Podcasts</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : filteredItems.length === 0 ? (
          <div className={styles.empty}>No content available</div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
              <div className={styles.cardHeader}>
                <h3>{item.title}</h3>
                <span className={styles.badge}>{item.category.replace('_', ' ')}</span>
              </div>
              {item.content && <p className={styles.desc}>{item.content.substring(0, 200)}...</p>}
              {item.externalUrl && (
                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Read More →
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
