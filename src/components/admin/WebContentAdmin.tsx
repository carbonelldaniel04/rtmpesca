import React, { useState } from 'react';
import { 
  SiteContent, 
  SiteHeroConfig, 
  SiteContactConfig, 
  SiteAboutConfig,
  CategoryCard,
  BlogPost,
  Testimonial
} from '../../types';
import { 
  Image, 
  Compass, 
  Phone, 
  Fish, 
  Tent, 
  BookOpen, 
  MessageSquareQuote, 
  Check, 
  RotateCcw, 
  Save, 
  Sparkles, 
  Eye, 
  Plus, 
  Trash2,
  Sliders,
  ExternalLink,
  Upload
} from 'lucide-react';

interface WebContentAdminProps {
  siteContent: SiteContent;
  onSaveSiteContent: (newContent: SiteContent) => void;
  onResetDefaults?: () => void;
}

// Preset Curated High Quality Outdoor / Fishing Images for one-click selection
const HERO_BG_PRESETS = [
  {
    name: 'Pescador Dorado Paraná (Atardecer)',
    url: '/hero-bg.jpg',
  },
  {
    name: 'Río Paraná / Agua & Naturaleza',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Lancha & Expedición Fluvial',
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Campamento en la Isla al Fuego',
    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Fly Fishing & Spinning Extremo',
    url: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Costa y Bosque en Galería',
    url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=2000&q=85',
  },
];

const ABOUT_IMG_PRESETS = [
  {
    name: 'Pescador y Señuelos al Atardecer',
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Equipo de Pesca Profesional',
    url: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Travesía en Kayak & Camping',
    url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85',
  },
];

