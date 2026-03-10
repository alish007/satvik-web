import styles from './Ticker.module.css';

const items = [
  'Cold Pressed', 'No Preservatives', 'Ayurvedic Herbs', 'Farm Fresh Daily',
  'Home Delivery', 'Surat, Gujarat', 'Subscribe Weekly', 'Pure Natural',
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className={styles.ticker}>
      <div className={styles.tickerInner}>
        {doubled.map((text, i) => (
          <div className={styles.tickerItem} key={i}>
            <div className={styles.tickerDot}></div>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
