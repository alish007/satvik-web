'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { faqs } from '@/data/faq';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formType, setFormType] = useState('general');
  const [submitted, setSubmitted] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = faqs.filter(
    (f) => faqSearch === '' ||
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.contactPage}>
      <Navbar />
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Get in <em>Touch</em></h1>
        <p className={styles.heroSub}>
          Have questions? We&apos;d love to hear from you. Reach out and we&apos;ll respond within 24 hours.
        </p>
      </div>

      {/* Contact Form + Info */}
      <div className={styles.contactSection}>
        <div className={styles.contactInfo}>
          <h3>Let&apos;s talk</h3>
          <p>Whether you have a question about products, subscriptions, delivery, or wholesale pricing — our team is ready to help.</p>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📞</div>
            <div className={styles.infoText}>
              <h5>Phone</h5>
              <p><a href="tel:+919662209555">+91 9662209555</a></p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📧</div>
            <div className={styles.infoText}>
              <h5>Email</h5>
              <p><a href="mailto:hello@satvik.in">hello@satvik.in</a></p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📍</div>
            <div className={styles.infoText}>
              <h5>Address</h5>
              <p>Surat, Gujarat, India</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📱</div>
            <div className={styles.infoText}>
              <h5>Social</h5>
              <p><a href="#">Instagram @satvik_juice</a></p>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className={styles.typeTabs}>
            <button
              className={`${styles.typeTab} ${formType === 'general' ? styles.typeTabActive : ''}`}
              onClick={() => setFormType('general')}
            >General Inquiry</button>
            <button
              className={`${styles.typeTab} ${formType === 'wholesale' ? styles.typeTabActive : ''}`}
              onClick={() => setFormType('wholesale')}
            >Wholesale</button>
          </div>
          {submitted ? (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}>✅</div>
              <div className={styles.successText}>Message Sent!</div>
              <div className={styles.successSub}>We&apos;ll get back to you within 24 hours.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input className={styles.formInput} placeholder="Your Name *" required />
                </div>
                <div className={styles.formGroup}>
                  <input className={styles.formInput} type="email" placeholder="Email *" required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <input className={styles.formInput} type="tel" placeholder="Phone Number" />
              </div>
              {formType === 'wholesale' && (
                <>
                  <div className={styles.formGroup}>
                    <input className={styles.formInput} placeholder="Business Name" />
                  </div>
                  <div className={styles.formGroup}>
                    <input className={styles.formInput} placeholder="Estimated Order Quantity" />
                  </div>
                </>
              )}
              <div className={styles.formGroup}>
                <textarea
                  className={`${styles.formInput} ${styles.formTextarea}`}
                  placeholder={formType === 'wholesale' ? 'Tell us about your business needs...' : 'Your message...'}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <ScrollReveal><div className="s-eyebrow" style={{ justifyContent: 'center' }}><span>FAQ</span></div></ScrollReveal>
          <ScrollReveal><h2 className="s-title" style={{ textAlign: 'center' }}>Frequently asked <em>questions</em></h2></ScrollReveal>
          <div className={styles.faqSearch}>
            <span className={styles.faqSearchIcon}>🔍</span>
            <input
              className={styles.faqSearchInput}
              placeholder="Search questions..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.faqList}>
          {filteredFaqs.map((faq, i) => (
            <div className={styles.faqItem} key={i}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.question}</span>
                <span className={`${styles.faqArrow} ${openFaq === i ? styles.faqArrowOpen : ''}`}>▼</span>
              </button>
              <div className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text2)' }}>
              No questions found matching &ldquo;{faqSearch}&rdquo;
            </div>
          )}
        </div>
      </section>

      {/* Service Area Map */}
      <section className={styles.mapSection}>
        <ScrollReveal><h2 className="s-title" style={{ textAlign: 'center' }}>Our <em>delivery area</em></h2></ScrollReveal>
        <div className={styles.mapWrap}>
          <p>📍 We deliver across all major areas in Surat, Gujarat</p>
          <div className={styles.pincodeCheck}>
            <input className={styles.pincodeInput} placeholder="Enter your pincode" />
            <button className={styles.pincodeBtn}>Check</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
