import type { Producto } from "@/lib/products";
import { ProductCard } from "./product-card";

type Props = {
  productos: Producto[];
  emptyMessage?: string;
};

export function ProductGrid({
  productos,
  emptyMessage = "Pronto tendremos novedades en esta sección.",
}: Props) {
  if (productos.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-navy-700/60">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((p) => (
        <ProductCard key={p.slug} producto={p} />
      ))}
    </div>
  );
}
