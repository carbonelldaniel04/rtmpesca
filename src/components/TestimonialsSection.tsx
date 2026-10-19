import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, MessageSquareQuote, CheckCircle2, MapPin } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : TESTIMONIALS;

  return (
    <section className="py-20 bg-[#0E0E0E] relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7CFF00]/10 border border-[#7CFF00]/30 text-xs font-bold text-[#7CFF00] uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Testimonios Reales de la Comunidad</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Experiencias de <span className="text-[#7CFF00]">Nuestros Clientes</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Miles de pescadores deportivos y amantes del camping confían en RTM Outdoor para sus travesías en todo el país.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTestimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-2xl bg-[#141414] border border-neutral-800 p-6 shadow-md hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Customer Info */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-neutral-700"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{t.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7CFF00]" title="Comprador verificado" />
                    </h4>
                    <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF7A00]" /> {t.location}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-neutral-400 truncate bg-neutral-900 px-2 py-1 rounded">
                  Equipamiento: <span className="text-neutral-300 font-medium">{t.gearBought}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
