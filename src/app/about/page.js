'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './about.module.css';

const philosophyItems = [
  { icon: '🌱', title: 'Pure & Natural', desc: 'Every product is made from 100% natural ingredients. No preservatives, no chemicals, no shortcuts.' },
  { icon: '🧊', title: 'Cold-Pressed', desc: 'Our hydraulic press method preserves maximum nutrients without heat degradation.' },
  { icon: '🤝', title: 'Farm Direct', desc: 'We partner directly with organic farmers — fair prices for them, fresh produce for you.' },
  { icon: '💚', title: 'Sattvic Living', desc: 'Inspired by Ayurveda, we believe food should be pure, balanced, and life-enhancing.' },
];

const farms = [
  { emoji: '🌾', name: 'Patel Organic Farm', location: '📍 Bardoli, Gujarat', desc: 'Third-generation farm specializing in spinach, carrots, and seasonal greens.' },
  { emoji: '🥕', name: 'Green Valley Farms', location: '📍 Navsari, Gujarat', desc: 'Organic carrot and beetroot specialist, certified pesticide-free since 2018.' },
  { emoji: '🍋', name: 'Dang Forest Co-op', location: '📍 Dang, Gujarat', desc: 'Wild-harvested amla, turmeric, and tulsi from the tribal forests of Dang.' },
];

const sustainability = [
  { value: 92, label: 'Organic Sourcing', desc: '92% of our ingredients are certified organic' },
  { value: 78, label: 'Plastic Reduction', desc: 'Glass bottles & biodegradable packaging' },
  { value: 100, label: 'Zero Waste', desc: 'All pulp is donated to cattle farms' },
  { value: 65, label: 'Carbon Neutral', desc: 'EV delivery fleet expansion underway' },
];

const team = [
  { avatar: '👨‍💼', name: 'Arjun Patel', role: 'Founder & CEO', bio: 'Ex-IIT engineer turned wellness entrepreneur. Started Satvik from his Surat kitchen.' },
  { avatar: '👩‍🔬', name: 'Dr. Meera Shah', role: 'Head of Nutrition', bio: 'Ayurvedic doctor and nutritionist. Designs every juice recipe for maximum healing benefit.' },
  { avatar: '👨‍🌾', name: 'Ramesh Desai', role: 'Farm Relations', bio: 'Visits every partner farm monthly. Ensures quality from soil to bottle.' },
  { avatar: '👩‍💻', name: 'Priti Joshi', role: 'Tech & Operations', bio: 'Builds the app, manages logistics, ensures your juice is at your door on time.' },
];

export default function AboutPage() {
  const sustainRef = useRef(null);

  useEffect(() => {
    const el = sustainRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        el.querySelectorAll('[data-offset]').forEach((circle) => {
          circle.style.strokeDashoffset = circle.dataset.offset;
        });
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={styles.aboutPage}>
      <Navbar />
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Our <em>Story</em></h1>
        <p className={styles.heroSub}>
          From a small kitchen in Surat to thousands of doorsteps — we&apos;re on a mission to make pure, natural nutrition accessible to every family.
        </p>
      </div>

      {/* Brand Story */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <ScrollReveal className="reveal-l">
            <div className={styles.storyVisual}>🌿</div>
          </ScrollReveal>
          <ScrollReveal className="reveal-r">
            <div className={styles.storyTextBlock}>
              <h3>It started with <em>one question</em></h3>
              <p>
                &ldquo;Why can&apos;t we get genuinely pure juice in Surat?&rdquo; — That&apos;s the question our founder Arjun asked in 2023 after discovering that most &ldquo;fresh&rdquo; juices on the market were loaded with preservatives, added sugar, and artificial flavoring.
              </p>
              <p>
                What started as cold-pressing juices in a small apartment kitchen quickly grew into a movement. Today, Satvik delivers hundreds of cold-pressed juices and farm-fresh vegetables to doorsteps across Surat — every single morning, 365 days a year.
              </p>
              <p>
                Our name, &ldquo;Satvik,&rdquo; comes from the Ayurvedic concept of Sattvic food — pure, clean, and life-giving. Every product we create honors this philosophy.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className={styles.philosophySection}>
        <ScrollReveal><div className="s-eyebrow" style={{ justifyContent: 'center' }}><span>Our Philosophy</span></div></ScrollReveal>
        <ScrollReveal><h2 className="s-title" style={{ textAlign: 'center' }}>Four pillars of <em>Satvik</em></h2></ScrollReveal>
        <div className={styles.philGrid}>
          {philosophyItems.map((p, i) => (
            <div className={styles.philCard} key={i}>
              <div className={styles.philIcon}>{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Farm Partners */}
      <section className={styles.farmSection}>
        <ScrollReveal><div className="s-eyebrow"><span>Farm Partners</span></div></ScrollReveal>
        <ScrollReveal><h2 className="s-title">From <em>our farms</em> to your glass</h2></ScrollReveal>
        <div className={styles.farmGrid}>
          {farms.map((f, i) => (
            <div className={styles.farmCard} key={i}>
              <div className={styles.farmCardTop}>{f.emoji}</div>
              <div className={styles.farmCardBody}>
                <h4>{f.name}</h4>
                <div className={styles.farmLocation}>{f.location}</div>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className={styles.mapSection}>
        <ScrollReveal><h2 className="s-title">Our farm <em>network</em></h2></ScrollReveal>
        <div className={styles.mapPlaceholder}>
          📍 Google Maps integration — Bardoli, Navsari, Dang, Gujarat
        </div>
      </section>

      {/* Sustainability */}
      <section className={styles.sustainSection} ref={sustainRef}>
        <ScrollReveal><div className="s-eyebrow" style={{ justifyContent: 'center' }}><span style={{ color: 'rgba(255,255,255,0.65)' }}>Sustainability</span></div></ScrollReveal>
        <ScrollReveal><h2 className="s-title" style={{ color: 'white', textAlign: 'center' }}>Our <em>commitments</em></h2></ScrollReveal>
        <div className={styles.sustainGrid}>
          {sustainability.map((s, i) => {
            const circumference = 220;
            const offset = circumference - (circumference * s.value) / 100;
            return (
              <div className={styles.sustainCard} key={i}>
                <div className={styles.ringWrap}>
                  <svg className={styles.ringSvg} viewBox="0 0 80 80">
                    <circle className={styles.ringBg} cx="40" cy="40" r="35" />
                    <circle
                      className={styles.ringFill}
                      cx="40" cy="40" r="35"
                      style={{ strokeDashoffset: circumference }}
                      data-offset={offset}
                    />
                  </svg>
                  <span className={styles.ringValue}>{s.value}%</span>
                </div>
                <h4>{s.label}</h4>
                <p>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <ScrollReveal><div className="s-eyebrow" style={{ justifyContent: 'center' }}><span>Our Team</span></div></ScrollReveal>
        <ScrollReveal><h2 className="s-title">The people behind <em>Satvik</em></h2></ScrollReveal>
        <div className={styles.teamGrid}>
          {team.map((t, i) => (
            <div className={styles.teamCard} key={i}>
              <div className={styles.teamAvatar}>{t.avatar}</div>
              <h4>{t.name}</h4>
              <div className={styles.teamRole}>{t.role}</div>
              <p>{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
