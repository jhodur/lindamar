import type { Metadata } from "next";
import { SectionHeader } from "@/components/section-header";
import { ProductGrid } from "@/components/product-grid";
import {
  productosPorLineaYCategoria,
  type Producto,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Ellas",
  description:
    "Línea Ellas de Lindamar: vestidos Cola Imperial en 7 colores, vestidos cortos, kimonos y camisas con identidad cultural opita.",
};

export default function EllasPage() {
  const colaImperial = productosPorLineaYCategoria(
    "ellas",
    "vestido-cola-imperial",
  );
  const vestidos = productosPorLineaYCategoria("ellas", "vestido");
  const camisas = productosPorLineaYCategoria("ellas", "camisa");
  const kimonos = productosPorLineaYCategoria("ellas", "kimono");

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeader
        eyebrow="Línea"
        title="Ellas"
        subtitle="Vestidos, camisas y kimonos que celebran a la mujer colombiana, con la fuerza visual de nuestros paisajes y patrimonio tejida en cada estampado."
      />

      <CategoryBlock
        title="Vestidos Cola Imperial"
        subtitle="Vestidos largos de gala con cola desmontable. 7 colores."
        productos={colaImperial}
      />

      <CategoryBlock
        title="Vestidos"
        subtitle="Vestidos cortos con estampados culturales únicos."
        productos={vestidos}
      />

      <CategoryBlock
        title="Camisas"
        subtitle="Estampados originales — Heliconias, Sol y Luna, Tierra de Contrastes y más."
        productos={camisas}
      />

      <CategoryBlock
        title="Kimonos"
        subtitle="Tejidos ligeros con estampados patchwork."
        productos={kimonos}
      />
    </section>
  );
}

function CategoryBlock({
  title,
  subtitle,
  productos,
}: {
  title: string;
  subtitle?: string;
  productos: Producto[];
}) {
  if (productos.length === 0) return null;

  return (
    <div className="mt-20 first:mt-14">
      <div className="flex items-end justify-between gap-6 border-b border-blush-200 pb-5">
        <div>
          <h2 className="font-display text-2xl text-navy-700 sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-sm leading-relaxed text-navy-700/70 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <p className="hidden text-xs uppercase tracking-widest text-navy-700/50 sm:block">
          {productos.length} {productos.length === 1 ? "pieza" : "piezas"}
        </p>
      </div>
      <div className="mt-10">
        <ProductGrid productos={productos} />
      </div>
    </div>
  );
}
