'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';

const stats = [
  { target: 100, label: '% Natural Ingredients', format: (v) => `${v}%` },
  { target: 7, label: 'Weekly Juice Varieties', format: (v) => `${v}` },
  { target: 0, label: 'Preservatives Used', format: (v) => (v === 0 ? 'Zero' : `${v}`) },
  { target: 30, label: 'Min Delivery', format: (v) => `${v} Min` },
];

function AnimatedStat({ target, label, format, inView }) {
  const [current, setCurrent] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || animated.current) return;
    animated.current = true;

    if (target === 0) {
      setCurrent(0);
      return;
    }

    let val = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const timer = setInterval(() => {
      val = Math.min(val + step, target);
      setCurrent(val);
      if (val >= target) clearInterval(timer);
    }, 40);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div>
      <div className={styles.statNum}>{format(current)}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={styles.statsBar} ref={ref}>
      {stats.map((s, i) => (
        <AnimatedStat key={i} {...s} inView={inView} />
      ))}
    </div>
  );
}
