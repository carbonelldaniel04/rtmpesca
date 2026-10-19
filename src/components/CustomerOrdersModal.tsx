import React from 'react';
import { Order } from '../types';
import { formatCurrency } from '../utils/helpers';
import { X, PackageCheck, Truck, Calendar, ShoppingBag, ExternalLink } from 'lucide-react';

interface CustomerOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const CustomerOrdersModal: React.FC<CustomerOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 bg-[#1A1A1A] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#7CFF00]/50 bg-black shrink-0">
              <img
                src="/rtm-logo.jpg"
                alt="RTM Outdoor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              Mi Cuenta • Historial de Pedidos ({orders.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
              <p className="text-sm text-neutral-300 font-bold">No tenés pedidos registrados</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Los pedidos que realices en RTM Outdoor quedarán guardados aquí con su código de seguimiento.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                  <div>
                    <span className="font-mono font-bold text-white text-sm block">
                      Orden #{order.id}
                    </span>
                    <span className="text-[11px] text-neutral-400">{order.date}</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      order.status === 'Entregado'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : order.status === 'Despachado'
                        ? 'bg-blue-950 text-blue-400 border border-blue-800'
                        : order.status === 'Pagado'
                        ? 'bg-[#7CFF00]/15 text-[#7CFF00] border border-[#7CFF00]/30'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-1 text-neutral-300">
                  <p>
                    <strong className="text-white">Envío:</strong> {order.shippingMethod}
                  </p>
                  {order.trackingCode && (
                    <p className="flex items-center gap-1.5 text-neutral-400">
                      <Truck className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>Seguimiento:</span>
                      <strong className="text-[#7CFF00] font-mono">{order.trackingCode}</strong>
                    </p>
                  )}
                </div>

                {/* Items */}
                <div className="pt-2 border-t border-neutral-800 space-y-1">
                  {order.items.map((it) => (
                    <div key={it.product.id} className="flex justify-between text-neutral-400 text-[11px]">
                      <span className="truncate max-w-[280px]">
                        {it.quantity}x {it.product.name}
                      </span>
                      <span className="text-white font-medium">
                        {formatCurrency(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-800">
                  <span className="font-bold text-neutral-300">Total:</span>
                  <span className="text-sm font-black text-[#7CFF00]">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
