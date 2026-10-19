import React, { useState, useRef } from 'react';
import { SiteContent } from '../../types';
import { 
  Image as ImageIcon, 
  Upload, 
  Link as LinkIcon, 
  Sparkles, 
  RotateCcw, 
  Save, 
  Check, 
  Eye, 
  AlertCircle,
  Maximize2,
  ExternalLink
} from 'lucide-react';

interface HeroCoverAdminProps {
  siteContent: SiteContent;
  onSaveSiteContent: (newContent: SiteContent) => void;
  onResetDefaults?: () => void;
  onCloseModal?: () => void;
}

export const HERO_COVER_PRESETS = [
  {
    id: 'dorado-sunset',
    name: 'Pescador Dorado Paraná (Atardecer)',
    description: 'Pescador deportivo en lancha con caña en acción al atardecer sobre el río.',
    url: '/hero-bg.jpg',
  },
  {
    id: 'rio-parana-water',
    name: 'Río Paraná / Agua & Naturaleza',
    description: 'Vista panorámica de aguas doradas reflejando el sol del litoral.',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'lancha-expedicion',
    name: 'Lancha & Expedición Fluvial',
    description: 'Embarcación en aguas correntinas lista para una jornada de pesca pesada.',
    url: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'campamento-fuego',
    name: 'Campamento en la Isla al Fuego',
    description: 'Carpas y fogata bajo las estrellas en el delta del río.',
    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'pesca-rio-adrenalina',
    name: 'Fly Fishing & Spinning Extremo',
    description: 'Pescador dentro del agua vadeando con caña en plena pelea deportiva.',
    url: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'costa-delta-atardecer',
    name: 'Costa y Bosque en Galería',
    description: 'Atardecer salvaje con siluetas de sauce criollo y río calmo.',
    url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=2000&q=85',
  },
];

