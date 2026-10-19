import React, { useState } from 'react';
import { CartItem, Coupon, Order, OrderCustomer } from '../types';
import { formatCurrency, formatInstallments } from '../utils/helpers';
import confetti from 'canvas-confetti';
import { 
  X, 
  CreditCard, 
  Building2, 
  Truck, 
  CheckCircle, 
  ShieldCheck, 
  Copy, 
  QrCode, 
  Printer, 
  ExternalLink,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  shippingCost: number;
  postalCode: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  shippingCost,
  postalCode,
  onOrderPlaced,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: '',
    email: '',
    phone: '',
    dni: '',
    address: '',
    city: '',
    province: 'Santa Fe',
    postalCode: postalCode || '2000',
    notes: '',
  });

  const [shippingMethod, setShippingMethod] = useState<'andreani-domicilio' | 'andreani-sucursal' | 'retiro-local'>(
    'andreani-domicilio'
  );
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'transferencia'>('mercadopago');
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [mpInstallments, setMpInstallments] = useState(6);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const couponDiscount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  // 10% extra discount for bank transfer
  const transferDiscount =
    paymentMethod === 'transferencia' ? Math.round(subtotal * 0.1) : 0;

  const totalDiscount = couponDiscount + transferDiscount;

  const actualShipping =
    shippingMethod === 'retiro-local' ? 0 : subtotal >= 120000 ? 0 : shippingCost;

  const finalTotal = Math.max(0, subtotal - totalDiscount + actualShipping);

  const handleCopyAlias = () => {
    navigator.clipboard.writeText('RTM.OUTDOOR.PARANA');
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2000);
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `RTM-${Date.now().toString().slice(-6)}`;
    const trackingCode = `AND-AR-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer,
      items: [...cartItems],
      subtotal,
      discount: totalDiscount,
      shippingCost: actualShipping,
      shippingMethod:
        shippingMethod === 'retiro-local'
          ? 'Retiro en Showroom RTM (Rosario)'
          : shippingMethod === 'andreani-sucursal'
          ? 'Andreani a Sucursal'
          : 'Andreani a Domicilio Express',
      total: finalTotal,
      paymentMethod,
      status: paymentMethod === 'mercadopago' ? 'Pagado' : 'Pendiente',
      couponCode: appliedCoupon?.code,
      trackingCode,
    };

    setConfirmedOrder(newOrder);
    onOrderPlaced(newOrder);
    setStep('confirmation');

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7CFF00', '#FF7A00', '#FFFFFF'],
      });
    } catch (err) {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#121212] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#171717] border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#7CFF00]/50 shadow-[0_0_10px_rgba(124,255,0,0.3)] bg-black shrink-0">
              <img
                src="/rtm-logo.jpg"
                alt="RTM Outdoor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-heading">RTM Outdoor</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#7CFF00] text-black">
                CHECKOUT SEGURO
              </span>
            </div>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 'details' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white font-heading">
                1. Datos de Contacto y Envío
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="Ej: Javier Domínguez"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    DNI o CUIT *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.dni}
                    onChange={(e) => setCustomer({ ...customer, dni: e.target.value })}
                    placeholder="Para factura y seguro de envío"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Email de Confirmación *
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="tuemail@ejemplo.com"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="Ej: 341 512-3456"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Dirección (Calle y Número) *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Ej: San Martín 1540 Piso 3 Dpto B"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Ciudad / Localidad *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="Ej: Rosario"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-300 mb-1">
                    Provincia *
                  </label>
                  <select
                    value={customer.province}
                    onChange={(e) => setCustomer({ ...customer, province: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                  >
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Salta">Salta</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Otras">Otras provincias</option>
                  </select>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <label className="block text-xs uppercase font-bold text-neutral-300">
                  Método de Entrega
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setShippingMethod('andreani-domicilio')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'andreani-domicilio'
                        ? 'bg-[#7CFF00]/10 border-[#7CFF00] text-white'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#7CFF00] mb-1.5" />
                    <h5 className="text-xs font-bold">Andreani Domicilio</h5>
                    <p className="text-[10px] text-neutral-400 mt-1">2 a 4 días hábiles</p>
                    <span className="text-xs font-bold text-[#7CFF00] mt-1 block">
                      {subtotal >= 120000 ? 'GRATIS' : formatCurrency(shippingCost)}
                    </span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('andreani-sucursal')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'andreani-sucursal'
                        ? 'bg-[#7CFF00]/10 border-[#7CFF00] text-white'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#FF7A00] mb-1.5" />
                    <h5 className="text-xs font-bold">Andreani Sucursal</h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Retiro en agencia más cercana</p>
                    <span className="text-xs font-bold text-[#7CFF00] mt-1 block">
                      {subtotal >= 120000 ? 'GRATIS' : formatCurrency(Math.round(shippingCost * 0.85))}
                    </span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('retiro-local')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'retiro-local'
                        ? 'bg-[#7CFF00]/10 border-[#7CFF00] text-white'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-white mb-1.5" />
                    <h5 className="text-xs font-bold">Retiro en Showroom</h5>
                    <p className="text-[10px] text-neutral-400 mt-1">Rosario Costanera</p>
                    <span className="text-xs font-bold text-[#7CFF00] mt-1 block">GRATIS</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => {
                    if (!customer.fullName || !customer.email || !customer.phone) {
                      alert('Por favor complete los campos obligatorios (*)');
                      return;
                    }
                    setStep('payment');
                  }}
                  className="px-8 py-3.5 bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Continuar al Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('details')}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 mb-2"
              >
                <ChevronLeft className="w-4 h-4" /> Volver a datos de envío
              </button>

              <h3 className="text-xl font-bold text-white font-heading">
                2. Seleccioná tu Medio de Pago
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mercado Pago Option */}
                <div
                  onClick={() => setPaymentMethod('mercadopago')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                    paymentMethod === 'mercadopago'
                      ? 'bg-[#009EE3]/15 border-[#009EE3] text-white'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#009EE3]" />
                      <span className="font-extrabold text-sm text-white">Mercado Pago</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#009EE3] text-white">
                      3 y 6 Cuotas
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Tarjetas de Crédito, Débito, Dinero en cuenta o QR al instante.
                  </p>
                  <div className="mt-3 pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                    Acreditación inmediata y protección al comprador.
                  </div>
                </div>

                {/* Transferencia Bancaria Option */}
                <div
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all relative ${
                    paymentMethod === 'transferencia'
                      ? 'bg-[#7CFF00]/15 border-[#7CFF00] text-white'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#7CFF00]" />
                      <span className="font-extrabold text-sm text-white">Transferencia Bancaria</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#7CFF00] text-black">
                      10% OFF EXTRA
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Pagá desde tu homebanking o billetera virtual con descuento directo.
                  </p>
                  <div className="mt-3 pt-2 border-t border-neutral-800/80 text-[11px] text-[#7CFF00] font-semibold">
                    Ahorrás {formatCurrency(Math.round(subtotal * 0.1))} extra!
                  </div>
                </div>
              </div>

              {/* Payment Details Drawer */}
              {paymentMethod === 'transferencia' ? (
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <h4 className="text-xs uppercase font-bold text-[#7CFF00] tracking-wider">
                    Datos para la Transferencia Bancaria
                  </h4>
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5 text-xs text-neutral-300 font-mono">
                    <div className="flex justify-between items-center">
                      <span>Alias:</span>
                      <div className="flex items-center gap-2">
                        <strong className="text-[#7CFF00]">RTM.OUTDOOR.PARANA</strong>
                        <button
                          onClick={handleCopyAlias}
                          className="p-1 text-neutral-400 hover:text-white"
                          title="Copiar Alias"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {copiedAlias && (
                      <p className="text-[10px] text-[#7CFF00] text-right font-sans font-bold">
                        ¡Copiado al portapapeles!
                      </p>
                    )}
                    <div className="flex justify-between">
                      <span>CBU:</span>
                      <strong className="text-white">0000003100049281726354</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Titular:</span>
                      <strong className="text-white">RTM OUTDOOR S.R.L.</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Banco:</span>
                      <strong className="text-white">Banco Macro / Santa Fe</strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Al confirmar tu pedido se reservará el stock por 24 horas para enviar el comprobante por WhatsApp.
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Elegir Cuotas con Tarjeta:</span>
                    <select
                      value={mpInstallments}
                      onChange={(e) => setMpInstallments(Number(e.target.value))}
                      className="px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white"
                    >
                      <option value={1}>1 pago de {formatCurrency(finalTotal)}</option>
                      <option value={3}>3 cuotas sin interés de {formatCurrency(Math.round(finalTotal / 3))}</option>
                      <option value={6}>6 cuotas sin interés de {formatCurrency(Math.round(finalTotal / 6))}</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Procesado de forma 100% segura a través del portal oficial de Mercado Pago Argentina.
                  </p>
                </div>
              )}

              {/* Order Summary Box */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Productos ({cartItems.length})</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#7CFF00] font-semibold">
                    <span>Descuentos Aplicados</span>
                    <span>-{formatCurrency(totalDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Costo de Envío</span>
                  <span className={actualShipping === 0 ? 'text-[#7CFF00]' : 'text-white'}>
                    {actualShipping === 0 ? 'GRATIS' : formatCurrency(actualShipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-neutral-800">
                  <span>TOTAL A PAGAR</span>
                  <span className="text-[#7CFF00]">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              {/* Confirm & Place Order */}
              <button
                onClick={handleProcessOrder}
                className="w-full py-4 px-6 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(124,255,0,0.35)] transition-all cursor-pointer"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Confirmar y Finalizar Pedido</span>
              </button>
            </div>
          )}

          {step === 'confirmation' && confirmedOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#7CFF00]/15 border-2 border-[#7CFF00] flex items-center justify-center mx-auto text-[#7CFF00] animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  ¡Pedido Confirmado con Éxito!
                </h3>
                <p className="text-sm text-neutral-300 mt-2">
                  Gracias <strong className="text-white">{confirmedOrder.customer.fullName}</strong> por confiar en RTM Outdoor.
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Enviamos el comprobante y detalle de seguimiento a <strong className="text-white">{confirmedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-left text-xs space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-2.5">
                  <span className="text-neutral-400">N° de Orden:</span>
                  <strong className="text-white font-mono text-sm">{confirmedOrder.id}</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Código de Seguimiento Andreani:</span>
                  <strong className="text-[#7CFF00] font-mono">{confirmedOrder.trackingCode}</strong>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Método de Pago:</span>
                  <span className="capitalize font-semibold text-white">
                    {confirmedOrder.paymentMethod === 'mercadopago' ? 'Mercado Pago (Pagado)' : 'Transferencia Bancaria'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Destino de Entrega:</span>
                  <span className="font-semibold text-white truncate max-w-[200px]">
                    {confirmedOrder.customer.address}, {confirmedOrder.customer.city}
                  </span>
                </div>

                <div className="flex justify-between items-center border-t border-neutral-800 pt-2.5">
                  <span className="font-bold text-white">Total Abonado:</span>
                  <strong className="text-base text-[#7CFF00] font-black">
                    {formatCurrency(confirmedOrder.total)}
                  </strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href={`https://wa.me/5493415889201?text=${encodeURIComponent(
                    `Hola RTM Outdoor! Acabo de realizar el pedido ${confirmedOrder.id} por ${formatCurrency(
                      confirmedOrder.total
                    )}. ¿Cómo sigue el despacho?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  <span>Notificar por WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-neutral-800 text-white font-bold text-xs rounded-xl hover:bg-neutral-700"
                >
                  Volver a la Tienda
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
