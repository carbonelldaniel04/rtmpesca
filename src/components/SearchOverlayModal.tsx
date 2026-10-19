import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/helpers';
import { Search, X, ArrowRight, Fish } from 'lucide-react';

interface SearchOverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlayModal: React.FC<SearchOverlayModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.fishingType && p.fishingType.toLowerCase().includes(q))
        );
      })
    : [];

  const popularSearches = [
    'Dorado',
    'Curado',
    'Shimano',
    'Don KB',
    'Multifilamento',
    'Doite',
    'Termo Stanley',
    'Baitcasting',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-neutral-700 rounded-3xl overflow-hidden shadow-2xl">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#1A1A1A] border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#7CFF00] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por equipo, marca, especie (ej: dorado, reel baitcasting, carpa)..."
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-neutral-500"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs uppercase font-bold text-neutral-400 mb-3">
                Búsquedas Frecuentes
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-[#7CFF00] hover:border-[#7CFF00] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs text-neutral-400 mb-2">
                {results.length} resultado{results.length > 1 ? 's' : ''} encontrado{results.length > 1 ? 's' : ''}
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800/80 hover:border-[#7CFF00] cursor-pointer transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-neutral-950 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <span className="text-[10px] text-[#FF7A00] font-bold uppercase">
                      {product.brand}
                    </span>
                    <h4 className="font-bold text-white truncate">{product.name}</h4>
                    <span className="text-[#7CFF00] font-extrabold text-sm block mt-0.5">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-400 text-xs">
              No encontramos resultados para "{query}". Probá con palabras como "reel", "señuelo" o "carpa".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
