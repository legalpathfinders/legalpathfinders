'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNav } from '@/lib/NavigationStack';
import { supabaseBrowser } from '@/lib/supabase/client';
import styles from './login-verification.module.css';

export default function LoginVerification() {
  const router = useRouter();
  const nav = useNav();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = nav.peek()?.params;
    if (params?.email) {
      setEmail(params.email as string);
    }
  }, [nav]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp) return;
    
    setVerifying(true);
    setError('');

    try {
      const { error } = await supabaseBrowser.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;
      router.push('/main');
    } catch (err: any) {
      setError(err.message || 'Invalid code');
    } finally {
      setVerifying(false);
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

        <h1 className={styles.title}>{t('verify_email') || 'Verify Your Email'}</h1>
        
        <p className={styles.text}>
          {t('verification_message') || 'We sent a 6-digit verification code to'}
        </p>
        <p className={styles.email}>{email}</p>
        
        <p className={styles.text}>
          {t('check_inbox') || 'Please check your inbox and enter the code below.'}
        </p>

        <form onSubmit={handleVerify} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>{t('verification_code') || 'Verification Code'}</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className={`${styles.input} ${styles[`input_${theme}`]}`}
              placeholder="000000"
              maxLength={6}
              required
              disabled={verifying}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={`${styles.button} ${styles[`button_${theme}`]}`}
            disabled={verifying || otp.length !== 6}
          >
            {verifying && <div className={styles.spinner}></div>}
            {verifying ? t('verifying') : t('verify') || 'Verify'}
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
