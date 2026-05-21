import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { circuits } from '../data';
import { CircuitModal } from './CircuitModal';

export const CircuitSection = () => {
  const [selectedCircuit, setSelectedCircuit] = useState<typeof circuits[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="circuits" className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-right"
        >
          <p className="text-gold/85 uppercase tracking-[0.35em] text-[10px] mb-4 font-semibold">Voyages sur Mesure</p>
          <h2 className="text-white font-serif text-4xl md:text-5xl font-light">Circuits Exclusifs</h2>
        </motion.div>

        <div className="space-y-32">
          {circuits.map((circuit, index) => (
            <div
              key={circuit.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
            >
              {/* Image block */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
                onClick={() => { setSelectedCircuit(circuit); setIsModalOpen(true); }}
                className="w-full lg:w-1/2 cursor-pointer"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 border border-gold/20 rounded-2xl group-hover:inset-0 transition-all duration-500" />
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <img
                      src={circuit.image}
                      alt={circuit.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                      <div className="px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center gap-4 scale-90 group-hover:scale-100 transition-all duration-500">
                        <span className="text-white text-[10px] uppercase tracking-[0.4em] font-black">Voir le Voyage</span>
                        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                          <ArrowUpRight size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
                    <span className="text-gold font-serif text-xl font-semibold">{circuit.price}</span>
                  </div>
                </div>
              </motion.div>

              {/* Text block */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
                className="w-full lg:w-1/2 space-y-6"
              >
                <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <span className="flex items-center gap-2"><Clock size={13} />{circuit.duration}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>Tour Privé</span>
                </div>

                <h3 className="text-white font-serif text-4xl font-light leading-snug">{circuit.name}</h3>
                <p className="text-white/48 text-sm leading-relaxed max-w-lg">{circuit.description}</p>

                <div className="space-y-3 pt-2">
                  <p className="text-white/28 text-[10px] uppercase tracking-[0.3em] font-black">Points Forts</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {circuit.stops.map((stop, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 text-white/42 text-[11px]">
                        <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                        <span className="uppercase tracking-wider">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => { setSelectedCircuit(circuit); setIsModalOpen(true); }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="bg-white text-black px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.22em] font-black group-hover:bg-gold group-hover:text-white transition-all group-hover:-translate-y-1 transform duration-300">
                      Explorer les Détails
                    </span>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                      <ArrowUpRight size={18} className="text-white/30 group-hover:text-gold transition-colors" />
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <CircuitModal
        circuit={selectedCircuit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
