import React, { useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Coupon, 
  WeeklyOffer,
  SiteContent 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_WEEKLY_OFFER, 
  INITIAL_COUPONS, 
  INITIAL_ORDERS,
  INITIAL_SITE_CONTENT 
} from './data/mockData';
import { 
  getStoredItem, 
  setStoredItem 
} from './utils/helpers';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandsMarquee } from './components/BrandsMarquee';
import { CategoriesPesca } from './components/CategoriesPesca';
import { CategoriesCamping } from './components/CategoriesCamping';
import { WeeklyOffersBanner } from './components/WeeklyOffersBanner';
import { AnglersChoiceCarousel } from './components/AnglersChoiceCarousel';
import { CatalogSection } from './components/CatalogSection';
import { BlogSection } from './components/BlogSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutUs } from './components/AboutUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { WaterParticles } from './components/WaterParticles';

// Modals
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { CustomerOrdersModal } from './components/CustomerOrdersModal';
import { FavoritesModal } from './components/FavoritesModal';
import { SearchOverlayModal } from './components/SearchOverlayModal';

export const App: React.FC = () => {
  // State: Products
  const [products, setProducts] = useState<Product[]>(() =>
    getStoredItem('rtm_products_v2', INITIAL_PRODUCTS)
  );

  // State: Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    getStoredItem('rtm_cart', [])
  );

  // State: Favorites
  const [favorites, setFavorites] = useState<string[]>(() =>
    getStoredItem('rtm_favorites', ['prod-1', 'prod-3'])
  );

  // State: Orders
  const [orders, setOrders] = useState<Order[]>(() =>
    getStoredItem('rtm_orders', INITIAL_ORDERS)
  );

  // State: Coupons & Weekly Offer
  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    getStoredItem('rtm_coupons', INITIAL_COUPONS)
  );
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [weeklyOffer, setWeeklyOffer] = useState<WeeklyOffer>(() =>
    getStoredItem('rtm_weekly_offer', INITIAL_WEEKLY_OFFER)
  );

  // State: Site Content & Dynamic CMS Config
  const [siteContent, setSiteContent] = useState<SiteContent>(() =>
    getStoredItem('rtm_site_content', INITIAL_SITE_CONTENT)
  );

  // State: Shipping & Postal code
  const [postalCode, setPostalCode] = useState('2000');
  const [shippingCost, setShippingCost] = useState(6500);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Navigation / Filter synchronization
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('all');

  // Temporary feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fallback global para que un enlace externo o una imagen local ausente no deje tarjetas vacías.
  useEffect(() => {
    const fallbackImage = 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85';

    const handleImageError = (event: Event) => {
      const image = event.target as HTMLImageElement;
      if (image.tagName !== 'IMG' || image.dataset.fallbackApplied === 'true') return;

      image.dataset.fallbackApplied = 'true';
      image.src = fallbackImage;
    };

    document.addEventListener('error', handleImageError, true);
    return () => document.removeEventListener('error', handleImageError, true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    setStoredItem('rtm_products_v2', products);
  }, [products]);

  useEffect(() => {
    setStoredItem('rtm_site_content', siteContent);
  }, [siteContent]);

  useEffect(() => {
    setStoredItem('rtm_cart', cartItems);
  }, [cartItems]);

  useEffect(() => {
    setStoredItem('rtm_favorites', favorites);
  }, [favorites]);

  useEffect(() => {
    setStoredItem('rtm_orders', orders);
  }, [orders]);

  useEffect(() => {
    setStoredItem('rtm_coupons', coupons);
  }, [coupons]);

  useEffect(() => {
    setStoredItem('rtm_weekly_offer', weeklyOffer);
  }, [weeklyOffer]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      showToast(`El producto "${product.name}" no tiene stock disponible.`);
      return;
    }

    setCartItems((prev) => {
      const prevSafe = Array.isArray(prev) ? prev : [];
      const existing = prevSafe.find((item) => item?.product?.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prevSafe.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prevSafe, { product, quantity: Math.min(product.stock, quantity) }];
    });

    showToast(`✓ Agregado al carrito: ${product.name}`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            if (nextQty > item.product.stock) return item;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Favorites operations
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Eliminado de tus favoritos.');
        return prev.filter((id) => id !== productId);
      }
      showToast('❤ Guardado en tus favoritos.');
      return [...prev, productId];
    });
  };

  // Coupon handling
  const handleApplyCoupon = (code: string) => {
    const couponsSafe = Array.isArray(coupons) ? coupons : [];
    const found = couponsSafe.find(
      (c) => c?.code && c.code.toUpperCase() === code.trim().toUpperCase() && c.active
    );
    if (!found) {
      return { success: false, message: 'El cupón ingresado no es válido o expiró.' };
    }
    setAppliedCoupon(found);
    return { success: true, message: `¡Cupón ${found.code} aplicado con éxito!` };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Order placed: update stock and record order
  const handleOrderPlaced = (newOrder: Order) => {
    // 1. Add order to state
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Deduct product stock in catalog
    setProducts((prevProducts) => {
      const safeProds = Array.isArray(prevProducts) ? prevProducts : [];
      return safeProds.map((prod) => {
        const orderItemsSafe = Array.isArray(newOrder?.items) ? newOrder.items : [];
        const boughtItem = orderItemsSafe.find((it) => it?.product?.id === prod.id);
        if (boughtItem) {
          const newStock = Math.max(0, prod.stock - (boughtItem.quantity || 1));
          return { ...prod, stock: newStock };
        }
        return prod;
      });
    });

    // 3. Clear cart
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Order status updated by Admin
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Handling category click from Category Grids
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    const catalogEl = document.getElementById('productos-catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Postal code shipping estimation
  const handleSetPostalCode = (cp: string) => {
    setPostalCode(cp);
    // Dynamic cost simulation based on Argentine CP
    const num = parseInt(cp.replace(/\D/g, ''), 10);
    if (num >= 2000 && num <= 2100) {
      // Local Santa Fe / Rosario region
      setShippingCost(4200);
    } else if (num >= 1000 && num <= 1999) {
      // Buenos Aires / CABA
      setShippingCost(5500);
    } else if (num >= 3000 && num <= 3999) {
      // Litoral / Corrientes / Entre Rios
      setShippingCost(5800);
    } else {
      // Interior / Patagonia
      setShippingCost(7500);
    }
  };

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col selection:bg-[#7CFF00] selection:text-black font-sans relative">
      {/* Dynamic Water Particles Background Effect */}
      <WaterParticles />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#141414] border border-[#7CFF00]/60 text-xs font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-[#7CFF00] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with Category links, search, favorites, cart, orders and admin access */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onSelectCategory={handleSelectCategory}
        contact={siteContent.contact}
      />

      {/* Main Landing Sections */}
      <main className="flex-1">
        {/* Hero Full Screen with video background, title, subtitle & action buttons */}
        <Hero
          content={siteContent.hero}
          onExploreProducts={() => {
            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewOffers={() => {
            document.getElementById('ofertas-semana')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Marcas Oficiales de Pesca & Outdoor en Movimiento Continuo (Derecha a Izquierda) */}
        <BrandsMarquee
          onSelectBrand={(brandName) => {
            setSelectedBrandFilter(brandName);
            showToast(`Filtrando por marca: ${brandName}`);
          }}
        />

        {/* Categories: Pesca Deportiva (Reels, Cañas, Señuelos, Multifilamento) */}
        <CategoriesPesca
          categories={siteContent.pescaCategories}
          onSelectCategory={handleSelectCategory}
        />

        {/* Categories: Camping & Outdoor (Carpas, Bolsas, Conservadoras, Termos, Linternas) */}
        <CategoriesCamping
          categories={siteContent.campingCategories}
          onSelectCategory={handleSelectCategory}
        />

        {/* Dynamic Weekly Offer Banner with Live Countdown */}
        <WeeklyOffersBanner
          weeklyOffer={weeklyOffer}
          offer={weeklyOffer}
          products={products}
          onAddToCart={handleAddToCart}
          onClaimOffer={(prodId) => {
            const prod = products?.find((p) => p.id === prodId) || products?.[0];
            if (prod) {
              handleAddToCart(prod, 1);
              setIsCartOpen(true);
            }
          }}
        />

        {/* Anglers Choice: Recomendados por Pescadores del Paraná */}
        <AnglersChoiceCarousel
          products={products}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setSelectedProduct(prod)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Full E-commerce Catalog Section with Filters & Sorting */}
        <CatalogSection
          products={products}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setSelectedProduct(prod)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          selectedCategory={selectedCategoryFilter}
          onSelectCategory={setSelectedCategoryFilter}
          selectedBrand={selectedBrandFilter}
          onSelectBrand={setSelectedBrandFilter}
        />

        {/* Blog & Educational Guides for Paraná Fishing & Camping */}
        <BlogSection posts={siteContent.blogPosts} />

        {/* Testimonios Reales de Pescadores */}
        <TestimonialsSection testimonials={siteContent.testimonials} />

        {/* Nosotros: Historia de RTM Outdoor y el Río Paraná */}
        <AboutUs content={siteContent.about} />

        {/* Contacto & Mapa del Showroom */}
        <ContactSection contact={siteContent.contact} />
      </main>

      {/* Footer with SEO links, payment options, and newsletter */}
      <Footer contact={siteContent.contact} />

      {/* Floating WhatsApp Action Button with n8n Webhook connection */}
      <WhatsAppFloating
        defaultMessage="Hola RTM Outdoor, necesito asesoramiento sobre productos."
        whatsappNumber={siteContent.contact.whatsapp}
        storeName={siteContent.contact.storeName}
      />

      {/* MODALS */}
      {/* 1. Product Quick View Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 2. Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        shippingCost={shippingCost}
        onSetPostalCode={handleSetPostalCode}
        postalCode={postalCode}
      />

      {/* 3. Checkout Modal (Mercado Pago, Transferencia con 10% OFF, Recibo, Seguimiento) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedCoupon={appliedCoupon}
        shippingCost={shippingCost}
        postalCode={postalCode}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* 4. Admin Panel Modal (Gestión de productos, precios, stock, pedidos, cupones, banners, contenido web y CMS) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onSaveProducts={setProducts}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        coupons={coupons}
        onSaveCoupons={setCoupons}
        weeklyOffer={weeklyOffer}
        onSaveWeeklyOffer={setWeeklyOffer}
        siteContent={siteContent}
        onSaveSiteContent={(newContent) => {
          setSiteContent(newContent);
          setStoredItem('rtm_site_content', newContent);
          showToast('✓ Contenido e imágenes de la web guardados correctamente');
        }}
        onResetSiteContent={() => {
          setSiteContent(INITIAL_SITE_CONTENT);
          setStoredItem('rtm_site_content', INITIAL_SITE_CONTENT);
          showToast('Configuración web restablecida a valores por defecto');
        }}
      />

      {/* 5. Customer Orders Modal (Mi Cuenta / Mis Pedidos) */}
      <CustomerOrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      {/* 6. Saved Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        products={products}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />

      {/* 7. Quick Search Overlay Modal */}
      <SearchOverlayModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />
    </div>
  );
};

export default App;
