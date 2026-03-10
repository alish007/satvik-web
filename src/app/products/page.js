'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, categories } from '@/data/products';
import BulkOrderForm from '@/components/BulkOrderForm';
import styles from './products.module.css';
import cardStyles from '@/components/FeaturedProducts.module.css';

const badgeClass = {
  'Best Seller': cardStyles.badgeBestSeller,
  'New': cardStyles.badgeNew,
  'Seasonal': cardStyles.badgeSeasonal,
  'Best Value': cardStyles.badgeBestValue,
};

export default function ProductsPage() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const gridRef = useRef(null);

  const filtered = products
    .filter((p) => active === 'All' || p.category === active)
    .filter((p) =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase()))
    );

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.classList.remove('visible');
      requestAnimationFrame(() => gridRef.current?.classList.add('visible'));
    }
  }, [active, search]);

  return (
    <div className={styles.productsPage}>
      <Navbar />
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Our <em>Products</em></h1>
        <p className={styles.heroSub}>
          Cold-pressed juices, wellness shots, farm-fresh vegetables, and curated combos — all delivered fresh to your door.
        </p>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search juices, vegetables, combos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.filters}>
        <div className={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.catalog}>
        <div className={`${styles.catalogGrid} stagger visible`} ref={gridRef}>
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <Link href={`/products/${p.slug}`} className={cardStyles.card} key={p.slug}>
                <div className={cardStyles.cardTop} style={{ background: p.color }}>
                  <div className={cardStyles.cardShine}></div>
                  {p.badge && (
                    <span className={`${cardStyles.badge} ${badgeClass[p.badge] || ''}`}>
                      {p.badge}
                    </span>
                  )}
                  <div className={cardStyles.cardEmoji}>{p.emoji}</div>
                </div>
                <div className={cardStyles.cardBody}>
                  <div className={cardStyles.cardCategory}>{p.category}</div>
                  <div className={cardStyles.cardName}>{p.name}</div>
                  <div className={cardStyles.cardSize}>{p.size}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.noResults}>No products found matching &ldquo;{search}&rdquo;</div>
          )}
        </div>
      </div>
      <div className={styles.bulkSection} id="bulk">
        <h2 className={styles.bulkTitle}>Need Bulk / Wholesale Orders?</h2>
        <p className={styles.bulkSub}>
          We supply fresh juices and vegetables to offices, gyms, yoga studios, and events across Surat.
        </p>
        <BulkOrderForm />
      </div>
      <Footer />
    </div>
  );
}
