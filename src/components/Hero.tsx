import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 28, stiffness: 120 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const translateX = useTransform(springX, [0, 1], ['-2%', '2%']);
  const translateY = useTransform(springY, [0, 1], ['-2%', '2%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1549944850-84e00be4203b?auto=format&fit=crop&q=90&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          x: translateX,
          y: translateY,
          scale: 1.12,
          opacity: 0.52,
        }}
        animate={{ scale: [1.12, 1.2, 1.12] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/05 to-black z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-white/55 uppercase tracking-[0.45em] text-[10px] md:text-[11px] mb-7"
        >
          Bienvenue à La Conciergerie Rabat
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="text-white font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.06] mb-10 font-light"
        >
          Excellence &amp;<br />
          <em className="not-italic italic text-gold underline decoration-gold/40 underline-offset-[10px]">
            Savoir-Vivre
          </em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#apartments"
            className="group relative px-12 py-5 bg-white text-black rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(255,255,255,0.12)] hover:shadow-[0_0_50px_rgba(197,160,89,0.35)]"
          >
            <div className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />
            <span className="relative z-10 text-[11px] uppercase tracking-[0.3em] font-black group-hover:text-white transition-colors duration-300">
              Explorer Nos Séjours
            </span>
          </a>

          <a
            href="#contact"
            className="group flex items-center gap-3 text-white/75 hover:text-white text-[11px] uppercase tracking-[0.3em] font-semibold transition-all"
          >
            <span className="border-b border-white/20 pb-px group-hover:border-gold transition-colors">
              Demande Privée
            </span>
            <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-gold group-hover:rotate-45 transition-all">
              <ChevronDown size={14} className="-rotate-90" />
            </div>
          </a>
        </motion.div>
      </div>

      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/35 cursor-pointer hover:text-white/60 transition-colors"
        onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
      >
        <ChevronDown size={30} />
      </motion.button>
    </section>
  );
};
