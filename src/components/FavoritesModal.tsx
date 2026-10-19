import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/helpers';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  products: Product[];
  onRemoveFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  products,
  onRemoveFavorite,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 bg-[#1A1A1A] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF7A00] fill-current" />
            <h3 className="text-base font-bold text-white font-heading">
              Mis Favoritos Guardados ({favoriteProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Heart className="w-12 h-12 text-neutral-600 mx-auto" />
              <p className="text-sm text-neutral-300 font-bold">No tenés productos en favoritos</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Hacé clic en el corazón de cualquier producto para guardarlo y revisarlo cuando quieras.
              </p>
            </div>
          ) : (
            favoriteProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-16 h-16 rounded-xl object-cover bg-neutral-950 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#FF7A00] font-bold uppercase">{prod.brand}</span>
                  <h4 className="font-bold text-white truncate">{prod.name}</h4>
                  <p className="text-sm font-extrabold text-[#7CFF00] mt-0.5">
                    {formatCurrency(prod.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(prod);
                      onRemoveFavorite(prod.id);
                    }}
                    className="p-2.5 bg-[#7CFF00] hover:bg-[#6ee000] text-black rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                    title="Pasar al carrito"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline text-[11px]">Comprar</span>
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(prod.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                    title="Quitar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