export const WebContentAdmin: React.FC<WebContentAdminProps> = ({
  siteContent,
  onSaveSiteContent,
  onResetDefaults,
}) => {
  const [activeSection, setActiveSection] = useState<
    'hero' | 'contact' | 'about' | 'pesca' | 'camping' | 'blog' | 'testimonials'
  >('hero');

  // Working copy of state
  const [formData, setFormData] = useState<SiteContent>(siteContent);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync if prop updates from outside
  React.useEffect(() => {
    setFormData(siteContent);
  }, [siteContent]);

  const handleHeroChange = (field: keyof SiteHeroConfig, val: string) => {
    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: val,
      },
    }));
  };

  const handleContactChange = (field: keyof SiteContactConfig, val: any) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: val,
      },
    }));
  };

  const handleAboutChange = (field: keyof SiteAboutConfig, val: string) => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: val,
      },
    }));
  };

  // Pesca Categories editing
  const handlePescaCategoryChange = (index: number, field: keyof CategoryCard, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.pescaCategories];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, pescaCategories: updated };
    });
  };

  // Camping Categories editing
  const handleCampingCategoryChange = (index: number, field: keyof CategoryCard, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.campingCategories];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, campingCategories: updated };
    });
  };

  // Blog Posts editing
  const handleBlogPostChange = (index: number, field: keyof BlogPost, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.blogPosts];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, blogPosts: updated };
    });
  };

  const handleAddBlogPost = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: 'Nueva Guía de Pesca Paraná',
      slug: `nueva-guia-${Date.now()}`,
      excerpt: 'Consejos técnicos actualizados para pesca deportiva en el litoral argentino.',
      content: 'Contenido técnico de la guía...',
      date: 'Hoy',
      readTime: '5 min de lectura',
      author: 'Staff RTM Outdoor',
      category: 'Técnicas de Pesca',
      image: '/images/photo-1544551763-46a013bb70d5.jpg',
      tags: ['Pesca', 'Paraná', 'Equipamiento'],
    };
    setFormData((prev) => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts],
    }));
  };

  const handleDeleteBlogPost = (index: number) => {
    setFormData((prev) => {
      const updated = prev.blogPosts.filter((_, i) => i !== index);
      return { ...prev, blogPosts: updated };
    });
  };

  // Testimonials editing
  const handleTestimonialChange = (index: number, field: keyof Testimonial, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.testimonials];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, testimonials: updated };
    });
  };

  const handleAddTestimonial = () => {
    const newT: Testimonial = {
      id: `t-${Date.now()}`,
      name: 'Cliente RTM Outdoor',
      location: 'Santa Fe, Argentina',
      avatar: '/images/photo-1507003211169-0a1dd7228f2d.jpg',
      rating: 5,
      comment: 'Excelente atención y despacho rápido por Andreani. Equipos 100% originales.',
      verifiedBuyer: true,
      gearBought: 'Caña + Reel Baitcasting',
    };
    setFormData((prev) => ({
      ...prev,
      testimonials: [newT, ...prev.testimonials],
    }));
  };

  const handleDeleteTestimonial = (index: number) => {
    setFormData((prev) => {
      const updated = prev.testimonials.filter((_, i) => i !== index);
      return { ...prev, testimonials: updated };
    });
  };

  const handleSaveAll = () => {
    onSaveSiteContent(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Section Switcher & Save Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#7CFF00]" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Gestor de Contenido & Imágenes de la Web (CMS)
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Modificá en tiempo real textos, eslóganes, banners, fotos de categorías, historia y redes sociales de toda la tienda.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          {onResetDefaults && (
            <button
              type="button"
              onClick={onResetDefaults}
              title="Restablecer textos e imágenes originales"
              className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
              <span>Restablecer</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveAll}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,255,0,0.3)] hover:scale-102 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-black" />
                <span>¡Cambios Guardados!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-black" />
                <span>Guardar Cambios Web</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800 no-scrollbar text-xs">
        <button
          type="button"
          onClick={() => setActiveSection('hero')}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'hero'
              ? 'bg-[#7CFF00] text-black shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hero & Portada</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('contact')}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'contact'
              ? 'bg-[#7CFF00] text-black shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Empresa & Contacto</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('about')}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'about'
              ? 'bg-[#7CFF00] text-black shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Sobre Nosotros</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('pesca')}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'pesca'
              ? 'bg-[#7CFF00] text-black shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Fish className="w-3.5 h-3.5" />
          <span>Categorías Pesca ({formData.pescaCategories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('camping')}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'camping'
              ? 'bg-[#7CFF00] text-black shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Tent className="w-3.5 h-3.5" />
          <span>Categorías Camping ({formData.campingCategories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('blog')}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'blog'
              ? 'bg-[#7CFF00] text-black shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Artículos Blog ({formData.blogPosts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('testimonials')}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeSection === 'testimonials'
              ? 'bg-[#7CFF00] text-black shadow-md'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>Testimonios ({formData.testimonials.length})</span>
        </button>
      </div>

      {/* SECTION 1: HERO & PORTADA */}
      {activeSection === 'hero' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Image className="w-4 h-4 text-[#7CFF00]" />
              <span>Imagen de Fondo Principal del Hero</span>
            </h4>

            {/* Background preview */}
            <div className="relative h-56 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950">
              <img
                src={formData.hero.backgroundImage}
                alt="Vista previa fondo hero"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="px-2 py-1 rounded bg-black/80 text-white font-mono text-[11px] border border-neutral-700">
                  Previsualización en Vivo
                </span>
                <a
                  href={formData.hero.backgroundImage}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-neutral-800/90 text-neutral-300 hover:text-white flex items-center gap-1 border border-neutral-700"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Ver original</span>
                </a>
              </div>
            </div>

            {/* Local file upload option */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#7CFF00]/10 text-[#7CFF00] border border-[#7CFF00]/20">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Subir foto desde tu dispositivo</h5>
                  <p className="text-[11px] text-neutral-400">Elegí una imagen (JPG, PNG, WEBP) desde tu computadora o celular</p>
                </div>
              </div>
              <label className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-[#7CFF00] text-neutral-200 hover:text-black font-bold text-xs transition-colors cursor-pointer shrink-0">
                <span>Seleccionar archivo</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const img = new window.Image();
                      img.onload = () => {
                        const maxDim = 1920;
                        let w = img.width;
                        let h = img.height;
                        if (w > maxDim || h > maxDim) {
                          if (w > h) {
                            h = Math.round((h * maxDim) / w);
                            w = maxDim;
                          } else {
                            w = Math.round((w * maxDim) / h);
                            h = maxDim;
                          }
                        }
                        const canvas = document.createElement('canvas');
                        canvas.width = w;
                        canvas.height = h;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                          ctx.drawImage(img, 0, 0, w, h);
                          handleHeroChange('backgroundImage', canvas.toDataURL('image/jpeg', 0.85));
                        } else {
                          handleHeroChange('backgroundImage', ev.target?.result as string);
                        }
                      };
                      img.src = ev.target?.result as string;
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                O ingresá la URL directa de la imagen (HD)
              </label>
              <input
                type="url"
                value={formData.hero.backgroundImage}
                onChange={(e) => handleHeroChange('backgroundImage', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
              />
            </div>

            {/* Presets */}
            <div>
              <span className="block text-[11px] font-semibold text-neutral-400 mb-2">
                Fondos Sugeridos de Alto Impacto (Click para aplicar):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HERO_BG_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleHeroChange('backgroundImage', preset.url)}
                    className="relative group h-20 rounded-lg overflow-hidden border border-neutral-800 hover:border-[#7CFF00] text-left transition-all cursor-pointer"
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors" />
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] text-white font-medium truncate block">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Badges & Titles */}
          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
            <h4 className="text-sm font-bold text-white">Etiqueta Superior (Eyebrow Badge)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Ubicación / Región Destacada</label>
                <input
                  type="text"
                  value={formData.hero.badgeLocation}
                  onChange={(e) => handleHeroChange('badgeLocation', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Temporada / Leyenda</label>
                <input
                  type="text"
                  value={formData.hero.badgeSeason}
                  onChange={(e) => handleHeroChange('badgeSeason', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                />
              </div>
            </div>

            <h4 className="text-sm font-bold text-white pt-2 border-t border-neutral-800">
              Composición del Título Principal
            </h4>
            <p className="text-xs text-neutral-400">
              Permite resaltar palabras clave en colores verde neón y naranja degradé:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Texto Inicio</label>
                <input
                  type="text"
                  value={formData.hero.titlePart1}
                  onChange={(e) => handleHeroChange('titlePart1', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#7CFF00] font-bold mb-1">Palabra Verde Neón</label>
                <input
                  type="text"
                  value={formData.hero.titleHighlightGreen}
                  onChange={(e) => handleHeroChange('titleHighlightGreen', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-[#7CFF00]/40 rounded-xl text-[#7CFF00] font-bold text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Conector Intermedio</label>
                <input
                  type="text"
                  value={formData.hero.titlePart2}
                  onChange={(e) => handleHeroChange('titlePart2', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#FF7A00] font-bold mb-1">Palabra Naranja Solar</label>
                <input
                  type="text"
                  value={formData.hero.titleHighlightOrange}
                  onChange={(e) => handleHeroChange('titleHighlightOrange', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-[#FF7A00]/40 rounded-xl text-[#FF7A00] font-bold text-xs focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-neutral-400 mb-1">Texto Cierre del Título</label>
                <input
                  type="text"
                  value={formData.hero.titlePart3}
                  onChange={(e) => handleHeroChange('titlePart3', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Subtítulo Descriptivo</label>
              <textarea
                rows={2}
                value={formData.hero.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-800">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Texto Botón Primario</label>
                <input
                  type="text"
                  value={formData.hero.buttonExploreText}
                  onChange={(e) => handleHeroChange('buttonExploreText', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Texto Botón Ofertas</label>
                <input
                  type="text"
                  value={formData.hero.buttonOffersText}
                  onChange={(e) => handleHeroChange('buttonOffersText', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: EMPRESA & CONTACTO */}
      {activeSection === 'contact' && (
        <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-5">
          <h4 className="text-sm font-bold text-white">Datos de Marca y Canales de Atención</h4>

          {/* Logo Brand Customizer */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#7CFF00] shadow-[0_0_20px_rgba(124,255,0,0.3)] bg-black shrink-0 relative">
              <img
                src={formData.contact.logoUrl || '/rtm-logo.jpg'}
                alt="Logo Oficial"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-1.5 w-full">
              <label className="block text-xs font-bold text-white">Logotipo Oficial de la Marca</label>
              <input
                type="text"
                value={formData.contact.logoUrl || '/rtm-logo.jpg'}
                onChange={(e) => handleContactChange('logoUrl', e.target.value)}
                placeholder="/rtm-logo.jpg o URL de imagen"
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
              <p className="text-[11px] text-neutral-400">
                Se muestra en la barra superior (Navbar), en la portada principal (Hero), pie de página (Footer) y comprobantes de compra.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Nombre Comercial de la Tienda</label>
              <input
                type="text"
                value={formData.contact.storeName}
                onChange={(e) => handleContactChange('storeName', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Eslogan / Categoría</label>
              <input
                type="text"
                value={formData.contact.slogan}
                onChange={(e) => handleContactChange('slogan', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Teléfono Directo</label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Número de WhatsApp (con código país, sin +)</label>
              <input
                type="text"
                value={formData.contact.whatsapp}
                onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                placeholder="5493415889201"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Email de Ventas / Consultas</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Dirección Showroom Principal</label>
              <input
                type="text"
                value={formData.contact.address}
                onChange={(e) => handleContactChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Detalle / Referencia Showroom</label>
              <input
                type="text"
                value={formData.contact.addressDetails}
                onChange={(e) => handleContactChange('addressDetails', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Horarios de Atención</label>
              <input
                type="text"
                value={formData.contact.hours}
                onChange={(e) => handleContactChange('hours', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>
          </div>

          <h4 className="text-sm font-bold text-white pt-3 border-t border-neutral-800">
            Barra Superior & Envíos
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Anuncio de la Barra Superior</label>
              <input
                type="text"
                value={formData.contact.announcementText}
                onChange={(e) => handleContactChange('announcementText', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Monto Mínimo Envío Gratis ($ ARS)</label>
              <input
                type="number"
                value={formData.contact.freeShippingThreshold}
                onChange={(e) => handleContactChange('freeShippingThreshold', Number(e.target.value))}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>
          </div>

          <h4 className="text-sm font-bold text-white pt-3 border-t border-neutral-800">
            Redes Sociales Oficiales
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Instagram URL</label>
              <input
                type="url"
                value={formData.contact.instagramUrl}
                onChange={(e) => handleContactChange('instagramUrl', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Facebook URL</label>
              <input
                type="url"
                value={formData.contact.facebookUrl}
                onChange={(e) => handleContactChange('facebookUrl', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">YouTube URL</label>
              <input
                type="url"
                value={formData.contact.youtubeUrl}
                onChange={(e) => handleContactChange('youtubeUrl', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SOBRE NOSOTROS */}
      {activeSection === 'about' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#7CFF00]" />
              <span>Imagen de la Sección Nosotros</span>
            </h4>

            <div className="relative h-56 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950">
              <img
                src={formData.about.image}
                alt="Vista previa nosotros"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs">
                <span className="px-2 py-1 rounded bg-black/80 text-white font-mono text-[11px] border border-neutral-700">
                  Previsualización
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                URL de Imagen de la Sección
              </label>
              <input
                type="url"
                value={formData.about.image}
                onChange={(e) => handleAboutChange('image', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            {/* Presets */}
            <div>
              <span className="block text-[11px] font-semibold text-neutral-400 mb-2">
                Imágenes Sugeridas (Click para seleccionar):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ABOUT_IMG_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAboutChange('image', preset.url)}
                    className="relative group h-16 rounded-lg overflow-hidden border border-neutral-800 hover:border-[#7CFF00] text-left transition-all cursor-pointer"
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors" />
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] text-white font-medium truncate block">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
            <h4 className="text-sm font-bold text-white">Textos e Historia</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.about.title}
                  onChange={(e) => handleAboutChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#7CFF00] mb-1">Título Resaltado en Verde</label>
                <input
                  type="text"
                  value={formData.about.titleHighlight}
                  onChange={(e) => handleAboutChange('titleHighlight', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-[#7CFF00]/40 rounded-xl text-[#7CFF00] text-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Cita Principal de los Fundadores</label>
              <textarea
                rows={2}
                value={formData.about.quote}
                onChange={(e) => handleAboutChange('quote', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Párrafo 1 (Historia)</label>
              <textarea
                rows={3}
                value={formData.about.paragraph1}
                onChange={(e) => handleAboutChange('paragraph1', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Párrafo 2 (Testeo en el Paraná)</label>
              <textarea
                rows={2}
                value={formData.about.paragraph2}
                onChange={(e) => handleAboutChange('paragraph2', e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:border-[#7CFF00] focus:outline-none"
              />
            </div>

            <h4 className="text-sm font-bold text-white pt-2 border-t border-neutral-800">
              Estadísticas / Métricas Destacadas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <input
                  type="text"
                  value={formData.about.stat1Number}
                  onChange={(e) => handleAboutChange('stat1Number', e.target.value)}
                  className="w-full bg-transparent text-[#7CFF00] font-black text-base focus:outline-none mb-1"
                />
                <input
                  type="text"
                  value={formData.about.stat1Label}
                  onChange={(e) => handleAboutChange('stat1Label', e.target.value)}
                  className="w-full bg-transparent text-neutral-400 text-xs focus:outline-none"
                />
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <input
                  type="text"
                  value={formData.about.stat2Number}
                  onChange={(e) => handleAboutChange('stat2Number', e.target.value)}
                  className="w-full bg-transparent text-white font-black text-base focus:outline-none mb-1"
                />
                <input
                  type="text"
                  value={formData.about.stat2Label}
                  onChange={(e) => handleAboutChange('stat2Label', e.target.value)}
                  className="w-full bg-transparent text-neutral-400 text-xs focus:outline-none"
                />
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <input
                  type="text"
                  value={formData.about.stat3Number}
                  onChange={(e) => handleAboutChange('stat3Number', e.target.value)}
                  className="w-full bg-transparent text-[#FF7A00] font-black text-base focus:outline-none mb-1"
                />
                <input
                  type="text"
                  value={formData.about.stat3Label}
                  onChange={(e) => handleAboutChange('stat3Label', e.target.value)}
                  className="w-full bg-transparent text-neutral-400 text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CATEGORÍAS DE PESCA (8) */}
      {activeSection === 'pesca' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
            Podés modificar el nombre, la imagen y la descripción de cada una de las 8 categorías de pesca deportiva que se muestran en la grilla interactiva.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.pescaCategories.map((cat, idx) => (
              <div
                key={cat.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-neutral-700 shrink-0 bg-black">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => handlePescaCategoryChange(idx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-bold text-xs focus:border-[#7CFF00] focus:outline-none mb-1"
                    />
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                      <span>Slug: <strong>{cat.slug}</strong></span>
                      <span>•</span>
                      <input
                        type="number"
                        value={cat.count}
                        onChange={(e) => handlePescaCategoryChange(idx, 'count', Number(e.target.value))}
                        className="w-16 px-1.5 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 text-[11px]"
                      />
                      <span>artículos</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">URL de Imagen</label>
                  <input
                    type="url"
                    value={cat.image}
                    onChange={(e) => handlePescaCategoryChange(idx, 'image', e.target.value)}
                    className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] focus:border-[#7CFF00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Descripción</label>
                  <input
                    type="text"
                    value={cat.description}
                    onChange={(e) => handlePescaCategoryChange(idx, 'description', e.target.value)}
                    className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] focus:border-[#7CFF00] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: CATEGORÍAS DE CAMPING (8) */}
      {activeSection === 'camping' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
            Personalizá los nombres, imágenes y descripciones de las 8 categorías del catálogo de camping y aventura.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.campingCategories.map((cat, idx) => (
              <div
                key={cat.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-neutral-700 shrink-0 bg-black">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => handleCampingCategoryChange(idx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-bold text-xs focus:border-[#FF7A00] focus:outline-none mb-1"
                    />
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                      <span>Slug: <strong>{cat.slug}</strong></span>
                      <span>•</span>
                      <input
                        type="number"
                        value={cat.count}
                        onChange={(e) => handleCampingCategoryChange(idx, 'count', Number(e.target.value))}
                        className="w-16 px-1.5 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 text-[11px]"
                      />
                      <span>artículos</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">URL de Imagen</label>
                  <input
                    type="url"
                    value={cat.image}
                    onChange={(e) => handleCampingCategoryChange(idx, 'image', e.target.value)}
                    className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] focus:border-[#FF7A00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Descripción</label>
                  <input
                    type="text"
                    value={cat.description}
                    onChange={(e) => handleCampingCategoryChange(idx, 'description', e.target.value)}
                    className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] focus:border-[#FF7A00] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: ARTÍCULOS DE BLOG */}
      {activeSection === 'blog' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-400">
              Administrá las guías técnicas y artículos del blog de pesca y campamento.
            </p>
            <button
              type="button"
              onClick={handleAddBlogPost}
              className="px-3.5 py-1.5 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Agregar Artículo</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.blogPosts.map((post, idx) => (
              <div
                key={post.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-20 h-14 rounded-lg overflow-hidden border border-neutral-700 shrink-0 bg-black">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => handleBlogPostChange(idx, 'title', e.target.value)}
                        className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-bold text-xs focus:border-[#7CFF00] focus:outline-none mb-1"
                      />
                      <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                        <span>Autor: {post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteBlogPost(idx)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar artículo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-neutral-400 mb-1">URL de Portada</label>
                    <input
                      type="url"
                      value={post.image}
                      onChange={(e) => handleBlogPostChange(idx, 'image', e.target.value)}
                      className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] focus:border-[#7CFF00] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Categoría</label>
                    <input
                      type="text"
                      value={post.category}
                      onChange={(e) => handleBlogPostChange(idx, 'category', e.target.value)}
                      className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] focus:border-[#7CFF00] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Extracto / Resumen</label>
                  <textarea
                    rows={2}
                    value={post.excerpt}
                    onChange={(e) => handleBlogPostChange(idx, 'excerpt', e.target.value)}
                    className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 7: TESTIMONIOS */}
      {activeSection === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-400">
              Modificá las opiniones, capturas y valoraciones de los clientes de la comunidad.
            </p>
            <button
              type="button"
              onClick={handleAddTestimonial}
              className="px-3.5 py-1.5 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Testimonio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.testimonials.map((t, idx) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border border-neutral-700 bg-neutral-950"
                    />
                    <div>
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => handleTestimonialChange(idx, 'name', e.target.value)}
                        placeholder="Nombre cliente"
                        className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-white font-bold text-xs focus:border-[#7CFF00] focus:outline-none mb-1 block"
                      />
                      <input
                        type="text"
                        value={t.location}
                        onChange={(e) => handleTestimonialChange(idx, 'location', e.target.value)}
                        placeholder="Ciudad / Provincia"
                        className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-400 text-[11px] focus:outline-none block"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteTestimonial(idx)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar testimonio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">URL Avatar / Foto</label>
                  <input
                    type="url"
                    value={t.avatar}
                    onChange={(e) => handleTestimonialChange(idx, 'avatar', e.target.value)}
                    className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] focus:border-[#7CFF00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Equipo / Producto Comprado</label>
                  <input
                    type="text"
                    value={t.gearBought}
                    onChange={(e) => handleTestimonialChange(idx, 'gearBought', e.target.value)}
                    className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] focus:border-[#7CFF00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Comentario</label>
                  <textarea
                    rows={2}
                    value={t.comment}
                    onChange={(e) => handleTestimonialChange(idx, 'comment', e.target.value)}
                    className="w-full px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-xs focus:border-[#7CFF00] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
