import { Product, CategoryCard, BlogPost, Testimonial, Coupon, WeeklyOffer, Order, SiteContent } from '../types';

export const PESCA_CATEGORIES: CategoryCard[] = [
  {
    id: 'senuelos',
    name: 'Señuelos',
    slug: 'senuelos',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85',
    count: 142,
    type: 'pesca',
    description: 'Paseantes, minnows, poppers y bananas para dorado y tararira.'
  },
  {
    id: 'reels',
    name: 'Reels',
    slug: 'reels',
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1200&q=85',
    count: 86,
    type: 'pesca',
    description: 'Rotativos, baitcasting y frontales de alta precisión y arrastre.'
  },
  {
    id: 'canas',
    name: 'Cañas',
    slug: 'canas',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    count: 94,
    type: 'pesca',
    description: 'Grafito de alto módulo de 10 a 30 lbs para río y costa.'
  },
  {
    id: 'nylon-multifilamento',
    name: 'Nylon y Multifilamento',
    slug: 'nylon-multifilamento',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=85',
    count: 65,
    type: 'pesca',
    description: 'Líneas trenzadas 8X de máxima resistencia a la abrasión.'
  },
  {
    id: 'anzuelos',
    name: 'Anzuelos',
    slug: 'anzuelos',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85',
    count: 110,
    type: 'pesca',
    description: 'Mustad, Owner y Eagle Claw reforzados para grandes peces.'
  },
  {
    id: 'boyas-flotadores',
    name: 'Boyas y Flotadores',
    slug: 'boyas-flotadores',
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=85',
    count: 48,
    type: 'pesca',
    description: 'Boyas luminosas, chupetes y lágrimas de balsa para pejerrey y boga.'
  },
  {
    id: 'carnadas-artificiales',
    name: 'Carnadas Artificiales',
    slug: 'carnadas-artificiales',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
    count: 53,
    type: 'pesca',
    description: 'Gomas perfumadas, shads, vinilos y faldudos para depredadores.'
  },
  {
    id: 'plomos',
    name: 'Plomos',
    slug: 'plomos',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85',
    count: 32,
    type: 'pesca',
    description: 'Torpedos, satélites, con destorcedor y pirámides para correntada.'
  }
];

