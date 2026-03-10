'use client';

import { useEffect, useRef } from 'react';
import { juices } from '@/data/juices';
import styles from './JuicesSection.module.css';

export default function JuicesSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.juicesSection} id="juices">
      <div className={styles.juicesHdr}>
        <div>
          <div className={styles.sEyebrow}><span>This Week&apos;s Menu</span></div>
          <h2 className={styles.sTitle}>A different <em>healing juice</em> every day</h2>
        </div>
      </div>
      <div className={`${styles.juicesGrid} stagger`} ref={gridRef}>
        {juices.map((j, i) => (
          <div className={styles.jcard} key={i}>
            <div className={styles.jcardTop} style={{ background: j.color }}>
              <div className={styles.jcardDayLabel}>{j.day}</div>
              <div className={styles.jcardEmoji}>{j.emoji}</div>
            </div>
            <div className={styles.jcardBody}>
              <div className={styles.jcardName}>{j.name}</div>
              <div className={styles.jcardTag}>{j.tag}</div>
              <div className={styles.jcardSize}>{j.size}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
