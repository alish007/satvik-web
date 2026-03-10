'use client';

import { useState, useEffect, useCallback } from 'react';
import { testimonials } from '@/data/testimonials';
import ScrollReveal from './ScrollReveal';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const maxIndex = Math.max(0, testimonials.length - 3);

  const next = useCallback(() => setCurrent((p) => (p >= maxIndex ? 0 : p + 1)), [maxIndex]);
  const prev = () => setCurrent((p) => (p <= 0 ? maxIndex : p - 1));

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={styles.testimonials}>
      <div className={styles.header}>
        <ScrollReveal>
          <div className="s-eyebrow" style={{ justifyContent: 'center' }}>
            <span>What Our Customers Say</span>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="s-title" style={{ textAlign: 'center' }}>
            Loved by <em>thousands</em> in Surat
          </h2>
        </ScrollReveal>
      </div>
      <div className={styles.carouselWrap}>
        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prev} aria-label="Previous">‹</button>
        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={next} aria-label="Next">›</button>
        <div style={{ overflow: 'hidden' }}>
          <div
            className={styles.carousel}
            style={{ transform: `translateX(-${current * (100 / 3 + 2)}%)` }}
          >
            {testimonials.map((t, i) => (
              <div className={styles.card} key={i}>
                <div className={styles.cardGlow}></div>
                <div className={styles.quoteIcon}>&ldquo;</div>
                <div className={styles.cardTop}>
                  <div className={styles.avatar}>{t.avatar}</div>
                  <div className={styles.authorInfo}>
                    <h4>{t.name}</h4>
                    <span>{t.location}</span>
                  </div>
                </div>
                <div className={styles.stars}>{'★'.repeat(t.rating)}</div>
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.product}>🏷️ {t.product}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.dots}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${current === i ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