export const CAMPING_CATEGORIES: CategoryCard[] = [
  {
    id: 'carpas',
    name: 'Carpas',
    slug: 'carpas',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85',
    count: 28,
    type: 'camping',
    description: 'Estructurales e iglú de 2 a 6 personas con columna de agua 3000mm.'
  },
  {
    id: 'bolsas-dormir',
    name: 'Bolsas de Dormir',
    slug: 'bolsas-dormir',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=85',
    count: 34,
    type: 'camping',
    description: 'Térmicas tipo sarcófago para rangos extremos de 0°C a -15°C.'
  },
  {
    id: 'conservadoras',
    name: 'Conservadoras',
    slug: 'conservadoras',
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=85',
    count: 22,
    type: 'camping',
    description: 'Rotomoldeadas y de alto rendimiento que mantienen hielo hasta 5 días.'
  },
  {
    id: 'sillas-plegables',
    name: 'Sillas Plegables',
    slug: 'sillas-plegables',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=85',
    count: 41,
    type: 'camping',
    description: 'Sillones de pesca con portavasos, ultra livianos y resistentes.'
  },
  {
    id: 'linternas',
    name: 'Linternas',
    slug: 'linternas',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=85',
    count: 57,
    type: 'camping',
    description: 'Frontales recargables y faroles LED de 1500 lúmenes para noche de pesca.'
  },
  {
    id: 'hornillos',
    name: 'Hornillos',
    slug: 'hornillos',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85',
    count: 19,
    type: 'camping',
    description: 'Anafes a gas butano y quemadores ultralivianos de titanio.'
  },
  {
    id: 'mochilas',
    name: 'Mochilas',
    slug: 'mochilas',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
    count: 36,
    type: 'camping',
    description: 'Trekking de 40L a 75L con soporte lumbar y cubre mochila impermeable.'
  },
  {
    id: 'termos',
    name: 'Termos',
    slug: 'termos',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
    count: 26,
    type: 'camping',
    description: 'Acero inoxidable doble pared con pico cebador clásico para el río.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Reel Shimano Curado 200HG K Baitcasting',
    brand: 'Shimano',
    category: 'reels',
    subcategory: 'Reels Baitcasting',
    price: 345000,
    originalPrice: 385000,
    installments: { count: 6, amount: 57500 },
    stock: 12,
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1200&q=85',
    badge: 'Más Vendido',
    rating: 4.9,
    reviewsCount: 38,
    fishingType: 'Baitcasting',
    description: 'El legendario Curado K de Shimano con engranajes MicroModule, cuerpo Hagane súper rígido y sistema de freno SVS Infinity. La herramienta definitiva para la pesca del Dorado en el Alto Paraná y Surubí en corrientes fuertes.',
    specs: {
      'Relación de giro': '7.4:1',
      'Rulemanes': '6 + 1 S A-RB',
      'Freno máximo': '5.5 kg (12 lbs)',
      'Capacidad de línea': '0.30mm / 110m',
      'Peso': '215 gramos'
    },
    isFeatured: true,
    isAnglersChoice: true
  },
  {
    id: 'prod-2',
    name: 'Caña Tech Titanium Pro 2.10m 15-30 lbs Dorado',
    brand: 'Tech Tackle',
    category: 'canas',
    subcategory: 'Cañas de Baitcasting',
    price: 189000,
    originalPrice: 215000,
    installments: { count: 6, amount: 31500 },
    stock: 8,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    badge: 'Nuevo',
    rating: 4.8,
    reviewsCount: 22,
    fishingType: 'Baitcasting',
    description: 'Blank de grafito Toray japonés de 40 Ton con refuerzo helicoidal de titanio. Diseñada y probada específicamente para clavar y pelear los torpedos dorados de Paso de la Patria y Esquina.',
    specs: {
      'Largo': '2.10 metros (6.9 pies)',
      'Tramos': '1 tramo monofilamento',
      'Potencia': '15 a 30 lbs',
      'Pasahilos': 'Fuji K Alconite aptos multifilamento',
      'Acción': 'Fast / Rápida'
    },
    isFeatured: true,
    isAnglersChoice: true
  },
  {
    id: 'prod-3',
    name: 'Señuelo Don KB Banana 14cm Paleta 2 para Dorado',
    brand: 'Don KB',
    category: 'senuelos',
    subcategory: 'Señuelos de flote y media agua',
    price: 24500,
    originalPrice: 28000,
    installments: { count: 3, amount: 8166 },
    stock: 45,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85',
    badge: 'Oferta',
    rating: 5.0,
    reviewsCount: 64,
    fishingType: 'Trolling',
    description: 'El señuelo de pesca nacional más letal para trolling y casting en correderas de piedra. Natación agresiva y rattlin interno metálico que despierta la furia del tigre de los ríos.',
    specs: {
      'Largo': '14 cm',
      'Peso': '42 gramos',
      'Profundidad': '1.8 a 3.5 metros',
      'Anzuelos': 'Triples VMC 3X Strong',
      'Color': 'Cardenal / Lomo Negro Fluo'
    },
    isFeatured: true,
    isAnglersChoice: true
  },
  {
    id: 'prod-4',
    name: 'Multifilamento PowerPro Spectra 0.28mm 40lbs 150m Verde',
    brand: 'PowerPro',
    category: 'nylon-multifilamento',
    subcategory: 'Líneas Trenzadas',
    price: 46800,
    originalPrice: 52000,
    installments: { count: 3, amount: 15600 },
    stock: 30,
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=85',
    badge: 'Más Vendido',
    rating: 4.9,
    reviewsCount: 41,
    fishingType: 'General',
    description: 'Tecnología de fibra Spectra con recubrimiento EBT resistente al roce con palos, piedras y bancos de arena. Sin estiramiento para clavadas fulminantes.',
    specs: {
      'Diámetro': '0.28 mm',
      'Resistencia': '40 lbs (18 kg)',
      'Longitud': '150 metros',
      'Color': 'Moss Green (Verde Musgo)',
      'Hilos': '4 hebras de alta densidad'
    },
    isFeatured: true
  },
  {
    id: 'prod-5',
    name: 'Carpa Doite Himalaya 4 Personas 3000mm Impermeable',
    brand: 'Doite',
    category: 'carpas',
    subcategory: 'Carpas 3 Estaciones',
    price: 495000,
    originalPrice: 550000,
    installments: { count: 6, amount: 82500 },
    stock: 6,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85',
    badge: 'Nuevo',
    rating: 4.8,
    reviewsCount: 15,
    description: 'Construcción con varillas duraluminio de aviación, costuras termoselladas y faldón antitormenta. Espacioso ábside frontal para guardar conservadoras y cañeros.',
    specs: {
      'Capacidad': '4 personas',
      'Impermeabilidad': '3.000 mm columna de agua',
      'Varillas': 'Duraluminio 8.5 mm',
      'Peso total': '4.3 kg',
      'Medidas': '2.10m x 2.40m + 1.20m ábside'
    },
    isFeatured: true,
    isAnglersChoice: true
  },
  {
    id: 'prod-6',
    name: 'Termo Stanley Classic 1.4 Litros Verde Hammertone',
    brand: 'Stanley',
    category: 'termos',
    subcategory: 'Termos de Acero',
    price: 135000,
    originalPrice: 155000,
    installments: { count: 6, amount: 22500 },
    stock: 24,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
    badge: 'Más Vendido',
    rating: 5.0,
    reviewsCount: 89,
    description: 'El clásico infaltable en cada lancha y campamento. Conserva el agua caliente por 40 horas o helada por 35 horas. A prueba de golpes con garantía oficial de por vida.',
    specs: {
      'Capacidad': '1.4 Litros',
      'Material': 'Acero inoxidable 18/8',
      'Aislamiento': 'Doble pared al vacío',
      'Tapón': 'Cebador de alta precisión',
      'Libre de BPA': 'Sí'
    },
    isFeatured: true,
    isAnglersChoice: true
  },
  {
    id: 'prod-7',
    name: 'Conservadora Coleman Xtreme 50 QT con Ruedas (47 Litros)',
    brand: 'Coleman',
    category: 'conservadoras',
    subcategory: 'Conservadoras Térmicas',
    price: 268000,
    originalPrice: 295000,
    installments: { count: 6, amount: 44666 },
    stock: 10,
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=85',
    badge: 'Oferta',
    rating: 4.7,
    reviewsCount: 19,
    description: 'Aislamiento de poliuretano inyectado de alta densidad. Retiene el hielo hasta 5 días a 32°C. Ruedas todoterreno para arrastrar en arena, barro o pedregullo.',
    specs: {
      'Capacidad': '47 Litros (84 latas)',
      'Retención de frío': 'Hasta 5 días',
      'Manija': 'Telescópica reforzada',
      'Desagote': 'Tapón roscado antifuga'
    },
    isFeatured: true
  },
  {
    id: 'prod-8',
    name: 'Reel Daiwa Tatula SV TW 103HS Baitcast',
    brand: 'Daiwa',
    category: 'reels',
    subcategory: 'Reels Baitcasting',
    price: 395000,
    originalPrice: 430000,
    installments: { count: 6, amount: 65833 },
    stock: 7,
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1200&q=85',
    badge: 'Nuevo',
    rating: 5.0,
    reviewsCount: 14,
    fishingType: 'Baitcasting',
    description: 'Carretel SV duraluminio super liviano con devanador T-Wing System (TWS) que elimina casi por completo las "galletas" o enredos al lanzar señuelos livianos contra el viento.',
    specs: {
      'Relación': '7.3:1',
      'Freno': 'Ultimate Tournament Drag (UTD) 5 kg',
      'Rulemanes': '7 BB + 1 RB',
      'Peso': '190 gramos'
    },
    isFeatured: true
  },
  {
    id: 'prod-9',
    name: 'Bolsa de Dormir Coleman North Rim -18°C Sarcófago',
    brand: 'Coleman',
    category: 'bolsas-dormir',
    subcategory: 'Bolsas Térmicas Extremas',
    price: 182000,
    originalPrice: 210000,
    installments: { count: 6, amount: 30333 },
    stock: 15,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=85',
    badge: 'Oferta',
    rating: 4.8,
    reviewsCount: 26,
    description: 'Diseñada para noches heladas en islas del Paraná o cordillera. Relleno Coletherm de fibra hueca que mantiene el calor corporal incluso en condiciones húmedas.',
    specs: {
      'Rango de confort': '-5°C a -18°C',
      'Forma': 'Sarcófago con capucha anatómica',
      'Medidas': '2.08m x 0.81m',
      'Cremallera': 'ZipPlow anti-enganche'
    },
    isFeatured: false
  },
  {
    id: 'prod-10',
    name: 'Linterna Frontal Fenix HM65R 1400 Lumens Recargable USB-C',
    brand: 'Fenix',
    category: 'linternas',
    subcategory: 'Linternas Frontales',
    price: 175000,
    originalPrice: 195000,
    installments: { count: 6, amount: 29166 },
    stock: 18,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=85',
    badge: 'Más Vendido',
    rating: 4.9,
    reviewsCount: 31,
    description: 'Cuerpo de aleación de magnesio ultra resistente e impermeable IP68. Doble haz de luz independiente (largo alcance hasta 163 metros e inundación para campamento).',
    specs: {
      'Potencia máxima': '1400 lúmenes',
      'Batería': '18650 Li-ion 3500mAh incluida',
      'Impermeabilidad': 'IP68 sumergible a 2 metros',
      'Peso': '97 gramos sin batería'
    },
    isFeatured: true
  },
  {
    id: 'prod-11',
    name: 'Señuelo Marine Sports Inna Pro Tuned 140mm Floating',
    brand: 'Marine Sports',
    category: 'senuelos',
    subcategory: 'Minnows de Media Agua',
    price: 21900,
    originalPrice: 24500,
    installments: { count: 3, amount: 7300 },
    stock: 50,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85',
    badge: 'Más Vendido',
    rating: 4.9,
    reviewsCount: 52,
    fishingType: 'Baitcasting',
    description: 'Eficacia probada en todo el litoral argentino. Sistema magnético de transferencia de peso XLC que permite castear a distancias récord con precisión milimétrica.',
    specs: {
      'Largo': '14 cm',
      'Peso': '31 gramos',
      'Triples': 'Owner 3X',
      'Tipo': 'Flotante de media agua'
    },
    isFeatured: false,
    isAnglersChoice: true
  },
  {
    id: 'prod-12',
    name: 'Silla Plegable Waterdog Confort King Size con Apoyabrazos',
    brand: 'Waterdog',
    category: 'sillas-plegables',
    subcategory: 'Sillones de Pesca',
    price: 68000,
    originalPrice: 79000,
    installments: { count: 3, amount: 22666 },
    stock: 25,
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=85',
    badge: 'Oferta',
    rating: 4.6,
    reviewsCount: 17,
    description: 'Estructura de acero reforzado de 22mm, tela poliéster 600D resistente a desgarros y bolso de transporte. Resiste hasta 140 kg con máxima estabilidad en barrancas de río.',
    specs: {
      'Carga máxima': '140 kg',
      'Estructura': 'Tubos de acero 22mm',
      'Accesorios': 'Portavasos de malla y bolsillo lateral',
      'Peso': '4.1 kg'
    },
    isFeatured: false
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'PARANA10',
    discountPercent: 10,
    minSpend: 50000,
    active: true,
    description: '10% OFF en toda la tienda para pescadores del Paraná'
  },
  {
    code: 'DORADO2026',
    discountPercent: 15,
    minSpend: 150000,
    active: true,
    description: '15% OFF en cañas y reels seleccionados'
  },
  {
    code: 'PRIMERACOMPRA',
    discountPercent: 5,
    minSpend: 20000,
    active: true,
    description: '5% OFF extra en tu primera compra en RTM Outdoor'
  }
];

