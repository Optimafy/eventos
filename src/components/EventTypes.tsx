import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { EVENT_TYPES } from '../data/venueData';
import { EventType } from '../types';

interface EventTypesProps {
  onSelectEventType: (eventTypeId: string) => void;
}

export const EventTypes: React.FC<EventTypesProps> = ({ onSelectEventType }) => {
  const [activeTabId, setActiveTabId] = useState<string>('casamentos');

  const activeEvent = EVENT_TYPES.find((e) => e.id === activeTabId) || EVENT_TYPES[0];

  return (
    <section id="eventos" className="py-24 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Celebrações Sob Medida
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white">
              Cenários Feitos para a Sua História
            </h2>
            <p className="text-neutral-400 text-base mt-3">
              Cada celebração possui sua própria energia e dinâmica. Conheça as configurações
              exclusivas desenvolvidas para cada tipo de comemoração.
            </p>
          </div>
        </div>
        
        {/* 4 Cards Grid - Clickable & Hoverable for Discovery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {EVENT_TYPES.map((type) => {
            const isSelected = activeTabId === type.id;
            return (
              <div
                key={type.id}
                onClick={() => setActiveTabId(type.id)}
                className={`relative rounded-2xl p-5 border cursor-pointer transition-all duration-300 group overflow-hidden ${
                  isSelected
                    ? 'bg-neutral-900 border-amber-400 shadow-xl shadow-amber-500/10 -translate-y-1'
                    : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <div className="h-36 rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[11px] font-medium text-amber-300">
                    {type.capacity}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>{type.title}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : 'text-neutral-500 group-hover:translate-x-1'}`} />
                </h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                  {type.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive tabs for quick selection on mobile & desktop */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-4 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl">
            {EVENT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTabId(type.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTabId === type.id
                    ? 'bg-amber-400 text-neutral-950 shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {type.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        
        {/* Featured Showcase Card with Motion */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl mb-12 mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image side */}
              <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full overflow-hidden">
                <img
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-4 left-4 right-4 lg:hidden bg-neutral-950/80 backdrop-blur-md p-4 rounded-xl border border-neutral-800">
                  <span className="text-xs text-amber-400 font-semibold">{activeEvent.capacity}</span>
                  <h3 className="text-lg font-serif-luxury font-bold text-white">{activeEvent.title}</h3>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Capacidade: {activeEvent.capacity}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-2">
                    {activeEvent.title}
                  </h3>
                  <p className="text-amber-200/80 text-sm font-medium mb-4">
                    {activeEvent.subtitle}
                  </p>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    {activeEvent.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Itens & Benefícios Inclusos
                    </h4>
                    <ul className="space-y-2.5">
                      {activeEvent.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <span className="p-0.5 rounded-full bg-amber-400/20 text-amber-400 mt-0.5 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Destaques Personalizáveis
                    </h4>
                    <div className="flex flex-wrap gap-1.5 text-xs text-neutral-300">
                      {activeEvent.popularAddons.map((addon, idx) => (
                        <span key={idx} className="bg-neutral-800/80 px-2.5 py-1 rounded-md border border-neutral-700/60">
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => onSelectEventType(activeEvent.id)}
                    className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                  >
                    <span>Simular Valores para {activeEvent.title.split('&')[0].trim()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
