import React from 'react';
import { Product } from '../types';
import { formatCurrency, formatInstallments } from '../utils/helpers';
import { ShoppingCart, Heart, Eye, Star, CheckCircle, Flame, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  onQuickView,
}) => {
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Nuevo':
        return 'bg-[#7CFF00] text-black font-black';
      case 'Oferta':
        return 'bg-[#FF7A00] text-black font-black';
      case 'Más Vendido':
        return 'bg-gradient-to-r from-amber-400 to-[#FF7A00] text-black font-black';
      default:
        return 'bg-neutral-800 text-white';
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#141414] border border-neutral-800 hover:border-[#7CFF00]/80 transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] overflow-hidden">
      {/* Image Container with Badges and Quick Actions */}
      <div className="relative aspect-square w-full bg-neutral-950 overflow-hidden cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onQuickView(product)}
          className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-0.8 rounded-md text-[10px] uppercase tracking-wider shadow-md ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          )}
          {product.fishingType && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-neutral-300 border border-neutral-700/80 backdrop-blur-sm">
              {product.fishingType}
            </span>
          )}
        </div>

        {/* Quick Actions (Favorite & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              isFavorite
                ? 'bg-[#FF7A00] border-[#FF7A00] text-black'
                : 'bg-black/60 border-neutral-700 text-neutral-300 hover:text-white hover:border-[#FF7A00]'
            }`}
            title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            aria-label="Favorito"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-neutral-700 text-neutral-300 hover:text-white hover:border-[#7CFF00] transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
            title="Vista rápida del producto"
            aria-label="Vista rápida"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock status indicator */}
        <div className="absolute bottom-2 left-2 z-10">
          {product.stock > 0 ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-black/80 text-[#7CFF00] backdrop-blur-sm border border-neutral-800">
              <CheckCircle className="w-3 h-3 text-[#7CFF00]" />
              {product.stock <= 5 ? `¡Últimas ${product.stock} un.!` : 'En Stock'}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-950/90 text-red-400 border border-red-800">
              Sin stock temporal
            </span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Brand & Reviews */}
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-bold text-[#FF7A00] tracking-wider uppercase text-[11px]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] font-bold text-neutral-300">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-neutral-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-sm sm:text-base font-bold text-white hover:text-[#7CFF00] transition-colors cursor-pointer line-clamp-2 min-h-[2.75rem]"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Price & Installments */}
        <div className="mt-3 pt-3 border-t border-neutral-800/80">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white tracking-tight font-heading">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-[11px] text-[#7CFF00] font-semibold mt-0.5">
            {formatInstallments(product.installments.count, product.price)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 pt-1">
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
              product.stock > 0
                ? 'bg-neutral-800 hover:bg-[#7CFF00] text-white hover:text-black border border-neutral-700 hover:border-[#7CFF00] shadow-sm hover:shadow-[0_0_15px_rgba(124,255,0,0.3)]'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
