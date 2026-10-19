import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Trophy, ChevronLeft, ChevronRight, Star, ThumbsUp } from 'lucide-react';

interface AnglersChoiceCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onQuickView: (product: Product) => void;
}

export const AnglersChoiceCarousel: React.FC<AnglersChoiceCarouselProps> = ({
  products,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onQuickView,
}) => {
  // Filter products marked as Anglers Choice or highest rating
  const choiceProducts = products.filter(
    (p) => p.isAnglersChoice || p.rating >= 4.8
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, choiceProducts.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="elegidos" className="py-20 bg-[#0E0E0E] relative border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[#7CFF00] font-bold text-xs uppercase tracking-widest mb-2">
              <Trophy className="w-4 h-4 text-[#FF7A00]" />
              <span>Calificados 4.9+ por Pescadores y Guías de Pesca</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Elegidos por los <span className="text-[#7CFF00]">Pescadores</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Los equipos más testeados en batallas reales contra dorados y surubíes del Paraná. Recomendados de boca en boca en cada bajada de lancha.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-xl border border-neutral-700 transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-neutral-900 text-neutral-500'
                  : 'bg-neutral-800 text-white hover:border-[#7CFF00] hover:text-[#7CFF00]'
              }`}
              title="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-xl border border-neutral-700 transition-colors ${
                currentIndex >= maxIndex
                  ? 'opacity-40 cursor-not-allowed bg-neutral-900 text-neutral-500'
                  : 'bg-neutral-800 text-white hover:border-[#7CFF00] hover:text-[#7CFF00]'
              }`}
              title="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {choiceProducts
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((product) => (
              <div key={product.id} className="relative">
                {/* Community Badge */}
                <div className="absolute -top-3 left-4 z-20 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#7CFF00]/50 text-[11px] font-bold text-[#7CFF00] shadow-md flex items-center gap-1.5">
                  <ThumbsUp className="w-3 h-3 text-[#7CFF00]" />
                  <span>Favorito de los Guías</span>
                </div>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  favorites={favorites}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(product.id)}
                  onQuickView={onQuickView}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
