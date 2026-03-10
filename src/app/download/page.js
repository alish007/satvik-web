import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './download.module.css';

export const metadata = {
  title: 'Download the Satvik App — iOS & Android',
  description: 'Download the Satvik app for fresh cold-pressed juices and farm-fresh vegetables delivered daily in Surat.',
};

const features = [
  { icon: '📦', title: 'One-Tap Ordering', desc: 'Browse, select, and order your favorite juices and veggies in seconds.' },
  { icon: '📅', title: 'Smart Subscriptions', desc: 'Set up daily, weekly, or monthly deliveries. Pause or modify anytime.' },
  { icon: '🚚', title: 'Live Tracking', desc: 'Track your delivery in real-time. Know exactly when your juice arrives.' },
  { icon: '💳', title: 'Easy Payments', desc: 'Pay via UPI, cards, wallets, or cash on delivery. Your choice.' },
  { icon: '🔔', title: 'Smart Notifications', desc: 'Get notified when your juice is being pressed, out for delivery, and delivered.' },
  { icon: '📊', title: 'Wellness Dashboard', desc: 'Track your nutrition intake, streak, and see personalized recommendations.' },
];

const steps = [
  { num: 1, title: 'Download', desc: 'Get the app from App Store or Google Play' },
  { num: 2, title: 'Sign Up', desc: 'Enter your phone number — takes 30 seconds' },
  { num: 3, title: 'Choose Plan', desc: 'Pick daily juices, combos, or veggies' },
  { num: 4, title: 'Enjoy Fresh', desc: 'Fresh delivery every morning at your door' },
];

const phoneItems = [
  { emoji: '🥬', name: 'Green Detox' },
  { emoji: '🍅', name: 'Veg Elixir' },
  { emoji: '🥥', name: 'Coconut Water' },
  { emoji: '🔥', name: 'Turmeric Shot' },
  { emoji: '🥦', name: 'Veggie Box' },
];

export default function DownloadPage() {
  return (
    <div className={styles.downloadPage}>
      <Navbar />

      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Fresh wellness,<br /><em>in your pocket</em>
          </h1>
          <p className={styles.heroSub}>
            Order cold-pressed juices & farm-fresh veggies, set up subscriptions, track deliveries, and manage your wellness — all from one beautiful app.
          </p>
          <div className={styles.storeBtns}>
            <a href="#" className={styles.storeBtn}>
              <span className={styles.storeBtnIcon}>🍎</span>
              <div><div className={styles.storeBtnLabel}>Download on the</div><div className={styles.storeBtnName}>App Store</div></div>
            </a>
            <a href="#" className={styles.storeBtn}>
              <span className={styles.storeBtnIcon}>▶</span>
              <div><div className={styles.storeBtnLabel}>Get it on</div><div className={styles.storeBtnName}>Google Play</div></div>
            </a>
          </div>
        </div>
        <div className={styles.heroPhone}>
          <div className={styles.phoneMock}>
            <div className={styles.phoneNotch}></div>
            <div className={styles.phoneLogo}>Satvik<span>.</span></div>
            <div className={styles.phoneBanner}>🌅 Your Green Detox is being pressed</div>
            {phoneItems.map((item, i) => (
              <div className={styles.phoneItem} key={i}>
                <span>{item.emoji}</span>
                <span className={styles.phoneItemName}>{item.name}</span>
                <span className={styles.phoneItemPrice}>{item.price}</span>
              </div>
            ))}
            <div className={styles.phoneNav}>
              <span>🏠</span><span>🔍</span><span>📦</span><span>👤</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <ScrollReveal><div className="s-eyebrow" style={{ justifyContent: 'center' }}><span>App Features</span></div></ScrollReveal>
        <ScrollReveal><h2 className="s-title" style={{ textAlign: 'center' }}>Everything you need, <em>one tap away</em></h2></ScrollReveal>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div className={styles.featureCard} key={i}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QR Code */}
      <section className={styles.qrSection}>
        <ScrollReveal><h2 className="s-title" style={{ textAlign: 'center' }}>Scan to <em>download</em></h2></ScrollReveal>
        <div className={styles.qrBox}>
          <div className={styles.qrPlaceholder}>
            <div className={styles.qrScan}></div>
            <div className={styles.qrInner}>QR Code<br />Scan with your camera</div>
          </div>
          <div className={styles.qrLabel}>Works on iOS & Android</div>
        </div>
      </section>

      {/* Setup Steps */}
      <section className={styles.stepsSection}>
        <ScrollReveal><div className="s-eyebrow" style={{ justifyContent: 'center' }}><span>Getting Started</span></div></ScrollReveal>
        <ScrollReveal><h2 className="s-title" style={{ textAlign: 'center' }}>Up and running in <em>2 minutes</em></h2></ScrollReveal>
        <div className={styles.stepsGrid}>
          {steps.map((s) => (
            <div className={styles.step} key={s.num}>
              <div className={styles.stepNum}>{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
