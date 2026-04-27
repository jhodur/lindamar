"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { DEPARTAMENTOS_COLOMBIA } from "@/lib/colombia";
import {
  buildOrder,
  buildWhatsAppOrderMessage,
  saveLastOrder,
  type CustomerData,
} from "@/lib/order";
import { whatsappLink } from "@/lib/whatsapp";
import { formatCOP, cn } from "@/lib/utils";

const EMPTY_FORM: CustomerData = {
  nombre: "",
  email: "",
  telefono: "",
  departamento: "",
  ciudad: "",
  direccion: "",
  notas: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { detailed, subtotalCentavos, hydrated, clear } = useCart();
  const [form, setForm] = useState<CustomerData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof CustomerData>(key: K, value: CustomerData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (detailed.length === 0 || submitting) return;
    setSubmitting(true);

    const order = buildOrder(detailed, form);
    saveLastOrder(order);
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

  if (detailed.length === 0) {
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
      <Link
        href="/carrito"
        className="inline-flex items-center gap-1 text-sm text-navy-700/70 hover:text-terracotta-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al carrito
      </Link>

      <header className="mt-6 border-b border-blush-200 pb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-terracotta-600">
          Checkout
        </p>
        <h1 className="mt-3 font-display text-4xl text-navy-700 sm:text-5xl">
          Confirmar pedido
        </h1>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <fieldset className="space-y-4">
            <legend className="font-display text-lg text-navy-700">
              Tus datos
            </legend>
            <Field
              label="Nombre completo"
              name="nombre"
              value={form.nombre}
              onChange={(v) => update("nombre", v)}
              required
              autoComplete="name"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Correo electrónico"
                name="email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                required
                autoComplete="email"
              />
              <Field
                label="WhatsApp / Teléfono"
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={(v) => update("telefono", v)}
                required
                autoComplete="tel"
                placeholder="3XX XXX XXXX"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-lg text-navy-700">
              Dirección de envío
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Departamento"
                name="departamento"
                value={form.departamento}
                onChange={(v) => update("departamento", v)}
                options={DEPARTAMENTOS_COLOMBIA}
                required
              />
              <Field
                label="Ciudad / Municipio"
                name="ciudad"
                value={form.ciudad}
                onChange={(v) => update("ciudad", v)}
                required
                autoComplete="address-level2"
              />
            </div>
            <Field
              label="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={(v) => update("direccion", v)}
              required
              autoComplete="street-address"
              placeholder="Calle, carrera, número, apto, barrio"
            />
            <TextareaField
              label="Notas para el pedido (opcional)"
              name="notas"
              value={form.notas ?? ""}
              onChange={(v) => update("notas", v)}
              placeholder="Indicaciones para entrega, talla preferida, etc."
            />
          </fieldset>

          <div className="rounded-xl border border-blush-200 bg-blush-50 p-5 text-sm leading-relaxed text-navy-700/80">
            <p className="font-medium text-navy-700">¿Cómo funciona?</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-navy-700/75">
              <li>Confirmas el pedido y te abrimos WhatsApp con el resumen.</li>
              <li>
                Lindamar te confirma disponibilidad y te envía el link de pago
                por el valor del producto.
              </li>
              <li>Pagas en línea (PSE, tarjeta, Nequi, transferencia).</li>
              <li>
                Te enviamos el paquete. <strong>El valor del envío se paga al
                mensajero al recibir.</strong>
              </li>
            </ol>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-medium text-white transition",
              submitting ? "opacity-70" : "hover:opacity-90",
            )}
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
            {submitting ? "Enviando…" : "Confirmar pedido por WhatsApp"}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-blush-200 bg-blush-50 p-6 lg:sticky lg:top-32">
          <h2 className="font-display text-xl text-navy-700">Tu pedido</h2>
          <ul className="mt-5 space-y-4 border-t border-blush-200 pt-5">
            {detailed.map((d) => (
              <li
                key={`${d.slug}::${d.colorSlug ?? ""}`}
                className="flex justify-between gap-3 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-navy-700">
                    {d.producto.nombre}
                  </p>
                  <p className="text-xs text-navy-700/60">
                    {d.colorNombre ? `${d.colorNombre} · ` : ""}Cant: {d.qty}
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
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
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
  label,
  name,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  required?: boolean;
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
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
