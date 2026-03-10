'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import styles from './Footer.module.css';

const productLinks = [
  { label: 'Weekly Juices', href: '/products' },
  { label: 'Wellness Shots', href: '/products' },
  { label: 'Fresh Vegetables', href: '/products' },
  { label: 'Combo Packs', href: '/products' },
  { label: 'Subscribe Weekly', href: '/download' },
];
const companyLinks = [
  { label: 'About Satvik', href: '/about' },
  { label: 'Our Promise', href: '/about' },
  { label: 'Sustainability', href: '/about' },
  { label: 'Blog & Recipes', href: '/blog' },
];
const supportLinks = [
  { label: 'FAQ', href: '/contact' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Download App', href: '/download' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.contact.submit({
        email,
        type: 'NEWSLETTER',
        message: 'Newsletter subscription request from footer',
      });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      alert('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.ftMain}>
          <div className={styles.ftLogo}>Satvik<span>.</span></div>
          <p className={styles.ftDesc}>
            Pure natural juices and farm-fresh vegetables delivered daily in Surat, Gujarat.
            Cold-pressed. No preservatives. No compromises.
          </p>
          <div className={styles.newsletter}>
            <h6>Stay Fresh</h6>
            <p>Get weekly recipes and wellness tips.</p>
            {subscribed ? (
              <div className={styles.subSuccess}>✅ You&apos;re subscribed!</div>
            ) : (
              <form className={styles.subForm} onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" disabled={loading}>
                  {loading ? '...' : '→'}
                </button>
              </form>
            )}
          </div>
          <div className={styles.ftContact}>
            📞 <a href="tel:+919662209555">+91 9662209555</a> &nbsp;·&nbsp; 📍 Surat, Gujarat
            <br />📱 Instagram: <a href="#">@satvik_juice</a>
          </div>
        </div>
        <div className={styles.footerCol}>
          <h5>Products</h5>
          <ul>
            {productLinks.map((link, i) => (
              <li key={i}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h5>Company</h5>
          <ul>
            {companyLinks.map((link, i) => (
              <li key={i}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h5>Support</h5>
          <ul>
            {supportLinks.map((link, i) => (
              <li key={i}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2025 Satvik Group. Surat, Gujarat.</span>
        <span>Made with 🌿 for a healthier Surat</span>
      </div>
    </footer>
  );
}
