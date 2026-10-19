import React, { useState } from 'react';
import { Product, Order, Coupon, WeeklyOffer, SiteContent } from '../types';
import { formatCurrency } from '../utils/helpers';
import { 
  X, 
  Plus, 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  Flame, 
  Edit3, 
  Trash2, 
  Check, 
  AlertTriangle,
  TrendingUp,
  Save,
  RefreshCw,
  Globe,
  Image as ImageIcon
} from 'lucide-react';
import { WebContentAdmin } from './admin/WebContentAdmin';
import { HeroCoverAdmin } from './admin/HeroCoverAdmin';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  coupons: Coupon[];
  onSaveCoupons: (coupons: Coupon[]) => void;
  weeklyOffer: WeeklyOffer;
  onSaveWeeklyOffer: (offer: WeeklyOffer) => void;
  siteContent: SiteContent;
  onSaveSiteContent: (newContent: SiteContent) => void;
  onResetSiteContent?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaveProducts,
  orders,
  onUpdateOrderStatus,
  coupons,
  onSaveCoupons,
  weeklyOffer,
  onSaveWeeklyOffer,
  siteContent,
  onSaveSiteContent,
  onResetSiteContent,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'portada' | 'offers' | 'coupons' | 'customers' | 'webcontent'>('products');

  // New product form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: 'Shimano',
    category: 'reels',
    price: 150000,
    stock: 10,
    image: '/images/photo-1544551763-46a013bb70d5.jpg',
    description: '',
    fishingType: 'Baitcasting',
    badge: 'Nuevo',
  });

  // Editing inline state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  // New Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);

  // Editable weekly offer
  const [offerForm, setOfferForm] = useState(weeklyOffer);

  if (!isOpen) return null;

  // Add product handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const fullProduct: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      brand: newProduct.brand || 'RTM Tackles',
      category: newProduct.category || 'senuelos',
      price: Number(newProduct.price),
      installments: {
        count: 6,
        amount: Math.round(Number(newProduct.price) / 6),
      },
      stock: Number(newProduct.stock || 5),
      image:
        newProduct.image ||
        '/images/photo-1516962215378-7fa2e137ae93.jpg',
      rating: 5.0,
      reviewsCount: 1,
      fishingType: newProduct.fishingType as any,
      description: newProduct.description || 'Producto outdoor de alta performance.',
      badge: newProduct.badge as any,
      specs: { 'Calidad': 'Garantía Oficial' },
    };

    onSaveProducts([fullProduct, ...products]);
    setShowAddProduct(false);
    setNewProduct({
      name: '',
      brand: 'Shimano',
      category: 'reels',
      price: 150000,
      stock: 10,
      image: '/images/photo-1544551763-46a013bb70d5.jpg',
      description: '',
      fishingType: 'Baitcasting',
      badge: 'Nuevo',
    });
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto del catálogo?')) {
      onSaveProducts(products.filter((p) => p.id !== id));
    }
  };

  // Quick edit save
  const handleSaveInlineEdit = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          price: editPrice,
          stock: editStock,
          installments: {
            count: 6,
            amount: Math.round(editPrice / 6),
          },
        };
      }
      return p;
    });
    onSaveProducts(updated);
    setEditingProductId(null);
  };

  // Add Coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    const code = newCouponCode.trim().toUpperCase();
    const coupon: Coupon = {
      code,
      discountPercent: newCouponDiscount,
      minSpend: 30000,
      active: true,
      description: `${newCouponDiscount}% de descuento promocional`,
    };
    onSaveCoupons([...coupons, coupon]);
    setNewCouponCode('');
  };

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#121212] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col h-[92vh]">
        {/* Top Bar */}
        <div className="p-4 sm:p-6 bg-[#171717] border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#7CFF00] shadow-[0_0_15px_rgba(124,255,0,0.3)] bg-black shrink-0">
              <img
                src={siteContent?.contact?.logoUrl || '/rtm-logo.jpg'}
                alt="RTM Outdoor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-heading">
                <span>Panel de Administración RTM Outdoor</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#7CFF00] text-black font-extrabold">
                  PRO CONTROL
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Gestión de catálogo en vivo, precios, stock, pedidos y campañas de ofertas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('portada')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-[#7CFF00] border border-[#7CFF00]/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Cambiar Imagen de Portada</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-[#141414] border-b border-neutral-800 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'border-[#7CFF00] text-[#7CFF00]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-[#FF7A00] text-[#FF7A00]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Pedidos ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portada')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'portada'
                ? 'border-[#7CFF00] text-[#7CFF00]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#7CFF00]" />
            <span className="font-extrabold text-[#7CFF00]">Imagen de Portada</span>
            <span className="px-1.5 py-0.5 rounded bg-[#7CFF00]/15 text-[#7CFF00] text-[9px] font-mono">HERO</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'offers'
                ? 'border-[#7CFF00] text-[#7CFF00]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Banners & Ofertas</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'coupons'
                ? 'border-[#7CFF00] text-[#7CFF00]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Cupones ({coupons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'customers'
                ? 'border-[#7CFF00] text-[#7CFF00]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clientes & Métricas</span>
          </button>

          <button
            onClick={() => setActiveTab('webcontent')}
            className={`pb-3 px-3 font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'webcontent'
                ? 'border-[#7CFF00] text-[#7CFF00]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-[#7CFF00]" />
            <span className="font-extrabold text-[#7CFF00]">Contenido & Web CMS</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">Inventario de Productos</h3>
                  <p className="text-xs text-neutral-400">
                    Modificá precios o stock de forma instantánea. Las modificaciones se reflejan en la tienda de inmediato.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="px-4 py-2.5 bg-[#7CFF00] text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 hover:bg-[#6ee000] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Alta de Nuevo Producto</span>
                </button>
              </div>

              {/* Add Product Form Collapse */}
              {showAddProduct && (
                <form
                  onSubmit={handleAddProduct}
                  className="p-5 rounded-2xl bg-neutral-900 border border-neutral-700 space-y-4 animate-in fade-in"
                >
                  <h4 className="text-sm font-bold text-[#7CFF00] uppercase">
                    Cargar Nuevo Producto
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1">
                        Nombre del Producto *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Ej: Reel Marine Sports Titan Pro"
                        className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1">Marca *</label>
                      <input
                        type="text"
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                        placeholder="Ej: Shimano, Daiwa, Doite"
                        className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1">
                        Categoría *
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                      >
                        <option value="reels">Reels</option>
                        <option value="canas">Cañas</option>
                        <option value="senuelos">Señuelos</option>
                        <option value="nylon-multifilamento">Líneas / Multifilamento</option>
                        <option value="carpas">Carpas</option>
                        <option value="bolsas-dormir">Bolsas de Dormir</option>
                        <option value="conservadoras">Conservadoras</option>
                        <option value="termos">Termos</option>
                        <option value="linternas">Linternas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1">
                        Precio ($ ARS) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: Number(e.target.value) })
                        }
                        className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1">
                        Stock Inicial *
                      </label>
                      <input
                        type="number"
                        required
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, stock: Number(e.target.value) })
                        }
                        className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1">Etiqueta</label>
                      <select
                        value={newProduct.badge}
                        onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value as any })}
                        className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                      >
                        <option value="Nuevo">Nuevo</option>
                        <option value="Oferta">Oferta</option>
                        <option value="Más Vendido">Más Vendido</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-neutral-300 font-semibold mb-1">
                        URL de Imagen
                      </label>
                      <input
                        type="url"
                        inputMode="url"
                        placeholder="https://tu-dominio.com/imagen-del-producto.jpg"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                      />
                      <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500">
                        Usá un enlace público y directo a la imagen (que termine en .jpg, .png o .webp). Así podrá cargarse desde cualquier ordenador.
                      </p>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-neutral-300 font-semibold mb-1">
                        Descripción
                      </label>
                      <textarea
                        rows={2}
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, description: e.target.value })
                        }
                        placeholder="Detalles sobre potencia, capacidad y recomendación de uso..."
                        className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#7CFF00] text-black font-bold text-xs rounded-lg"
                    >
                      Guardar en Catálogo
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table with Inline Price & Stock Editing */}
              <div className="rounded-2xl border border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-900 text-neutral-400 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Producto</th>
                        <th className="p-3.5">Marca / Cat.</th>
                        <th className="p-3.5">Precio (ARS)</th>
                        <th className="p-3.5">Stock</th>
                        <th className="p-3.5">Etiqueta</th>
                        <th className="p-3.5 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 bg-[#141414] text-neutral-300">
                      {products.map((product) => {
                        const isEditing = editingProductId === product.id;

                        return (
                          <tr key={product.id} className="hover:bg-neutral-900/50 transition-colors">
                            <td className="p-3.5 flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover bg-neutral-950 shrink-0"
                              />
                              <span className="font-bold text-white max-w-[200px] truncate">
                                {product.name}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <div className="font-medium text-white">{product.brand}</div>
                              <div className="text-[10px] text-neutral-500 capitalize">
                                {product.category}
                              </div>
                            </td>

                            <td className="p-3.5 font-bold">
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(Number(e.target.value))}
                                  className="w-24 p-1 bg-black border border-[#7CFF00] rounded text-white text-xs"
                                />
                              ) : (
                                <span className="text-[#7CFF00]">{formatCurrency(product.price)}</span>
                              )}
                            </td>

                            <td className="p-3.5">
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={editStock}
                                  onChange={(e) => setEditStock(Number(e.target.value))}
                                  className="w-16 p-1 bg-black border border-[#7CFF00] rounded text-white text-xs"
                                />
                              ) : (
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                    product.stock <= 3
                                      ? 'bg-red-950 text-red-400 border border-red-800'
                                      : 'bg-neutral-900 text-neutral-300'
                                  }`}
                                >
                                  {product.stock} un.
                                </span>
                              )}
                            </td>

                            <td className="p-3.5">
                              <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded text-white font-semibold">
                                {product.badge || 'Normal'}
                              </span>
                            </td>

                            <td className="p-3.5 text-right space-x-2">
                              {isEditing ? (
                                <>
                                  <button
                                    onClick={() => handleSaveInlineEdit(product.id)}
                                    className="p-1.5 text-[#7CFF00] hover:bg-neutral-800 rounded"
                                    title="Guardar"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingProductId(null)}
                                    className="p-1.5 text-neutral-400 hover:bg-neutral-800 rounded"
                                    title="Cancelar"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditingProductId(product.id);
                                      setEditPrice(product.price);
                                      setEditStock(product.stock);
                                    }}
                                    className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded"
                                    title="Modificar precio / stock"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded"
                                    title="Eliminar producto"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Historial de Pedidos de Clientes</h3>
                  <p className="text-xs text-neutral-400">
                    Controlá el estado de los despachos y pagos por Mercado Pago o transferencia.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">Total Facturado</span>
                  <span className="text-lg font-black text-[#7CFF00] font-heading">
                    {formatCurrency(totalRevenue)}
                  </span>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800">
                  <ShoppingCart className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                  <p className="text-neutral-300 font-bold">No hay pedidos registrados aún</p>
                  <p className="text-xs text-neutral-500">
                    Realizá una compra de prueba en el carrito para ver cómo impacta aquí en tiempo real.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-white text-sm">
                            {order.id}
                          </span>
                          <span className="text-xs text-neutral-400">{order.date}</span>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-neutral-400">Estado:</span>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              onUpdateOrderStatus(order.id, e.target.value as Order['status'])
                            }
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              order.status === 'Entregado'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : order.status === 'Despachado'
                                ? 'bg-blue-950 text-blue-400 border border-blue-800'
                                : order.status === 'Pagado'
                                ? 'bg-[#7CFF00]/15 text-[#7CFF00] border border-[#7CFF00]/30'
                                : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Pagado">Pagado</option>
                            <option value="En Preparación">En Preparación</option>
                            <option value="Despachado">Despachado</option>
                            <option value="Entregado">Entregado</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer & Shipping */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                        <div>
                          <span className="text-neutral-500 block">Cliente:</span>
                          <strong className="text-white">{order.customer.fullName}</strong>
                          <p className="text-[11px] text-neutral-400">{order.customer.email} • {order.customer.phone}</p>
                        </div>
                        <div>
                          <span className="text-neutral-500 block">Entrega:</span>
                          <p>{order.shippingMethod}</p>
                          <p className="text-[11px] text-neutral-400">{order.customer.address}, {order.customer.city}</p>
                        </div>
                        <div>
                          <span className="text-neutral-500 block">Pago:</span>
                          <p className="capitalize font-semibold text-white">
                            {order.paymentMethod}
                          </p>
                          <p className="text-sm font-black text-[#7CFF00]">
                            {formatCurrency(order.total)}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="pt-2 border-t border-neutral-800 text-xs text-neutral-400 flex flex-wrap gap-2">
                        {order.items.map((i) => (
                          <span key={i.product.id} className="bg-neutral-950 px-2 py-1 rounded border border-neutral-800 text-neutral-300">
                            {i.quantity}x {i.product.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: HERO COVER MANAGEMENT */}
          {activeTab === 'portada' && (
            <HeroCoverAdmin
              siteContent={siteContent}
              onSaveSiteContent={onSaveSiteContent}
              onResetDefaults={onResetSiteContent}
              onCloseModal={onClose}
            />
          )}

          {/* TAB 3: OFFERS & BANNERS */}
          {activeTab === 'offers' && (
            <div className="space-y-6 max-w-2xl">
              {/* Quick Link Card to Hero Portada */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-black border border-[#7CFF00]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-neutral-700 bg-black shrink-0">
                    <img
                      src={siteContent.hero.backgroundImage || '/rtm-logo.jpg'}
                      alt="Portada"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Imagen de Portada Principal (Hero)</span>
                    <p className="text-[11px] text-neutral-400">¿Querés cambiar el fondo de la portada de la web?</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('portada')}
                  className="px-4 py-2 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-md"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-black" />
                  <span>Gestionar Portada</span>
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Configuración del Banner de Ofertas</h3>
                <p className="text-xs text-neutral-400">
                  Actualizá la promo destacada de la semana y su cuenta regresiva.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Título Principal de la Oferta
                  </label>
                  <input
                    type="text"
                    value={offerForm.title}
                    onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Subtítulo / Equipos Incluidos
                  </label>
                  <input
                    type="text"
                    value={offerForm.subtitle}
                    onChange={(e) => setOfferForm({ ...offerForm, subtitle: e.target.value })}
                    className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Etiqueta Descuento
                    </label>
                    <input
                      type="text"
                      value={offerForm.discountBadge}
                      onChange={(e) =>
                        setOfferForm({ ...offerForm, discountBadge: e.target.value })
                      }
                      placeholder="35% OFF"
                      className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Precio Promocional ($)
                    </label>
                    <input
                      type="number"
                      value={offerForm.featuredProductPrice}
                      onChange={(e) =>
                        setOfferForm({
                          ...offerForm,
                          featuredProductPrice: Number(e.target.value),
                        })
                      }
                      className="w-full p-2.5 bg-black border border-neutral-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSaveWeeklyOffer(offerForm);
                    alert('¡Banner de ofertas actualizado!');
                  }}
                  className="px-6 py-2.5 bg-[#7CFF00] text-black font-bold text-xs rounded-xl flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios en Banner</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Gestión de Cupones de Descuento</h3>
                <p className="text-xs text-neutral-400">
                  Creá códigos para promociones en redes sociales o envíos especiales.
                </p>
              </div>

              {/* Add Coupon */}
              <form
                onSubmit={handleAddCoupon}
                className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-wrap items-center gap-3 text-xs"
              >
                <input
                  type="text"
                  required
                  placeholder="Código (ej: RTMVERANO)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="px-3 py-2 bg-black border border-neutral-700 rounded-lg text-white uppercase"
                />
                <div className="flex items-center gap-1 text-neutral-300">
                  <span>Descuento %:</span>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-16 px-2 py-2 bg-black border border-neutral-700 rounded-lg text-white text-center"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7CFF00] text-black font-bold rounded-lg"
                >
                  Crear Cupón
                </button>
              </form>

              {/* List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="p-4 rounded-xl bg-[#171717] border border-neutral-800 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#7CFF00] text-sm">
                        {c.code}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-bold">
                        {c.discountPercent}% OFF
                      </span>
                    </div>
                    <p className="text-neutral-400 text-[11px]">{c.description}</p>
                    <p className="text-[10px] text-neutral-500">Mínimo: {formatCurrency(c.minSpend)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CLIENTS & METRICS */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Métricas de Clientes y Rendimiento</h3>
                <p className="text-xs text-neutral-400">
                  Resumen de la comunidad de pescadores y compradores registrados.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-xs text-neutral-400">Ventas Totales</span>
                  <p className="text-2xl font-black text-[#7CFF00] font-heading mt-1">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-xs text-neutral-400">Pedidos Procesados</span>
                  <p className="text-2xl font-black text-white font-heading mt-1">
                    {orders.length}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-xs text-neutral-400">Ticket Promedio</span>
                  <p className="text-2xl font-black text-[#FF7A00] font-heading mt-1">
                    {orders.length > 0 ? formatCurrency(Math.round(totalRevenue / orders.length)) : '$0'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WEB CONTENT & IMAGES CMS */}
          {activeTab === 'webcontent' && (
            <WebContentAdmin
              siteContent={siteContent}
              onSaveSiteContent={onSaveSiteContent}
              onResetDefaults={onResetSiteContent}
            />
          )}
        </div>
      </div>
    </div>
  );
};
