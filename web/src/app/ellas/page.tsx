import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { ProductGrid } from "@/components/product-grid";
import { productosPorLinea } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ellas",
  description:
    "Línea Ellas de Lindamar: vestidos Cola Imperial, vestidos cortos, kimonos y camisas con identidad cultural opita.",
};

export default function EllasPage() {
  const productos = productosPorLinea("ellas");
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeader
        eyebrow="Línea"
        title="Ellas"
        subtitle="Vestidos, camisas y kimonos que celebran a la mujer colombiana, con la fuerza visual del Huila tejida en cada estampado."
      />
      <div className="mt-14">
        <ProductGrid productos={productos} />
      </div>
    </section>
  );
}
