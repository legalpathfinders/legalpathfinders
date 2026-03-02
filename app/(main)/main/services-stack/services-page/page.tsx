'use client';

import { useNav } from '@/lib/NavigationStack';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { ServiceItem } from '@/models/ServiceItem';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './services-page.module.css';

export default function ServicesPage() {
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabaseBrowser
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setServices(data?.map(d => ServiceItem.from(d)) || []);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topSection}>
          <h1 className={styles.title}>{t('services')}</h1>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : services.length === 0 ? (
          <div className={styles.empty}>No services available</div>
        ) : (
          <div className={styles.grid}>
            {services.map(service => (
              <div key={service.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                {service.description && <p className={styles.desc}>{service.description}</p>}
                {service.ctaLink && (
                  <a href={service.ctaLink} className={`${styles.button} ${styles[`button_${theme}`]}`}>
                    {service.ctaLabel || 'Learn More'}
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
