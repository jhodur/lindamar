import type { CartItemDetailed } from "./cart-context";
import { formatCOP } from "./utils";

export type CustomerData = {
  nombre: string;
  email: string;
  telefono: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  notas?: string;
};

export type Order = {
  id: string;
  fechaISO: string;
  items: Array<{
    slug: string;
    nombre: string;
    ref: string;
    color?: string;
    qty: number;
    precioCentavos: number;
    subtotalCentavos: number;
  }>;
  cliente: CustomerData;
  subtotalCentavos: number;
};

const ORDER_STORAGE_KEY = "lindamar.lastOrder.v1";

export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LM-${ts}-${rnd}`;
}

export function buildOrder(
  items: CartItemDetailed[],
  cliente: CustomerData,
): Order {
  return {
    id: generateOrderId(),
    fechaISO: new Date().toISOString(),
    items: items.map((d) => ({
      slug: d.producto.slug,
      nombre: d.producto.nombre,
      ref: d.producto.ref,
      color: d.colorNombre,
      qty: d.qty,
      precioCentavos: d.producto.precioCentavos,
      subtotalCentavos: d.subtotalCentavos,
    })),
    cliente,
    subtotalCentavos: items.reduce((s, d) => s + d.subtotalCentavos, 0),
  };
}

export function buildWhatsAppOrderMessage(order: Order): string {
  const lines: string[] = [];
  lines.push("*NUEVO PEDIDO LINDAMAR*");
  lines.push(`Pedido ${order.id}`);
  lines.push("");
  lines.push("*Cliente*");
  lines.push(`${order.cliente.nombre}`);
  lines.push(`Tel: ${order.cliente.telefono}`);
  lines.push(`Email: ${order.cliente.email}`);
  lines.push("");
  lines.push("*Dirección de envío*");
  lines.push(order.cliente.direccion);
  lines.push(`${order.cliente.ciudad}, ${order.cliente.departamento}`);
  if (order.cliente.notas) {
    lines.push("");
    lines.push("*Notas*");
    lines.push(order.cliente.notas);
  }
  lines.push("");
  lines.push("*Productos*");
  for (const item of order.items) {
    const colorTxt = item.color ? ` (${item.color})` : "";
    const cantTxt =
      item.qty === 1
        ? `1 × ${formatCOP(item.precioCentavos)}`
        : `${item.qty} × ${formatCOP(item.precioCentavos)} = ${formatCOP(item.subtotalCentavos)}`;
    lines.push(`• ${item.nombre}${colorTxt}`);
    lines.push(`  REF ${item.ref} · ${cantTxt}`);
  }
  lines.push("");
  lines.push(`*Subtotal producto: ${formatCOP(order.subtotalCentavos)}*`);
  lines.push("_El envío se paga al mensajero contra entrega._");
  return lines.join("\n");
}

export function saveLastOrder(order: Order): void {
  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch {
    /* noop */
  }
}

export function readLastOrder(): Order | null {
  try {
    const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}

export function clearLastOrder(): void {
  try {
    sessionStorage.removeItem(ORDER_STORAGE_KEY);
  } catch {
    /* noop */
  }
}
