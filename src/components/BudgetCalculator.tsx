import React, { useState, useId } from 'react';
import confetti from 'canvas-confetti';
import { Calculator, Check, MessageSquare, Sparkles, Send, Calendar } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

interface BudgetCalculatorProps {
  initialEventType?: string;
  onOpenBookingModal?: () => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ initialEventType }) => {
  const [eventType, setEventType] = useState<string>(initialEventType || 'casamentos');
  const [guests, setGuests] = useState<number>(180);
  const [period, setPeriod] = useState<string>('sabado');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'iluminacao',
    'camarim',
  ]);
  const [calculated, setCalculated] = useState(false);

  const guestsInputId = useId();

  const eventTypeLabels: Record<string, string> = {
    casamentos: 'Casamento & Recepção',
    debutante: 'Festa de 15 Anos',
    formaturas: 'Baile de Formatura',
    corporativo: 'Evento Corporativo',
  };

  const periodOptions = [
    { id: 'sabado', label: 'Sábado (Noite Nobre)', mult: 1.25, badge: 'Mais disputado' },
    { id: 'sexta', label: 'Sexta-feira', mult: 1.05, badge: 'Alta procura' },
    { id: 'domingo', label: 'Domingo', mult: 0.95, badge: 'Condição especial' },
    { id: 'semana', label: 'Segunda a Quinta', mult: 0.8, badge: 'Melhor custo-benefício' },
  ];

  const addonsList = [
    { id: 'iluminacao', label: 'Iluminação Cênica Arquitetônica & Ribaltas', price: 1800 },
    { id: 'pista_led', label: 'Pista de Dança Paris com Microleds', price: 2400 },
    { id: 'camarim', label: 'Suíte dos Anfitriões com Hidromassagem', price: 1200 },
    { id: 'seguranca', label: 'Equipe Adicional de Valet e Portaria VIP', price: 950 },
    { id: 'coordenador', label: 'Coordenador Técnico de Espaço Dedicado', price: 1100 },
  ];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Base pricing formula estimation
  const calculateEstimate = () => {
    let base = 8500;
    if (eventType === 'casamentos') base = 12000;
    if (eventType === 'debutante') base = 10500;
    if (eventType === 'formaturas') base = 13500;
    if (eventType === 'corporativo') base = 9000;

    // Guest variable
    const guestMultiplier = 1 + (guests / 450) * 0.45;

    // Period multiplier
    const periodObj = periodOptions.find((p) => p.id === period) || periodOptions[0];
    const periodMultiplier = periodObj.mult;

    // Addons
    const addonsTotal = selectedAddons.reduce((sum, currentId) => {
      const found = addonsList.find((a) => a.id === currentId);
      return sum + (found ? found.price : 0);
    }, 0);

    const minEstimate = Math.round((base * guestMultiplier * periodMultiplier + addonsTotal) / 100) * 100;
    const maxEstimate = Math.round(minEstimate * 1.18 / 100) * 100;

    return { minEstimate, maxEstimate };
  };

  const { minEstimate, maxEstimate } = calculateEstimate();

  const handleCalculateClick = () => {
    setCalculated(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#fbbf24', '#d97706', '#ffffff'],
    });
  };

  const generateWhatsAppUrl = () => {
    const periodName = periodOptions.find((p) => p.id === period)?.label || 'Data especial';
    const chosenAddons = selectedAddons
      .map((id) => addonsList.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const text = `Olá, equipe da Espaço Eventos! Realizei uma simulação no site e gostaria de saber as datas disponíveis:
- Evento: ${eventTypeLabels[eventType]}
- Estimativa de Convidados: ${guests} pessoas
- Preferência de Período: ${periodName}
${chosenAddons ? `- Itens de interesse: ${chosenAddons}` : ''}
- Estimativa visualizada: R$ ${minEstimate.toLocaleString('pt-BR')} a R$ ${maxEstimate.toLocaleString('pt-BR')}

Poderiam me enviar a proposta completa em PDF e agendar uma visita?`;

    return `https://wa.me/${VENUE_INFO.phoneClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="calculadora" className="py-24 bg-neutral-950 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Simulador Transparente
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white mb-4">
            Simule o Seu Evento dos Sonhos
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Personalize os parâmetros e tenha uma estimativa imediata dos valores de locação e
            benefícios exclusivos para o seu formato.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Event Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2.5">
                  1. Qual é o seu tipo de evento?
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {Object.entries(eventTypeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setEventType(key)}
                      className={`p-3 text-xs sm:text-sm font-semibold rounded-xl text-left transition-all cursor-pointer border ${
                        eventType === key
                          ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of guests slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={guestsInputId} className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    2. Número estimado de convidados
                  </label>
                  <span className="text-sm font-bold text-amber-400 tabular-nums">
                    {guests} pessoas
                  </span>
                </div>
                <input
                  id={guestsInputId}
                  type="range"
                  min="50"
                  max="450"
                  step="10"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1 tabular-nums">
                  <span>50 (Intimista)</span>
                  <span>250 (Médio)</span>
                  <span>450 (Capacidade Total)</span>
                </div>
              </div>

              {/* Period selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2.5">
                  3. Preferência de dia da semana
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {periodOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPeriod(opt.id)}
                      className={`p-3 text-xs rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                        period === opt.id
                          ? 'bg-neutral-800 text-white border-amber-400'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <span className="font-semibold text-neutral-100">{opt.label}</span>
                      <span className="text-[11px] text-amber-400 mt-1">{opt.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Addons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2.5">
                  4. Comodidades adicionais desejadas
                </label>
                <div className="space-y-2">
                  {addonsList.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-neutral-800/80 border-amber-400/80 text-white'
                            : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked
                                ? 'bg-amber-400 border-amber-400 text-neutral-950'
                                : 'border-neutral-600'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={isChecked ? 'text-neutral-100 font-medium' : ''}>
                            {addon.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Estimation Output Panel */}
            <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Resumo da Simulação</span>
                </div>
                <h3 className="text-xl font-serif-luxury font-bold text-white mb-4">
                  Investimento Estimado
                </h3>

                <div className="bg-neutral-900/90 rounded-xl p-4 border border-neutral-800 mb-6">
                  <span className="text-xs text-neutral-400 block mb-1">
                    Faixa de locação sugerida
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
                    R$ {minEstimate.toLocaleString('pt-BR')}
                    <span className="text-sm font-normal text-neutral-400 mx-1.5">a</span>
                    R$ {maxEstimate.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
                    *Inclui estrutura completa de som básico, mesas, cadeiras tiffany, gerador de 250kVA e itens selecionados.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-300 mb-6">
                  <div className="flex justify-between py-1 border-b border-neutral-800/80">
                    <span className="text-neutral-400">Evento:</span>
                    <span className="font-semibold text-white">{eventTypeLabels[eventType]}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/80">
                    <span className="text-neutral-400">Convidados:</span>
                    <span className="font-semibold text-white tabular-nums">{guests} pessoas</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/80">
                    <span className="text-neutral-400">Período:</span>
                    <span className="font-semibold text-white">
                      {periodOptions.find((p) => p.id === period)?.label.split('(')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Itens extras:</span>
                    <span className="font-semibold text-amber-400 tabular-nums">
                      {selectedAddons.length} selecionados
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-neutral-800">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCalculateClick}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Receber Proposta no WhatsApp</span>
                </a>

                <p className="text-[11px] text-center text-neutral-400">
                  Valores sem compromisso. Resposta média em menos de 15 minutos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
