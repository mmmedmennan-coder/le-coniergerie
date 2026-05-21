import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data';

export const TestimonialsSection = () => {
  return (
    <section className="bg-[#111] py-24 px-6 relative overflow-hidden">
      <div className="absolute -left-20 top-0 opacity-[0.02] text-white font-serif text-[22vw] leading-none pointer-events-none uppercase select-none">
        Avis
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold/80 uppercase tracking-[0.3em] text-[10px] mb-4">Nos Clients Parlent</p>
          <h3 className="text-white font-serif text-4xl md:text-5xl">Témoignages d'Excellence</h3>
          <div className="w-20 h-px bg-gold/40 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/60 border border-white/5 rounded-2xl p-8 hover:border-gold/20 transition-all group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="font-serif text-lg italic text-white/80 leading-relaxed mb-8">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider">{t.country} · {t.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
