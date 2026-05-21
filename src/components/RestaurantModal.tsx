import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Utensils, MapPin, CheckCircle2, MessageSquare, Star, Clock } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  images?: string[];
  features?: string[];
  description: string;
  location: string;
}

interface RestaurantModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RestaurantModal = ({ restaurant, isOpen, onClose }: RestaurantModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!restaurant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/5"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-8 z-[1001] text-white/50 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            {/* Visuals - Masonry-like grid or horizontal scroll */}
            <div className="w-full lg:w-1/2 h-[350px] lg:h-auto relative bg-black overflow-y-auto custom-scrollbar p-3">
              <div className="grid grid-cols-2 gap-3">
                 {restaurant.images ? restaurant.images.map((img, i) => (
                   <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                     <img
                       src={img}
                       alt={`${restaurant.name} ${i + 1}`}
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                     />
                   </div>
                 )) : (
                   <img src={restaurant.image} alt={restaurant.name} className="w-full col-span-2 rounded-2xl" />
                 )}
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 p-8 md:p-14 overflow-y-auto">
              <div className="uppercase tracking-[0.4em] text-[10px] text-gold font-black mb-6 flex items-center gap-2">
                <Utensils size={14} />
                {restaurant.cuisine}
              </div>

              <h2 className="text-white font-serif text-4xl md:text-5xl mb-6">
                {restaurant.name}
              </h2>

              <div className="flex items-center gap-6 mb-8 text-white/40 text-xs">
                <div className="flex items-center gap-2">
                   <MapPin size={14} className="text-gold" />
                   {restaurant.location}
                </div>
                <div className="flex items-center gap-2">
                   <Clock size={14} className="text-gold" />
                   19:00 - 01:00
                </div>
              </div>

              <p className="text-white/60 leading-relaxed mb-10 text-lg">
                {restaurant.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12">
                {restaurant.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/40 text-sm border-b border-white/5 pb-3">
                    <CheckCircle2 size={16} className="text-gold" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-white/5 flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em]">Gastronomic Service</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < 5 ? "#D4AF37" : "none"} className={i < 5 ? "text-gold" : "text-white/10"} />
                        ))}
                      </div>
                      <span className="text-white text-xs font-bold tracking-widest">5.0 / 5.0</span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-3 px-5 py-2 rounded-full bg-gold/10 border border-gold/20">
                     <span className="text-gold text-[10px] uppercase font-black tracking-widest">Michelin Standard</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/212719165197?text=Table for 2 at ${restaurant.name} please`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative group block overflow-hidden rounded-2xl"
                >
                  {/* Pulsing Background Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold via-[#25D366] to-gold rounded-2xl blur-[12px] opacity-20 group-hover:opacity-100 group-hover:blur-[25px] transition-all duration-1000 animate-pulse"></div>
                  
                  <div className="relative flex items-center justify-center gap-4 py-8 bg-black rounded-2xl text-white text-[11px] md:text-xs uppercase tracking-[0.4em] font-black border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    
                    <span className="relative z-10">Confirm Reservation</span>
                    <div className="relative z-10 w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-500 shadow-[0_0_20px_rgba(37,211,102,0.3)] transform group-hover:scale-110 group-hover:rotate-[360deg]">
                      <MessageSquare size={20} className="text-[#25D366] group-hover:text-white transition-colors" fill="currentColor" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
