import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 50, suffix: '+', label: 'Luxury Properties' },
  { value: 1200, suffix: '+', label: 'Happy Clients' },
  { value: 8, suffix: '', label: 'Years of Excellence' },
  { value: 4.9, suffix: '/5', label: 'Average Rating' },
];

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const isDecimal = target % 1 !== 0;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, start]);
  return count;
}

const StatItem = ({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) => {
  const count = useCounter(stat.value, 1800, inView);
  return (
    <div className="text-center">
      <p className="font-serif text-4xl md:text-5xl text-gold font-light mb-2">
        {count}{stat.suffix}
      </p>
      <p className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-semibold">{stat.label}</p>
    </div>
  );
};

export const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#111] border-y border-white/5 py-14 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10"
      >
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} inView={inView} />
        ))}
      </motion.div>
    </section>
  );
};
