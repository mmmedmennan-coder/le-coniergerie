import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, ArrowUpRight } from 'lucide-react';
import { restaurants } from '../data';
import { RestaurantModal } from './RestaurantModal';

export const RestaurantGrid = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof restaurants[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="restaurants" className="bg-[#111] py-24 px-6 relative overflow-hidden">
      <div className="absolute -right-20 top-0 opacity-[0.022] text-white font-serif text-[22vw] leading-none pointer-events-none uppercase select-none">
        Dining
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-gold/85 uppercase tracking-[0.35em] text-[10px] mb-4 font-semibold">Gastronomie & Expérience</p>
          <h2 className="text-white font-serif text-4xl md:text-5xl font-light">Tables Exclusives</h2>
          <div className="w-20 h-px bg-gold/40 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {restaurants.map((res, index) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              onClick={() => { setSelectedRestaurant(res); setIsModalOpen(true); }}
              className="group relative cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-[5rem_5rem_0_0]">
                <img
                  src={res.image}
                  alt={res.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-55 group-hover:opacity-35 transition-opacity" />
                <div className="absolute inset-0 bg-black/38 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center gap-3 scale-90 group-hover:scale-100 transition-all duration-500">
                    <span className="text-white text-[10px] uppercase tracking-[0.3em] font-black">Voir le Menu</span>
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                      <ArrowUpRight size={13} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.2em] font-bold mb-3">
                  <Utensils size={13} />
                  {res.cuisine}
                </div>
                <h3 className="text-white font-serif text-3xl font-light mb-3 group-hover:text-gold transition-colors leading-snug">
                  {res.name}
                </h3>
                <p className="text-white/40 text-sm mb-7 leading-relaxed line-clamp-2">{res.description}</p>

                <div className="inline-flex items-center gap-3 text-white hover:text-gold transition-colors group/link">
                  <span className="text-[10px] uppercase tracking-[0.28em] font-black border-b border-white/18 pb-0.5 group-hover/link:border-gold transition-colors">
                    Voir l'Expérience
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:border-gold transition-colors">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <RestaurantModal
        restaurant={selectedRestaurant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
