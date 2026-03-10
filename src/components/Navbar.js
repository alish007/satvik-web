'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.navLogo}>
          <div className={styles.logoCircle}>S</div>
          <div>
            <div className={styles.logoText}>Satvik<span>.</span></div>
            <span className={styles.logoSub}>Pure • Natural</span>
          </div>
        </Link>
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? styles.activeLink : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/download" className={styles.navCta}>Download App</Link>
          </li>
        </ul>
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.hamburgerOpen : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerOverlay} onClick={() => setMobileOpen(false)}></div>
        <div className={styles.drawerContent}>
          <div className={styles.drawerHeader}>
            <Link href="/" className={styles.navLogo}>
              <div className={styles.logoCircle}>S</div>
              <div>
                <div className={styles.logoText}>Satvik<span>.</span></div>
                <span className={styles.logoSub}>Pure • Natural</span>
              </div>
            </Link>
            <button className={styles.drawerClose} onClick={() => setMobileOpen(false)}>✕</button>
          </div>
          <ul className={styles.drawerLinks}>
            <li><Link href="/">Home</Link></li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={pathname === link.href ? styles.activeLink : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/download" className={styles.drawerCta}>Download App</Link>
        </div>
      </div>
    </>
  );
}
