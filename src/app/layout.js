import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Satvik — Pure • Natural',
  description:
    'Pure natural juices and organic vegetables — pressed fresh every morning and delivered to your doorstep in Surat. No preservatives. No ice. Just nature.',
  openGraph: {
    title: 'Satvik — Pure • Natural',
    description:
      'Cold-pressed juices and farm-fresh vegetables delivered daily in Surat, Gujarat.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <body style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
