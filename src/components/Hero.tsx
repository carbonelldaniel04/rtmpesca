import React from 'react';
import { ArrowRight, Shield, Award, Truck, Flame, Anchor } from 'lucide-react';
import { SiteHeroConfig } from '../types';

interface HeroProps {
  onExploreProducts?: () => void;
  onViewOffers?: () => void;
  content?: SiteHeroConfig;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onViewOffers, content }) => {
  const handleExplore = () => {
    if (onExploreProducts) {
      onExploreProducts();
    } else {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOffers = () => {
    if (onViewOffers) {
      onViewOffers();
    } else {
      document.getElementById('ofertas-semana')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bgImage = content?.backgroundImage || '/hero-bg.jpg';
  const badgeLoc = content?.badgeLocation || 'RÍO PARANÁ & CORRIENTES';
  const badgeSeason = content?.badgeSeason || 'Temporada Dorados y Surubíes 2026';
  const titlePart1 = content?.titlePart1 || 'Todo para tu';
  const titleGreen = content?.titleHighlightGreen || 'pesca';
  const titlePart2 = content?.titlePart2 || 'y';
  const titleOrange = content?.titleHighlightOrange || 'aventura';
  const titlePart3 = content?.titlePart3 || 'en un solo lugar';
  const subtitle = content?.subtitle || 'Equipamiento de pesca, camping y outdoor con asesoramiento especializado. Reels de alto frenado, cañas de grafito, señuelos infalibles y carpas para expediciones extremas.';
  const btnExplore = content?.buttonExploreText || 'Comprar Ahora';
  const btnOffers = content?.buttonOffersText || 'Ver Ofertas de la Semana';

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background High-Impact Visual: Dorado Fisherman & River Paraná Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Pescador deportivo en el Río Paraná capturando un dorado en el atardecer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85') {
              target.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85';
            }
          }}
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-125 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to blend with Deep Black (#0B0B0B) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 via-[#0B0B0B]/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B0B0B]/40 to-[#0B0B0B]" />
      </div>

      {/* Decorative River Water Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#7CFF00]/10 rounded-full blur-3xl pointer-events-none animate-water-glow" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none animate-water-glow" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full mb-12">
          {/* Left Column: Headings & Actions */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-xs font-semibold text-neutral-300 mb-6 shadow-xl backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7CFF00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7CFF00]" />
              </span>
              <span className="text-[#7CFF00] font-bold">{badgeLoc}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300">{badgeSeason}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.08] mb-6 font-heading">
              {titlePart1} <span className="text-[#7CFF00]">{titleGreen}</span> {titlePart2}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-amber-400">
                {titleOrange}
              </span>{' '}
              {titlePart3}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-2xl font-normal leading-relaxed mb-10">
              {subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-buy-now-btn"
                onClick={handleExplore}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-base tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(124,255,0,0.35)] hover:shadow-[0_0_35px_rgba(124,255,0,0.5)] transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{btnExplore}</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </button>

              <button
                id="hero-offers-btn"
                onClick={handleOffers}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-[#FF7A00] text-white font-bold text-base transition-all duration-300 shadow-lg backdrop-blur-md group cursor-pointer"
              >
                <Flame className="w-5 h-5 text-[#FF7A00] group-hover:scale-110 transition-transform" />
                <span>{btnOffers}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Official Logo Emblem Showcase */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
            <div className="relative group">
              {/* Outer Decorative Neon Halo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#7CFF00]/25 via-[#FF7A00]/20 to-[#7CFF00]/25 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
              
              {/* Circular Emblem Frame */}
              <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full p-1.5 bg-gradient-to-b from-[#7CFF00] via-neutral-800 to-[#FF7A00] shadow-[0_0_40px_rgba(0,0,0,0.9)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0A0A] border-4 border-black relative">
                  <img
                    src="/rtm-logo.jpg"
                    alt="RTM Outdoor Logotipo Oficial"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Quality Guarantee Floating Tag */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-neutral-900/95 border border-[#7CFF00]/60 shadow-xl backdrop-blur-md whitespace-nowrap flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7CFF00]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-white">
                  Marca Oficial • Paraná 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Banner */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-neutral-800/80">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/60 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[#7CFF00]/10 text-[#7CFF00]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{content?.feature1 || 'Envíos a Todo el País'}</p>
              <p className="text-[11px] text-neutral-400">Andreani y Correo Arg.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/60 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[#FF7A00]/10 text-[#FF7A00]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{content?.feature2 || 'Marcas Oficiales'}</p>
              <p className="text-[11px] text-neutral-400">Shimano, Coleman, Tech</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/60 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[#7CFF00]/10 text-[#7CFF00]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{content?.feature3 || 'Garantía Escrita'}</p>
              <p className="text-[11px] text-neutral-400">100% Original Certificado</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/60 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[#FF7A00]/10 text-[#FF7A00]">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Atendido por Pescadores</p>
              <p className="text-[11px] text-neutral-400">Asesoramiento en el río</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
