import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { ProductGrid } from "@/components/product-grid";
import { productosVisibles } from "@/lib/products";

export const metadata: Metadata = {
  title: "Colección",
  description:
    "Toda la colección Lindamar: vestidos Cola Imperial, vestidos, camisas y kimonos con identidad cultural colombiana.",
};

export default function ColeccionPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeader
        eyebrow="Catálogo"
        title="Toda la colección"
        subtitle="Cada prenda lleva la huella del Huila. Recorre todas las líneas en un solo lugar."
      />
      <div className="mt-14">
        <ProductGrid productos={productosVisibles()} />
      </div>
    </section>
  );
}
