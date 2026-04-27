"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartButton() {
  const { count, hydrated, open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Carrito (${count} ${count === 1 ? "prenda" : "prendas"})`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-navy-700 transition-colors hover:bg-blush-100 hover:text-terracotta-600"
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-500 px-1 text-[10px] font-medium text-cream-100">
          {count}
        </span>
      )}
    </button>
  );
}
