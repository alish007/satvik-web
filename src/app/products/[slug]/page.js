import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import styles from './detail.module.css';
import cardStyles from '@/components/FeaturedProducts.module.css';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — Satvik`,
    description: product.description,
  };
}

export default async function ProductDetail({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  const badgeClass = {
    'Best Seller': cardStyles.badgeBestSeller,
    'New': cardStyles.badgeNew,
    'Seasonal': cardStyles.badgeSeasonal,
    'Best Value': cardStyles.badgeBestValue,
  };

  return (
    <div className={styles.detailPage}>
      <Navbar />
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link><span>›</span>
        <Link href="/products">Products</Link><span>›</span>
        {product.name}
      </div>
      <div className={styles.detailGrid}>
        <div className={styles.productVisual}>
          <div className={styles.visualBg} style={{ background: product.color }}></div>
          {product.badge && (
            <span className={styles.badgeLarge} style={{ background: product.color }}>
              {product.badge}
            </span>
          )}
          <div className={styles.visualEmoji}>{product.emoji}</div>
        </div>
        <div className={styles.productInfo}>
          <div className={styles.category}>{product.category}</div>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.size}>{product.size}</div>
          <p className={styles.desc}>{product.description}</p>
          <div className={styles.ctaRow}>
            <a href="/download" className="btn-primary">Get on the App ⬇</a>
            <a href="/products" className="btn-secondary">← Browse Products</a>
          </div>
          <div className={styles.sectionLabel}>Ingredients</div>
          <div className={styles.ingredients}>
            {product.ingredients.map((ing, i) => (
              <span className={styles.ingredient} key={i}>{ing}</span>
            ))}
          </div>
          <div className={styles.sectionLabel}>Benefits</div>
          <ul className={styles.benefits}>
            {product.benefits.map((b, i) => (
              <li key={i}>
                <span className={styles.benefitCheck}>✓</span>{b}
              </li>
            ))}
          </ul>
          <div className={styles.sectionLabel}>Nutritional Information</div>
          <table className={styles.nutritionTable}>
            <thead>
              <tr><th>Nutrient</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Calories</td><td>{product.nutrition.calories} kcal</td></tr>
              <tr><td>Protein</td><td>{product.nutrition.protein}</td></tr>
              <tr><td>Fiber</td><td>{product.nutrition.fiber}</td></tr>
              <tr><td>Vitamin C</td><td>{product.nutrition.vitaminC} DV</td></tr>
              <tr><td>Iron</td><td>{product.nutrition.iron} DV</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      {related.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className="s-title">More from <em>{product.category}</em></h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <Link href={`/products/${p.slug}`} className={cardStyles.card} key={p.slug}>
                <div className={cardStyles.cardTop} style={{ background: p.color }}>
                  <div className={cardStyles.cardShine}></div>
                  {p.badge && (
                    <span className={`${cardStyles.badge} ${badgeClass[p.badge] || ''}`}>
                      {p.badge}
                    </span>
                  )}
                  <div className={cardStyles.cardEmoji}>{p.emoji}</div>
                </div>
                <div className={cardStyles.cardBody}>
                  <div className={cardStyles.cardCategory}>{p.category}</div>
                  <div className={cardStyles.cardName}>{p.name}</div>
                  <div className={cardStyles.cardSize}>{p.size}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
