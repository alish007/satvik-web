'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import ScrollReveal from './ScrollReveal';
import styles from './FeaturedProducts.module.css';

const badgeClass = {
  'Best Seller': styles.badgeBestSeller,
  'New': styles.badgeNew,
  'Seasonal': styles.badgeSeasonal,
  'Best Value': styles.badgeBestValue,
};

export default function FeaturedProducts() {
  const [active, setActive] = useState('All');
  const gridRef = useRef(null);

  const filtered = active === 'All'
    ? products.slice(0, 8)
    : products.filter((p) => p.category === active).slice(0, 8);

  useEffect(() => {
    if (gridRef.current) gridRef.current.classList.add('visible');
  }, [active]);

  return (
    <section className={styles.featured}>
      <div className={styles.header}>
        <div>
          <ScrollReveal>
            <div className="s-eyebrow"><span>Our Products</span></div>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="s-title">Nature&apos;s best, <em>delivered fresh</em></h2>
          </ScrollReveal>
        </div>
        <div className={styles.pills}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.pill} ${active === cat ? styles.pillActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className={`${styles.grid} stagger`} ref={gridRef}>
        {filtered.map((p) => (
          <Link href={`/products/${p.slug}`} className={styles.card} key={p.slug}>
            <div className={styles.cardTop} style={{ background: p.color }}>
              <div className={styles.cardShine}></div>
              {p.badge && (
                <span className={`${styles.badge} ${badgeClass[p.badge] || ''}`}>
                  {p.badge}
                </span>
              )}
              <div className={styles.cardEmoji}>{p.emoji}</div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardCategory}>{p.category}</div>
              <div className={styles.cardName}>{p.name}</div>
              <div className={styles.cardSize}>{p.size}</div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link href="/products" className="btn-primary">
          View All Products →
        </Link>
      </div>
    </section>
  );
}
