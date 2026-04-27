import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cambios y devoluciones",
  description:
    "Política de cambios y devoluciones de Lindamar. Te ayudamos por WhatsApp.",
};

export default function CambiosPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeader
        eyebrow="Cambios y devoluciones"
        title="Tu prenda perfecta"
        subtitle="Si la talla o el color no fueron lo esperado, te ayudamos a hacer el cambio."
      />

      <div className="mt-12 space-y-4 text-base leading-relaxed text-navy-700/80">
        <p>
          Aceptamos cambios dentro de los <strong>7 días</strong> siguientes a
          la recepción de tu pedido, siempre que la prenda esté sin uso, con
          etiquetas y en su empaque original.
        </p>
        <p>
          Por tratarse de prendas confeccionadas artesanalmente, no realizamos
          devoluciones en efectivo, pero sí cambios por talla, color u otra
          referencia equivalente.
        </p>
        <p>
          Para iniciar un cambio, escríbenos por WhatsApp con tu número de
          pedido y te guiamos paso a paso.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href={whatsappLink(
            "Hola Lindamar, necesito ayuda con un cambio o devolución.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          Iniciar cambio
        </Link>
      </div>

      <p className="mt-12 text-sm italic text-navy-700/60">
        Política preliminar — se ajustará con la diseñadora antes del
        lanzamiento.
      </p>
    </section>
  );
}
