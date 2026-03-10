import { scheduleItems } from '@/data/schedule';
import ScrollReveal from './ScrollReveal';
import styles from './Schedule.module.css';

export default function Schedule() {
  return (
    <section className="section" id="schedule" style={{ background: 'var(--cream2)' }}>
      <div className={styles.schedSection}>
        <ScrollReveal className="reveal-l">
          <div className={styles.schedPhone}>
            <div className={styles.spHdr}>Your Weekly Schedule 🗓</div>
            {scheduleItems.map((item, i) => (
              <div className={styles.spRow} key={i}>
                <span className={styles.spDay}>{item.day}</span>
                <div className={styles.spProduct}>
                  <span className={styles.spEm}>{item.emoji}</span>
                  <span className={styles.spName}>{item.name}</span>
                </div>
                <span className={`${styles.spStatus} ${styles[item.statusType]}`}>
                  {item.status}
                </span>
              </div>
            ))}
            <div className={styles.spRenew}>
              <span>🔁 Auto-renews weekly · Cancel anytime · Save 15%</span>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal className="reveal-r">
          <div className="s-eyebrow"><span>Smart Scheduling</span></div>
          <h2 className="s-title">Set it once,<br /><em>sip every day</em></h2>
          <div className={styles.textContent}>
            <p>
              Never miss your morning healing juice again. Subscribe daily, weekly or monthly
              and pick your time slot — 6 AM, 7 AM, 8 AM or whenever you want. Satvik handles the rest.
              <br /><br />
              Pause, skip, or swap any delivery with a single tap. Your wellness, perfectly automated.
            </p>
          </div>
          <a href="#app" className="btn-primary">Start Your Schedule</a>
        </ScrollReveal>
      </div>
    </section>
  );
}
