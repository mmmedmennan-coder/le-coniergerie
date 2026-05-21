import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bed, Bath, Maximize2, MapPin, CheckCircle2, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface Apartment {
  id: string;
  name: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
  image: string;
  images?: string[];
  features?: string[];
  description: string;
  location: string;
}

interface PropertyModalProps {
  property: Apartment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyModal = ({ property, isOpen, onClose }: PropertyModalProps) => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; setActiveImg(0); }
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!property) return null;
  const imgs = property.images || [property.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/92 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/8"
          >
            <button onClick={onClose}
              className="absolute top-5 right-5 z-50 w-9 h-9 bg-black/70 backdrop-blur-md rounded-full text-white/60 hover:text-white flex items-center justify-center border border-white/10 transition-all">
              <X size={18} />
            </button>

            {/* Gallery */}
            <div className="w-full md:w-[55%] relative bg-black flex-shrink-0">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={imgs[activeImg]}
                    alt={property.name}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {imgs.length > 1 && (
                  <>
                    <button onClick={() => setActiveImg(i => (i - 1 + imgs.length) % imgs.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-gold transition-colors">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => setActiveImg(i => (i + 1) % imgs.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-gold transition-colors">
                      <ChevronRight size={18} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {imgs.map((_, i) => (
                        <button key={i} onClick={() => setActiveImg(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImg ? 'bg-gold w-4' : 'bg-white/40'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-[45%] p-8 md:p-10 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.22em] font-bold mb-3">
                  <MapPin size={13} />{property.location}
                </div>
                <h2 className="text-white font-serif text-3xl font-light leading-snug mb-2">{property.name}</h2>
                <p className="text-gold font-serif text-2xl font-semibold mb-4">{property.price}</p>
                <p className="text-white/48 text-sm leading-relaxed">{property.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 my-6 p-5 bg-white/[0.04] rounded-2xl border border-white/5">
                {[
                  { icon: Bed, val: property.beds, lbl: 'Chambres' },
                  { icon: Bath, val: property.baths, lbl: 'Salles de Bain' },
                  { icon: Maximize2, val: `${property.sqm}m²`, lbl: 'Surface' },
                ].map(({ icon: Icon, val, lbl }, i) => (
                  <div key={i} className={`text-center ${i === 1 ? 'border-x border-white/8' : ''}`}>
                    <Icon size={16} className="text-gold/65 mx-auto mb-1.5" />
                    <p className="text-white text-sm font-bold">{val}</p>
                    <p className="text-[10px] text-white/28 uppercase tracking-tight">{lbl}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-8">
                <p className="text-white/28 text-[10px] uppercase tracking-[0.3em] font-black mb-4">Équipements Exclusifs</p>
                <div className="space-y-2.5">
                  {property.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/55 text-xs">
                      <CheckCircle2 size={13} className="text-gold flex-shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-6 border-t border-white/5">
                <a
                  href={`https://wa.me/212719165197?text=Bonjour, je suis intéressé(e) par la réservation de : ${property.name}.`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full relative group block overflow-hidden rounded-xl"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold via-[#25D366] to-gold rounded-xl blur-[10px] opacity-20 group-hover:opacity-80 transition-all duration-700 animate-pulse" />
                  <div className="relative flex items-center justify-center gap-3 py-5 bg-black rounded-xl text-white text-[10px] uppercase tracking-[0.28em] font-black border border-white/10 group-hover:border-white/25 transition-all overflow-hidden">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="relative z-10">Réservation Instantanée</span>
                    <div className="relative z-10 w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-500 group-hover:rotate-[360deg]">
                      <MessageSquare size={17} className="text-[#25D366] group-hover:text-white transition-colors" fill="currentColor" />
                    </div>
                  </div>
                </a>
                <p className="text-center mt-3 text-[9px] text-white/25 uppercase tracking-[0.25em]">Paiement sécurisé via WhatsApp</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
