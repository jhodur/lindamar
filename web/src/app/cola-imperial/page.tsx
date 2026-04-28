import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ProductGrid } from "@/components/product-grid";
import {
  productosPorCategoria,
  COLORES_COLA_IMPERIAL,
} from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cola Imperial",
  description:
    "Vestidos Cola Imperial de Lindamar: piezas de gala con cola desmontable, en cuatro colores. Diseño opita, hecho a mano.",
};

export default function ColaImperialPage() {
  const productos = productosPorCategoria("vestido-cola-imperial");
  const inquiryMsg =
    "Hola Lindamar, me gustaría más información sobre los vestidos Cola Imperial — colores disponibles, tallas y tiempos de entrega.";

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeader
          eyebrow="Línea Exclusiva"
          title="Cola Imperial"
          subtitle="Vestidos largos de gala con cola desmontable. Una sola silueta, siete colores para llevar a Colombia con orgullo."
        />

        <div className="mt-12 flex flex-wrap items-center gap-4">
          {COLORES_COLA_IMPERIAL.map((color) => (
            <div key={color.slug} className="flex items-center gap-2">
              <span
                className="h-7 w-7 rounded-full border-2 border-blush-200"
                style={{ background: color.swatch }}
                aria-hidden="true"
              />
              <span className="text-sm text-navy-700/80">{color.nombre}</span>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <ProductGrid productos={productos} />
        </div>
      </section>

      <section className="bg-cream-200/70 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-terracotta-600">
            Hecho a la medida
          </p>
          <h2 className="mt-4 font-display text-3xl text-navy-700 sm:text-4xl">
            ¿Quieres un color que no ves aquí?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700/75">
            Trabajamos cada Cola Imperial sobre pedido. Si tienes un color o
            combinación específica en mente, escríbenos por WhatsApp y lo
            cotizamos.
          </p>
          <Link
            href={whatsappLink(inquiryMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-medium text-white transition hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
            Cotizar por WhatsApp
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
