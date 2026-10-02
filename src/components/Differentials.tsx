import React from 'react';
import { motion } from 'motion/react';
import { Users, Car, Wind, MapPin, Zap, Utensils, ShieldCheck, HeartHandshake } from 'lucide-react';
import { DIFFERENTIALS } from '../data/venueData';

const iconMap: Record<string, React.ReactNode> = {
  capacidade: <Users className="w-6 h-6 text-amber-400" />,
  estacionamento: <Car className="w-6 h-6 text-amber-400" />,
  climatizacao: <Wind className="w-6 h-6 text-amber-400" />,
  localizacao: <MapPin className="w-6 h-6 text-amber-400" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export const Differentials: React.FC = () => {
  return (
    <section id="diferenciais" className="py-24 bg-neutral-900/60 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Por que escolher a gente?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white mb-4">
            Infraestrutura Pensada para o Seu Conforto
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            Eliminamos as preocupações com logística e suporte para que você viva intensamente
            cada segundo do seu evento ao lado de quem ama.
          </p>
        </div>

        {/* 4 Main Differentials Grid with Stagger Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
        >
          {DIFFERENTIALS.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-7 transition-colors shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors">
                    {iconMap[item.id]}
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 group-hover:text-amber-400/80 transition-colors">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center text-xs font-medium text-amber-400/90">
                <span>{item.highlight}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra Peace of Mind Row */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-neutral-800/80 rounded-lg text-amber-400 shrink-0 mt-0.5">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Gerador Full 250kVA</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Sem risco de corte de energia na festa. Assume toda a carga em segundos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-neutral-800/80 rounded-lg text-amber-400 shrink-0 mt-0.5">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Cozinha Industrial</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Espaço completo para preparo de buffets exigentes com entrada independente.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-neutral-800/80 rounded-lg text-amber-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Segurança Integral</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Controle de lista por QR code, portaria blindada e vigilância monitorada.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-neutral-800/80 rounded-lg text-amber-400 shrink-0 mt-0.5">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Apoio Dedicado no Dia</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Gerente de plantão, técnicos de luz/som e limpeza contínua nos toaletes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
