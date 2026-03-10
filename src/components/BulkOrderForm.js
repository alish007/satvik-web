'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import styles from './BulkOrderForm.module.css';

export default function BulkOrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      type: 'WHOLESALE',
      message: `Business: ${formData.get('business')}. Quantity: ${formData.get('quantity')}. Requirements: ${formData.get('requirements')}`,
    };

    try {
      await api.contact.submit(data);
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.bulkForm}>
        <div className={styles.successMsg}>
          <div className={styles.successIcon}>✅</div>
          <div className={styles.successText}>Inquiry Submitted!</div>
          <div className={styles.successSub}>
            Our team will get back to you within 24 hours.
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.bulkForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <input className={styles.formInput} name="name" placeholder="Your Name *" required />
        </div>
        <div className={styles.formGroup}>
          <input className={styles.formInput} name="business" placeholder="Business Name" />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <input className={styles.formInput} name="email" type="email" placeholder="Email Address *" required />
        </div>
        <div className={styles.formGroup}>
          <input className={styles.formInput} name="phone" type="tel" placeholder="Phone Number *" required />
        </div>
      </div>
      <div className={styles.formGroup}>
        <input className={styles.formInput} name="quantity" placeholder="Estimated Quantity (e.g., 50 juices/day)" />
      </div>
      <div className={styles.formGroup}>
        <textarea
          className={`${styles.formInput} ${styles.formTextarea}`}
          name="requirements"
          placeholder="Tell us about your requirements..."
        />
      </div>
      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Wholesale Inquiry →'}
      </button>
    </form>
  );
}
