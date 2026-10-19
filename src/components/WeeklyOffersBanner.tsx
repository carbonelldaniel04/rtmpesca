import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { WeeklyOffer, Product } from '../types';
import { formatCurrency } from '../utils/helpers';
import { INITIAL_WEEKLY_OFFER, INITIAL_PRODUCTS } from '../data/mockData';

interface WeeklyOffersBannerProps {
  offer?: WeeklyOffer;
  weeklyOffer?: WeeklyOffer;
  onAddToCart?: (product: Product) => void;
  onClaimOffer?: (productId: string) => void;
  products?: Product[];
}

export const WeeklyOffersBanner: React.FC<WeeklyOffersBannerProps> = ({
  offer: propOffer,
  weeklyOffer,
  onAddToCart,
  onClaimOffer,
  products = [],
}) => {
  const offer = propOffer || weeklyOffer || INITIAL_WEEKLY_OFFER;
  const safeProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;
  const featuredProduct = safeProducts.find((p) => p.id === 'prod-1') || safeProducts[0];

  // Real countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    if (onClaimOffer && featuredProduct) {
      onClaimOffer(featuredProduct.id);
    } else if (onAddToCart && featuredProduct) {
      onAddToCart(featuredProduct);
    }
  };

  return (
    <section id="ofertas-semana" className="py-16 bg-[#0B0B0B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-[#1A1105] via-[#121212] to-[#0D1505] p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* Subtle Ambient Background image */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <img
              src={offer.bannerImage}
              alt="Fondo río Paraná"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 text-xs font-black text-[#FF7A00] tracking-wider uppercase">
                <Flame className="w-4 h-4 animate-bounce" />
                <span>OFERTAS FLASH DE LA SEMANA</span>
                <span className="bg-[#FF7A00] text-black px-2 py-0.5 rounded text-[10px] font-black ml-1">
                  {offer.discountBadge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-heading">
                  {offer.title}
                </h2>
                <p className="text-base sm:text-lg text-neutral-300 mt-3 font-medium">
                  {offer.subtitle}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs uppercase font-bold text-neutral-400 mb-2">
                  <Clock className="w-4 h-4 text-[#7CFF00]" />
                  <span>La oferta finaliza en:</span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md">
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 text-center">
                    <span className="block text-2xl sm:text-3xl font-black text-[#7CFF00] font-heading">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Días</span>
                  </div>
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 text-center">
                    <span className="block text-2xl sm:text-3xl font-black text-white font-heading">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Horas</span>
                  </div>
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 text-center">
                    <span className="block text-2xl sm:text-3xl font-black text-white font-heading">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Minutos</span>
                  </div>
                  <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 text-center">
                    <span className="block text-2xl sm:text-3xl font-black text-[#FF7A00] font-heading">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Segundos</span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <div>
                  <span className="text-xs text-neutral-400 line-through block">
                    Precio regular: {formatCurrency(offer.featuredProductOriginalPrice)}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#7CFF00] font-heading">
                      {formatCurrency(offer.featuredProductPrice)}
                    </span>
                    <span className="text-xs font-semibold text-neutral-300">
                      o 6 cuotas de {formatCurrency(Math.round(offer.featuredProductPrice / 6))}
                    </span>
                  </div>
                </div>

                <button
                  id="weekly-offer-add-btn"
                  onClick={handleClaim}
                  className="sm:ml-auto inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#FF7A00] to-amber-500 hover:from-amber-500 hover:to-[#FF7A00] text-black font-extrabold rounded-xl text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,122,0,0.3)] hover:scale-105 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Aprovechar Oferta Ahora</span>
                </button>
              </div>
            </div>

            {/* Right Product Preview Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-900/80 p-5 shadow-2xl group">
                <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-neutral-950">
                  <img
                    src={offer.featuredProductImage}
                    alt={offer.featuredProductName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#FF7A00] text-black text-xs font-black px-2.5 py-1 rounded-md">
                    OFERTA LIMITADA
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Marca: Tech & Shimano</span>
                    <span className="text-[#7CFF00] font-bold">Stock reservado para promo</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mt-1 group-hover:text-[#7CFF00] transition-colors">
                    {offer.featuredProductName}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Incluye caña, reel, carga completa de multifilamento y 2 señuelos Don KB de regalo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
