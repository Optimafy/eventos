import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/venueData';
import { EventCategory, GalleryItem } from '../types';
import { LightboxModal } from './LightboxModal';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories: { id: EventCategory; label: string }[] = [
    { id: 'all', label: 'Todos os Ambientes' },
    { id: 'casamentos', label: 'Casamentos' },
    { id: 'debutante', label: '15 Anos' },
    { id: 'formaturas', label: 'Pista & Balada' },
    { id: 'ambientes', label: 'Lounge & Jardins' },
    { id: 'corporativo', label: 'Corporativo' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="galeria" className="py-24 bg-neutral-950 relative border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Momentos Capturados
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white mb-4">
            Galeria de Inspirações
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Veja a magia acontecendo na prática. Detalhes de iluminação, pista de dança,
            mesas postas e espaços ao ar livre preparados para grandes festas.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-900/90 text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-Style Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer shadow-xl h-80"
                onClick={() => setActiveLightboxItem(item)}
              >
                {/* Image with Framer Motion hover zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-neutral-950/70 backdrop-blur-md px-3 py-1 rounded-lg border border-neutral-700/60 text-xs font-medium text-amber-300">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Top Right Expand Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="p-2 bg-neutral-950/80 backdrop-blur-md rounded-full border border-neutral-700 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Caption on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300">
                  <span className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase block mb-1">
                    {item.highlight}
                  </span>
                  <h3 className="text-lg font-serif-luxury font-bold text-white group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <LightboxModal
          item={activeLightboxItem}
          items={filteredItems}
          onClose={() => setActiveLightboxItem(null)}
          onNavigate={(newItem) => setActiveLightboxItem(newItem)}
        />
      </div>
    </section>
  );
};
