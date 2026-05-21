import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactInfo } from '../data';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Apartment Booking',
    message: ''
  });
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailError(!value ? 'Email requis' : !validateEmail(value) ? 'Email invalide' : '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Veuillez saisir un email valide');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: 'Apartment Booking', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.error || 'Échec de l\'envoi'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Une erreur inattendue est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: Phone, label: 'Appelez-nous', value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MapPin, label: 'Adresse', value: contactInfo.address, href: '#' },
  ];

  return (
    <section id="contact" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold/80 uppercase tracking-[0.3em] text-[10px] mb-4">Contactez-Nous</p>
            <h3 className="text-white font-serif text-4xl md:text-5xl mb-12">
              Parlez à Nos<br />Conciergeurs
            </h3>

            <div className="space-y-10">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors flex-shrink-0">
                    <Icon size={18} className="text-white/50 group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1 font-bold">{label}</p>
                    <p className="text-white text-base font-medium group-hover:text-gold transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-14 pt-10 border-t border-white/5">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-6 font-bold">Réponse garantie en</p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-serif text-3xl text-gold">&lt;2h</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">WhatsApp</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="font-serif text-3xl text-gold">&lt;24h</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-wider mt-1">Email</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5 relative"
          >
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-8 top-8 z-20 bg-gold/10 border border-gold/30 p-4 rounded-xl flex items-center gap-3"
              >
                <CheckCircle className="text-gold flex-shrink-0" size={20} />
                <p className="text-gold text-sm">Votre demande a été envoyée. Nous vous contacterons bientôt.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold px-1 block">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jean Dupont"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Email</label>
                    {emailError && (
                      <span className="text-red-400 text-[10px] flex items-center gap-1">
                        <AlertCircle size={10} /> {emailError}
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jean@exemple.com"
                    className={`w-full bg-black/50 border rounded-xl px-5 py-4 text-white text-sm focus:outline-none transition-colors placeholder:text-white/20 ${emailError ? 'border-red-500/50' : 'border-white/10 focus:border-gold'}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold px-1 block">Sujet</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-gold transition-colors cursor-pointer"
                >
                  <option>Apartment Booking</option>
                  <option>Restaurant Reservation</option>
                  <option>Private Tour Circuit</option>
                  <option>Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold px-1 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Comment pouvons-nous vous aider?"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-white/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !!emailError}
                className="w-full relative group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-gold via-white to-gold rounded-xl blur-[10px] opacity-0 group-hover:opacity-20 transition duration-700" />
                <div className="relative w-full bg-white text-black py-5 rounded-xl text-[11px] uppercase tracking-[0.3em] font-black group-hover:bg-gold group-hover:text-white transition-all flex items-center justify-center gap-3 overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10">{isSubmitting ? 'Envoi en cours...' : 'Envoyer la Demande'}</span>
                  {!isSubmitting && <Send size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                </div>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const navLinks = [
    { name: 'Appartements', href: '#apartments' },
    { name: 'Restaurants', href: '#restaurants' },
    { name: 'Circuits', href: '#circuits' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#080808] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 pb-10 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-gold flex items-center justify-center rounded-full">
              <span className="text-white font-serif text-base">C</span>
            </div>
            <span className="text-white font-serif tracking-widest uppercase text-sm">La Conciergerie Rabat</span>
          </div>

          <div className="flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.name} href={l.href} className="text-white/30 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold">
                {l.name}
              </a>
            ))}
          </div>

          <a
            href="https://wa.me/212719165197"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#25D366] border border-[#25D366]/30 hover:border-[#25D366] px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all"
          >
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} La Conciergerie Rabat. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/20 hover:text-white/40 transition-colors text-[10px] uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-white/20 hover:text-white/40 transition-colors text-[10px] uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
