'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '../admin.module.css';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          name,
          email,
          phone,
          role,
          loyalty_tier,
          satvik_coins,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data);
    } catch (err) {
      console.error('Failed to load customers', err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = customers.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  return (
    <div className={styles.adminPage}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Customer Database</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            className={styles.navLink} 
            style={{ width: '240px', background: 'var(--admin-card)', border: '1px solid var(--admin-border)' }}
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact Info</th>
              <th>Role</th>
              <th>Satvik Coins</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-sub)' }}>Loading customers...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-sub)' }}>No customers found</td></tr>
            ) : filtered.map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className={styles.avatar}>{c.name?.[0] || 'U'}</div>
                    <div>
                      <div style={{ fontWeight: '600' }}>{c.name || 'Anonymous'}</div>
                      <div style={{ fontSize: '11px', color: 'var(--admin-text-sub)' }}>Tier: {c.loyalty_tier}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '13px' }}>{c.email}</div>
                  <div style={{ fontSize: '11px', color: 'var(--admin-text-sub)' }}>{c.phone}</div>
                </td>
                <td>
                  <span className={`${styles.status} ${c.role === 'ADMIN' ? styles.statusDelivered : styles.statusPending}`}>
                    {c.role}
                  </span>
                </td>
                <td style={{ fontWeight: '700', color: 'var(--admin-accent)' }}>{c.satvik_coins}</td>
                <td>{new Date(c.created_at).toLocaleDateString()}</td>
                <td>
                  <button className={styles.navLink} style={{ padding: '6px 10px', fontSize: '12px' }}>View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
