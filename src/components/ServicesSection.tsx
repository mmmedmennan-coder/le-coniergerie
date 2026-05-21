import React from 'react';
import { motion } from 'framer-motion';
import { Home, Utensils, Map, Clock, Shield, MessageSquare } from 'lucide-react';

const services = [
  {
    icon: Home,
    name: 'Luxury Residences',
    desc: 'Hand-picked apartments and penthouses in Rabat\'s most exclusive neighborhoods, fully serviced and ready to welcome you.'
  },
  {
    icon: Utensils,
    name: 'Fine Dining',
    desc: 'Priority reservations at Rabat\'s top restaurants, with curated recommendations tailored to your palate and occasion.'
  },
  {
    icon: Map,
    name: 'Private Circuits',
    desc: 'Exclusive guided tours of Morocco\'s imperial cities and natural wonders, in comfort and with expert multilingual guides.'
  },
  {
    icon: Clock,
    name: '24/7 Concierge',
    desc: 'Round-the-clock personal assistance. From airport transfers to last-minute requests — we are always here for you.'
  },
  {
    icon: Shield,
    name: 'VIP Security',
    desc: 'Complete discretion and security for all our clients. Your privacy and safety are our highest priority at all times.'
  },
  {
    icon: MessageSquare,
    name: 'Instant Booking',
    desc: 'Seamless reservations via WhatsApp or email, with confirmed bookings in under 2 hours for all services.'
  },
];

export const ServicesSection = () => {
  return (
    <section className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-gold/80 uppercase tracking-[0.3em] text-[10px] mb-4">Notre Expertise</p>
          <h3 className="text-white font-serif text-4xl md:text-5xl">Services Sur Mesure</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/5 rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="p-8 border-b border-r border-white/5 hover:bg-gold/[0.03] transition-colors group"
            >
              <div className="w-12 h-12 border border-gold/25 rounded-xl flex items-center justify-center mb-6 group-hover:border-gold/50 transition-colors">
                <s.icon size={20} className="text-gold/70 group-hover:text-gold transition-colors" />
              </div>
              <h4 className="text-white font-serif text-xl mb-3">{s.name}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
