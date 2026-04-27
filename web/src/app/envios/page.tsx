import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Envíos",
  description:
    "Información sobre envíos nacionales de Lindamar a todo Colombia.",
};

export default function EnviosPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeader
        eyebrow="Envíos"
        title="Llegamos a todo Colombia"
        subtitle="Despachamos desde el Huila a todas las ciudades del país. Tiempos de entrega estimados de 2 a 6 días hábiles según destino."
      />

      <div className="mt-12 space-y-4 text-base leading-relaxed text-navy-700/80">
        <p>
          Trabajamos con operadores logísticos colombianos. El costo del envío
          se calcula según la ciudad de destino y el peso del pedido.
        </p>
        <p>
          Para conocer el costo exacto y el tiempo de entrega a tu ciudad,
          escríbenos por WhatsApp y te lo cotizamos al instante.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href={whatsappLink(
            "Hola Lindamar, me gustaría cotizar un envío. ¿Me cuentas a qué ciudad llega y cuánto cuesta?",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          Cotizar mi envío
        </Link>
      </div>

      <p className="mt-12 text-sm italic text-navy-700/60">
        Esta sección se actualizará cuando tengamos integración directa con
        operador logístico.
      </p>
    </section>
  );
}
