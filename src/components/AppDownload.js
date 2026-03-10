import ScrollReveal from './ScrollReveal';
import styles from './AppDownload.module.css';

const phoneItems = [
  { emoji: '🥬', name: 'Green Detox' },
  { emoji: '🍅', name: 'Veg Elixir' },
  { emoji: '🥥', name: 'Coconut Water' },
  { emoji: '🥦', name: 'Veggie Bundle' },
];

export default function AppDownload() {
  return (
    <section className={styles.appSection} id="app">
      <div className={styles.appText}>
        <ScrollReveal>
          <div className={styles.sEyebrow}><span>Get the App</span></div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className={styles.sTitle}>
            Your wellness shop,<br /><em>always in your pocket</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className={styles.sBody}>
            Order on-demand, schedule recurring deliveries, track live, and manage everything.
            Free to download for iOS &amp; Android.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div className={styles.storeBtns}>
            <a href="#" className={styles.storeBtn}>
              <span className={styles.storeBtnIcon}>🍎</span>
              <div>
                <div className={styles.storeBtnLabel}>Download on the</div>
                <div className={styles.storeBtnName}>App Store</div>
              </div>
            </a>
            <a href="#" className={styles.storeBtn}>
              <span className={styles.storeBtnIcon}>▶</span>
              <div>
                <div className={styles.storeBtnLabel}>Get it on</div>
                <div className={styles.storeBtnName}>Google Play</div>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
      <div className={styles.appPhoneWrap}>
        <div className={styles.appPhone}>
          <div className={styles.appPhNotch}></div>
          <div className={styles.appPhLogo}>Satvik<span>.</span></div>
          <div className={styles.appPhBanner}>🌅 Your Green Detox is being pressed</div>
          {phoneItems.map((item, i) => (
            <div className={styles.appPhItem} key={i}>
              <span>{item.emoji}</span>
              <span className={styles.appPhItemName}>{item.name}</span>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
