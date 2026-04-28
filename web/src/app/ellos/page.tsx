import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { ProductGrid } from "@/components/product-grid";
import { productosPorLinea } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ellos",
  description:
    "Línea Ellos de Lindamar: camisas para hombre con estampados del Sanjuanero, el páramo y los paisajes del Huila.",
};

export default function EllosPage() {
  const productos = productosPorLinea("ellos");
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeader
        eyebrow="Línea"
        title="Ellos"
        subtitle="Camisas con estampados de nuestro folclor, paisajes y símbolos que nos hacen colombianos."
      />
      <div className="mt-14">
        <ProductGrid productos={productos} />
      </div>
    </section>
  );
}
