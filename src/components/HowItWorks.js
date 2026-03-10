'use client';

import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import styles from './HowItWorks.module.css';

const steps = [
  { num: 1, title: 'Download the App', desc: 'Sign up with your phone number. Takes less than 30 seconds.' },
  { num: 2, title: 'Choose Your Juice', desc: 'Pick daily, weekly or monthly. Schedule your time slot.' },
  { num: 3, title: 'We Press It Fresh', desc: 'Your juice is cold-pressed same morning with no ice or preservatives.' },
  { num: 4, title: 'Delivered to Door', desc: 'Track live. Get it at your chosen time, right at your doorstep.' },
];

export default function HowItWorks() {
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
    <section className={`section ${styles.howSection}`} id="about">
      <div style={{ textAlign: 'center', marginBottom: 0 }}>
        <ScrollReveal className="reveal" threshold={0.15}>
          <div className="s-eyebrow" style={{ justifyContent: 'center' }}>
            <span>How It Works</span>
          </div>
        </ScrollReveal>
        <ScrollReveal className="reveal" threshold={0.15}>
          <h2 className="s-title" style={{ textAlign: 'center' }}>
            From tap to <em>your table</em>
          </h2>
        </ScrollReveal>
      </div>
      <div className={`${styles.howGrid} stagger`} ref={gridRef}>
        {steps.map((s) => (
          <div className={styles.howStep} key={s.num}>
            <div className={styles.howNum}>{s.num}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
