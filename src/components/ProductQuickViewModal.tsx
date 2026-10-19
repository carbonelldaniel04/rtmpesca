import React, { useState } from 'react';
import { Product } from '../types';
import { formatCurrency, formatInstallments } from '../utils/helpers';
import { X, ShoppingCart, Heart, Star, CheckCircle, Shield, Truck, RefreshCw } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#121212] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative bg-neutral-950 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-800">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-[#7CFF00] text-black">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details Side */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#FF7A00] tracking-wider uppercase">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
                  <span className="text-neutral-400">({product.reviewsCount} opiniones)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-white leading-snug font-heading">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-4 p-4 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#7CFF00] font-heading">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-300 font-semibold mt-1">
                  💳 {formatInstallments(product.installments.count, product.price)}
                </p>
                <p className="text-[11px] text-[#FF7A00] font-medium mt-1">
                  🏷️ 10% de descuento extra abonando por Transferencia Bancaria
                </p>
              </div>

              {/* Description */}
              <div className="mt-5">
                <h3 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-2">
                  Descripción Técnica
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications Table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mt-5">
                  <h3 className="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-2">
                    Ficha Técnica Oficial
                  </h3>
                  <div className="rounded-xl border border-neutral-800 divide-y divide-neutral-800 text-xs overflow-hidden">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 px-3 bg-neutral-900/40">
                        <span className="text-neutral-400 font-medium">{key}</span>
                        <span className="text-white font-semibold text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions & Quantity */}
            <div className="mt-8 pt-6 border-t border-neutral-800 space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center rounded-xl border border-neutral-700 bg-neutral-900 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-white min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3.5 py-2 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  disabled={product.stock === 0}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,255,0,0.3)] transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Agregar al Carrito ({quantity})</span>
                </button>

                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isFavorite
                      ? 'bg-[#FF7A00] border-[#FF7A00] text-black'
                      : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white hover:border-[#FF7A00]'
                  }`}
                  title="Guardar en favoritos"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#7CFF00]" />
                  <span>Despacho rápido en 24hs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>Garantía escrita 6 meses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
