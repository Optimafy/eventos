import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
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
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Wordmark & Statement */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
              Espaço Eventos
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4">
              O cenário sofisticado e acolhedor onde casamentos, 15 anos, formaturas e grandes
              conquistas ganham vida com perfeição.
            </p>
            <div className="flex items-center gap-3 text-neutral-400">
              <span className="p-2 bg-neutral-900 rounded-lg hover:text-amber-400 transition-colors cursor-pointer" title="Instagram">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="p-2 bg-neutral-900 rounded-lg hover:text-amber-400 transition-colors cursor-pointer" title="Facebook">
                <Facebook className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Col 2: Navegação */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-3">
              Explorar
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('diferenciais')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Diferenciais da Infraestrutura
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('eventos')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Formatos de Eventos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ambientes')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Tour pelos Ambientes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('galeria')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Galeria de Fotos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('calculadora')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Simulador de Orçamento
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('depoimentos')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Depoimentos de Clientes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Segmentos atendidos */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-3">
              Comemorações
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('eventos')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Casamentos & Cerimônias no Jardim
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('eventos')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Festas de 15 Anos & Debutantes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('eventos')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Bailes de Formatura e Colações
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('eventos')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Convenções & Jantares Corporativos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('eventos')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Festas de 15 Anos & Debutantes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contato & Visitas */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 mb-3">
              Atendimento & Visitas
            </h4>
            <a
              href={`https://wa.me/${VENUE_INFO.phoneClean}?text=${encodeURIComponent(VENUE_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-white whitespace-nowrap tabular-nums">{VENUE_INFO.phone}</span>
            </a>
            <p className="mb-2">{VENUE_INFO.email}</p>
            <p className="leading-relaxed mb-2">{VENUE_INFO.address}</p>
            <p className="text-[11px] text-neutral-500">{VENUE_INFO.operatingHours}</p>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {currentYear} Espaço Eventos. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Privacidade & Termos</span>
            <span>·</span>
            <span>Alvará & Bombeiros Regulares</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
