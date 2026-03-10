'use client';

import { useState } from 'react';
import styles from '../admin.module.css';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className={styles.adminPage}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Admin Settings</h2>
      </div>

      <div className={styles.section} style={{ display: 'flex', gap: '32px' }}>
        <div style={{ width: '200px' }}>
          {['profile', 'notifications', 'security', 'system'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.navLink} ${activeTab === tab ? styles.activeLink : ''}`}
              style={{ width: '100%', marginBottom: '8px', textTransform: 'capitalize' }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.tableContainer} style={{ flex: 1, padding: '32px' }}>
          {activeTab === 'profile' && (
            <div style={{ maxWidth: '400px' }}>
              <h3 style={{ marginBottom: '24px' }}>Admin Profile</h3>
              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: 'var(--admin-text-sub)', display: 'block', marginBottom: '8px' }}>Display Name</label>
                <input className={styles.navLink} style={{ width: '100%', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)' }} defaultValue="Satvik Master Admin" />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '12px', color: 'var(--admin-text-sub)', display: 'block', marginBottom: '8px' }}>Email Address</label>
                <input className={styles.navLink} style={{ width: '100%', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)' }} defaultValue="admin@satvik.in" readOnly />
              </div>
              <button className={styles.navLink} style={{ background: 'var(--admin-accent)', color: 'white', padding: '10px 20px' }}>Save Changes</button>
            </div>
          )}

          {activeTab !== 'profile' && (
            <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--admin-text-sub)' }}>
              Configuration for {activeTab} will be available in the next update.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
