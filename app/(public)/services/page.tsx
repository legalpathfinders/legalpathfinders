'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { ServiceItem } from '@/models/ServiceItem';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './services.module.css';

export default function PublicServicesPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabaseBrowser
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (!error && data) {
        setServices(data.map(d => ServiceItem.from(d)));
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

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
          <h1 className={styles.title}>{t('services') || 'Services'}</h1>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : services.length === 0 ? (
          <div className={styles.empty}>No services available</div>
        ) : (
          <div className={styles.grid}>
            {services.map(svc => (
              <div key={svc.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
                <h3>{svc.title}</h3>
                {svc.description && <p className={styles.desc}>{svc.description}</p>}
                {svc.ctaLink && (
                  <a href={svc.ctaLink} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles[`link_${theme}`]}`}>
                    {svc.ctaLabel || 'Learn More'} →
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
