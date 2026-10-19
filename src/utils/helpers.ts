export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatInstallments(count: number, total: number): string {
  const amount = Math.round(total / count);
  return `${count} cuotas sin interés de ${formatCurrency(amount)}`;
}

export const STORAGE_KEYS = {
  CART: 'rtm_outdoor_cart_v1',
  FAVORITES: 'rtm_outdoor_favs_v1',
  PRODUCTS: 'rtm_outdoor_products_v1',
  ORDERS: 'rtm_outdoor_orders_v1',
  COUPONS: 'rtm_outdoor_coupons_v1',
  BANNER: 'rtm_outdoor_banner_v1',
  WHATSAPP_LEADS: 'rtm_outdoor_wa_leads_v1'
};

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
      return defaultValue;
    }
    return parsed ?? defaultValue;
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

export const getStoredItem = loadFromStorage;

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to storage:`, e);
  }
}

export const setStoredItem = saveToStorage;
