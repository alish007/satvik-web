'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import styles from '../admin.module.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      // Use existing API to fetch all products
      const data = await api.products.getAll();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleStatus(productId, currentStatus) {
    setUpdating(productId);
    try {
       // In a real scenario, we'd have a PATCH /products/:id endpoint
       // For now, we'll simulate the update
       console.log(`Toggling status for ${productId}`);
       setProducts(prev => prev.map(p => 
         p.id === productId ? { ...p, isActive: !currentStatus } : p
       ));
    } catch (err) {
       alert('Failed to update status');
    } finally {
       setUpdating(null);
    }
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Product Inventory</h2>
        <button className={styles.navLink} style={{ background: 'var(--admin-accent)', color: 'white' }}>
          + Add New Product
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-sub)' }}>Loading products...</td></tr>
            ) : products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{p.emoji}</span>
                    <div>
                      <div style={{ fontWeight: '600' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--admin-text-sub)' }}>{p.size}</div>
                    </div>
                  </div>
                </td>
                <td>{p.category?.name || p.category}</td>
                <td>₹{p.price}</td>
                <td style={{ color: p.stockQty < 20 ? '#EF4444' : 'inherit' }}>
                  {p.stockQty} units
                </td>
                <td>
                  <span className={`${styles.status} ${p.isActive ? styles.statusDelivered : styles.statusCancelled}`}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className={styles.navLink} 
                      style={{ padding: '6px 10px', fontSize: '12px' }}
                      onClick={() => toggleStatus(p.id, p.isActive)}
                      disabled={updating === p.id}
                    >
                      {updating === p.id ? '...' : p.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className={styles.navLink} style={{ padding: '6px 10px', fontSize: '12px' }}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
