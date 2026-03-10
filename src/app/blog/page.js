'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { api } from '@/lib/api';
import styles from './blog.module.css';

const bgColors = ['#2D5A3D', '#8B1A2A', '#C05A0A', '#4A6B00', '#6B1827', '#7A5500'];

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const cats = await api.blog.getCategories();
        setCategories(['All', ...cats.map(c => c.name)]);
      } catch (err) {
        console.error('Failed to load blog categories', err);
      }
    }
    init();
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await api.blog.getPosts(active);
        setPosts(data);
      } catch (err) {
        console.error('Failed to load blog posts', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [active]);

  const filtered = posts; // Server already filters if active is set

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
      <div className={styles.listing}>
        <div className={styles.grid}>
          {loading ? (
            <div style={{ color: 'white', textAlign: 'center', gridColumn: '1/-1' }}>Loading Wisdom...</div>
          ) : posts.length > 0 ? (
            posts.map((post, i) => (
              <Link href={`/blog/${post.slug}`} className={styles.card} key={post.slug}>
                <div className={styles.cardTop} style={{ background: bgColors[i % bgColors.length] }}>
                  <span className={styles.cardBadge}>{post.category?.name || post.category}</span>
                  {post.emoji}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardDate}>{post.date} · {post.readTime} read</div>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.readMore}>Read More →</div>
                </div>
              </Link>
            ))
          ) : (
             <div style={{ color: 'white', textAlign: 'center', gridColumn: '1/-1' }}>No articles found for this category.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