export const HeroCoverAdmin: React.FC<HeroCoverAdminProps> = ({
  siteContent,
  onSaveSiteContent,
  onResetDefaults,
  onCloseModal,
}) => {
  const currentHeroBg = siteContent.hero.backgroundImage || HERO_COVER_PRESETS[0].url;

  const [imageUrl, setImageUrl] = useState<string>(currentHeroBg);
  const [activeMode, setActiveMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewOverlay, setPreviewOverlay] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if prop updates
  React.useEffect(() => {
    if (siteContent.hero.backgroundImage) {
      setImageUrl(siteContent.hero.backgroundImage);
    }
  }, [siteContent.hero.backgroundImage]);

  // Handle local file selection with intelligent compression
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor seleccioná un archivo de imagen válido (JPG, PNG o WEBP).');
      return;
    }

    setUploadError(null);
    setIsProcessing(true);

    try {
      const compressedDataUrl = await processAndCompressImage(file);
      setImageUrl(compressedDataUrl);
    } catch (err) {
      console.error('Error processing image file:', err);
      setUploadError('No se pudo procesar la imagen seleccionada. Probá con otra o ingresá una URL.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Canvas-based client-side resize and compression to maintain HD quality while keeping size < 500KB
  const processAndCompressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const maxDimension = 1920;
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress with high quality 0.85
            const optimized = canvas.toDataURL('image/jpeg', 0.85);
            resolve(optimized);
          } else {
            resolve(rawUrl);
          }
        };
        img.onerror = () => resolve(rawUrl);
        img.src = rawUrl;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Save the new image to siteContent
  const handleSaveCover = () => {
    const updatedContent: SiteContent = {
      ...siteContent,
      hero: {
        ...siteContent.hero,
        backgroundImage: imageUrl,
      },
    };

    onSaveSiteContent(updatedContent);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3500);
  };

  // Restore factory default cover image
  const handleRestoreDefault = () => {
    const defaultUrl = HERO_COVER_PRESETS[0].url;
    setImageUrl(defaultUrl);
    const updatedContent: SiteContent = {
      ...siteContent,
      hero: {
        ...siteContent.hero,
        backgroundImage: defaultUrl,
      },
    };
    onSaveSiteContent(updatedContent);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3500);
  };

  const isCurrentActive = imageUrl === currentHeroBg;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#7CFF00]/15 text-[#7CFF00] border border-[#7CFF00]/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Gestor de Imagen de Portada (Hero)
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Modificá la foto de impacto principal que reciben los visitantes al entrar a RTM Outdoor.
            Podés subir cualquier foto desde tu dispositivo, pegar una URL de internet o elegir de nuestra galería temática de pesca.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleRestoreDefault}
            title="Restablecer foto original del Río Paraná"
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
            <span>Restaurar Original</span>
          </button>

          <button
            type="button"
            onClick={handleSaveCover}
            disabled={isProcessing}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black text-xs font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,255,0,0.35)] hover:scale-102 cursor-pointer disabled:opacity-50"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span>¡Portada Guardada!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-black" />
                <span>Guardar Portada</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Live Preview Box */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-800 bg-[#0A0A0A] shadow-2xl group">
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          {/* Cover image */}
          <img
            src={imageUrl}
            alt="Previsualización Portada RTM Outdoor"
            className="w-full h-full object-cover filter brightness-[0.5] contrast-125 transition-all duration-700"
            referrerPolicy="no-referrer"
          />

          {/* Gradients like real Hero */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/80 via-transparent to-transparent pointer-events-none" />

          {/* River Glows */}
          <div className="absolute top-6 left-12 w-60 h-60 bg-[#7CFF00]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-6 right-12 w-60 h-60 bg-[#FF7A00]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Simulated Hero Text Overlay */}
          {previewOverlay && (
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end max-w-2xl pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-[11px] font-semibold text-neutral-300 mb-3 w-fit backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#7CFF00] animate-ping" />
                <span className="text-[#7CFF00] font-bold">RÍO PARANÁ & CORRIENTES</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-300">Temporada Dorados 2026</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight font-heading drop-shadow-md mb-2">
                Todo para tu <span className="text-[#7CFF00]">pesca</span> y{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-amber-400">
                  aventura
                </span>{' '}
                en un solo lugar
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 font-normal line-clamp-2 max-w-lg drop-shadow">
                {siteContent.hero.subtitle || 'Equipamiento de pesca, camping y outdoor con asesoramiento especializado.'}
              </p>
            </div>
          )}

          {/* Top Control Bar inside Preview */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-extrabold text-[#7CFF00] border border-[#7CFF00]/40 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#7CFF00]" />
                <span>Vista Previa en Tiempo Real</span>
              </span>
              {imageUrl.startsWith('data:') ? (
                <span className="px-2.5 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800 text-[10px] font-bold">
                  Foto local cargada
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-neutral-900/80 text-neutral-300 border border-neutral-700 text-[10px] font-bold">
                  HD Web
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewOverlay(!previewOverlay)}
                className="px-3 py-1.5 rounded-xl bg-black/80 hover:bg-neutral-900 text-neutral-200 text-xs font-semibold border border-neutral-700 flex items-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer"
                title="Alternar textos de la portada"
              >
                <Eye className="w-3.5 h-3.5 text-[#7CFF00]" />
                <span className="hidden sm:inline">
                  {previewOverlay ? 'Ocultar Textos' : 'Mostrar Textos'}
                </span>
              </button>

              {!imageUrl.startsWith('data:') && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-xl bg-black/80 hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700 backdrop-blur-md transition-colors"
                  title="Abrir imagen original"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Change Banner Quick Bar */}
        <div className="p-3 bg-[#111111] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Resolución recomendada:</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px]">
              1920 x 1080 px (Horizontal)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isCurrentActive && (
              <span className="text-[#FF7A00] font-bold animate-pulse">
                ● Tenés cambios sin guardar
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveCover}
              className="px-4 py-1.5 rounded-lg bg-[#7CFF00] hover:bg-[#6ee000] text-black font-extrabold text-xs transition-colors cursor-pointer"
            >
              Aplicar Cambios
            </button>
          </div>
        </div>
      </div>

      {/* Selector Tabs: 3 Ways to Change the Portada Image */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-[#7CFF00] text-black shadow-lg font-black'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>1. Subir desde tu PC / Celular</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('presets')}
            className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'presets'
                ? 'bg-[#7CFF00] text-black shadow-lg font-black'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. Galería Temática Oficial</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'url'
                ? 'bg-[#7CFF00] text-black shadow-lg font-black'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>3. Pegar Enlace / URL</span>
          </button>
        </div>

        {/* MODE 1: FILE UPLOAD */}
        {activeMode === 'upload' && (
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 animate-in fade-in duration-200">
            <div className="text-left space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#7CFF00]" />
                <span>Cargar archivo de imagen local</span>
              </h4>
              <p className="text-xs text-neutral-400">
                Seleccioná una fotografía de tu computadora o teléfono. Se optimizará automáticamente para una carga ultra rápida sin perder nitidez.
              </p>
            </div>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drag & Click Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-700 hover:border-[#7CFF00] rounded-2xl p-8 text-center cursor-pointer transition-all bg-neutral-950/60 hover:bg-neutral-950 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#7CFF00]/10 border border-[#7CFF00]/30 text-[#7CFF00] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-white mb-1">
                {isProcessing ? 'Optimizando imagen...' : 'Hacé clic aquí para elegir tu foto'}
              </p>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Compatible con formatos JPG, JPEG, PNG y WEBP de alta resolución.
              </p>
              <button
                type="button"
                className="mt-4 px-5 py-2 rounded-xl bg-neutral-800 group-hover:bg-[#7CFF00] text-neutral-200 group-hover:text-black font-bold text-xs transition-colors pointer-events-none"
              >
                Explorar archivos en este equipo
              </button>
            </div>

            {uploadError && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: CURATED PRESETS GALLERY */}
        {activeMode === 'presets' && (
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 animate-in fade-in duration-200">
            <div className="text-left space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7CFF00]" />
                <span>Galería Fotográfica Profesional de Pesca y Aventura</span>
              </h4>
              <p className="text-xs text-neutral-400">
                Seleccioná cualquiera de estas opciones seleccionadas para el Río Paraná, lanchas, campamento y pesca deportiva con un solo toque:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {HERO_COVER_PRESETS.map((preset) => {
                const isSelected = imageUrl === preset.url;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setImageUrl(preset.url);
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all group flex flex-col ${
                      isSelected
                        ? 'border-[#7CFF00] shadow-[0_0_20px_rgba(124,255,0,0.3)] ring-2 ring-[#7CFF00]/50'
                        : 'border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-black">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      {isSelected && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#7CFF00] text-black text-[10px] font-black flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Seleccionada</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-neutral-950 flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-white group-hover:text-[#7CFF00] transition-colors">
                          {preset.name}
                        </h5>
                        <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-2">
                          {preset.description}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-neutral-900 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-500 font-mono">2000 x 1333 HD</span>
                        <span className="text-[10px] font-bold text-[#7CFF00]">
                          {isSelected ? 'Activa ahora' : 'Elegir esta foto'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 3: DIRECT URL INPUT */}
        {activeMode === 'url' && (
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 animate-in fade-in duration-200">
            <div className="text-left space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#7CFF00]" />
                <span>Ingresar URL directa de la imagen</span>
              </h4>
              <p className="text-xs text-neutral-400">
                Podés pegar un enlace directo a cualquier imagen alojada en Unsplash, Imgur, tu propio servidor o Google Cloud:
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageUrl.startsWith('data:') ? '' : imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/mi-foto-de-portada.jpg"
                  className="flex-1 px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#7CFF00]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.readText().then((clip) => {
                        if (clip && (clip.startsWith('http://') || clip.startsWith('https://'))) {
                          setImageUrl(clip);
                        }
                      });
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold whitespace-nowrap transition-colors"
                >
                  Pegar Portapapeles
                </button>
              </div>

              <p className="text-[11px] text-neutral-500">
                Asegurate de que la URL sea pública y comience con https://.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating or Bottom Save Bar */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-neutral-700 bg-black shrink-0">
            <img
              src={imageUrl}
              alt="Miniatura"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              {savedSuccess ? '¡Cambios aplicados con éxito!' : 'Confirmar nueva imagen de portada'}
            </span>
            <span className="text-[11px] text-neutral-400">
              Al guardar, todos los clientes verán de inmediato esta foto al ingresar a la tienda.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onCloseModal && (
            <button
              type="button"
              onClick={onCloseModal}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Cerrar Panel
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveCover}
            disabled={isProcessing}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#7CFF00] hover:bg-[#6ee000] text-black text-xs font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,255,0,0.35)] hover:scale-102 cursor-pointer disabled:opacity-50"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span>¡Guardado con Éxito!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-black" />
                <span>Guardar y Aplicar Portada</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
