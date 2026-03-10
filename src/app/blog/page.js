'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts, blogCategories } from '@/data/blog';
import styles from './blog.module.css';

const bgColors = ['#2D5A3D', '#8B1A2A', '#C05A0A', '#4A6B00', '#6B1827', '#7A5500'];

export default function BlogPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === active);

  return (
    <div className={styles.blogPage}>
      <Navbar />
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Wellness <em>Hub</em></h1>
        <p className={styles.heroSub}>
          Articles on nutrition, Ayurveda, recipes, and seasonal eating — powered by science & ancient wisdom.
        </p>
      </div>
      <div className={styles.filters}>
        {blogCategories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.listing}>
        <div className={styles.grid}>
          {filtered.map((post, i) => (
            <Link href={`/blog/${post.slug}`} className={styles.card} key={post.slug}>
              <div className={styles.cardTop} style={{ background: bgColors[i % bgColors.length] }}>
                <span className={styles.cardBadge}>{post.category}</span>
                {post.emoji}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardDate}>{post.date} · {post.readTime} read</div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.readMore}>Read More →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
