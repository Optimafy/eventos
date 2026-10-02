import React from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, Sparkles, MapPin, Users, ChevronDown, CheckCircle2 } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

interface HeroProps {
  onCheckAvailability: () => void;
  onExploreTour: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckAvailability, onExploreTour }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 pt-20 pb-16">
      {/* Background Image with Depth & Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero_party_celebration_1790852592922.jpg"
          alt="Salão de festas decorado e iluminado na Espaço Eventos"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim & Vignette for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/40 to-neutral-950/90" />
        {/* Subtle golden ambient glow overlay */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle trust tag - zero pill discipline: clean text */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-amber-300/90 mb-5"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Casamentos</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>15 Anos</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>Formaturas</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>Corporativo</span>
        </motion.div>

        {/* Main Impactful Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-luxury font-bold text-white tracking-tight leading-[1.12] mb-6 max-w-4xl"
          style={{ textWrap: 'balance' }}
        >
          O Cenário Perfeito para Momentos Inesquecíveis.
        </motion.h1>

        {/* Warm & Welcoming Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mb-10 text-neutral-200/90"
          style={{ textWrap: 'balance' }}
        >
          Estrutura completa, atendimento acolhedor e ambientes versáteis para transformar
          o seu grande dia em uma experiência inesquecível para você e seus convidados.
        </motion.p>

        {/* CTAs with animated pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
        >
          <button
            onClick={onCheckAvailability}
            className="animate-pulse-cta group w-full sm:w-auto px-8 py-4 text-base font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-xl shadow-xl shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <CalendarCheck className="w-5 h-5 text-neutral-950 transition-transform group-hover:scale-110" />
            <span>Ver Disponibilidade</span>
          </button>

          <button
            onClick={onExploreTour}
            className="w-full sm:w-auto px-7 py-4 text-base font-medium text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800/90 hover:text-white border border-neutral-700/80 hover:border-amber-400/50 rounded-xl backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Conhecer Estrutura</span>
          </button>
        </motion.div>

        {/* Key Trust Metrics / Proof Adjacency */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-neutral-800/80 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">450</span>
            <span className="text-xs text-neutral-400 mt-0.5">Capacidade máxima</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">180</span>
            <span className="text-xs text-neutral-400 mt-0.5">Vagas privativas c/ valet</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">100%</span>
            <span className="text-xs text-neutral-400 mt-0.5">Climatizado e acústico</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">650+</span>
            <span className="text-xs text-neutral-400 mt-0.5">Sonhos realizados</span>
          </div>
        </motion.div>
      </div>

      {/* Floating gentle down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-neutral-500 flex flex-col items-center animate-bounce pointer-events-none">
        <ChevronDown className="w-5 h-5 text-neutral-400" />
      </div>
    </section>
  );
};
