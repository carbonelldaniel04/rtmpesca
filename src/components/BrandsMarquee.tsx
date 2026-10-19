import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface BrandDef {
  name: string;
  id: string;
  renderLogo: () => React.ReactNode;
}

export const BRANDS_LIST: BrandDef[] = [
  {
    name: 'Shimano',
    id: 'shimano',
    renderLogo: () => (
      <svg viewBox="0 0 140 36" className="h-7 w-auto max-w-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="140" height="36" rx="6" fill="#005BAC" />
        {/* Stylized Shimano bold logotype */}
        <text
          x="70"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="2.5"
          fontStyle="italic"
        >
          SHIMANO
        </text>
      </svg>
    ),
  },
  {
    name: 'Daiwa',
    id: 'daiwa',
    renderLogo: () => (
      <svg viewBox="0 0 130 36" className="h-8 w-auto max-w-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Iconic Daiwa D-Vector Logo */}
        <g transform="translate(10, 3)">
          <path d="M0 0 L18 0 L28 15 L18 30 L0 30 L10 15 Z" fill="#E60012" />
          <path d="M7 6 L17 6 L23 15 L17 24 L7 24 L13 15 Z" fill="#FFFFFF" />
          <path d="M12 11 L16 11 L19 15 L16 19 L12 19 L14 15 Z" fill="#E60012" />
        </g>
        <text
          x="75"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="2"
        >
          DAIWA
        </text>
      </svg>
    ),
  },
  {
    name: 'Marine Sports',
    id: 'marine-sports',
    renderLogo: () => (
      <svg viewBox="0 0 145 36" className="h-8 w-auto max-w-[125px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Marine Sports Blue/Red shield and hook fish */}
        <path d="M18 2 C28 2, 34 8, 34 18 C34 28, 26 34, 18 34 C10 34, 2 28, 2 18 C2 8, 8 2, 18 2 Z" fill="#003399" />
        <path d="M18 6 C24 6, 28 10, 28 18 C28 24, 22 28, 18 28 C13 28, 8 23, 8 18 C8 11, 13 6, 18 6 Z" fill="#FFFFFF" />
        <path d="M18 9 L24 16 L18 19 L14 14 Z" fill="#E50914" />
        <path d="M16 16 C16 21, 20 23, 23 21" stroke="#003399" strokeWidth="2" strokeLinecap="round" />
        <text
          x="88"
          y="18"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="11"
          letterSpacing="1"
        >
          MARINE
        </text>
        <text
          x="88"
          y="29"
          textAnchor="middle"
          fill="#E50914"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="9.5"
          letterSpacing="1.8"
        >
          SPORTS
        </text>
      </svg>
    ),
  },
  {
    name: 'Rapala',
    id: 'rapala',
    renderLogo: () => (
      <svg viewBox="0 0 130 36" className="h-7 w-auto max-w-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rapala Red Oval Badge */}
        <rect x="2" y="3" width="126" height="30" rx="15" fill="#D9251D" stroke="#FFFFFF" strokeWidth="1.5" />
        <text
          x="65"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Brush Script MT', cursive, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="21"
          letterSpacing="1"
          fontStyle="italic"
        >
          Rapala
        </text>
      </svg>
    ),
  },
  {
    name: 'Abu Garcia',
    id: 'abu-garcia',
    renderLogo: () => (
      <svg viewBox="0 0 135 36" className="h-8 w-auto max-w-[115px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Abu Garcia Royal Swedish Crest Emblem */}
        <g transform="translate(6, 2)">
          <path d="M15 2 L26 8 L22 26 L15 32 L8 26 L4 8 Z" fill="#0E213D" stroke="#C5A059" strokeWidth="1.5" />
          {/* Royal Crown */}
          <path d="M10 10 L12 15 L15 9 L18 15 L20 10 L21 17 L9 17 Z" fill="#C5A059" />
          <circle cx="15" cy="23" r="3.5" fill="#C5A059" />
        </g>
        <text
          x="80"
          y="18"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="12.5"
          letterSpacing="1.2"
        >
          ABU
        </text>
        <text
          x="80"
          y="30"
          textAnchor="middle"
          fill="#C5A059"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="11"
          letterSpacing="2"
        >
          GARCIA
        </text>
      </svg>
    ),
  },
  {
    name: 'Stanley',
    id: 'stanley',
    renderLogo: () => (
      <svg viewBox="0 0 130 36" className="h-8 w-auto max-w-[115px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stanley Winged Bear with Crown */}
        <g transform="translate(8, 3)">
          <rect width="28" height="28" rx="4" fill="#2E5339" stroke="#C8A051" strokeWidth="1" />
          {/* Crown */}
          <path d="M11 6 L12.5 9 L14 6 L15.5 9 L17 6 L16.5 10 L11.5 10 Z" fill="#C8A051" />
          {/* Bear Body */}
          <path d="M9 18 C9 13, 13 11, 15 11 C17 11, 20 13, 20 18 L18 24 L10 24 Z" fill="#C8A051" />
          {/* Wings */}
          <path d="M6 14 C9 12, 11 14, 11 16 C9 17, 7 16, 6 14 Z" fill="#FFFFFF" />
          <path d="M22 14 C19 12, 17 14, 17 16 C19 17, 21 16, 22 14 Z" fill="#FFFFFF" />
        </g>
        <text
          x="78"
          y="23"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="2.5"
        >
          STANLEY
        </text>
      </svg>
    ),
  },
  {
    name: 'Coleman',
    id: 'coleman',
    renderLogo: () => (
      <svg viewBox="0 0 135 36" className="h-8 w-auto max-w-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Coleman Red Lantern Badge */}
        <g transform="translate(4, 2)">
          <rect width="32" height="32" rx="6" fill="#C4122F" />
          {/* Lantern Top */}
          <path d="M12 7 L20 7 L18 10 L14 10 Z" fill="#FFFFFF" />
          {/* Lantern Glass Globe */}
          <rect x="13" y="11" width="6" height="8" rx="1" fill="#FFF59D" />
          {/* Lantern Mantle Glow */}
          <circle cx="16" cy="15" r="2" fill="#FFA000" />
          {/* Lantern Fuel Tank */}
          <path d="M10 20 L22 20 L21 26 L11 26 Z" fill="#FFFFFF" />
        </g>
        <text
          x="82"
          y="24"
          textAnchor="middle"
          fill="#C4122F"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="1"
          fontStyle="italic"
        >
          Coleman
        </text>
      </svg>
    ),
  },
  {
    name: 'PowerPro',
    id: 'powerpro',
    renderLogo: () => (
      <svg viewBox="0 0 140 36" className="h-8 w-auto max-w-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* PowerPro Spectra Braid Round Target */}
        <g transform="translate(5, 2)">
          <circle cx="16" cy="16" r="15" fill="#111111" stroke="#76BD22" strokeWidth="2" />
          <path d="M8 16 L24 16 M16 8 L16 24" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="5" fill="#76BD22" />
        </g>
        <text
          x="82"
          y="23"
          textAnchor="middle"
          fill="#76BD22"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="1.5"
        >
          POWER<tspan fill="#FFFFFF">PRO</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Mustad',
    id: 'mustad',
    renderLogo: () => (
      <svg viewBox="0 0 130 36" className="h-8 w-auto max-w-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Mustad Norwegian Hook Emblem */}
        <g transform="translate(6, 2)">
          <circle cx="16" cy="16" r="14" fill="#003882" stroke="#FFFFFF" strokeWidth="1" />
          {/* Classic Fish Hook Shape */}
          <path
            d="M16 8 L16 19 C16 23, 21 23, 21 19 L21 16 L19 18"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        <text
          x="75"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="2"
        >
          Mustad
        </text>
      </svg>
    ),
  },
  {
    name: 'Doite',
    id: 'doite',
    renderLogo: () => (
      <svg viewBox="0 0 125 36" className="h-8 w-auto max-w-[105px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Doite Mountain Peaks Expedition Logo */}
        <g transform="translate(8, 4)">
          {/* Mountain 1 */}
          <path d="M4 24 L14 7 L24 24 Z" fill="#C8102E" />
          {/* Mountain 2 */}
          <path d="M16 24 L24 11 L32 24 Z" fill="#FFFFFF" />
          {/* Snowcaps */}
          <path d="M14 7 L17 12 L11 12 Z" fill="#FFFFFF" />
        </g>
        <text
          x="75"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="2"
        >
          DOITE
        </text>
      </svg>
    ),
  },
  {
    name: 'Waterdog',
    id: 'waterdog',
    renderLogo: () => (
      <svg viewBox="0 0 145 36" className="h-8 w-auto max-w-[125px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Waterdog Adventure Paw & River Wave */}
        <g transform="translate(4, 2)">
          <circle cx="16" cy="16" r="14" fill="#0C4A28" stroke="#7CFF00" strokeWidth="1" />
          {/* Paw Pads */}
          <ellipse cx="11" cy="11" rx="2" ry="3" fill="#7CFF00" />
          <ellipse cx="16" cy="9" rx="2" ry="3" fill="#7CFF00" />
          <ellipse cx="21" cy="11" rx="2" ry="3" fill="#7CFF00" />
          <path d="M12 17 C12 15, 14 14, 16 14 C18 14, 20 15, 20 17 C20 20, 12 20, 12 17 Z" fill="#7CFF00" />
        </g>
        <text
          x="82"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="14.5"
          letterSpacing="1.2"
        >
          WATER<tspan fill="#7CFF00">DOG</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Fenix',
    id: 'fenix',
    renderLogo: () => (
      <svg viewBox="0 0 125 36" className="h-8 w-auto max-w-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Fenix Fiery Wings & Flashlight Beam */}
        <g transform="translate(6, 2)">
          <path d="M16 4 C10 10, 6 18, 6 24 C6 28, 10 30, 16 30 C22 30, 26 28, 26 24 C26 18, 22 10, 16 4 Z" fill="#FF5500" />
          <path d="M16 9 C12 14, 10 19, 10 23 C10 26, 12 27, 16 27 C20 27, 22 26, 22 23 C22 19, 20 14, 16 9 Z" fill="#FFDD00" />
          <circle cx="16" cy="20" r="3" fill="#FFFFFF" />
        </g>
        <text
          x="72"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="2.5"
        >
          FENIX
        </text>
      </svg>
    ),
  },
  {
    name: 'Tech Tackle',
    id: 'tech-tackle',
    renderLogo: () => (
      <svg viewBox="0 0 150 36" className="h-8 w-auto max-w-[130px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tech Tackle Paraná Fluvial Gold Hexagon */}
        <g transform="translate(5, 2)">
          <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="#181818" stroke="#FF7A00" strokeWidth="1.5" />
          {/* Dorado Fin Strike */}
          <path d="M10 16 L22 10 L16 22 Z" fill="#FF7A00" />
        </g>
        <text
          x="88"
          y="18"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="11.5"
          letterSpacing="1.2"
        >
          TECH
        </text>
        <text
          x="88"
          y="29"
          textAnchor="middle"
          fill="#FF7A00"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="10"
          letterSpacing="1.5"
        >
          TACKLE
        </text>
      </svg>
    ),
  },
  {
    name: 'Don KB',
    id: 'don-kb',
    renderLogo: () => (
      <svg viewBox="0 0 130 36" className="h-8 w-auto max-w-[115px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Don KB Artisan Lure Silhouette */}
        <g transform="translate(6, 4)">
          <rect width="28" height="26" rx="6" fill="#8B4513" stroke="#D4AF37" strokeWidth="1" />
          {/* Lure Body */}
          <path d="M7 13 C12 8, 20 8, 22 13 C20 18, 12 18, 7 13 Z" fill="#FFCC00" />
          {/* Treble Hook hint */}
          <circle cx="9" cy="13" r="1.5" fill="#000000" />
          <path d="M15 17 L15 22" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
        <text
          x="76"
          y="23"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="1.5"
        >
          DON <tspan fill="#D4AF37">KB</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Albatros',
    id: 'albatros',
    renderLogo: () => (
      <svg viewBox="0 0 135 36" className="h-8 w-auto max-w-[115px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soaring Albatross Wings */}
        <g transform="translate(6, 4)">
          <circle cx="15" cy="14" r="13" fill="#0B2545" stroke="#3A86C8" strokeWidth="1" />
          {/* Wings */}
          <path d="M5 16 C10 11, 15 12, 15 15 C15 12, 20 11, 25 16 C20 14, 17 15, 15 18 C13 15, 10 14, 5 16 Z" fill="#FFFFFF" />
        </g>
        <text
          x="78"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="1.8"
        >
          ALBATROS
        </text>
      </svg>
    ),
  },
  {
    name: 'Spinit',
    id: 'spinit',
    renderLogo: () => (
      <svg viewBox="0 0 125 36" className="h-8 w-auto max-w-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Spinit Compass Star & Spinning Rotor */}
        <g transform="translate(6, 3)">
          <circle cx="15" cy="15" r="13" fill="#1C1C1C" stroke="#7CFF00" strokeWidth="1.5" />
          <polygon points="15,4 18,12 26,15 18,18 15,26 12,18 4,15 12,12" fill="#7CFF00" />
          <circle cx="15" cy="15" r="3" fill="#000000" />
        </g>
        <text
          x="72"
          y="24"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="2"
        >
          SPINIT
        </text>
      </svg>
    ),
  },
];

interface BrandsMarqueeProps {
  onSelectBrand?: (brandName: string) => void;
}

export const BrandsMarquee: React.FC<BrandsMarqueeProps> = ({ onSelectBrand }) => {
  // Duplicate list to create seamless infinite right-to-left loop
  const marqueeList = [...BRANDS_LIST, ...BRANDS_LIST];

  const handleBrandClick = (brandName: string) => {
    if (onSelectBrand) {
      onSelectBrand(brandName);
    }
    const catalogElem = document.getElementById('catalogo');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="marcas-aliadas" 
      aria-label="Marcas oficiales de pesca deportiva y outdoor"
      className="relative w-full bg-[#0E0E0E] border-y border-neutral-800/80 py-6 overflow-hidden"
    >
      {/* Top Header Information Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#7CFF00]/10 border border-[#7CFF00]/20 text-[#7CFF00]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 font-heading">
              <span>MARCAS OFICIALES & DISTRIBUIDOR AUTORIZADO</span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#7CFF00]/15 text-[#7CFF00] border border-[#7CFF00]/30">
                100% Original
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
          <span>Haz clic en una marca para filtrar el catálogo</span>
        </div>
      </div>

      {/* Marquee Container with Left and Right Gradient Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none" />

        {/* The Track Moving from Right to Left */}
        <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 py-2">
          {marqueeList.map((brand, index) => (
            <button
              key={`${brand.id}-${index}`}
              onClick={() => handleBrandClick(brand.name)}
              className="group flex-shrink-0 flex items-center justify-center px-6 sm:px-7 py-3 rounded-xl bg-[#131313] hover:bg-[#1A1A1A] border border-neutral-800/90 hover:border-[#7CFF00]/80 transition-all duration-300 shadow-md hover:shadow-[0_0_22px_rgba(124,255,0,0.2)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7CFF00]/50"
              title={`Filtrar productos de ${brand.name}`}
            >
              {/* Brand Logo Box */}
              <div className="h-8 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {brand.renderLogo()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
