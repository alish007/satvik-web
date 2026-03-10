'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        // We'll use the analytics endpoint we created in Phase 3
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/analytics/stats`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const dummyStats = [
    { label: 'Total Revenue', value: '₹4,12,050', change: '+12.5%', up: true },
    { label: 'Active Subscriptions', value: '1,240', change: '+4.2%', up: true },
    { label: 'Orders Today', value: '84', change: '-2.1%', up: false },
    { label: 'Satvik Coins Issued', value: '45,000', change: '+8.0%', up: true },
  ];

  const recentOrders = [
    { id: '#SK-9021', customer: 'Rahul Sharma', amount: '₹850', status: 'Delivered' },
    { id: '#SK-9022', customer: 'Priya Patel', amount: '₹1,240', status: 'Pending' },
    { id: '#SK-9023', customer: 'Ankit Mehta', amount: '₹450', status: 'Pending' },
    { id: '#SK-9024', customer: 'Sneha Gupta', amount: '₹920', status: 'Cancelled' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        {dummyStats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <span className={styles.statLabel}>{stat.label}</span>
            <div className={styles.statValue}>
              {stat.value}
              <span className={`${styles.statChange} ${stat.up ? styles.changeUp : styles.changeDown}`}>
                {stat.up ? '↑' : '↓'} {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <button className={styles.navLink} style={{ fontSize: '12px' }}>View All →</button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: '600' }}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`${styles.status} ${styles[`status${order.status}`]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td><button className={styles.navLink} style={{ fontSize: '12px' }}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
