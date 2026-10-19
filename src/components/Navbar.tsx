import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ShieldCheck, 
  Compass, 
  Flame, 
  Fish, 
  PhoneCall, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { SiteContactConfig } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal?: number;
  favCount?: number;
  favoritesCount?: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenOrders: () => void;
  onOpenAdmin: () => void;
  onSelectCategory?: (categorySlug: string) => void;
  onOpenSearch: () => void;
  contact?: SiteContactConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal = 0,
  favCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenOrders,
  onOpenAdmin,
  onSelectCategory,
  onOpenSearch,
  contact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const effectiveFavCount = favCount ?? favoritesCount ?? 0;
  const storeName = contact?.storeName || 'RTM Outdoor';
  const slogan = contact?.slogan || 'Pesca Deportiva & Camping';
  const announcement = contact?.announcementText || '🎣 TEMPORADA DE DORADOS 2026: 10% OFF EN EFECTIVO/TRANSFERENCIA';
  const freeShipping = contact?.freeShippingThreshold ? formatCurrency(contact.freeShippingThreshold) : '$120.000';

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Pesca', href: '#pesca-categorias', onClick: () => onSelectCategory?.('all-pesca') },
    { label: 'Camping', href: '#camping-categorias', onClick: () => onSelectCategory?.('all-camping') },
    { label: 'Outdoor', href: '#productos-catalogo', onClick: () => onSelectCategory?.('all') },
    { label: 'Ofertas', href: '#ofertas-semana', badge: 'HOT' },
    { label: 'Elegidos', href: '#elegidos' },
    { label: 'Blog', href: '#blog' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0B0B0B]/95 border-b border-neutral-800">
      {/* Top Announcement Bar */}
      <div className="bg-[#141414] border-b border-neutral-800/80 px-4 py-1.5 text-xs text-neutral-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#7CFF00]/15 text-[#7CFF00] border border-[#7CFF00]/30">
              RÍO PARANÁ EXPEDITION
            </span>
            <span className="hidden sm:inline text-neutral-400">|</span>
            <span className="text-neutral-300">
              {announcement}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1 text-[#FF7A00]">
              <Sparkles className="w-3 h-3" /> Envío Gratis desde {freeShipping}
            </span>
            <span className="hidden md:inline">|</span>
            <a
              href="#contacto"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-[#7CFF00]" /> Asesoramiento Personalizado
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo RTM Outdoor */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden border-2 border-[#7CFF00]/40 shadow-[0_0_15px_rgba(124,255,0,0.25)] group-hover:border-[#7CFF00] group-hover:shadow-[0_0_20px_rgba(124,255,0,0.5)] transition-all duration-300 bg-black shrink-0">
              <img
                src={contact?.logoUrl || '/rtm-logo.jpg'}
                alt="RTM Outdoor Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-wider text-white font-heading">
                  {storeName}
                </span>
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 -mt-0.5 group-hover:text-[#FF7A00] transition-colors">
                {slogan}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="relative px-3 py-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800/60 transition-all duration-200 flex items-center gap-1.5"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#FF7A00] text-black animate-pulse">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-xl transition-colors relative flex items-center gap-2 group"
              title="Buscar señuelos, reels, cañas..."
            >
              <Search className="w-5 h-5 text-neutral-300 group-hover:text-[#7CFF00] transition-colors" />
              <span className="hidden md:inline text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-md">
                Buscar...
              </span>
            </button>

            {/* Favorites Icon */}
            <button
              id="nav-favorites-btn"
              onClick={onOpenFavorites}
              className="p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-xl transition-colors relative"
              title="Favoritos guardados"
            >
              <Heart className="w-5 h-5 text-neutral-300 hover:text-[#FF7A00] transition-colors" />
              {effectiveFavCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-[#FF7A00] text-black">
                  {effectiveFavCount}
                </span>
              )}
            </button>

            {/* Account / Orders Icon */}
            <button
              id="nav-account-btn"
              onClick={onOpenOrders}
              className="p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-xl transition-colors relative group"
              title="Mi Cuenta e Historial de Pedidos"
            >
              <User className="w-5 h-5 text-neutral-300 group-hover:text-[#7CFF00] transition-colors" />
            </button>

            {/* Cart Icon & Total Preview */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3 py-2 bg-gradient-to-r from-neutral-900 to-[#171717] border border-neutral-700/80 hover:border-[#7CFF00] rounded-xl transition-all duration-300 group shadow-md"
              title="Ver Carrito de Compras"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-[#7CFF00] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-[10px] font-extrabold rounded-full bg-[#7CFF00] text-black shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  Carrito
                </span>
                <span className="text-xs font-bold text-white group-hover:text-[#7CFF00] transition-colors">
                  {cartTotal > 0 ? formatCurrency(cartTotal) : '$0'}
                </span>
              </div>
            </button>

            {/* Admin Panel Quick Access Button */}
            <button
              id="nav-admin-btn"
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 border border-neutral-700/80 text-neutral-300 hover:text-white hover:border-[#FF7A00] transition-all"
              title="Panel Administrador (Stock, Precios, Pedidos)"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF7A00]" />
              <span>Admin</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F0F0F] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-neutral-200"
            >
              <Search className="w-4 h-4 text-[#7CFF00]" /> Buscar
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-[#FF7A00]"
            >
              <ShieldCheck className="w-4 h-4" /> Panel Admin
            </button>
          </div>

          <div className="divide-y divide-neutral-800/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  if (link.onClick) link.onClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-3 text-neutral-200 hover:text-[#7CFF00] font-medium text-base transition-colors"
              >
                <span>{link.label}</span>
                <div className="flex items-center gap-2">
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FF7A00] text-black">
                      {link.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </div>
              </a>
            ))}
          </div>

          <div className="pt-3 flex gap-2">
            <button
              onClick={() => {
                onOpenOrders();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-sm font-semibold rounded-lg text-white text-center"
            >
              Mis Pedidos
            </button>
            <button
              onClick={() => {
                onOpenFavorites();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-sm font-semibold rounded-lg text-white text-center flex items-center justify-center gap-1.5"
            >
              <Heart className="w-4 h-4 text-[#FF7A00]" /> Favoritos ({favCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
