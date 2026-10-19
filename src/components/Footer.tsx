import React, { useState } from 'react';
import { 
  Fish, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Send, 
  Check, 
  Instagram, 
  Facebook, 
  Youtube 
} from 'lucide-react';
import { SiteContactConfig } from '../types';

interface FooterProps {
  contact?: SiteContactConfig;
}

export const Footer: React.FC<FooterProps> = ({ contact }) => {
  const storeName = contact?.storeName || 'RTM Outdoor';
  const slogan = contact?.slogan || 'Pesca Deportiva, Camping & Aventura';
  const phone = contact?.phone || '+54 9 341 588-9201';
  const email = contact?.email || 'ventas@rtmoutdoor.com.ar';
  const instagram = contact?.instagramUrl || 'https://instagram.com';
  const facebook = contact?.facebookUrl || 'https://facebook.com';
  const youtube = contact?.youtubeUrl || 'https://youtube.com';

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#080808] border-t border-neutral-800 text-neutral-400 text-xs">
      {/* Newsletter Bar */}
      <div className="border-b border-neutral-800 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[#7CFF00] font-bold text-xs uppercase tracking-wider block mb-1">
                COMUNIDAD DE PESCA & OUTDOOR
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                Suscribite y Recibí 10% OFF en tu Primera Compra
              </h3>
              <p className="text-neutral-400 mt-1">
                Enterate antes que nadie de las crecidas del Paraná, piques de dorados y ofertas flash de temporada.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#7CFF00]/10 border border-[#7CFF00]/40 text-[#7CFF00] font-bold text-xs">
                <Check className="w-4 h-4" />
                <span>¡Suscripción confirmada! Usá el cupón: <strong>PARANA10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full lg:w-auto min-w-[320px]">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Ingresá tu correo electrónico..."
                  className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Unirme</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#7CFF00]/40 shadow-[0_0_15px_rgba(124,255,0,0.2)] bg-black shrink-0">
                <img
                  src={contact?.logoUrl || '/rtm-logo.jpg'}
                  alt="RTM Outdoor"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black tracking-wider text-white font-heading">
                    {storeName}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-medium -mt-0.5">
                  {slogan}
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Tienda especializada en pesca deportiva en el Río Paraná, camping y equipamiento outdoor profesional en Argentina. Distribuidores oficiales de Shimano, Daiwa, Tech Tackle, Don KB, Coleman y Stanley.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FF7A00] hover:border-[#FF7A00] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#7CFF00] hover:border-[#7CFF00] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Pesca Deportiva SEO links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Pesca Deportiva
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Señuelos para Dorado</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Reels de Baitcasting</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Cañas para Río Paraná</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Multifilamento 8X</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Líderes de Acero y Anzuelos</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Combos Pesca Pesada</a></li>
            </ul>
          </div>

          {/* Col 3: Camping & Outdoor */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Camping & Aventura
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Carpas Estructurales</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Bolsas Térmicas -18°C</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Conservadoras Coleman Xtreme</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Termos Stanley Oficiales</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Linternas Frontales Fenix</a></li>
              <li><a href="#productos-catalogo" className="hover:text-white transition-colors">Sillones Plegables de Pesca</a></li>
            </ul>
          </div>

          {/* Col 4: Atención & Medios de Pago */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Seguridad & Envíos
            </h4>
            <div className="space-y-2 text-neutral-400 text-[11px]">
              <p className="flex items-center gap-1.5 text-white font-semibold">
                <CreditCard className="w-3.5 h-3.5 text-[#009EE3]" />
                <span>Mercado Pago en hasta 6 Cuotas</span>
              </p>
              <p className="text-neutral-400">
                Visa, Mastercard, Cabal, Dinero en cuenta.
              </p>

              <p className="flex items-center gap-1.5 text-white font-semibold pt-1">
                <Truck className="w-3.5 h-3.5 text-[#7CFF00]" />
                <span>Envíos Andreani a Todo el País</span>
              </p>
              <p className="text-neutral-400">
                Despacho en 24hs con código de seguimiento en tiempo real.
              </p>

              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                  Atención al Cliente
                </span>
                <p className="text-white font-bold">+54 9 341 588-9201</p>
                <p>ventas@rtmoutdoor.com.ar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with SEO Keywords and Legal */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} RTM Outdoor. Todos los derechos reservados. Rosario, Santa Fe, Argentina.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-neutral-400">
            <span>Tienda de pesca argentina</span>
            <span>•</span>
            <span>Artículos de pesca</span>
            <span>•</span>
            <span>Señuelos para dorado</span>
            <span>•</span>
            <span>Reels de pesca</span>
            <span>•</span>
            <span>Camping argentina</span>
            <span>•</span>
            <span>Pesca Paraná</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
