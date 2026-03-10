import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}></div>
      <div className={styles.heroDots}></div>
      <div className={styles.heroText}>
        <div className={styles.eyebrow}>
          <span>🌿 Surat, Gujarat · Daily Delivery</span>
        </div>
        <h1 className={styles.heroTitle}>
          Cold-pressed.<br />
          Farm-fresh.<br />
          <em>At your door.</em>
        </h1>
        <p className={styles.heroSub}>
          Pure natural juices and organic vegetables — pressed fresh every morning
          and delivered to your doorstep in Surat. No preservatives. No ice. Just nature.
        </p>
        <div className={styles.heroActs}>
          <a href="#app" className="btn-primary">⬇ Download Satvik App</a>
          <a href="#juices" className="btn-secondary">View This Week&apos;s Juices</a>
        </div>
        <div className={styles.heroTrust}>
          <div className={styles.trustItem}><span>✓</span><span>100% Natural</span></div>
          <div className={styles.trustItem}><span>✓</span><span>No Preservatives</span></div>
          <div className={styles.trustItem}><span>✓</span><span>Daily Delivery</span></div>
          <div className={styles.trustItem}><span>✓</span><span>Cold Pressed</span></div>
        </div>
      </div>
      <div className={styles.heroVisual}>
        <div className={styles.juiceShowcase}>
          <div className={styles.orbitItem}>🥬</div>
          <div className={styles.orbitItem}>🍅</div>
          <div className={styles.orbitItem}>🫚</div>
          <div className={styles.orbitItem}>🍋</div>
          <div className={styles.orbitItem}>🥕</div>
          <div className={styles.orbitItem}>🫐</div>
          <div className={styles.bottleCenter}>🥤</div>
          <div className={styles.pillFloat}><span>⭐</span><span>100% Natural · Zero Preservatives</span></div>
          <div className={styles.pillFloat}><span>🔄</span><span>Subscribe Weekly · Save 15%</span></div>
        </div>
      </div>
    </section>
  );
}
