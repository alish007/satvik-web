'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './admin.module.css';

const navItems = [
  { label: 'Overview', href: '/admin', icon: '📊' },
  { label: 'Orders', href: '/admin/orders', icon: '📦' },
  { label: 'Products', href: '/admin/products', icon: '🍍' },
  { label: 'Customers', href: '/admin/customers', icon: '👥' },
  { label: 'Partners', href: '/admin/partners', icon: '🛵' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminLayout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/'); // Redirect to login/home
        return;
      }

      // Query roles from our public.users table
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('supabase_auth_id', user.id)
        .single();

      if (error || data?.role !== 'ADMIN') {
        router.push('/'); // Deny access
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className={styles.adminWrapper} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'white', letterSpacing: '0.2em', fontSize: '12px' }}>VERIFYING CREDENTIALS...</div>
      </div>
    );
  }

  return (
    <div className={styles.adminWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          Satvik <em>Admin</em>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.activeLink : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '24px', borderTop: '1px solid var(--admin-border)' }}>
          <button 
            onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
            className={styles.navLink} 
            style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.pageTitle}>Dashboard Overview</div>
          <div className={styles.adminProfile}>
            <div className={styles.avatar}>A</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Admin Panel</div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
