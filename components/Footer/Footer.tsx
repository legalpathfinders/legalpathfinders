'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to subscribe');
        return;
      }

      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={`${styles.footer} ${styles[`footer_${theme}`]}`}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3>Legal Pathfinders</h3>
          <p>{t('footer_about')}</p>
          <button 
            onClick={() => window.open('https://forms.gle/Cw4MjEbRxEmHLAnHA', '_blank')}
            className={styles.membershipBtn}
          >
            {t('request_membership')}
          </button>
        </div>

        <div className={styles.section}>
          <h3>{t('quick_links')}</h3>
          <a href="/main">{t('home')}</a>
          <a href="/main">{t('opportunities')}</a>
          <a href="/main">{t('resources')}</a>
          <a href="/main">{t('services')}</a>
          <a href="/main">{t('events')}</a>
        </div>

        <div className={styles.section}>
          <h3>{t('contact_us')}</h3>
          <p>legalpathfinders.com@gmail.com</p>
          <a href="https://www.linkedin.com/company/legal-pathfinders/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/company/legal-pathfinders/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              in
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <h3>{t('newsletter')}</h3>
          <p>{t('newsletter_text')}</p>
          <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('enter_email')}
              className={styles.newsletterInput}
              required
              disabled={loading}
            />
            <button type="submit" className={styles.newsletterBtn} disabled={loading}>
              {loading ? '...' : subscribed ? '✓' : t('subscribe')}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          {subscribed && <p className={styles.success}>{t('subscribe_success')}</p>}
        </div>
      </div>

      <div className={styles.bottom}>
        <div>{t('copyright')}</div>
        <div className={styles.legalLinks}>
          <a href="/privacy">{t('privacy_policy')}</a>
          <a href="/terms">{t('terms_of_service')}</a>
        </div>
      </div>
    </footer>
  );
}
