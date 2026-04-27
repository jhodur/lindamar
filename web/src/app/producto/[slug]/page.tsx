import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, ArrowRight } from "lucide-react";
import {
  PRODUCTOS,
  productoPorSlug,
  productosRelacionados,
} from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = productoPorSlug(slug);
  if (!producto) return {};
  return {
    title: producto.nombre,
    description: producto.descripcion ?? producto.imagenAlt,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = productoPorSlug(slug);
  if (!producto) notFound();

  const lineaLabel = producto.linea === "ellas" ? "Ellas" : "Ellos";
  const relacionados = productosRelacionados(producto.slug, producto.linea);

  return (
    <>
      <nav
        aria-label="Migas de pan"
        className="mx-auto max-w-7xl px-5 pt-6 text-xs text-navy-700/60 sm:px-8"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-terracotta-600">
              Inicio
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li>
            <Link
              href={`/${producto.linea}`}
              className="hover:text-terracotta-600"
            >
              {lineaLabel}
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-navy-700/80">{producto.nombre}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-blush-100">
            <Image
              src={producto.imagen}
              alt={producto.imagenAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <ProductDetail producto={producto} />
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl text-navy-700 sm:text-3xl">
              También te puede gustar
            </h2>
            <Link
              href={`/${producto.linea}`}
              className="hidden items-center gap-1 text-sm font-medium text-teal-500 hover:text-terracotta-600 sm:inline-flex"
            >
              Ver Línea {lineaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {relacionados.map((p) => (
              <ProductCard key={p.slug} producto={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
