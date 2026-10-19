import React from 'react';
import { CAMPING_CATEGORIES } from '../data/mockData';
import { ArrowRight, Tent, Flame } from 'lucide-react';
import { CategoryCard } from '../types';

interface CategoriesCampingProps {
  onSelectCategory: (slug: string) => void;
  categories?: CategoryCard[];
}

export const CategoriesCamping: React.FC<CategoriesCampingProps> = ({ onSelectCategory, categories }) => {
  const displayCategories = categories && categories.length > 0 ? categories : CAMPING_CATEGORIES;

  return (
    <section id="camping-categorias" className="py-20 bg-[#0B0B0B] relative border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FF7A00] font-bold text-xs uppercase tracking-widest mb-2">
              <Tent className="w-4 h-4" />
              <span>Campamento & Vida al Aire Libre</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Equipamiento de <span className="text-[#FF7A00]">Camping & Outdoor</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Diseñado para soportar noches en la isla, viento patagónico o jornadas de calor extremo en la costa. Resistencia, confort y durabilidad.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('all-camping')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF7A00] hover:text-amber-400 transition-colors group self-start md:self-auto cursor-pointer"
          >
            <span>Ver todo en Camping</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Large Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-neutral-800 hover:border-[#FF7A00] transition-all duration-500 shadow-xl hover:shadow-[0_0_25px_rgba(255,122,0,0.25)] ${
                idx === 0 || idx === 6 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent group-hover:via-[#0B0B0B]/40 transition-colors" />

              {/* Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-xs font-bold text-[#FF7A00] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>{cat.count} modelos</span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FF7A00] transition-colors font-heading">
                    {cat.name}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-neutral-900/90 border border-neutral-700 flex items-center justify-center transform translate-x-2 group-hover:translate-x-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-[#FF7A00]" />
                  </div>
                </div>
                <p className="text-sm text-neutral-300 mt-2 line-clamp-2 max-w-md">
                  {cat.description}
                </p>
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF7A00]/40 rounded-2xl pointer-events-none transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
