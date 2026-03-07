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
    <div className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <div className={styles.content}>
        <div className={styles.topSection}>
          <h1 className={styles.title}>{t('legal_series')}</h1>
        </div>

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
          <div className={styles.grid}>
            {filteredItems.map(item => (
              <div key={item.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
                <div className={styles.cardHeader}>
                  <h3>{item.title}</h3>
                  <span className={`${styles.badge} ${styles[`badge_${theme}`]}`}>{item.category.replace('_', ' ')}</span>
                </div>
                {item.content && <p className={styles.desc}>{item.content.substring(0, 200)}...</p>}
                {item.externalUrl && (
                  <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles[`link_${theme}`]}`}>
                    Read More →
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
