'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '../admin.module.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    loadOrders();
    // Subscribe to real-time updates for orders
    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        loadOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadOrders() {
    try {
      // In a real app, this would be a Fetch call to our API
      // Since we don't have a large dataset yet, we'll fetch from Supabase directly for this admin view
      // but usually, we should use the NestJS API we built.
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          total,
          status,
          created_at,
          users ( name )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = filter === 'ALL' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const stats = {
    pending: orders.filter(o => o.status === 'PLACED').length,
    active: orders.filter(o => ['PREPARING', 'PACKED', 'PICKED_UP'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length,
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Pending Orders</span>
          <div className={styles.statValue}>{stats.pending}</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>In Progress</span>
          <div className={styles.statValue}>{stats.active}</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Completed Today</span>
          <div className={styles.statValue}>{stats.delivered}</div>
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Order List</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'PLACED', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.navLink} ${filter === f ? styles.activeLink : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              {f === 'PLACED' ? 'NEW' : f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-sub)' }}>Loading orders...</td></tr>
            ) : filteredOrders.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-sub)' }}>No orders found</td></tr>
            ) : filteredOrders.map((o) => (
              <tr key={o.id}>
                <td style={{ fontWeight: '700', color: 'var(--admin-accent)' }}>{o.order_number}</td>
                <td>{o.users?.name || 'Customer'}</td>
                <td>{new Date(o.created_at).toLocaleDateString()}</td>
                <td>₹{o.total}</td>
                <td>
                  <span className={`${styles.status} ${
                    o.status === 'DELIVERED' ? styles.statusDelivered : 
                    o.status === 'CANCELLED' ? styles.statusCancelled : 
                    styles.statusPending
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <button className={styles.navLink} style={{ padding: '6px 10px', fontSize: '12px' }}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
