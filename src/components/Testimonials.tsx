import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, HeartHandshake } from 'lucide-react';
import { TESTIMONIALS } from '../data/venueData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="depoimentos" className="py-24 bg-neutral-900/60 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Histórias Reais
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white mb-4">
            A Tranquilidade de Quem Confiou
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Mais do que um espaço de eventos, somos parceiros para garantir que cada minuto seja leve,
            seguro e repleto de sorrisos.
          </p>
        </div>

        {/* Testimonial Showcase Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            {/* Ambient soft glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400">
                <Quote className="w-8 h-8" />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="space-y-6"
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-serif-luxury font-medium text-neutral-100 leading-relaxed italic">
                  "{current.content}"
                </p>

                <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{current.name}</h3>
                    <p className="text-xs sm:text-sm text-amber-400/90 font-medium">
                      {current.role}
                    </p>
                    <span className="text-xs text-neutral-500">
                      Realizado em {current.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/90 px-3.5 py-1.5 rounded-full border border-neutral-800 w-fit">
                    <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                    <span>{current.highlight}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-800/60">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 bg-amber-400'
                        : 'w-2 bg-neutral-700 hover:bg-neutral-600'
                    }`}
                    aria-label={`Ir para depoimento ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
