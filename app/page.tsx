'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import SideDrawer from '@/lib/SideDrawer';
import Image from 'next/image';
import styles from './landing.module.css';

export default function LandingPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { t, lang, setLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`${styles.container} ${styles[`container_${theme}`]}`}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Image 
              src="/legalpathfinderslogo.svg" 
              alt="Legal Pathfinders" 
              width={40} 
              height={40}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>Legal Pathfinders</span>
          </div>
          <div className={styles.navLinks}>
            <a href="/about">{t('about_text')}</a>
            <a href="/privacy">{t('privacy_policy')}</a>
            <a href="/terms">{t('terms_of_service')}</a>
          </div>
          <div className={styles.navActions}>
            <button onClick={toggleTheme} className={styles.iconBtn}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className={styles.iconBtn}>
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button onClick={() => router.push('/login')} className={styles.loginBtn}>
              {t('login')}
            </button>
            <button onClick={() => router.push('/signup')} className={styles.signupBtn}>
              {t('signup')}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className={styles.hamburger}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <SideDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        position="right"
        width={{ mobile: '85%', tablet: '400px', desktop: '400px' }}
        style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#2d2d2d' }}
      >
        <div className={`${styles.drawer} ${styles[`drawer_${theme}`]}`}>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerLogo}>
              <Image 
                src="/legalpathfinderslogo.svg" 
                alt="Legal Pathfinders" 
                width={32} 
                height={32}
              />
              <span>Legal Pathfinders</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className={styles.closeBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div className={styles.drawerContent}>
            <a href="/about" className={styles.drawerLink}>{t('about_text')}</a>
            <a href="/privacy" className={styles.drawerLink}>{t('privacy_policy')}</a>
            <a href="/terms" className={styles.drawerLink}>{t('terms_of_service')}</a>
            <div className={styles.drawerDivider}></div>
            <button onClick={() => router.push('/login')} className={styles.drawerLoginBtn}>
              {t('login')}
            </button>
            <button onClick={() => router.push('/signup')} className={styles.drawerSignupBtn}>
              {t('signup')}
            </button>
          </div>
        </div>
      </SideDrawer>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>{t('legal_pathfinders')}</h1>
          <p className={styles.heroSubtitle}>{t('community_tagline')}</p>
          <div className={styles.heroCta}>
            <button onClick={() => router.push('/signup')} className={styles.primaryBtn}>
              {t('get_started')}
            </button>
            <button onClick={() => router.push('/about')} className={styles.secondaryBtn}>
              {t('learn_more')}
            </button>
          </div>
        </section>

        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>{t('about_community')}</h2>
          <p className={styles.text}>{t('about_intro')}</p>
          <p className={styles.text}>{t('about_challenge')}</p>
          <p className={styles.text}>{t('about_solution')}</p>
        </section>

        <section className={styles.offerings}>
          <h2 className={styles.sectionTitle}>{t('what_we_offer')}</h2>
          <div className={styles.offerGrid}>
            <div className={styles.offerCard}>
              <span className={styles.offerIcon}>📚</span>
              <p>{t('offer_training')}</p>
            </div>
            <div className={styles.offerCard}>
              <span className={styles.offerIcon}>🤝</span>
              <p>{t('offer_mentorship')}</p>
            </div>
            <div className={styles.offerCard}>
              <span className={styles.offerIcon}>💡</span>
              <p>{t('offer_clarity')}</p>
            </div>
            <div className={styles.offerCard}>
              <span className={styles.offerIcon}>📝</span>
              <p>{t('offer_cv_support')}</p>
            </div>
            <div className={styles.offerCard}>
              <span className={styles.offerIcon}>🎯</span>
              <p>{t('offer_internships')}</p>
            </div>
            <div className={styles.offerCard}>
              <span className={styles.offerIcon}>🚀</span>
              <p>{t('offer_programs')}</p>
            </div>
            <div className={styles.offerCard}>
              <span className={styles.offerIcon}>🌐</span>
              <p>{t('offer_presence')}</p>
            </div>
            <div className={styles.offerCard}>
              <span className={styles.offerIcon}>💬</span>
              <p>{t('offer_consultations')}</p>
            </div>
          </div>
          <p className={styles.text}>{t('about_values')}</p>
        </section>

        <section className={styles.membership}>
          <h2 className={styles.sectionTitle}>{t('membership')}</h2>
          <p className={styles.text}>{t('membership_intro')}</p>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>✓</span>
              <p>{t('benefit_opportunities')}</p>
            </div>
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>✓</span>
              <p>{t('benefit_resources')}</p>
            </div>
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>✓</span>
              <p>{t('benefit_mentorship')}</p>
            </div>
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>✓</span>
              <p>{t('benefit_training')}</p>
            </div>
            <div className={styles.benefitCard}>
              <span className={styles.benefitIcon}>✓</span>
              <p>{t('benefit_discussions')}</p>
            </div>
          </div>
          
          <p className={styles.text}>{t('membership_closing')}</p>
          <button 
            onClick={() => window.open('https://forms.gle/Cw4MjEbRxEmHLAnHA', '_blank')}
            className={styles.ctaButton}
          >
            {t('request_membership')}
          </button>
        </section>

        <section className={styles.contact}>
          <h2 className={styles.sectionTitle}>{t('contact_us') || 'Contact Us'}</h2>
          <p className={styles.text}>{t('contact_intro')}</p>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              <div>
                <strong>Email</strong>
                <p>legalpathfinders.com@gmail.com</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>💼</span>
              <div>
                <strong>LinkedIn</strong>
                <p><a href="https://www.linkedin.com/company/legal-pathfinders/" target="_blank" rel="noopener noreferrer">Legal Pathfinders</a></p>
              </div>
            </div>
          </div>
          
          <p className={styles.text}>{t('contact_closing')}</p>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>{t('quick_access')}</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>{t('opportunities')}</h3>
              <p>{t('opportunities_desc')}</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📚</div>
              <h3>{t('resources')}</h3>
              <p>{t('resources_desc')}</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🤝</div>
              <h3>{t('services')}</h3>
              <p>{t('services_desc')}</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📅</div>
              <h3>{t('events')}</h3>
              <p>{t('events_desc')}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>Legal Pathfinders</h4>
            <p>{t('footer_tagline')}</p>
          </div>
          <div className={styles.footerSection}>
            <h4>{t('quick_links')}</h4>
            <a href="/about">{t('about_text')}</a>
            <a href="/privacy">{t('privacy_policy')}</a>
            <a href="/terms">{t('terms_of_service')}</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>{t('copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
