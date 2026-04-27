"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import {
  readLastOrder,
  buildWhatsAppOrderMessage,
  type Order,
} from "@/lib/order";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { formatCOP, cn } from "@/lib/utils";

type Status = "approved" | "pending" | "rejected" | "manual" | "unknown";

function statusFromBold(s: string | null): Status {
  if (!s) return "manual";
  const upper = s.toUpperCase();
  if (upper === "APPROVED") return "approved";
  if (upper === "PENDING") return "pending";
  if (upper === "REJECTED" || upper === "FAILED") return "rejected";
  return "unknown";
}

const STATUS_META: Record<
  Status,
  {
    icon: typeof CheckCircle2;
    iconColor: string;
    iconBg: string;
    title: string;
    subtitle: string;
  }
> = {
  approved: {
    icon: CheckCircle2,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100",
    title: "¡Pago aprobado!",
    subtitle:
      "Recibimos tu pago. Empezamos a preparar tu pedido y te avisamos por WhatsApp cuando salga.",
  },
  pending: {
    icon: Clock,
    iconColor: "text-terracotta-600",
    iconBg: "bg-terracotta-100",
    title: "Pago pendiente",
    subtitle:
      "Tu pago está en proceso (común en PSE). Te avisamos por WhatsApp apenas confirme.",
  },
  rejected: {
    icon: XCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    title: "Pago rechazado",
    subtitle:
      "El pago no se pudo procesar. Puedes intentarlo de nuevo o coordinar por WhatsApp.",
  },
  manual: {
    icon: MessageCircle,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100",
    title: "Pedido enviado por WhatsApp",
    subtitle:
      "Lindamar te confirmará disponibilidad y te enviará el link de pago.",
  },
  unknown: {
    icon: Clock,
    iconColor: "text-navy-700/70",
    iconBg: "bg-blush-200",
    title: "Estado del pago desconocido",
    subtitle: "Si tienes dudas, escríbenos por WhatsApp para confirmar.",
  },
};

function CheckoutExitoContent() {
  const searchParams = useSearchParams();
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

  const boldStatus = searchParams.get("bold-tx-status");
  const boldOrderId = searchParams.get("bold-order-id");
  const boldTxId = searchParams.get("bold-tx-id");
  const status: Status = statusFromBold(boldStatus);
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  const orderId = order?.id ?? boldOrderId ?? "—";
  const reenviar = () => {
    if (!order) return;
    window.open(
      whatsappLink(buildWhatsAppOrderMessage(order)),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="text-center">
        <div
          className={cn(
            "inline-flex h-16 w-16 items-center justify-center rounded-full",
            meta.iconBg,
            meta.iconColor,
          )}
        >
          <Icon className="h-9 w-9" strokeWidth={1.8} />
        </div>
        <h1 className="mt-6 font-display text-4xl text-navy-700 sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-3 text-navy-700/70">
          Pedido <span className="font-medium text-navy-700">{orderId}</span>
          {boldTxId && (
            <>
              <br />
              <span className="text-xs text-navy-700/60">
                Transacción Bold: {boldTxId}
              </span>
            </>
          )}
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-blush-200 bg-blush-50 p-6 text-sm leading-relaxed text-navy-700/85">
        <p>{meta.subtitle}</p>
        {status === "manual" && (
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-navy-700/75">
            <li>
              Te abrimos WhatsApp con el resumen para enviar a Lindamar (
              {WHATSAPP_DISPLAY}). Si no se abrió, usa el botón de abajo.
            </li>
            <li>
              Lindamar te confirma disponibilidad y te envía el{" "}
              <strong>link de pago</strong> por el valor del producto.
            </li>
            <li>
              <strong>El envío se paga al mensajero al recibir.</strong>
            </li>
          </ol>
        )}
      </div>

      {order && (
        <div className="mt-8 rounded-2xl border border-blush-200 p-6">
          <h2 className="font-display text-lg text-navy-700">Resumen</h2>
          <ul className="mt-4 space-y-3 border-t border-blush-200 pt-4">
            {order.items.map((it) => (
              <li
                key={`${it.slug}::${it.talla}::${it.color ?? ""}`}
                className="flex justify-between gap-3 text-sm"
              >
                <div>
                  <p className="font-medium text-navy-700">{it.nombre}</p>
                  <p className="text-xs text-navy-700/60">
                    Talla {it.talla}
                    {it.color ? ` · ${it.color}` : ""} · Cant: {it.qty} ·{" "}
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
              Total pagado online
            </span>
            <span className="text-xl font-medium text-teal-600">
              {formatCOP(order.subtotalCentavos)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {status === "manual" && order && (
          <button
            type="button"
            onClick={reenviar}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            Reenviar por WhatsApp
          </button>
        )}
        {status === "rejected" && (
          <Link
            href="/checkout"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-terracotta-500 px-6 py-3.5 text-sm font-medium text-cream-100 hover:bg-terracotta-600"
          >
            Intentar pagar de nuevo
          </Link>
        )}
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

export default function CheckoutExitoPage() {
  return (
    <Suspense
      fallback={
        <p className="py-32 text-center text-sm text-navy-700/50">Cargando…</p>
      }
    >
      <CheckoutExitoContent />
    </Suspense>
  );
}
