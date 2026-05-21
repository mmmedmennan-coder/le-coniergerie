import React from 'react';
import { motion } from 'framer-motion';
import { galleryImages } from '../data';

export const GallerySection = () => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold/80 uppercase tracking-[0.3em] text-[10px] mb-4">L'Art de Vivre</p>
          <h3 className="text-white font-serif text-4xl md:text-5xl">Galerie Prestige</h3>
        </motion.div>

        <div className="grid grid-cols-12 gap-3 auto-rows-[200px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-7 row-span-2 overflow-hidden rounded-2xl group"
          >
            <img
              src={galleryImages[0]}
              alt="Rabat"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-90 group-hover:brightness-100"
            />
          </motion.div>

          {galleryImages.slice(1).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1 }}
              className="col-span-12 md:col-span-5 overflow-hidden rounded-2xl group"
            >
              <img
                src={img}
                alt={`Gallery ${i + 2}`}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-80 group-hover:brightness-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
