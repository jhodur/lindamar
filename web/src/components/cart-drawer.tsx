"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatCOP, cn } from "@/lib/utils";

export function CartDrawer() {
  const { detailed, count, subtotalCentavos, isOpen, close, updateQty, removeItem } =
    useCart();

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-navy-900/50 backdrop-blur-sm transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream-100 shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-blush-200 px-6 py-5">
          <h2 className="font-display text-xl text-navy-700">
            Tu carrito{count > 0 ? ` (${count})` : ""}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center rounded-full text-navy-700/70 hover:bg-blush-100 hover:text-terracotta-600"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-base text-navy-700/70">Tu carrito está vacío.</p>
            <Link
              href="/coleccion"
              onClick={close}
              className="mt-6 inline-flex items-center rounded-full bg-terracotta-500 px-5 py-3 text-sm font-medium text-cream-100 hover:bg-terracotta-600"
            >
              Explorar la colección
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {detailed.map((d) => (
                  <li
                    key={`${d.slug}::${d.talla}::${d.colorSlug ?? ""}`}
                    className="flex gap-4"
                  >
                    <Link
                      href={`/producto/${d.producto.slug}`}
                      onClick={close}
                      className="relative h-28 flex-shrink-0 overflow-hidden rounded-lg bg-blush-100"
                      style={{ width: "5.5rem" }}
                    >
                      <Image
                        src={d.producto.imagen}
                        alt={d.producto.imagenAlt}
                        fill
                        sizes="88px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/producto/${d.producto.slug}`}
                        onClick={close}
                        className="text-sm font-medium leading-snug text-navy-700 hover:text-terracotta-600"
                      >
                        {d.producto.nombre}
                      </Link>
                      <p className="mt-0.5 text-xs text-navy-700/60">
                        Talla: <span className="font-medium text-navy-700/80">{d.talla}</span>
                        {d.colorNombre && (
                          <> · Color: <span className="font-medium text-navy-700/80">{d.colorNombre}</span></>
                        )}
                      </p>
                      <p className="mt-1 text-sm font-medium text-teal-600">
                        {formatCOP(d.subtotalCentavos)}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-blush-200">
                          <button
                            type="button"
                            onClick={() => updateQty(d.slug, d.talla, d.colorSlug, d.qty - 1)}
                            aria-label="Restar uno"
                            className="flex h-8 w-8 items-center justify-center text-navy-700/70 hover:text-terracotta-600"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-7 text-center text-sm tabular-nums">
                            {d.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(d.slug, d.talla, d.colorSlug, d.qty + 1)}
                            aria-label="Sumar uno"
                            className="flex h-8 w-8 items-center justify-center text-navy-700/70 hover:text-terracotta-600"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(d.slug, d.talla, d.colorSlug)}
                          aria-label="Eliminar prenda"
                          className="text-navy-700/50 hover:text-terracotta-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-blush-200 bg-blush-50 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-navy-700/70">Subtotal</span>
                <span className="text-lg font-medium text-teal-600">
                  {formatCOP(subtotalCentavos)}
                </span>
              </div>
              <p className="mt-1 text-xs text-navy-700/60">
                Solo el valor del producto. El envío se paga al mensajero contra
                entrega.
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-terracotta-500 px-5 py-3.5 text-sm font-medium text-cream-100 hover:bg-terracotta-600"
              >
                Continuar al pago
              </Link>
              <Link
                href="/carrito"
                onClick={close}
                className="mt-3 block text-center text-xs text-navy-700/60 hover:text-terracotta-600"
              >
                Ver carrito completo
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
