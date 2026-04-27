"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTOS, type Producto } from "./products";

const STORAGE_KEY = "lindamar.cart.v2";

export type CartItem = {
  slug: string;
  qty: number;
  talla: string;
  colorSlug?: string;
};

export type CartItemDetailed = CartItem & {
  producto: Producto;
  colorNombre?: string;
  subtotalCentavos: number;
};

type CartContextValue = {
  items: CartItem[];
  detailed: CartItemDetailed[];
  count: number;
  subtotalCentavos: number;
  isOpen: boolean;
  hydrated: boolean;
  addItem: (item: CartItem) => void;
  updateQty: (
    slug: string,
    talla: string,
    colorSlug: string | undefined,
    qty: number,
  ) => void;
  removeItem: (
    slug: string,
    talla: string,
    colorSlug: string | undefined,
  ) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const itemKey = (slug: string, talla: string, colorSlug?: string) =>
  `${slug}::${talla}::${colorSlug ?? ""}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Validate items have required fields (talla)
          const valid = parsed.filter(
            (i): i is CartItem =>
              typeof i?.slug === "string" &&
              typeof i?.qty === "number" &&
              typeof i?.talla === "string",
          );
          setItems(valid);
        }
      }
    } catch {
      /* localStorage no disponible */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* quota / disabled */
    }
  }, [items, hydrated]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) =>
          itemKey(i.slug, i.talla, i.colorSlug) ===
          itemKey(newItem.slug, newItem.talla, newItem.colorSlug),
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + newItem.qty };
        return next;
      }
      return [...prev, newItem];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback(
    (
      slug: string,
      talla: string,
      colorSlug: string | undefined,
      qty: number,
    ) => {
      setItems((prev) =>
        qty <= 0
          ? prev.filter(
              (i) =>
                itemKey(i.slug, i.talla, i.colorSlug) !==
                itemKey(slug, talla, colorSlug),
            )
          : prev.map((i) =>
              itemKey(i.slug, i.talla, i.colorSlug) ===
              itemKey(slug, talla, colorSlug)
                ? { ...i, qty }
                : i,
            ),
      );
    },
    [],
  );

  const removeItem = useCallback(
    (slug: string, talla: string, colorSlug: string | undefined) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            itemKey(i.slug, i.talla, i.colorSlug) !==
            itemKey(slug, talla, colorSlug),
        ),
      );
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const detailed: CartItemDetailed[] = useMemo(() => {
    const result: CartItemDetailed[] = [];
    for (const item of items) {
      const producto = PRODUCTOS.find((p) => p.slug === item.slug);
      if (!producto) continue;
      const colorNombre = producto.colores?.find(
        (c) => c.slug === item.colorSlug,
      )?.nombre;
      result.push({
        ...item,
        producto,
        colorNombre,
        subtotalCentavos: producto.precioCentavos * item.qty,
      });
    }
    return result;
  }, [items]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );
  const subtotalCentavos = useMemo(
    () => detailed.reduce((sum, d) => sum + d.subtotalCentavos, 0),
    [detailed],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        detailed,
        count,
        subtotalCentavos,
        isOpen,
        hydrated,
        addItem,
        updateQty,
        removeItem,
        clear,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
