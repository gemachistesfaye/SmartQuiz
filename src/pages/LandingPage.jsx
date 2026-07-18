import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
