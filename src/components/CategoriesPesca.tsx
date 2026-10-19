import React from 'react';
import { PESCA_CATEGORIES } from '../data/mockData';
import { ArrowRight, Fish } from 'lucide-react';
import { CategoryCard } from '../types';

interface CategoriesPescaProps {
  onSelectCategory: (slug: string) => void;
  categories?: CategoryCard[];
}

export const CategoriesPesca: React.FC<CategoriesPescaProps> = ({ onSelectCategory, categories }) => {
  const displayCategories = categories && categories.length > 0 ? categories : PESCA_CATEGORIES;

  return (
    <section id="pesca-categorias" className="py-20 bg-[#0E0E0E] relative border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#7CFF00] font-bold text-xs uppercase tracking-widest mb-2">
              <Fish className="w-4 h-4" />
              <span>Equipamiento Técnico de Pesca</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Categorías de <span className="text-[#7CFF00]">Pesca Deportiva</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Selección especializada para el río Paraná, lagunas y mar. Equipamiento testeado en correderas de dorados y pozones de surubíes.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('all-pesca')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#7CFF00] hover:text-[#6ee000] transition-colors group self-start md:self-auto cursor-pointer"
          >
            <span>Ver todo en Pesca</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (8 categories) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-neutral-800 hover:border-[#7CFF00] transition-all duration-500 shadow-lg hover:shadow-[0_0_20px_rgba(124,255,0,0.2)]"
            >
              {/* Image with zoom effect */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-transparent group-hover:via-[#0B0B0B]/40 transition-colors" />

              {/* Tag / Count Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700 text-[11px] font-semibold text-neutral-300">
                {cat.count} artículos
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform duration-300">
                <h3 className="text-xl font-bold text-white group-hover:text-[#7CFF00] transition-colors flex items-center justify-between font-heading">
                  <span>{cat.name}</span>
                  <div className="w-8 h-8 rounded-full bg-neutral-900/80 border border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-[#7CFF00]" />
                  </div>
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 opacity-90">
                  {cat.description}
                </p>
              </div>

              {/* Neon border highlight on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#7CFF00]/50 rounded-2xl pointer-events-none transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
