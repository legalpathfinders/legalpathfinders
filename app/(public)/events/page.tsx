'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Event, EventType } from '@/models/Event';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './events.module.css';

export default function PublicEventsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<EventType | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabaseBrowser
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('event_date', { ascending: true });
      if (!error && data) {
        setEvents(data.map(d => Event.from(d)));
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.type === filter);

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
          <h1 className={styles.title}>{t('events') || 'Events'}</h1>
        </div>

        <div className={styles.filters}>
          <button onClick={() => setFilter('all')} className={`${styles.filter} ${filter === 'all' ? styles.filterActive : ''}`}>All</button>
          <button onClick={() => setFilter('conference')} className={`${styles.filter} ${filter === 'conference' ? styles.filterActive : ''}`}>Conferences</button>
          <button onClick={() => setFilter('webinar')} className={`${styles.filter} ${filter === 'webinar' ? styles.filterActive : ''}`}>Webinars</button>
          <button onClick={() => setFilter('workshop')} className={`${styles.filter} ${filter === 'workshop' ? styles.filterActive : ''}`}>Workshops</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : filteredEvents.length === 0 ? (
          <div className={styles.empty}>No events available</div>
        ) : (
          <div className={styles.grid}>
            {filteredEvents.map(evt => (
              <div key={evt.id} className={`${styles.card} ${styles[`card_${theme}`]}`}>
                <div className={styles.cardHeader}>
                  <h3>{evt.title}</h3>
                  <span className={`${styles.badge} ${styles[`badge_${theme}`]}`}>{evt.type}</span>
                </div>
                {evt.description && <p className={styles.desc}>{evt.description}</p>}
                {evt.eventDate && <p className={styles.date}>📅 {new Date(evt.eventDate).toLocaleDateString()}</p>}
                {evt.location && <p className={styles.location}>📍 {evt.location}</p>}
                {evt.link && (
                  <a href={evt.link} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles[`link_${theme}`]}`}>
                    Learn More →
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
