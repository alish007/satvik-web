'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '../admin.module.css';

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartners();
  }, []);

  async function loadPartners() {
    try {
      const { data, error } = await supabase
        .from('delivery_partners')
        .select(`
          id,
          vehicle_type,
          vehicle_number,
          is_verified,
          is_online,
          total_deliveries,
          total_earnings,
          users ( name, phone )
        `);

      if (error) throw error;
      setPartners(data);
    } catch (err) {
      console.error('Failed to load partners', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Delivery Fleet</h2>
        <button className={styles.navLink} style={{ background: 'var(--admin-accent)', color: 'white' }}>
          + Onboard Partner
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Partner Name</th>
              <th>Vehicle</th>
              <th>Stats</th>
              <th>Earnings</th>
              <th>Status</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-sub)' }}>Loading fleet data...</td></tr>
            ) : partners.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-sub)' }}>No partners registered</td></tr>
            ) : partners.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontWeight: '600' }}>{p.users?.name || 'Partner'}</div>
                  <div style={{ fontSize: '11px', color: 'var(--admin-text-sub)' }}>{p.users?.phone}</div>
                </td>
                <td>
                  <div style={{ fontSize: '13px' }}>{p.vehicle_type}</div>
                  <div style={{ fontSize: '11px', color: 'var(--admin-text-sub)' }}>{p.vehicle_number}</div>
                </td>
                <td>
                  <div style={{ fontSize: '13px' }}>{p.total_deliveries} trips</div>
                </td>
                <td style={{ fontWeight: '700', color: 'var(--admin-accent)' }}>
                  ₹{p.total_earnings.toLocaleString()}
                </td>
                <td>
                  <span className={`${styles.status} ${p.is_online ? styles.statusDelivered : styles.statusPending}`}>
                    {p.is_online ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td>
                   <span className={`${styles.status} ${p.is_verified ? styles.statusDelivered : styles.statusCancelled}`}>
                    {p.is_verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