export const WEEKLY_OFFER_DEFAULT: WeeklyOffer = {
  title: 'COMBO DORADO EXTREMO PARANÁ',
  subtitle: 'Caña Tech Titanium 2.10m + Reel Shimano Curado 200HG K + Multifilamento PowerPro 40lbs',
  discountBadge: '35% OFF',
  featuredProductName: 'Combo Río Paraná Dorado Master Pro',
  featuredProductPrice: 499000,
  featuredProductOriginalPrice: 765000,
  featuredProductImage: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1200&q=85',
  bannerImage: '/offer-banner.jpg',
  countdownDays: 4,
  active: true
};

export const INITIAL_WEEKLY_OFFER = WEEKLY_OFFER_DEFAULT;

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'RTM-982104',
    date: '05/09/2026 16:30',
    customer: {
      fullName: 'Martín Rodríguez',
      email: 'mrodriguez@gmail.com',
      phone: '341 590-1284',
      dni: '32.418.902',
      address: 'Bv. Oroño 1420',
      city: 'Rosario',
      province: 'Santa Fe',
      postalCode: '2000'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 2
      }
    ],
    subtotal: 397000,
    discount: 39700,
    shippingCost: 0,
    shippingMethod: 'Andreani a Domicilio Express',
    total: 357300,
    paymentMethod: 'transferencia',
    status: 'Despachado',
    trackingCode: 'AND-AR-84729104',
    couponCode: 'PARANA10'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Técnicas Clave para Capturar Dorados Gigantes en el Alto Paraná',
    slug: 'tecnicas-pesca-dorados-alto-parana',
    excerpt: 'Descubrí los mejores puntos, lectura de correderas y elección de señuelos según la claridad del agua y el nivel del río.',
    content: `El Río Paraná es considerado el santuario mundial de la pesca del dorado (Salminus brasiliensis). Sin embargo, capturar ejemplares de más de 10 kilos requiere técnica, lectura de agua y el equipo adecuado.

### 1. Lectura de Correderas y Puntas de Piedra
Los grandes dorados se posicionan en las "aguas calmas" justo detrás de grandes piedras sumergidas o desniveles de fondo, esperando que la corriente arrastre sábalos o bogas fatigadas. El lanzamiento debe colocarse 2 o 3 metros río arriba del remolino para que el señuelo baje con movimiento natural.

### 2. Velocidad de Recogida y Clavada
En baitcasting con señuelos de sub-superficie o bananas de paleta corta, la recogida debe ser rápida y errática, con tirones secos de la punta de la caña. La mandíbula del dorado es pura estructura ósea: al sentir el pique, jamás aflojes la tensión; clavá con firmeza dos veces seguidas con el freno del reel bien calibrado.

### 3. Líder de Acero y Multifilamento
Un multifilamento de 40 a 50 lbs con un líder de acero termosellado de al menos 30 a 40 lbs y 30 cm de largo es obligatorio para resistir los cortes por roce contra las rocas y las dentaduras afiladas.`,
    date: '02 Sep 2026',
    readTime: '6 min de lectura',
    author: 'Esteban Martínez - Guía de Pesca RTM',
    category: 'Técnicas de Pesca',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85',
    tags: ['Dorado', 'Paraná', 'Baitcasting', 'Señuelos']
  },
  {
    id: 'post-2',
    title: 'Reels de Baitcasting vs. Frontales: ¿Cuál Elegir para la Pesca Pesada?',
    slug: 'reels-baitcasting-vs-frontales-rio',
    excerpt: 'Análisis detallado de frenos de arrastre, relación de giro y durabilidad para pelear con surubíes y dorados de gran porte.',
    content: `A la hora de encarar una salida al litoral argentino, una de las preguntas más frecuentes que recibimos en RTM Outdoor es si conviene invertir en un reel rotativo de baitcasting o en un frontal pesado.

### Ventajas del Baitcasting
- **Precisión milimétrica:** Al poder controlar la salida de línea con el pulgar, podés clavar el señuelo exactamente a 5 centímetros de la empalizada o del tronco sumergido.
- **Potencia de tracción directa:** Al no torcer la línea en un ángulo de 90 grados como los frontales, el bobinado tiene mayor fuerza de palanca.

### Ventajas de los Frontales
- Mayor distancia en lanzamientos con señuelos livianos sin riesgo de galletas.
- Ideales para pescadores que inician o para variada pesada de fondo con plomadas de 150 gramos.`,
    date: '28 Ago 2026',
    readTime: '5 min de lectura',
    author: 'Ramiro Tolosa - Asesor Técnico RTM',
    category: 'Equipamiento Recomendado',
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1200&q=85',
    tags: ['Reels', 'Shimano', 'Baitcasting', 'Equipamiento']
  },
  {
    id: 'post-3',
    title: 'Destinos Imperdibles de Pesca en Argentina: Esquina, Paso de la Patria y Concordia',
    slug: 'destinos-pesca-argentina-parana-uruguay',
    excerpt: 'Guía completa con temporadas ideales, especies predominantes y servicios de lancha en los epicentros de la pesca deportiva.',
    content: `Argentina posee dos de las cuencas fluviales más ricas de Sudamérica: el Río Paraná y el Río Uruguay. Te contamos dónde planificar tu próxima aventura:

### Paso de la Patria (Corrientes)
Famoso por su fiesta nacional del Dorado. Zona de grandes pozones donde el agua se profundiza a más de 18 metros. Ideal para trolling con señuelos de paleta profunda y pesca nocturna de surubí pintado.

### Esquina (Corrientes)
El delta del Río Corriente ingresando al Paraná ofrece una de las geografías más hermosas para la pesca con mosca (fly) y baitcasting en bañados vírgenes y lagunas de aguas cristalinas.

### Concordia (Entre Ríos - Río Uruguay)
La zona del Salto Chico y Salto Grande es el hogar de los dorados más pesados del planeta. El agua corre con una velocidad brutal sobre un lecho de basalto negro puro.`,
    date: '15 Ago 2026',
    readTime: '8 min de lectura',
    author: 'Marcos Benítez - Expediciones Outdoor',
    category: 'Destinos de Pesca',
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=85',
    tags: ['Turismo', 'Corrientes', 'Río Paraná', 'Paso de la Patria']
  },
  {
    id: 'post-4',
    title: 'Guía de Camping en Islas y Selva en Galería: Cómo Armar tu Campamento',
    slug: 'consejos-para-acampar-islas-rio-parana',
    excerpt: 'Consejos indispensables sobre repelentes, orientación respecto al viento, conservación de alimentos y seguridad nocturna.',
    content: `Acampar en las islas del río o en bosques ribereños es una experiencia inolvidable, pero exige preparación para afrontar la humedad y los cambios repentinos de clima.

### 1. Elección de la Altura del Terreno
Nunca instales tu carpa en zanjas secas o arenas de baja cota. El Paraná puede crecer 30 o 40 centímetros durante la noche por represas o vientos del sudeste (sudestada). Buscá siempre los albardones más altos.

### 2. Orientación de la Entrada
Ubicá la entrada de la carpa en sentido opuesto al viento predominante para evitar que una tormenta embolse el sobretecho. Mantené siempre cerrada la malla mosquitera para evitar jejenes y mosquitos.

### 3. Conservación del Hielo
Una conservadora de buena calidad debe abrirse lo menos posible. Colocá una frazada o lona térmica encima para resguardarla del sol directo del mediodía.`,
    date: '10 Ago 2026',
    readTime: '4 min de lectura',
    author: 'Laura Carrizo - Especialista en Camping',
    category: 'Consejos para Camping',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85',
    tags: ['Camping', 'Carpas', 'Supervivencia', 'Aventura']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Gonzalo Fernández',
    location: 'Rosario, Santa Fe',
    avatar: '/images/photo-1507003211169-0a1dd7228f2d.jpg',
    rating: 5,
    comment: 'Compré el reel Shimano Curado y una caña Tech Titanium para una excursión a Esquina. Me asesoraron de diez por WhatsApp, el paquete llegó a Rosario en menos de 48 hs por Andreani impecable. Saqué un dorado de 9 kilos en la primera salida!',
    verifiedBuyer: true,
    gearBought: 'Reel Shimano Curado + Caña Tech Titanium'
  },
  {
    id: 't-2',
    name: 'Federico Sotomayor',
    location: 'Paraná, Entre Ríos',
    avatar: '/images/photo-1500648767791-00dcc994a43e.jpg',
    rating: 5,
    comment: 'Los señuelos Don KB banana son destructivos en el río. Además la atención de RTM es insuperable, se nota que son pescadores de verdad y saben lo que venden. Pagué con transferencia y me hicieron un 10% de descuento directo.',
    verifiedBuyer: true,
    gearBought: 'Señuelos Don KB + Multifilamento PowerPro'
  },
  {
    id: 't-3',
    name: 'Mariana Vignale',
    location: 'Córdoba Capital',
    avatar: '/images/photo-1494790108377-be9c29b29330.jpg',
    rating: 5,
    comment: 'Compramos la carpa Doite Himalaya y la conservadora Coleman con ruedas para una travesía familiar. Excelente calidad, soportó una tormenta con ráfagas de 60 km/h sin filtrar ni una gota. Recomendadísimos!',
    verifiedBuyer: true,
    gearBought: 'Carpa Doite Himalaya 4P + Conservadora Coleman'
  },
  {
    id: 't-4',
    name: 'Carlos "El Vasco" Arregui',
    location: 'Goya, Corrientes',
    avatar: '/images/photo-1472099645785-5658abf4ff4e.jpg',
    rating: 5,
    comment: 'Hace años que equipo mis lanchas de pesca deportiva con RTM Outdoor. El termo Stanley y las linternas frontales Fenix son indestructibles para la noche de surubí.',
    verifiedBuyer: true,
    gearBought: 'Linterna Frontal Fenix + Termo Stanley 1.4L'
  }
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  hero: {
    badgeLocation: 'RÍO PARANÁ & CORRIENTES',
    badgeSeason: 'Temporada Dorados y Surubíes 2026',
    titlePart1: 'Todo para tu',
    titleHighlightGreen: 'pesca',
    titlePart2: 'y',
    titleHighlightOrange: 'aventura',
    titlePart3: 'en un solo lugar',
    subtitle: 'Equipamiento de pesca, camping y outdoor con asesoramiento especializado.',
    backgroundImage: '/hero-bg.jpg',
    buttonExploreText: 'Comprar Ahora',
    buttonOffersText: 'Ver Ofertas de la Semana',
    feature1: 'Reels & Cañas de Alto Rendimiento',
    feature2: 'Envíos a todo el país con seguro',
    feature3: '3 y 6 Cuotas Sin Interés',
  },
  contact: {
    storeName: 'RTM Outdoor',
    logoUrl: '/rtm-logo.jpg',
    slogan: 'Pesca Deportiva & Camping',
    phone: '+54 9 341 588-9201',
    whatsapp: '5493415889201',
    whatsappMessage: 'Hola RTM Outdoor! Quiero asesoramiento sobre equipos de pesca y camping.',
    email: 'contacto@rtmoutdoor.com.ar',
    address: 'Av. Costanera del Paraná 2480',
    addressDetails: 'Rosario / Santa Fe, Argentina (Frente a guardería náutica)',
    hours: 'Lunes a Sábados de 08:30 a 19:30 hs',
    announcementText: '🎣 TEMPORADA DE DORADOS 2026: 10% OFF EN EFECTIVO/TRANSFERENCIA',
    freeShippingThreshold: 120000,
    instagramUrl: 'https://instagram.com',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
  },
  about: {
    badge: 'Nuestra Pasión & Historia',
    title: 'RTM OUTDOOR:',
    titleHighlight: 'Nacidos en el Río, Creados para la Aventura',
    quote: '"Somos apasionados por la pesca y la aventura. Nuestro objetivo es brindar el mejor equipamiento, asesoramiento y atención para que cada salida sea una experiencia inolvidable."',
    quoteAuthor: '— Equipo Fundador de RTM Outdoor',
    paragraph1: 'Nacimos a orillas del majestuoso Río Paraná, guiados por el magnetismo del dorado y las noches estrelladas de campamento en las islas. Lo que empezó como un grupo de amigos intercambiando señuelos y anécdotas de pesca se convirtió en la tienda de referencia para miles de pescadores deportivos y amantes del outdoor en toda la Argentina.',
    paragraph2: 'No somos un comercio genérico: cada caña que recomendamos, cada reel que despachamos y cada carpa que exhibimos ha sido testeada en condiciones reales de frío, viento y correntada. Cuando hablás con nosotros, hablás con pescadores de verdad.',
    image: '/about-us.jpg',
    imageCardTitle: 'Base Fluvial & Showroom',
    imageCardSubtitle: 'Atención directa a guías y aficionados',
    stat1Number: '+15 Años',
    stat1Label: 'Navegando el Paraná',
    stat2Number: '+50.000',
    stat2Label: 'Envíos a todo el país',
    stat3Number: '100%',
    stat3Label: 'Asesoramiento genuino',
  },
  pescaCategories: PESCA_CATEGORIES,
  campingCategories: CAMPING_CATEGORIES,
  blogPosts: BLOG_POSTS,
  testimonials: TESTIMONIALS,
};

