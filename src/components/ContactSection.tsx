import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock, Calendar, Sparkles } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: 'Casamento',
    guestCount: '150 a 250 convidados',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Por favor, informe seu nome completo.';
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Informe um WhatsApp com DDD válido.';
    if (!formData.eventDate) errs.eventDate = 'Informe a data prevista para o seu evento.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Simulate fast reliable network submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff', '#eab308'],
      });
    }, 600);
  };

  const openWhatsAppDirect = () => {
    const text = `Olá! Meu nome é ${formData.name}. Gostaria de solicitar um orçamento para o meu evento:
- Tipo: ${formData.eventType}
- Data pretendida: ${formData.eventDate || 'A definir'}
- Estimativa: ${formData.guestCount}
${formData.notes ? `- Observações: ${formData.notes}` : ''}

Podemos agendar uma visita e checar disponibilidade?`;

    window.open(`https://wa.me/${VENUE_INFO.phoneClean}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="orcamento" className="py-24 bg-neutral-950 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Dê o Primeiro Passo
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white mb-4">
            Garanta a Sua Data Especial
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Nossa equipe entrará em contato com a apresentação completa do espaço, valores sob medida
            e disponibilidade da agenda para o seu grande dia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Info Column */}
          <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-2">
                Atendimento Acolhedor
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8">
                Temos o prazer de receber você para um café e tour guiado pelas instalações.
                Venha sentir a energia do espaço pessoalmente.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-neutral-800 rounded-xl text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Localização
                    </h4>
                    <p className="text-sm text-white mt-0.5">{VENUE_INFO.address}</p>
                    <span className="text-xs text-neutral-500">Estacionamento privativo com valet</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-neutral-800 rounded-xl text-amber-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Telefone & WhatsApp
                    </h4>
                    <p className="text-sm text-white mt-0.5 tabular-nums font-semibold">
                      {VENUE_INFO.phone}
                    </p>
                    <span className="text-xs text-neutral-500">Plantão para noivos e comissões</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-neutral-800 rounded-xl text-amber-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      E-mail Oficial
                    </h4>
                    <p className="text-sm text-white mt-0.5">{VENUE_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-neutral-800 rounded-xl text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Horário de Visitas
                    </h4>
                    <p className="text-sm text-white mt-0.5">{VENUE_INFO.operatingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Datas de 2026/2027 já estão com agenda aberta</span>
              </div>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif-luxury font-bold text-white">
                  Solicitação Recebida com Sucesso!
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Obrigado, <strong className="text-white">{formData.name}</strong>! Nossa equipe
                  de consultores já está checando a data de{' '}
                  <strong className="text-amber-400">{formData.eventDate}</strong> e entrará em
                  contato via WhatsApp.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={openWhatsAppDirect}
                    className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer"
                  >
                    Agilizar Atendimento no WhatsApp Agora
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        eventDate: '',
                        eventType: 'Casamento',
                        guestCount: '150 a 250 convidados',
                        notes: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-medium text-neutral-400 hover:text-white border border-neutral-800 rounded-xl transition-all cursor-pointer"
                  >
                    Nova Consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Amanda Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                    />
                    {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 90000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                    />
                    {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Tipo de Evento *
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-sm text-white outline-none transition-colors"
                    >
                      <option value="Casamento">Casamento & Cerimônia</option>
                      <option value="15 Anos">Festa de 15 Anos (Debutante)</option>
                      <option value="Formatura">Baile de Formatura</option>
                      <option value="Corporativo">Evento Corporativo / Gala</option>
                      <option value="Aniversario / Bodas">Aniversário ou Bodas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Data Prevista *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-sm text-white outline-none transition-colors"
                    />
                    {errors.eventDate && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.eventDate}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Estimativa de Convidados
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-sm text-white outline-none transition-colors"
                    >
                      <option value="Até 100 convidados">Até 100 convidados (Intimista)</option>
                      <option value="100 a 200 convidados">100 a 200 convidados</option>
                      <option value="200 a 350 convidados">200 a 350 convidados</option>
                      <option value="350 a 450 convidados">350 a 450 convidados (Capacidade máxima)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Conte um pouco do que você imagina para o seu evento
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Gostaria de saber se o valor inclui a cerimônia no jardim e se vocês têm opções de mobília clássica..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-sm text-white placeholder-neutral-500 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-neutral-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-neutral-950" />
                    <span>{submitting ? 'Verificando Agenda...' : 'Solicitar Orçamento & Checar Agenda'}</span>
                  </button>

                  <p className="text-[11px] text-center text-neutral-400 mt-2.5">
                    Seus dados estão protegidos. Não enviamos spam.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
