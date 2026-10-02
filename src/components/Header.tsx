import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

interface HeaderProps {
  onOpenBudgetModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBudgetModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-neutral-950/80 via-neutral-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-serif-luxury font-semibold tracking-wider text-neutral-100 hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            Espaço Eventos
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <button
              onClick={() => scrollTo('diferenciais')}
              className="hover:text-amber-300 transition-colors text-left"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollTo('eventos')}
              className="hover:text-amber-300 transition-colors text-left"
            >
              Eventos
            </button>
            <button
              onClick={() => scrollTo('ambientes')}
              className="hover:text-amber-300 transition-colors text-left"
            >
              Ambientes
            </button>
            <button
              onClick={() => scrollTo('galeria')}
              className="hover:text-amber-300 transition-colors text-left"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollTo('calculadora')}
              className="hover:text-amber-300 transition-colors text-left text-amber-400 font-semibold"
            >
              Simulador
            </button>
            <button
              onClick={() => scrollTo('depoimentos')}
              className="hover:text-amber-300 transition-colors text-left"
            >
              Depoimentos
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${VENUE_INFO.phoneClean}?text=${encodeURIComponent(VENUE_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-300 hover:text-amber-300 transition-colors py-2 px-3 border border-neutral-700/60 rounded-lg hover:border-amber-500/40"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span className="whitespace-nowrap tabular-nums">{VENUE_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                if (onOpenBudgetModal) {
                  onOpenBudgetModal();
                } else {
                  scrollTo('orcamento');
                }
              }}
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all duration-200 shadow-md hover:shadow-amber-500/20 active:scale-95 whitespace-nowrap"
            >
              Ver Disponibilidade
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl flex flex-col gap-3.5 animate-fadeIn">
            <button
              onClick={() => scrollTo('diferenciais')}
              className="text-left text-sm font-medium text-neutral-200 hover:text-amber-300 py-1"
            >
              Diferenciais do Espaço
            </button>
            <button
              onClick={() => scrollTo('eventos')}
              className="text-left text-sm font-medium text-neutral-200 hover:text-amber-300 py-1"
            >
              Tipos de Eventos
            </button>
            <button
              onClick={() => scrollTo('ambientes')}
              className="text-left text-sm font-medium text-neutral-200 hover:text-amber-300 py-1"
            >
              Nossos Ambientes
            </button>
            <button
              onClick={() => scrollTo('galeria')}
              className="text-left text-sm font-medium text-neutral-200 hover:text-amber-300 py-1"
            >
              Galeria de Fotos
            </button>
            <button
              onClick={() => scrollTo('calculadora')}
              className="text-left text-sm font-semibold text-amber-400 py-1"
            >
              Simulador de Orçamento
            </button>
            <button
              onClick={() => scrollTo('depoimentos')}
              className="text-left text-sm font-medium text-neutral-200 hover:text-amber-300 py-1"
            >
              Depoimentos de Clientes
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-left text-sm font-medium text-neutral-200 hover:text-amber-300 py-1"
            >
              Dúvidas Frequentes
            </button>

            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              <button
                onClick={() => scrollTo('orcamento')}
                className="w-full text-center py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Solicitar Orçamento
              </button>
              <a
                href={`https://wa.me/${VENUE_INFO.phoneClean}?text=${encodeURIComponent(VENUE_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 text-xs font-medium text-neutral-300 border border-neutral-700 rounded-lg hover:bg-neutral-900 transition-colors"
              >
                Falar com Consultor no WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
