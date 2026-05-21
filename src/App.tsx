import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { ApartmentGrid } from './components/ApartmentGrid';
import { RestaurantGrid } from './components/RestaurantGrid';
import { CircuitSection } from './components/CircuitSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactForm, Footer } from './components/ContactSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

function App() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden selection:bg-gold selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <ApartmentGrid />
        <RestaurantGrid />
        <CircuitSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default App;
