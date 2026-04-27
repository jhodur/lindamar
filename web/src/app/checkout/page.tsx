"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { DEPARTAMENTOS_COLOMBIA } from "@/lib/colombia";
import {
  buildOrder,
  buildWhatsAppOrderMessage,
  saveLastOrder,
  type CustomerData,
  type Order,
} from "@/lib/order";
import { whatsappLink } from "@/lib/whatsapp";
import { formatCOP, cn } from "@/lib/utils";
import { prepareBoldPayment } from "@/lib/bold-actions";
import { BoldButton } from "@/components/bold-button";
import { pesosFromCentavos } from "@/lib/bold";

const EMPTY_FORM: CustomerData = {
  nombre: "",
  email: "",
  telefono: "",
  departamento: "",
  ciudad: "",
  direccion: "",
  notas: "",
};

const BOLD_IDENTITY_KEY = process.env.NEXT_PUBLIC_BOLD_IDENTITY_KEY ?? "";
const BOLD_REDIRECT_URL =
  process.env.NEXT_PUBLIC_BOLD_REDIRECT_URL ??
  (typeof window !== "undefined"
    ? `${window.location.origin}/checkout/exito`
    : "");

type BoldData = {
  orderId: string;
  amountPesos: number;
  integrity: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { detailed, subtotalCentavos, hydrated, clear } = useCart();
  const [form, setForm] = useState<CustomerData>(EMPTY_FORM);
  const [step, setStep] = useState<"form" | "payment">("form");
  const [order, setOrder] = useState<Order | null>(null);
  const [boldData, setBoldData] = useState<BoldData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof CustomerData>(key: K, value: CustomerData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (detailed.length === 0 || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const newOrder = buildOrder(detailed, form);
      saveLastOrder(newOrder);

      const amountPesos = pesosFromCentavos(newOrder.subtotalCentavos);
      const bold = await prepareBoldPayment(newOrder.id, amountPesos);

      setOrder(newOrder);
      setBoldData({
        orderId: bold.orderId,
        amountPesos: bold.amountPesos,
        integrity: bold.integrity,
      });
      setStep("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setError(
        "No pudimos preparar el pago. Inténtalo de nuevo o coordínalo por WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function onWhatsAppFallback() {
    if (!order) return;
    const message = buildWhatsAppOrderMessage(order);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    clear();
    router.push("/checkout/exito");
  }

  if (!hydrated) {
    return (
      <p className="py-32 text-center text-sm text-navy-700/50">Cargando…</p>
    );
  }

  if (detailed.length === 0 && step === "form") {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <h1 className="font-display text-3xl text-navy-700 sm:text-4xl">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-navy-700/70">
          Agrega prendas a tu carrito antes de continuar al pago.
        </p>
        <Link
          href="/coleccion"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-6 py-3 text-sm font-medium text-cream-100 hover:bg-terracotta-600"
        >
          Explorar la colección
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      {step === "form" ? (
        <Link
          href="/carrito"
          className="inline-flex items-center gap-1 text-sm text-navy-700/70 hover:text-terracotta-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setStep("form")}
          className="inline-flex items-center gap-1 text-sm text-navy-700/70 hover:text-terracotta-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Editar datos
        </button>
      )}

      <header className="mt-6 border-b border-blush-200 pb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-terracotta-600">
          Checkout · {step === "form" ? "Paso 1 de 2" : "Paso 2 de 2"}
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy-700 sm:text-5xl">
          {step === "form" ? "Tus datos de envío" : "Pagar pedido"}
        </h1>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        {step === "form" ? (
          <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <fieldset className="space-y-4">
              <legend className="font-display text-lg text-navy-700">
                Tus datos
              </legend>
              <Field label="Nombre completo" name="nombre" value={form.nombre} onChange={(v) => update("nombre", v)} required autoComplete="name" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Correo electrónico" name="email" type="email" value={form.email} onChange={(v) => update("email", v)} required autoComplete="email" />
                <Field label="WhatsApp / Teléfono" name="telefono" type="tel" value={form.telefono} onChange={(v) => update("telefono", v)} required autoComplete="tel" placeholder="3XX XXX XXXX" />
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-display text-lg text-navy-700">
                Dirección de envío
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Departamento" name="departamento" value={form.departamento} onChange={(v) => update("departamento", v)} options={DEPARTAMENTOS_COLOMBIA} required />
                <Field label="Ciudad / Municipio" name="ciudad" value={form.ciudad} onChange={(v) => update("ciudad", v)} required autoComplete="address-level2" />
              </div>
              <Field label="Dirección" name="direccion" value={form.direccion} onChange={(v) => update("direccion", v)} required autoComplete="street-address" placeholder="Calle, carrera, número, apto, barrio" />
              <TextareaField label="Notas para el pedido (opcional)" name="notas" value={form.notas ?? ""} onChange={(v) => update("notas", v)} placeholder="Indicaciones para entrega, talla preferida, etc." />
            </fieldset>

            <div className="rounded-xl border border-blush-200 bg-blush-50 p-5 text-sm leading-relaxed text-navy-700/80">
              <p className="font-medium text-navy-700">¿Cómo funciona?</p>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-navy-700/75">
                <li>Llenas tus datos y continúas al pago.</li>
                <li>Pagas el valor del producto en línea con Bold (PSE, tarjeta, Nequi, transferencia).</li>
                <li>Te enviamos el paquete a tu dirección.</li>
                <li><strong>El valor del envío se paga al mensajero al recibir.</strong></li>
              </ol>
            </div>

            {error && (
              <p className="text-sm text-terracotta-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-full bg-terracotta-500 px-6 py-4 text-sm font-medium text-cream-100 transition",
                submitting ? "opacity-70" : "hover:bg-terracotta-600",
              )}
            >
              {submitting ? "Preparando pago…" : "Continuar al pago"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-blush-200 bg-cream-50 p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-teal-500" strokeWidth={1.8} />
                <div>
                  <p className="font-display text-lg text-navy-700">Pago seguro con Bold</p>
                  <p className="mt-1 text-sm text-navy-700/70">
                    Procesamos tu pago a través de Bold. Métodos disponibles:
                    <strong className="text-navy-700"> PSE, tarjeta crédito/débito, Nequi, Daviplata, transferencia.</strong>
                  </p>
                </div>
              </div>

              {boldData && order && (
                <div className="mt-6">
                  <BoldButton
                    orderId={boldData.orderId}
                    amountPesos={boldData.amountPesos}
                    integrity={boldData.integrity}
                    identityKey={BOLD_IDENTITY_KEY}
                    redirectionUrl={BOLD_REDIRECT_URL}
                    description={`Pedido Lindamar ${order.id}`}
                    customerData={{
                      email: order.cliente.email,
                      fullName: order.cliente.nombre,
                      phone: order.cliente.telefono,
                    }}
                  />
                </div>
              )}

              <p className="mt-4 text-xs text-navy-700/60">
                Pedido <strong>{order?.id}</strong> · Total a pagar online{" "}
                <strong>{formatCOP(subtotalCentavos)}</strong>. El envío se paga al mensajero contra entrega.
              </p>
            </div>

            <div className="rounded-2xl border border-blush-200 p-5 text-sm leading-relaxed text-navy-700/80">
              <p className="font-medium text-navy-700">¿Prefieres coordinar por WhatsApp?</p>
              <p className="mt-1">
                Te abrimos WhatsApp con el resumen del pedido y Lindamar te confirma manualmente.
              </p>
              <button
                type="button"
                onClick={onWhatsAppFallback}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-navy-700/20 px-5 py-3 text-sm font-medium text-navy-700 hover:border-terracotta-500 hover:text-terracotta-600"
              >
                <MessageCircle className="h-4 w-4" />
                Coordinar por WhatsApp
              </button>
            </div>
          </div>
        )}

        <aside className="h-fit rounded-2xl border border-blush-200 bg-blush-50 p-6 lg:sticky lg:top-32">
          <h2 className="font-display text-xl text-navy-700">Tu pedido</h2>
          <ul className="mt-5 space-y-4 border-t border-blush-200 pt-5">
            {detailed.map((d) => (
              <li
                key={`${d.slug}::${d.talla}::${d.colorSlug ?? ""}`}
                className="flex justify-between gap-3 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-navy-700">
                    {d.producto.nombre}
                  </p>
                  <p className="text-xs text-navy-700/60">
                    Talla {d.talla}
                    {d.colorNombre ? ` · ${d.colorNombre}` : ""} · Cant: {d.qty}
                  </p>
                </div>
                <p className="whitespace-nowrap text-navy-700">
                  {formatCOP(d.subtotalCentavos)}
                </p>
              </li>
            ))}
          </ul>
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
              Total online
            </span>
            <span className="text-xl font-medium text-teal-600">
              {formatCOP(subtotalCentavos)}
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label, name, value, onChange, type = "text", required, autoComplete, placeholder,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; autoComplete?: string; placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-navy-700">
        {label} {required && <span className="text-terracotta-600">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-blush-300 bg-cream-100 px-4 py-3 text-base text-navy-700 outline-none transition placeholder:text-navy-700/40 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200"
      />
    </label>
  );
}

function SelectField({
  label, name, value, onChange, options, required,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  options: readonly string[]; required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-navy-700">
        {label} {required && <span className="text-terracotta-600">*</span>}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="block w-full rounded-lg border border-blush-300 bg-cream-100 px-4 py-3 text-base text-navy-700 outline-none transition focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200"
      >
        <option value="">Selecciona…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label, name, value, onChange, placeholder,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-navy-700">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="block w-full resize-none rounded-lg border border-blush-300 bg-cream-100 px-4 py-3 text-base text-navy-700 outline-none transition placeholder:text-navy-700/40 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200"
      />
    </label>
  );
}
