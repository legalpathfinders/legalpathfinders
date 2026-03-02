'use client';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export default function LoadingSpinner({ size = 'medium', text }: LoadingSpinnerProps) {
  const sizeClass = size === 'small' ? styles.spinnerSmall : size === 'large' ? styles.spinnerLarge : '';
  
  if (text) {
    return (
      <div className={styles.loadingContainer}>
        <div className={`${styles.spinner} ${sizeClass}`}></div>
        {text && <p className={styles.loadingText}>{text}</p>}
      </div>
    );
  }
  
  return <div className={`${styles.spinner} ${sizeClass}`}></div>;
}
