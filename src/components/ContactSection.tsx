import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { SiteContactConfig } from '../types';

interface ContactSectionProps {
  contact?: SiteContactConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const storeName = contact?.storeName || 'RTM Outdoor';
  const address = contact?.address || 'Av. Costanera del Paraná 2480';
  const addressDetails = contact?.addressDetails || 'Rosario / Santa Fe, Argentina (Frente a guardería náutica)';
  const phone = contact?.phone || '+54 9 341 588-9201';
  const email = contact?.email || 'ventas@rtmoutdoor.com.ar';
  const hours = contact?.hours || 'Lunes a Sábados: 08:30 a 19:30 hs';

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    consulta: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.consulta) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ nombre: '', telefono: '', email: '', consulta: '' });
    }, 2000);
  };

  return (
    <section id="contacto" className="py-24 bg-[#0E0E0E] relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7CFF00]/10 border border-[#7CFF00]/30 text-xs font-bold text-[#7CFF00] uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Atención Personalizada</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Contactate con <span className="text-[#7CFF00]">{storeName}</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            ¿Tenés dudas sobre qué caña elegir para tu próxima salida al río o qué carpa necesitas? Nuestro equipo de pescadores te responde al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Info & Integrated Stylized Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#141414] border border-neutral-800 space-y-5">
              <h3 className="text-xl font-bold text-white font-heading">
                Punto de Venta & Showroom
              </h3>

              <div className="space-y-4 text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{address}</p>
                    <p className="text-xs text-neutral-400">{addressDetails}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#7CFF00] shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{phone}</p>
                    <p className="text-xs text-neutral-400">Línea directa & WhatsApp de asesoramiento</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#FF7A00] shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{email}</p>
                    <p className="text-xs text-neutral-400">Consultas comerciales y mayoristas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#7CFF00] shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{hours}</p>
                    <p className="text-xs text-neutral-400">Guardia de carnadas y consultas náuticas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Interactive Map Card */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 h-64 shadow-lg group">
              <iframe
                title="Mapa Showroom RTM Outdoor Paraná"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107134.79374495574!2d-60.72591653556098!3d-32.95208643891469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6539335d7d75b%3A0xec4086e90258a557!2sRosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                className="w-full h-full border-0 filter invert contrast-125 opacity-75 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-[#0B0B0B]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700 text-xs font-bold text-white flex items-center gap-2 pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7CFF00] animate-ping" />
                <span>Base Náutica {storeName}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#141414] border border-neutral-800 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                Envianos tu Consulta
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6">
                Te asesoramos sobre señuelos según el estado del río, armados de cañas y disponibilidad de stock.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-[#7CFF00]/10 border border-[#7CFF00]/40 text-center space-y-3 animate-in fade-in">
                  <CheckCircle className="w-12 h-12 text-[#7CFF00] mx-auto" />
                  <h4 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-sm text-neutral-300">
                    Gracias {formData.nombre}. Un especialista de RTM Outdoor te responderá a tu email o WhatsApp a la brevedad.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-neutral-800 text-xs text-white font-semibold hover:bg-neutral-700"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-neutral-300 mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Marcelo Rossi"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-[#7CFF00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-neutral-300 mb-1.5">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="Ej: 341 555-1234"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-[#7CFF00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-neutral-300 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tuemail@ejemplo.com"
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-[#7CFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-neutral-300 mb-1.5">
                      Consulta o Asesoramiento *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.consulta}
                      onChange={(e) => setFormData({ ...formData, consulta: e.target.value })}
                      placeholder="Contanos a qué zona viajas, qué especie querés pescar o qué equipamiento estás buscando..."
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-[#7CFF00] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(124,255,0,0.3)] transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Consulta al Equipo RTM</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
