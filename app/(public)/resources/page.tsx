'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Resource, ResourceCategory } from '@/models/Resource';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './resources.module.css';

export default function PublicResourcesPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [resources, setResources] = useState<Resource[]>([]);
  const [filter, setFilter] = useState<ResourceCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabaseBrowser
        .from('resources')
        .select('*')
        .eq('is_active', true)
        .order('uploaded_at', { ascending: false });
      if (!error && data) {
        setResources(data.map(d => Resource.from(d)));
      }
      setLoading(false);
    };
    fetchResources();
  }, []);

  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(r => r.category === filter);

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
          <h1 className={styles.title}>{t('resources')}</h1>
        </div>

        <div className={styles.filters}>
          <button onClick={() => setFilter('all')} className={`${styles.filter} ${filter === 'all' ? styles.filterActive : ''}`}>All</button>
          <button onClick={() => setFilter('article')} className={`${styles.filter} ${filter === 'article' ? styles.filterActive : ''}`}>Articles</button>
          <button onClick={() => setFilter('research')} className={`${styles.filter} ${filter === 'research' ? styles.filterActive : ''}`}>Research</button>
          <button onClick={() => setFilter('template')} className={`${styles.filter} ${filter === 'template' ? styles.filterActive : ''}`}>Templates</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : filteredResources.length === 0 ? (
          <div className={styles.empty}>No resources available</div>
        ) : (
          <div className={styles.grid}>
            {filteredResources.map(res => (
              <div key={res.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
                <div className={styles.cardHeader}>
                  <h3>{res.title}</h3>
                  <span className={`${styles.badge} ${styles[`badge_${theme}`]}`}>{res.category}</span>
                </div>
                {res.description && <p className={styles.desc}>{res.description}</p>}
                <div className={styles.actions}>
                  {res.fileUrl && (
                    <a href={res.fileUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles[`link_${theme}`]}`}>
                      Download
                    </a>
                  )}
                  {res.externalUrl && (
                    <a href={res.externalUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles[`link_${theme}`]}`}>
                      View →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
