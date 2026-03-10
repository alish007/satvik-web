import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Stats from '@/components/Stats';
import JuicesSection from '@/components/JuicesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import HowItWorks from '@/components/HowItWorks';
import Schedule from '@/components/Schedule';
import Testimonials from '@/components/Testimonials';
import AppDownload from '@/components/AppDownload';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <Stats />
      <FeaturedProducts />
      <JuicesSection />
      <HowItWorks />
      <Schedule />
      <Testimonials />
      <AppDownload />
      <Footer />
    </>
  );
}
