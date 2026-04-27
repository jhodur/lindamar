"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ShoppingBag, Check } from "lucide-react";
import type { Producto } from "@/lib/products";
import { formatCOP, cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";

export function ProductDetail({ producto }: { producto: Producto }) {
  const { addItem } = useCart();
  const [colorSlug, setColorSlug] = useState<string | undefined>(
    producto.colores?.[0]?.slug,
  );
  const [justAdded, setJustAdded] = useState(false);

  const colorActual = producto.colores?.find((c) => c.slug === colorSlug);
  const colorTexto = colorActual ? ` (Color ${colorActual.nombre})` : "";
  const mensaje = `Hola Lindamar, me interesa la prenda *${producto.nombre}*${colorTexto} (REF ${producto.ref}). ¿Me cuentas tallas y disponibilidad?`;

  function handleAdd() {
    addItem({ slug: producto.slug, qty: 1, colorSlug });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-terracotta-600">
          REF · {producto.ref}
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy-700 sm:text-5xl">
          {producto.nombre}
        </h1>
        <p className="mt-4 text-2xl font-medium text-teal-600">
          {formatCOP(producto.precioCentavos)}
        </p>
      </div>

      {producto.descripcion && (
        <p className="text-base leading-relaxed text-navy-700/80">
          {producto.descripcion}
        </p>
      )}

      {producto.colores && producto.colores.length > 0 && (
        <div>
          <p className="text-sm font-medium text-navy-700">
            Color:{" "}
            <span className="font-normal text-navy-700/70">
              {colorActual?.nombre}
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {producto.colores.map((color) => (
              <button
                key={color.slug}
                type="button"
                onClick={() => setColorSlug(color.slug)}
                aria-label={`Color ${color.nombre}`}
                aria-pressed={color.slug === colorSlug}
                className={cn(
                  "h-11 w-11 rounded-full border-2 transition-all",
                  color.slug === colorSlug
                    ? "border-terracotta-500 ring-2 ring-terracotta-200 ring-offset-2 ring-offset-cream-100"
                    : "border-blush-200 hover:border-terracotta-300",
                )}
                style={{ background: color.swatch }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium transition",
            justAdded
              ? "bg-teal-500 text-cream-100"
              : "bg-terracotta-500 text-cream-100 hover:bg-terracotta-600",
          )}
        >
          {justAdded ? (
            <>
              <Check className="h-5 w-5" strokeWidth={2.2} />
              Agregado
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" strokeWidth={2} />
              Agregar al carrito
            </>
          )}
        </button>
        <Link
          href={whatsappLink(mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-navy-700/20 px-6 py-4 text-sm font-medium text-navy-700 transition hover:border-terracotta-500 hover:text-terracotta-600"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={2} />
          Pedir por WhatsApp
        </Link>
      </div>

      <div className="rounded-xl border border-blush-200 bg-blush-50 p-5 text-sm leading-relaxed text-navy-700/75">
        <p>
          <strong>Producto pre-pagado, envío contra entrega.</strong> Pagas el
          valor del producto en línea y el envío al mensajero al recibir el
          paquete. Confección artesanal en el Huila — pequeñas variaciones
          forman parte del carácter hecho a mano.
        </p>
      </div>
    </div>
  );
}
