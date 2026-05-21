import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'apartments', 'restaurants', 'circuits', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home', id: 'home' },
    { name: 'Appartements', href: '#apartments', id: 'apartments' },
    { name: 'Restaurants', href: '#restaurants', id: 'restaurants' },
    { name: 'Circuits', href: '#circuits', id: 'circuits' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 ${
        isScrolled
          ? 'py-3 bg-black/85 backdrop-blur-xl border-b border-white/8'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border border-gold flex items-center justify-center rounded-full group-hover:bg-gold/10 transition-colors">
            <span className="text-white font-serif text-xl">C</span>
          </div>
          <span className="text-white font-serif text-base tracking-[0.2em] uppercase hidden sm:block">
            Conciergerie Rabat
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[10px] uppercase tracking-[0.15em] font-medium transition-all relative pb-0.5 ${
                activeSection === link.id
                  ? 'text-gold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold" />
              )}
            </a>
          ))}
          <a
            href="https://wa.me/212719165197"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-black hover:bg-gold hover:text-white transition-all"
          >
            <MessageSquare size={13} />
            Réserver
          </a>
        </div>

        <button
          className="md:hidden text-white p-2 rounded-lg border border-white/10 hover:border-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 flex flex-col p-6 gap-5 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm uppercase tracking-widest transition-colors ${
                activeSection === link.id ? 'text-gold' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://wa.me/212719165197"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm uppercase tracking-widest font-black mt-2"
          >
            <MessageSquare size={16} />
            Réserver sur WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
};
