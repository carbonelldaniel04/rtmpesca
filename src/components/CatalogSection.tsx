import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Layers, 
  Check, 
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

interface CatalogSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedBrand?: string;
  onSelectBrand?: (brand: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onQuickView,
  selectedCategory,
  onSelectCategory,
  selectedBrand: propBrand,
  onSelectBrand,
}) => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [internalBrand, setInternalBrand] = useState('all');
  const selectedBrand = propBrand !== undefined ? propBrand : internalBrand;
  const setSelectedBrand = (brand: string) => {
    setInternalBrand(brand);
    if (onSelectBrand) {
      onSelectBrand(brand);
    }
  };
  const [selectedFishingType, setSelectedFishingType] = useState('all');
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract all distinct brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);
    return ['all', ...list];
  }, [products]);

  // Extract all fishing types
  const fishingTypes = [
    'all',
    'Baitcasting',
    'Spinning',
    'Trolling',
    'Mosca',
    'Variada de Río',
    'General',
  ];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search term
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchBrand = product.brand.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchDesc && !matchCategory) return false;
        }

        // Category filter
        if (selectedCategory && selectedCategory !== 'all') {
          if (selectedCategory === 'all-pesca') {
            const pescaSlugs = [
              'senuelos',
              'reels',
              'canas',
              'nylon-multifilamento',
              'anzuelos',
              'boyas-flotadores',
              'carnadas-artificiales',
              'plomos',
            ];
            if (!pescaSlugs.includes(product.category)) return false;
          } else if (selectedCategory === 'all-camping') {
            const campingSlugs = [
              'carpas',
              'bolsas-dormir',
              'conservadoras',
              'sillas-plegables',
              'linternas',
              'hornillos',
              'mochilas',
              'termos',
            ];
            if (!campingSlugs.includes(product.category)) return false;
          } else {
            if (product.category !== selectedCategory) return false;
          }
        }

        // Brand filter
        if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
          return false;
        }

        // Fishing type
        if (selectedFishingType !== 'all') {
          if (product.fishingType !== selectedFishingType) return false;
        }

        // Price
        if (product.price > maxPrice) {
          return false;
        }

        // Stock
        if (onlyInStock && product.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default relevance
        return 0;
      });
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedFishingType,
    maxPrice,
    onlyInStock,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setSelectedFishingType('all');
    setMaxPrice(500000);
    setOnlyInStock(false);
    setSortBy('relevance');
    onSelectCategory('all');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedBrand !== 'all' ||
    selectedFishingType !== 'all' ||
    maxPrice < 500000 ||
    onlyInStock ||
    (selectedCategory !== 'all' && selectedCategory !== '');

  return (
    <section id="productos-catalogo" className="py-20 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7CFF00]/10 border border-[#7CFF00]/30 text-xs font-bold text-[#7CFF00] uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Catálogo Completo & Buscador Avanzado</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Equipamiento <span className="text-[#7CFF00]">Outdoor</span> Profesional
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Filtrá por marca, categoría, técnica de pesca o presupuesto para armar tu equipo ideal.
          </p>
        </div>

        {/* Search Bar & Top Controls Bar */}
        <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, cañas, reels, señuelos, carpas..."
                className="w-full pl-12 pr-10 py-3.5 bg-neutral-900 border border-neutral-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-[#7CFF00] transition-colors placeholder:text-neutral-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Mobile Filter Buttons */}
            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700/80 rounded-xl px-3 py-2 text-xs text-neutral-300">
                <ArrowUpDown className="w-4 h-4 text-[#FF7A00]" />
                <span className="hidden sm:inline text-neutral-400">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="relevance" className="bg-neutral-900 text-white">Destacados</option>
                  <option value="price-asc" className="bg-neutral-900 text-white">Menor precio</option>
                  <option value="price-desc" className="bg-neutral-900 text-white">Mayor precio</option>
                  <option value="rating" className="bg-neutral-900 text-white">Mejor calificados</option>
                </select>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border border-neutral-700 rounded-xl text-xs font-bold text-white hover:border-[#7CFF00]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#7CFF00]" />
                <span>Filtros {hasActiveFilters && '•'}</span>
              </button>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-neutral-800 scrollbar-none text-xs">
            <span className="text-neutral-400 font-semibold shrink-0">Categoría:</span>
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                selectedCategory === 'all' || !selectedCategory
                  ? 'bg-[#7CFF00] text-black shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => onSelectCategory('all-pesca')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                selectedCategory === 'all-pesca'
                  ? 'bg-[#7CFF00] text-black shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Toda la Pesca
            </button>
            <button
              onClick={() => onSelectCategory('all-camping')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                selectedCategory === 'all-camping'
                  ? 'bg-[#FF7A00] text-black shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Todo Camping & Outdoor
            </button>
            <button
              onClick={() => onSelectCategory('reels')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                selectedCategory === 'reels'
                  ? 'bg-[#7CFF00] text-black'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Reels
            </button>
            <button
              onClick={() => onSelectCategory('canas')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                selectedCategory === 'canas'
                  ? 'bg-[#7CFF00] text-black'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Cañas
            </button>
            <button
              onClick={() => onSelectCategory('senuelos')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                selectedCategory === 'senuelos'
                  ? 'bg-[#7CFF00] text-black'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Señuelos
            </button>
            <button
              onClick={() => onSelectCategory('carpas')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                selectedCategory === 'carpas'
                  ? 'bg-[#FF7A00] text-black'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Carpas
            </button>
            <button
              onClick={() => onSelectCategory('termos')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                selectedCategory === 'termos'
                  ? 'bg-[#FF7A00] text-black'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              Termos Stanley
            </button>
          </div>
        </div>

        {/* Main Grid with Sidebar Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Filter className="w-4 h-4 text-[#7CFF00]" />
                  <span>Filtros Avanzados</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-neutral-400 hover:text-[#FF7A00] flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Limpiar
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-300 tracking-wider mb-2.5">
                  Marca
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedBrand === brand
                          ? 'bg-[#7CFF00]/15 text-[#7CFF00] border border-[#7CFF00]/30'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      <span>{brand === 'all' ? 'Todas las Marcas' : brand}</span>
                      {selectedBrand === brand && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fishing Type Filter */}
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-300 tracking-wider mb-2.5">
                  Modalidad de Pesca
                </label>
                <div className="space-y-1.5">
                  {fishingTypes.map((ft) => (
                    <button
                      key={ft}
                      onClick={() => setSelectedFishingType(ft)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedFishingType === ft
                          ? 'bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      <span>{ft === 'all' ? 'Cualquier modalidad' : ft}</span>
                      {selectedFishingType === ft && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase font-bold text-neutral-300 tracking-wider">
                    Precio Máximo
                  </label>
                  <span className="text-xs font-bold text-[#7CFF00]">
                    {formatCurrency(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#7CFF00] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>$20.000</span>
                  <span>$500.000</span>
                </div>
              </div>

              {/* Availability Toggle */}
              <div className="pt-2 border-t border-neutral-800">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-neutral-300">
                    Solo productos en stock
                  </span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-[#7CFF00] focus:ring-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {/* Counter bar */}
            <div className="flex items-center justify-between mb-6 text-xs text-neutral-400">
              <span>
                Mostrando <strong className="text-white">{filteredProducts.length}</strong> de {products.length} productos
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[#FF7A00] font-semibold hover:underline"
                >
                  Restablecer filtros
                </button>
              )}
            </div>

            {/* Product Cards Responsive Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.includes(product.id)}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-500">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  No se encontraron productos
                </h3>
                <p className="text-sm text-neutral-400 max-w-sm mx-auto mb-6">
                  Intenta cambiar los filtros seleccionados, ampliar el rango de precio o buscar por otro término.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#7CFF00] text-black font-bold text-xs"
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end">
            <div className="w-full max-w-xs bg-[#121212] h-full p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <h3 className="text-base font-bold text-white">Filtros Avanzados</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-400 mb-2">
                  Marca
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b === 'all' ? 'Todas las marcas' : b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fishing Type */}
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-400 mb-2">
                  Modalidad de Pesca
                </label>
                <select
                  value={selectedFishingType}
                  onChange={(e) => setSelectedFishingType(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs"
                >
                  {fishingTypes.map((ft) => (
                    <option key={ft} value={ft}>
                      {ft === 'all' ? 'Todas las modalidades' : ft}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-400 mb-2">
                  Precio Máximo: {formatCurrency(maxPrice)}
                </label>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#7CFF00]"
                />
              </div>

              {/* In stock */}
              <label className="flex items-center justify-between text-xs text-neutral-300">
                <span>Solo productos en stock</span>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 text-[#7CFF00]"
                />
              </label>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-3 bg-[#7CFF00] text-black font-bold text-xs rounded-xl"
                >
                  Aplicar Filtros ({filteredProducts.length})
                </button>
                <button
                  onClick={resetFilters}
                  className="w-full py-2.5 bg-neutral-900 text-neutral-400 text-xs rounded-xl"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
