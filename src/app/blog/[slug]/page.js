'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { api } from '@/lib/api';
import styles from '../blog.module.css';

const bgColors = ['#2D5A3D', '#8B1A2A', '#C05A0A', '#4A6B00', '#6B1827', '#7A5500'];

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [data, allPosts] = await Promise.all([
          api.blog.getPost(slug),
          api.blog.getPosts()
        ]);
        
        if (!data) return setPost(null);
        
        setPost(data);
        setRelated(allPosts.filter(p => p.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error('Failed to load blog post', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return <div className={styles.postPage}><Navbar /><div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Loading Article...</div><Footer /></div>;
  if (!post) notFound();

  const paragraphs = post.content.split('\n\n');

  return (
    <div className={styles.postPage}>
      <Navbar />
      <div className={styles.postHeader}>
        <div className={styles.postMeta}>
          <span className={styles.postCategory}>{post.category?.name || post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime} read</span>
        </div>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postExcerpt}>{post.excerpt}</p>
      </div>
      <div className={styles.postContent}>
        {paragraphs.map((p, i) => {
          if (p.startsWith('## ')) return <h2 key={i}>{p.replace('## ', '')}</h2>;
          if (p.startsWith('### ')) return <h3 key={i}>{p.replace('### ', '')}</h3>;
          if (p.startsWith('- ')) {
            const items = p.split('\n').map((line) => line.replace(/^- /, ''));
            return <ul key={i}>{items.map((item, j) => <li key={j}>{item.replace(/\*\*(.*?)\*\*/g, '$1')}</li>)}</ul>;
          }
          if (p.match(/^\d\. /)) {
            const items = p.split('\n').map((line) => line.replace(/^\d+\. /, ''));
            return <ol key={i}>{items.map((item, j) => <li key={j}>{item}</li>)}</ol>;
          }
          return <p key={i}>{p}</p>;
        })}
      </div>
      <div className={styles.shareBar}>
        <span className={styles.shareLabel}>Share:</span>
        <button className={styles.shareBtn} onClick={() => navigator.clipboard.writeText(window.location.href)}>📋</button>
        <button className={styles.shareBtn}>🐦</button>
        <button className={styles.shareBtn}>📱</button>
      </div>
      <div className={styles.relatedSection}>
        <h2 className="s-title">More <em>articles</em></h2>
        <div className={styles.relatedGrid}>
          {related.map((r, i) => (
            <Link href={`/blog/${r.slug}`} className={styles.card} key={r.slug}>
              <div className={styles.cardTop} style={{ background: bgColors[i % bgColors.length] }}>
                <span className={styles.cardBadge}>{r.category?.name || r.category}</span>
                {r.emoji}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardDate}>{r.date} · {r.readTime} read</div>
                <h3 className={styles.cardTitle}>{r.title}</h3>
                <p className={styles.cardExcerpt}>{r.excerpt}</p>
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
