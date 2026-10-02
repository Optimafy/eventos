import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-2.5">
      {/* Friendly floating message pill - closable */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-neutral-900/95 text-neutral-100 border border-neutral-700/80 rounded-2xl py-2 px-3.5 shadow-2xl backdrop-blur-md animate-fadeIn text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Fale agora com a nossa equipe</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-neutral-400 hover:text-white p-0.5"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Primary WhatsApp floating circle */}
      <a
        href={`https://wa.me/${VENUE_INFO.phoneClean}?text=${encodeURIComponent(VENUE_INFO.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Iniciar conversa com Espaço Eventos no WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        
        {/* Subtle ping ring */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-neutral-950 flex items-center justify-center text-[9px] font-bold text-neutral-950">
          1
        </span>
      </a>
    </div>
  );
};
