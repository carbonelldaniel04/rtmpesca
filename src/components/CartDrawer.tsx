import React, { useState } from 'react';
import { CartItem, Coupon } from '../types';
import { formatCurrency, formatInstallments } from '../utils/helpers';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Truck, 
  ArrowRight, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  shippingCost: number;
  onSetPostalCode: (cp: string) => void;
  postalCode: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  shippingCost,
  onSetPostalCode,
  postalCode,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [cpInput, setCpInput] = useState(postalCode);
  const [shippingCalculated, setShippingCalculated] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const finalShipping = subtotal >= 120000 ? 0 : shippingCost;
  const total = Math.max(0, subtotal - discountAmount + finalShipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const res = onApplyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpInput.trim()) return;
    onSetPostalCode(cpInput.trim());
    setShippingCalculated(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-neutral-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 bg-[#171717] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7CFF00]" />
              <h2 className="text-base font-bold text-white">
                Tu Carrito de Compras ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#1A1A1A] border-b border-neutral-800 text-xs">
            {subtotal >= 120000 ? (
              <p className="text-[#7CFF00] font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> ¡Felicitaciones! Tenés ENVÍO GRATIS a todo el país
              </p>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-neutral-300">
                  <span>Envío Gratis desde $120.000</span>
                  <span className="font-bold text-[#FF7A00]">
                    Faltan {formatCurrency(120000 - subtotal)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF7A00] to-[#7CFF00] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / 120000) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-neutral-300 font-bold">Tu carrito está vacío</p>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Agregá cañas, reels, señuelos para dorado o equipamiento de camping para comenzar.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#7CFF00] text-black font-extrabold text-xs shadow-md"
                >
                  Explorar Productos
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-[#171717] border border-neutral-800 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-neutral-950 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#FF7A00] uppercase tracking-wider block">
                      {item.product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate" title={item.product.name}>
                      {item.product.name}
                    </h4>

                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm font-extrabold text-[#7CFF00]">
                        {formatCurrency(item.product.price)}
                      </span>
                      {item.product.originalPrice && (
                        <span className="text-[10px] text-neutral-500 line-through">
                          {formatCurrency(item.product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-neutral-700 bg-neutral-900 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-neutral-300 hover:text-white hover:bg-neutral-800 text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-1 text-neutral-300 hover:text-white hover:bg-neutral-800 text-xs font-bold disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#141414] border-t border-neutral-800 space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="p-2.5 rounded-xl bg-[#7CFF00]/10 border border-[#7CFF00]/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#7CFF00] font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Cupon {appliedCoupon.code} ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-neutral-400 hover:text-white text-[11px] underline"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Cupón (ej: PARANA10)"
                      className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white uppercase placeholder:text-neutral-500 focus:outline-none focus:border-[#7CFF00]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-xl"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-400 mt-1">{couponError}</p>
                )}
              </div>

              {/* Postal Code Shipping Calculator */}
              <div className="text-xs space-y-1">
                <form onSubmit={handleCalculateShipping} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cpInput}
                    onChange={(e) => setCpInput(e.target.value)}
                    placeholder="Código Postal (ej: 2000)"
                    className="flex-1 px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white rounded-xl"
                  >
                    Calcular Envío
                  </button>
                </form>
                {shippingCalculated && (
                  <p className="text-[11px] text-neutral-400">
                    {subtotal >= 120000
                      ? '✓ Envío bonificado a tu código postal'
                      : `Costo estimado de envío: ${formatCurrency(shippingCost)} por Andreani`}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-800 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#7CFF00]">
                    <span>Descuento ({appliedCoupon.code})</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Costo de Envío</span>
                  <span className={finalShipping === 0 ? 'text-[#7CFF00] font-bold' : 'text-white'}>
                    {finalShipping === 0 ? 'GRATIS' : formatCurrency(finalShipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-neutral-800">
                  <span>TOTAL ESTIMADO</span>
                  <span className="text-[#7CFF00] text-base">{formatCurrency(total)}</span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  💳 O hasta 6 cuotas de {formatCurrency(Math.round(total / 6))} con Mercado Pago
                </p>
              </div>

              {/* Proceed Button */}
              <button
                id="cart-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,255,0,0.3)] transition-all cursor-pointer"
              >
                <span>Iniciar Compra Segura</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7CFF00]" />
                <span>Sitio protegido con encriptación SSL de 256 bits</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
