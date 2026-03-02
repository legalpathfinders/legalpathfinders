'use client';

import { useNav } from '@/lib/NavigationStack';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Event } from '@/models/Event';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useDemandState } from '@/lib/state-stack';
import styles from './events-page.module.css';

export default function EventsPage() {
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [events, demandEvents] = useDemandState<Event[]>([], {
    key: 'events',
    persist: true,
    ttl: 300
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    demandEvents(async ({ set }) => {
      const { data, error } = await supabaseBrowser
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('event_date', { ascending: true });
      if (error) throw error;
      set(data?.map(d => Event.from(d)) || []);
      setLoading(false);
    });
  }, [demandEvents]);

  return (
    <main className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <header className={`${styles.header} ${styles[`header_${theme}`]}`}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={() => nav.pop()} aria-label="Go back">
            <svg className={styles.backIcon} viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0424 0.908364L1.01887 8.84376C0.695893 9.12721 0.439655 9.46389 0.264823 9.83454C0.089992 10.2052 0 10.6025 0 11.0038C0 11.405 0.089992 11.8024 0.264823 12.173C0.439655 12.5437 0.695893 12.8803 1.01887 13.1638L10.0424 21.0992C12.2373 23.0294 16 21.6507 16 18.9239V3.05306C16 0.326231 12.2373 -1.02187 10.0424 0.908364Z" fill="currentColor" />
            </svg>
          </button>
          <h1 className={styles.title}>{t('events')}</h1>
        </div>
      </header>

      <div className={styles.innerBody}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : events.length === 0 ? (
          <div className={styles.empty}>No events available</div>
        ) : (
          events.map(event => (
            <div key={event.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
              <div className={styles.cardHeader}>
                <h3>{event.title}</h3>
                <span className={styles.badge}>{event.type}</span>
              </div>
              {event.eventDate && (
                <p className={styles.date}>
                  {new Date(event.eventDate).toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
              )}
              {event.location && <p className={styles.location}>📍 {event.location}</p>}
              {event.description && <p className={styles.desc}>{event.description}</p>}
              {event.link && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
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
