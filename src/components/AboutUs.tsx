import React from 'react';
import { Compass, Anchor } from 'lucide-react';
import { SiteAboutConfig } from '../types';

interface AboutUsProps {
  content?: SiteAboutConfig;
}

export const AboutUs: React.FC<AboutUsProps> = ({ content }) => {
  const badge = content?.badge || 'Nuestra Pasión & Historia';
  const title = content?.title || 'RTM OUTDOOR:';
  const titleHighlight = content?.titleHighlight || 'Nacidos en el Río, Creados para la Aventura';
  const quote = content?.quote || '"Somos apasionados por la pesca y la aventura. Nuestro objetivo es brindar el mejor equipamiento, asesoramiento y atención para que cada salida sea una experiencia inolvidable."';
  const quoteAuthor = content?.quoteAuthor || '— Equipo Fundador de RTM Outdoor';
  const p1 = content?.paragraph1 || 'Nacimos a orillas del majestuoso Río Paraná, guiados por el magnetismo del dorado y las noches estrelladas de campamento en las islas. Lo que empezó como un grupo de amigos intercambiando señuelos y anécdotas de pesca se convirtió en la tienda de referencia para miles de pescadores deportivos y amantes del outdoor en toda la Argentina.';
  const p2 = content?.paragraph2 || 'No somos un comercio genérico: cada caña que recomendamos, cada reel que despachamos y cada carpa que exhibimos ha sido testeada en condiciones reales de frío, viento y correntada. Cuando hablás con nosotros, hablás con pescadores de verdad.';
  const imgUrl = content?.image || '/about-us.jpg';
  const cardTitle = content?.imageCardTitle || 'Base Fluvial & Showroom';
  const cardSubtitle = content?.imageCardSubtitle || 'Atención directa a guías y aficionados';
  const stat1Num = content?.stat1Number || '+15 Años';
  const stat1Lbl = content?.stat1Label || 'Navegando el Paraná';
  const stat2Num = content?.stat2Number || '+50.000';
  const stat2Lbl = content?.stat2Label || 'Envíos a todo el país';
  const stat3Num = content?.stat3Number || '100%';
  const stat3Lbl = content?.stat3Label || 'Asesoramiento genuino';

  return (
    <section id="nosotros" className="py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7CFF00]/10 border border-[#7CFF00]/30 text-xs font-bold text-[#7CFF00] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-heading">
              {title} <span className="text-[#7CFF00]">{titleHighlight}</span>
            </h2>

            {/* Required user quote highlighted */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border-l-4 border-[#7CFF00] border-y border-r border-neutral-800 shadow-xl">
              <p className="text-lg sm:text-xl font-bold text-white italic leading-relaxed">
                {quote}
              </p>
              <span className="block text-xs font-semibold text-[#FF7A00] mt-3 uppercase tracking-wider">
                {quoteAuthor}
              </span>
            </div>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {p1}
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed">
              {p2}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#7CFF00] font-heading block">
                  {stat1Num}
                </span>
                <span className="text-xs text-neutral-400">{stat1Lbl}</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-heading block">
                  {stat2Num}
                </span>
                <span className="text-xs text-neutral-400">{stat2Lbl}</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#FF7A00] font-heading block">
                  {stat3Num}
                </span>
                <span className="text-xs text-neutral-400">{stat3Lbl}</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-700 shadow-2xl">
              <img
                src={imgUrl}
                alt="Showroom y base fluvial RTM Outdoor"
                className="w-full h-full object-cover min-h-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#7CFF00]/15 text-[#7CFF00]">
                    <Anchor className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{cardTitle}</h4>
                    <p className="text-xs text-neutral-400">{cardSubtitle}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#FF7A00] uppercase tracking-wider px-2.5 py-1 bg-neutral-800 rounded-lg">
                  RTM Pro Staff
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
