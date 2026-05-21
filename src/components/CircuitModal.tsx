import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, CheckCircle2, MessageSquare, Compass, Calendar } from 'lucide-react';

interface Circuit {
  id: string;
  name: string;
  duration: string;
  price: string;
  image: string;
  images?: string[];
  features?: string[];
  stops: string[];
  description: string;
}

interface CircuitModalProps {
  circuit: Circuit | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CircuitModal = ({ circuit, isOpen, onClose }: CircuitModalProps) => {
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

  if (!circuit) return null;

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
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/5"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-[1001] bg-black/50 backdrop-blur-xl p-3 rounded-full text-white/50 hover:text-white transition-all border border-white/10"
            >
              <X size={20} />
            </button>

            {/* Visuals - Vertical Stack */}
            <div className="w-full lg:w-[45%] h-[400px] lg:h-auto overflow-y-auto custom-scrollbar bg-black p-4 space-y-4">
              {circuit.images ? circuit.images.map((img, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="rounded-3xl overflow-hidden shadow-lg border border-white/5"
                >
                  <img
                    src={img}
                    alt={`${circuit.name} view ${i + 1}`}
                    className="w-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>
              )) : (
                <img src={circuit.image} alt={circuit.name} className="w-full rounded-2xl" />
              )}
            </div>

            {/* Details */}
            <div className="w-full lg:w-[55%] p-10 lg:p-16 overflow-y-auto">
              <div className="flex items-center gap-3 text-gold text-[10px] uppercase tracking-[0.4em] font-black mb-8 px-1">
                <Compass size={14} className="animate-spin-slow" />
                Exclusive Discoveries
              </div>

              <h2 className="text-white font-serif text-5xl md:text-6xl mb-8 leading-[1.1]">
                {circuit.name}
              </h2>

              <div className="flex flex-wrap gap-8 mb-12 border-y border-white/5 py-8">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold">
                      <Clock size={16} />
                   </div>
                   <div>
                      <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-0.5">Duration</p>
                      <p className="text-white text-sm font-medium">{circuit.duration}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold">
                      <Calendar size={16} />
                   </div>
                   <div>
                      <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-0.5">Availability</p>
                      <p className="text-white text-sm font-medium">Daily Private</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 ml-auto">
                   <span className="text-white text-2xl font-serif">{circuit.price}</span>
                </div>
              </div>

              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-12 font-light">
                {circuit.description}
              </p>

              <div className="mb-12">
                 <h3 className="text-white text-[10px] uppercase tracking-[0.4em] font-black mb-6">Planned Stops</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {circuit.stops.map((stop, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] font-black">
                           {i + 1}
                        </div>
                        <span className="text-white/70 text-xs font-medium">{stop}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div>
                <h3 className="text-white text-[10px] uppercase tracking-[0.4em] font-black mb-6">Premium Inclusions</h3>
                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12">
                   {circuit.features?.map((feature, i) => (
                     <div key={i} className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
                       <CheckCircle2 size={14} className="text-[#25D366]" />
                       {feature}
                     </div>
                   ))}
                </div>
              </div>

              {/* Reservation Button - Modern WhatsApp Style */}
              <div className="pt-8 mt-12 border-t border-white/5">
                <a
                  href={`https://wa.me/212719165197?text=Hello, I'd like to book the ${circuit.name} tour.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative group block overflow-hidden rounded-2xl"
                >
                  {/* Pulsing Background Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold via-[#25D366] to-gold rounded-2xl blur-[15px] opacity-20 group-hover:opacity-100 group-hover:blur-[30px] transition-all duration-1000 animate-pulse"></div>
                  
                  <div className="relative flex items-center justify-center gap-4 py-8 bg-black rounded-2xl text-white text-[11px] md:text-xs uppercase tracking-[0.4em] font-black border border-white/10 group-hover:border-white/40 transition-all duration-500 overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    
                    <span className="relative z-10">Secure Your Private Experience</span>
                    <div className="relative z-10 w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-500 shadow-[0_0_25px_rgba(37,211,102,0.4)] transform group-hover:scale-110 group-hover:rotate-[360deg]">
                      <MessageSquare size={22} className="text-[#25D366] group-hover:text-white transition-colors" fill="currentColor" />
                    </div>
                  </div>
                </a>
                <p className="text-center mt-4 text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold">Priority Group VIP Service</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
