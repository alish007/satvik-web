'use client';

import { useState } from 'react';
import styles from './BulkOrderForm.module.css';

export default function BulkOrderForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
          <input className={styles.formInput} placeholder="Your Name *" required />
        </div>
        <div className={styles.formGroup}>
          <input className={styles.formInput} placeholder="Business Name" />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <input className={styles.formInput} type="email" placeholder="Email Address *" required />
        </div>
        <div className={styles.formGroup}>
          <input className={styles.formInput} type="tel" placeholder="Phone Number *" required />
        </div>
      </div>
      <div className={styles.formGroup}>
        <input className={styles.formInput} placeholder="Estimated Quantity (e.g., 50 juices/day)" />
      </div>
      <div className={styles.formGroup}>
        <textarea
          className={`${styles.formInput} ${styles.formTextarea}`}
          placeholder="Tell us about your requirements..."
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        Submit Wholesale Inquiry →
      </button>
    </form>
  );
}
