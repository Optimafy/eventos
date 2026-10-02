import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!item) return;
      const currentIndex = items.findIndex((i) => i.id === item.id);
      if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        onNavigate(items[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(items[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-full border border-neutral-700 transition-colors"
        aria-label="Fechar visualização"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(items[currentIndex - 1]);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-full border border-neutral-700 transition-colors"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {currentIndex < items.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(items[currentIndex + 1]);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-full border border-neutral-700 transition-colors"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content wrapper */}
      <div
        className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[72vh] flex items-center justify-center rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto max-h-[72vh] object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption */}
        <div className="w-full mt-4 bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{item.categoryLabel}</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">{item.highlight}</span>
            </div>
            <h3 className="text-lg font-serif-luxury font-bold text-white">{item.title}</h3>
            <p className="text-xs text-neutral-300 mt-0.5">{item.description}</p>
          </div>
          <div className="text-xs text-neutral-500 tabular-nums self-end sm:self-center">
            {currentIndex + 1} de {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};
