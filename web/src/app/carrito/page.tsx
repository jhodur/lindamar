"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/utils";

export default function CarritoPage() {
  const { detailed, count, subtotalCentavos, hydrated, updateQty, removeItem } =
    useCart();

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="flex items-end justify-between gap-6 border-b border-blush-200 pb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-terracotta-600">
            Carrito
          </p>
          <h1 className="mt-3 font-display text-4xl text-navy-700 sm:text-5xl">
            Tu selección{hydrated && count > 0 ? ` · ${count}` : ""}
          </h1>
        </div>
        <Link
          href="/coleccion"
          className="hidden items-center gap-1 text-sm font-medium text-teal-500 hover:text-terracotta-600 sm:inline-flex"
        >
          <ArrowLeft className="h-4 w-4" />
          Seguir comprando
        </Link>
      </header>

      {!hydrated ? (
        <p className="py-20 text-center text-sm text-navy-700/50">
          Cargando tu carrito…
        </p>
      ) : detailed.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-base text-navy-700/70">Tu carrito está vacío.</p>
          <Link
            href="/coleccion"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-6 py-3 text-sm font-medium text-cream-100 hover:bg-terracotta-600"
          >
            Explorar la colección
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-blush-200">
            {detailed.map((d) => (
              <li
                key={`${d.slug}::${d.talla}::${d.colorSlug ?? ""}`}
                className="flex gap-5 py-6"
              >
                <Link
                  href={`/producto/${d.producto.slug}`}
                  className="relative aspect-[3/4] w-28 flex-shrink-0 overflow-hidden rounded-lg bg-blush-100 sm:w-32"
                >
                  <Image
                    src={d.producto.imagen}
                    alt={d.producto.imagenAlt}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div>
                    <Link
                      href={`/producto/${d.producto.slug}`}
                      className="font-display text-lg text-navy-700 hover:text-terracotta-600"
                    >
                      {d.producto.nombre}
                    </Link>
                    <p className="mt-0.5 text-xs uppercase tracking-wider text-navy-700/50">
                      REF · {d.producto.ref}
                    </p>
                    <p className="mt-1 text-sm text-navy-700/70">
                      Talla: <span className="font-medium text-navy-700">{d.talla}</span>
                      {d.colorNombre && (
                        <> · Color: <span className="font-medium text-navy-700">{d.colorNombre}</span></>
                      )}
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div className="inline-flex items-center rounded-full border border-blush-200">
                      <button
                        type="button"
                        onClick={() => updateQty(d.slug, d.talla, d.colorSlug, d.qty - 1)}
                        aria-label="Restar uno"
                        className="flex h-9 w-9 items-center justify-center text-navy-700/70 hover:text-terracotta-600"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm tabular-nums">
                        {d.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(d.slug, d.talla, d.colorSlug, d.qty + 1)}
                        aria-label="Sumar uno"
                        className="flex h-9 w-9 items-center justify-center text-navy-700/70 hover:text-terracotta-600"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-teal-600">
                        {formatCOP(d.subtotalCentavos)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(d.slug, d.talla, d.colorSlug)}
                        className="mt-1 inline-flex items-center gap-1 text-xs text-navy-700/50 hover:text-terracotta-600"
                      >
                        <Trash2 className="h-3 w-3" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-blush-200 bg-blush-50 p-6 lg:sticky lg:top-32">
            <h2 className="font-display text-xl text-navy-700">Resumen</h2>
            <dl className="mt-5 space-y-3 border-t border-blush-200 pt-5 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-navy-700/70">Subtotal producto</dt>
                <dd className="font-medium text-navy-700">
                  {formatCOP(subtotalCentavos)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between text-xs text-navy-700/60">
                <dt>Envío</dt>
                <dd>Contra entrega</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-baseline justify-between border-t border-blush-200 pt-5">
              <span className="font-display text-base text-navy-700">
                Total a pagar online
              </span>
              <span className="text-xl font-medium text-teal-600">
                {formatCOP(subtotalCentavos)}
              </span>
            </div>
            <p className="mt-2 text-xs text-navy-700/60">
              El valor del envío lo pagas al mensajero al recibir el paquete.
            </p>
            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-terracotta-500 px-5 py-4 text-sm font-medium text-cream-100 hover:bg-terracotta-600"
            >
              Continuar al pago
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
