'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNav } from '@/lib/NavigationStack';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './signup-form.module.css';

export default function SignupForm() {
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabaseBrowser.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        nav.push('verification', { email });
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <div className={`${styles.card} ${styles[`card_${theme}`]}`}>
        <button
          onClick={() => window.location.href = '/'}
          className={styles.closeButton}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <h1 className={styles.title}>{t('signup') || 'Sign Up'}</h1>
        
        <form onSubmit={handleSignup} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>{t('name') || 'Name'}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} ${styles[`input_${theme}`]}`}
              required
              disabled={loading}
            />
          </div>

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

          <div className={styles.field}>
            <label className={styles.label}>{t('password') || 'Password'}</label>
            <div className={styles.passwordField}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${styles[`input_${theme}`]}`}
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={`${styles.button} ${styles[`button_${theme}`]}`}
            disabled={loading}
          >
            {loading && <div className={styles.spinner}></div>}
            {loading ? t('loading') : t('signup')}
          </button>
        </form>

        <div className={styles.footer}>
          <a href="/login" className={styles.link}>
            {t('have_account') || 'Already have an account? Login'}
          </a>
        </div>
      </div>
    </div>
  );
}
