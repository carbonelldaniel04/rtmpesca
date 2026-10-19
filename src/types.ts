export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  installments: {
    count: number;
    amount: number;
  };
  stock: number;
  image: string;
  additionalImages?: string[];
  badge?: 'Nuevo' | 'Oferta' | 'Más Vendido';
  rating: number;
  reviewsCount: number;
  fishingType?: 'Baitcasting' | 'Spinning' | 'Trolling' | 'Mosca' | 'Variada de Río' | 'Costa' | 'General';
  description: string;
  specs: Record<string, string>;
  isFeatured?: boolean;
  isAnglersChoice?: boolean;
}

export interface CategoryCard {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
  type: 'pesca' | 'camping' | 'outdoor';
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  shippingMethod: string;
  total: number;
  paymentMethod: 'mercadopago' | 'transferencia';
  status: 'Pendiente' | 'Pagado' | 'En Preparación' | 'Despachado' | 'Entregado';
  couponCode?: string;
  transferReceipt?: string;
  trackingCode?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend: number;
  active: boolean;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  verifiedBuyer: boolean;
  gearBought: string;
}

export interface WeeklyOffer {
  title: string;
  subtitle: string;
  discountBadge: string;
  featuredProductName: string;
  featuredProductPrice: number;
  featuredProductOriginalPrice: number;
  featuredProductImage: string;
  bannerImage: string;
  countdownDays: number;
  active: boolean;
}

export interface SiteHeroConfig {
  badgeLocation: string;
  badgeSeason: string;
  titlePart1: string;
  titleHighlightGreen: string;
  titlePart2: string;
  titleHighlightOrange: string;
  titlePart3: string;
  subtitle: string;
  backgroundImage: string;
  buttonExploreText: string;
  buttonOffersText: string;
  feature1: string;
  feature2: string;
  feature3: string;
}

export interface SiteContactConfig {
  storeName: string;
  logoUrl?: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: string;
  addressDetails: string;
  hours: string;
  announcementText: string;
  freeShippingThreshold: number;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
}

export interface SiteAboutConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  quote: string;
  quoteAuthor: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  imageCardTitle: string;
  imageCardSubtitle: string;
  stat1Number: string;
  stat1Label: string;
  stat2Number: string;
  stat2Label: string;
  stat3Number: string;
  stat3Label: string;
}

export interface SiteContent {
  hero: SiteHeroConfig;
  contact: SiteContactConfig;
  about: SiteAboutConfig;
  pescaCategories: CategoryCard[];
  campingCategories: CategoryCard[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
}

