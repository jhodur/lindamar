import Image from "next/image";
import Link from "next/link";
import type { Producto } from "@/lib/products";
import { formatCOP } from "@/lib/utils";

export function ProductCard({ producto }: { producto: Producto }) {
  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-blush-100">
        <Image
          src={producto.imagen}
          alt={producto.imagenAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {producto.fotosPendientes && (
          <span className="absolute top-3 left-3 rounded-full bg-navy-700/85 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-cream-100 backdrop-blur">
            Foto próximamente
          </span>
        )}
        {producto.colores && producto.colores.length > 1 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-cream-100/90 px-3 py-1 text-xs font-medium text-navy-700 backdrop-blur">
            +{producto.colores.length} colores
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base text-navy-700 group-hover:text-terracotta-600">
          {producto.nombre}
        </h3>
        <p className="text-sm font-medium text-teal-600 whitespace-nowrap">
          {formatCOP(producto.precioCentavos)}
        </p>
      </div>
      <p className="mt-1 text-xs uppercase tracking-wider text-navy-700/50">
        REF · {producto.ref}
      </p>
    </Link>
  );
}
