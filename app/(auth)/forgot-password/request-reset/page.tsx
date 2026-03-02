'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNav } from '@/lib/NavigationStack';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './request-reset.module.css';

export default function RequestReset() {
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email);
      if (error) throw error;
      nav.push('verify_otp', { email });
    } catch (err: any) {
      setError(err.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <div className={`${styles.card} ${styles[`card_${theme}`]}`}>
        <h1 className={styles.title}>{t('forgot_password') || 'Forgot Password'}</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>{t('email') || 'Email'}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${styles[`input_${theme}`]}`}
              required
              disabled={loading}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={`${styles.button} ${styles[`button_${theme}`]}`}
            disabled={loading}
          >
            {loading && <div className={styles.spinner}></div>}
            {loading ? t('sending') : t('send_code') || 'Send Reset Code'}
          </button>
        </form>

        <div className={styles.footer}>
          <a href="/login" className={styles.link}>
            {t('back_to_login') || 'Back to Login'}
          </a>
        </div>
      </div>
    </div>
  );
}
