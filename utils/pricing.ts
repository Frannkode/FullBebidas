import { Product, WholesalePrice } from '../types';

export interface PriceBreakdownItem {
  type: 'pack' | 'unit';
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface BestPriceResult {
  total: number;
  perUnit: number;
  breakdown: PriceBreakdownItem[];
  appliedWholesale: boolean;
  messages: string[];
  stockAvailable?: boolean;
}

export function hasWholesale(p: Product): boolean {
  return Array.isArray(p.wholesalePrices) && p.wholesalePrices.length > 0;
}

export function isLowStock(p: Product, threshold = 12): boolean {
  return typeof p.stock === 'number' && p.stock <= threshold;
}

// Calcula el mejor precio total para `qty` unidades usando combos de paquetes y unidades sueltas.
export function computeBestPrice(p: Product, qty: number): BestPriceResult {
  const unitPrice = p.price;
  const packs: WholesalePrice[] = p.wholesalePrices ? [...p.wholesalePrices] : [];

  // DP para minimizar el costo total para qty unidades
  const MAX = Number.MAX_SAFE_INTEGER / 2;
  const dp: number[] = Array(qty + 1).fill(MAX);
  const choice: (null | { type: 'unit' } | { type: 'pack'; packQty: number; packPrice: number })[] = Array(qty + 1).fill(null);
  dp[0] = 0;

  for (let i = 1; i <= qty; i++) {
    // option: buy one unit
    if (dp[i - 1] + unitPrice < dp[i]) {
      dp[i] = dp[i - 1] + unitPrice;
      choice[i] = { type: 'unit' };
    }
    // options: buy any pack
    for (const pack of packs) {
      if (i - pack.qty >= 0) {
        if (dp[i - pack.qty] + pack.price < dp[i]) {
          dp[i] = dp[i - pack.qty] + pack.price;
          choice[i] = { type: 'pack', packQty: pack.qty, packPrice: pack.price };
        }
      }
    }
  }

  // reconstruir breakdown
  const breakdown: PriceBreakdownItem[] = [];
  let i = qty;
  while (i > 0) {
    const c = choice[i];
    if (!c) break;
    if (c.type === 'unit') {
      const last = breakdown[breakdown.length - 1];
      if (last && last.type === 'unit') {
        last.qty += 1;
        last.totalPrice += unitPrice;
      } else {
        breakdown.push({ type: 'unit', qty: 1, unitPrice, totalPrice: unitPrice });
      }
      i -= 1;
    } else if (c.type === 'pack') {
      breakdown.push({ type: 'pack', qty: c.packQty, unitPrice: +(c.packPrice / c.packQty).toFixed(2), totalPrice: c.packPrice });
      i -= c.packQty;
    }
  }

  // normalizar breakdown (agrupar packs iguales)
  const normalized: PriceBreakdownItem[] = [];
  for (const item of breakdown.reverse()) {
    const existing = normalized.find(n => n.type === item.type && n.qty === item.qty && n.unitPrice === item.unitPrice);
    if (existing) {
      existing.totalPrice += item.totalPrice;
      existing.qty += item.qty;
    } else {
      normalized.push({ ...item });
    }
  }

  const total = dp[qty];
  const perUnit = +(total / qty || 0).toFixed(2);

  const messages: string[] = [];
  if (isLowStock(p)) messages.push('Últimas unidades');
  if (hasWholesale(p)) messages.push('Precio mayorista disponible');

  // Añadir mensaje de tipo promo (ej: si existe un pack x12 y se está comprando >=12, sugerir "Promo x12")
  const packQtys = packs.map(x => x.qty);
  const promoPack = packQtys.sort((a, b) => b - a).find(n => qty >= n);
  if (promoPack) {
    messages.push(`Promo x${promoPack}`);
  }

  const stockAvailable = typeof p.stock !== 'number' || qty <= p.stock;

  return {
    total,
    perUnit,
    breakdown: normalized,
    appliedWholesale: packs.length > 0 && normalized.some(n => n.type === 'pack'),
    messages,
    stockAvailable
  };
}

// Helper: obtener precio unitario sugerido para una cantidad (útil para mostrar en la UI)
export function suggestedUnitPrice(p: Product, qty: number): number {
  return computeBestPrice(p, qty).perUnit;
}

export default {
  computeBestPrice,
  suggestedUnitPrice,
  hasWholesale,
  isLowStock
};
