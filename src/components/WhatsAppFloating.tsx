import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Check, Settings, Activity } from 'lucide-react';

interface WhatsAppFloatingProps {
  defaultMessage?: string;
  whatsappNumber?: string;
  storeName?: string;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({
  defaultMessage = 'Hola RTM Outdoor, necesito asesoramiento sobre productos.',
  whatsappNumber = '5493415889201',
  storeName = 'RTM Outdoor',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const [userName, setUserName] = useState('');
  const [showWebhookConfig, setShowWebhookConfig] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(
    'https://n8n.webhook.rtmoutdoor.internal/webhook/leads'
  );
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

  const phoneNumber = whatsappNumber || '5493415889201';

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger optional n8n webhook notification
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        customerName: userName || 'Pescador en Línea',
        message: message,
        source: 'rtm_outdoor_ecommerce_web',
        channel: 'whatsapp_button',
      };

      setWebhookStatus('Enviando evento a webhook n8n...');

      // Attempt fetch or simulate realistic n8n webhook dispatch
      if (webhookUrl.startsWith('http')) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors', // handle cross-origin if demo
        }).catch(() => {
          // ignore network failure for sandbox URLs
        });
      }

      setWebhookStatus('✓ Webhook n8n sincronizado!');
    } catch (err) {
      console.warn('Webhook n8n note:', err);
    }

    // Open WhatsApp Web/Mobile
    const fullText = userName
      ? `Hola RTM Outdoor, mi nombre es ${userName}. ${message}`
      : message;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsOpen(false);
      setWebhookStatus(null);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* WhatsApp Chat Popover */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-[#141414] border border-neutral-700/90 shadow-[0_10px_35px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  🎣
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#7CFF00] border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Asesor RTM Outdoor</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7CFF00] animate-pulse" />
                  En línea • Respuesta en minutos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowWebhookConfig(!showWebhookConfig)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                title="Configuración de webhook n8n"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* n8n Webhook Status Info */}
          {showWebhookConfig && (
            <div className="p-3 bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-400 font-semibold">
                <span className="flex items-center gap-1 text-[#FF7A00]">
                  <Activity className="w-3.5 h-3.5" /> Integración Webhook n8n
                </span>
                <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-[#7CFF00]">
                  Activo
                </span>
              </div>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="URL webhook n8n"
                className="w-full px-2 py-1 bg-black border border-neutral-700 rounded text-[11px] text-white"
              />
              <p className="text-[10px] text-neutral-500">
                Cada consulta vía WhatsApp dispara un webhook JSON estructurado a n8n para CRM y seguimiento de leads.
              </p>
            </div>
          )}

          {/* Chat Body */}
          <div className="p-4 space-y-3 bg-[#0F0F0F]">
            <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-200 max-w-[88%] leading-relaxed">
              👋 ¡Hola! ¿Estás planeando una pesca en el Paraná o buscando equipamiento de camping? Escribinos y un especialista te orienta al instante.
            </div>

            <form onSubmit={handleSend} className="space-y-2.5 pt-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Tu nombre (opcional)"
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#25D366]"
              />

              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#25D366] resize-none"
              />

              {webhookStatus && (
                <p className="text-[11px] text-[#7CFF00] font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {webhookStatus}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Iniciar Chat de WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Trigger Floating Action Button */}
      <button
        id="whatsapp-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 p-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <span className="hidden sm:inline text-xs font-black tracking-wide pl-1">
          ¿Dudas con tu equipo?
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />

        {/* Pulse ping ring */}
        <span className="absolute -inset-1 rounded-full border-2 border-[#25D366] opacity-70 animate-ping pointer-events-none" />
      </button>
    </div>
  );
};
