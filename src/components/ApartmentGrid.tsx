import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Bed, Bath, ArrowUpRight } from 'lucide-react';
import { apartments } from '../data';
import { PropertyModal } from './PropertyModal';

export const ApartmentGrid = () => {
  const [selectedApartment, setSelectedApartment] = useState<typeof apartments[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="apartments" className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-gold/85 uppercase tracking-[0.35em] text-[10px] mb-4 font-semibold">Collection Résidentielle</p>
            <h2 className="text-white font-serif text-4xl md:text-5xl font-light">Penthouses &amp;<br/>Appartements de Luxe</h2>
          </div>
          <p className="text-white/38 max-w-xs text-sm leading-relaxed">
            Résidences d'exception dans les quartiers les plus exclusifs de Rabat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {apartments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => { setSelectedApartment(apt); setIsModalOpen(true); }}
              whileHover={{ y: -8 }}
              className="group flex flex-col bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-gold/25 transition-all duration-500 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={apt.image}
                  alt={apt.name}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/42 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-3 scale-90 group-hover:scale-100 transition-transform duration-500">
                    <span className="text-white text-[10px] uppercase tracking-[0.3em] font-black">Explorer la Suite</span>
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                      <ArrowUpRight size={13} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-3.5 right-3.5 bg-black/65 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/8">
                  <span className="text-white text-[11px] font-bold">{apt.price}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-white/38 text-[10px] uppercase tracking-widest mb-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  {apt.location}
                </div>
                <h3 className="text-white font-serif text-xl font-light mb-3 group-hover:text-gold transition-colors leading-snug">
                  {apt.name}
                </h3>
                <p className="text-white/42 text-sm mb-6 line-clamp-2 leading-relaxed">{apt.description}</p>

                <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white/30">
                    <div className="flex items-center gap-1.5 text-xs"><Bed size={13} /><span>{apt.beds}</span></div>
                    <div className="flex items-center gap-1.5 text-xs"><Bath size={13} /><span>{apt.baths}</span></div>
                    <div className="flex items-center gap-1.5 text-xs"><Maximize2 size={13} /><span>{apt.sqm}m²</span></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/38 group-hover:text-gold transition-colors">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Découvrir</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PropertyModal property={selectedApartment} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
