"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { readLastOrder, buildWhatsAppOrderMessage, type Order } from "@/lib/order";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { formatCOP } from "@/lib/utils";

export default function CheckoutExitoPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOrder(readLastOrder());
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <p className="py-32 text-center text-sm text-navy-700/50">Cargando…</p>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <h1 className="font-display text-3xl text-navy-700 sm:text-4xl">
          No encontramos tu pedido
        </h1>
        <p className="mt-3 text-navy-700/70">
          Si acabas de hacer un pedido y necesitas confirmación, escríbenos
          directamente por WhatsApp.
        </p>
        <Link
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          <MessageCircle className="h-5 w-5" />
          Escribir a Lindamar
        </Link>
      </section>
    );
  }

  const reenviar = () => {
    window.open(
      whatsappLink(buildWhatsAppOrderMessage(order)),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
          <CheckCircle2 className="h-9 w-9" strokeWidth={1.8} />
        </div>
        <h1 className="mt-6 font-display text-4xl text-navy-700 sm:text-5xl">
          ¡Pedido enviado!
        </h1>
        <p className="mt-3 text-navy-700/70">
          Pedido <span className="font-medium text-navy-700">{order.id}</span>
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-blush-200 bg-blush-50 p-6 text-sm leading-relaxed text-navy-700/85">
        <p className="font-medium text-navy-700">Próximos pasos:</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            Te abrimos WhatsApp con el resumen de tu pedido para enviar a
            Lindamar ({WHATSAPP_DISPLAY}). Si no se abrió, usa el botón de
            abajo.
          </li>
          <li>
            Lindamar te confirma disponibilidad y te envía el <strong>link
            de pago</strong> por el valor del producto.
          </li>
          <li>
            Pagas en línea (PSE, tarjeta, Nequi, transferencia) y te enviamos
            el paquete.
          </li>
          <li>
            <strong>El envío se paga al mensajero al recibir.</strong>
          </li>
        </ol>
      </div>

      <div className="mt-8 rounded-2xl border border-blush-200 p-6">
        <h2 className="font-display text-lg text-navy-700">Resumen</h2>
        <ul className="mt-4 space-y-3 border-t border-blush-200 pt-4">
          {order.items.map((it) => (
            <li key={`${it.slug}::${it.color ?? ""}`} className="flex justify-between gap-3 text-sm">
              <div>
                <p className="font-medium text-navy-700">{it.nombre}</p>
                <p className="text-xs text-navy-700/60">
                  {it.color ? `${it.color} · ` : ""}Cant: {it.qty} ·{" "}
                  {formatCOP(it.precioCentavos)}
                </p>
              </div>
              <p className="whitespace-nowrap text-navy-700">
                {formatCOP(it.subtotalCentavos)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t border-blush-200 pt-4">
          <span className="font-display text-base text-navy-700">
            Total a pagar online
          </span>
          <span className="text-xl font-medium text-teal-600">
            {formatCOP(order.subtotalCentavos)}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reenviar}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white hover:opacity-90"
        >
          <MessageCircle className="h-5 w-5" />
          Reenviar por WhatsApp
        </button>
        <Link
          href="/coleccion"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-navy-700/20 px-6 py-3.5 text-sm font-medium text-navy-700 hover:border-terracotta-500 hover:text-terracotta-600"
        >
          Seguir comprando
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
