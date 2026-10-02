import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Compass, Eye, Sparkles } from 'lucide-react';
import { VENUE_AREAS } from '../data/venueData';
import { VenueArea } from '../types';

interface InteractiveTourProps {
  onOpenGalleryWithArea?: (areaId: string) => void;
  onBookVisit?: () => void;
}

export const InteractiveTour: React.FC<InteractiveTourProps> = ({ onBookVisit }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('salao-nobre');

  const selectedArea = VENUE_AREAS.find((a) => a.id === selectedAreaId) || VENUE_AREAS[0];

  return (
    <section id="ambientes" className="py-24 bg-neutral-900/40 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Espaços Integrados & Versáteis
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white mb-4">
            Conheça os nossos Ambientes
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Mais de 1.800m² de área construída projetada para fluidez total dos convidados,
            proporcionando momentos de festa intensa e recantos para conversas agradáveis.
          </p>
        </div>

        {/* Ambientes Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {VENUE_AREAS.map((area) => {
            const isCurrent = area.id === selectedAreaId;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 text-left flex flex-col justify-between border cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <span className="truncate">{area.name}</span>
                <span className={`text-[11px] font-normal mt-1 ${isCurrent ? 'text-neutral-900/80' : 'text-neutral-400'}`}>
                  {area.capacity}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Display */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArea.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image preview with ambient tag */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] lg:min-h-[480px]">
                <img
                  src={selectedArea.image}
                  alt={selectedArea.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-black/20" />
                <div className="absolute top-4 left-4 bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-neutral-700/60 text-xs font-medium text-amber-300 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedArea.capacity}</span>
                </div>
              </div>

              {/* Specs & Description */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-neutral-950">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Detalhes do Ambiente
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mt-1 mb-4">
                    {selectedArea.name}
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    {selectedArea.description}
                  </p>

                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                    Comodidades & Especificações
                  </h4>
                  <div className="space-y-3 mb-8">
                    {selectedArea.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <div className="p-1 rounded-full bg-amber-400/10 text-amber-400 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
                  <button
                    onClick={onBookVisit}
                    className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-400 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Agendar Visita Presencial</span>
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
