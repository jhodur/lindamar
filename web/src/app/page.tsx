import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ReviewsSection } from "@/components/reviews-section";
import { productosDestacados } from "@/lib/products";

export default function Home() {
  const destacados = productosDestacados();

  return (
    <>
      <Hero />
      <LineasEllasEllos />
      <Destacados productos={destacados} />
      <ReviewsSection />
      <NuestraHistoria />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-blush-200">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Vestido Lindamar con motivos de San Agustín"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-700/55 via-navy-700/20 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <p className="font-display text-sm uppercase tracking-[0.4em] text-cream-100/90">
          Lindamar Clothing Line
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-cream-100 sm:text-6xl lg:text-7xl">
          Amor por el <span className="italic text-terracotta-300">Terruño</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/90 sm:text-lg">
          Diseño colombiano con identidad cultural. Cada prenda celebra nuestros
          paisajes, nuestro patrimonio y nuestra gente.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/cola-imperial"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-6 py-3 text-sm font-medium text-cream-100 transition hover:bg-terracotta-600"
          >
            Ver Cola Imperial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/ellas"
            className="inline-flex items-center gap-2 rounded-full border border-cream-100/70 px-6 py-3 text-sm font-medium text-cream-100 transition hover:bg-cream-100/10"
          >
            Explorar la colección
          </Link>
        </div>
      </div>
    </section>
  );
}

function LineasEllasEllos() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          href="/ellas"
          className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush-200"
        >
          <Image
            src="/linea-ellas.jpg"
            alt="Línea Ellas — vestidos y camisas para mujer"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-700/70 via-navy-700/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-7 text-cream-100">
            <p className="text-xs uppercase tracking-[0.35em] text-cream-100/80">
              Línea
            </p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Ellas</h2>
            <p className="mt-2 max-w-xs text-sm text-cream-100/85">
              Vestidos, camisas y kimonos que celebran a la mujer colombiana.
            </p>
          </div>
        </Link>

        <Link
          href="/ellos"
          className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush-200"
        >
          <Image
            src="/linea-ellos.jpg"
            alt="Línea Ellos — camisas para hombre"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-700/70 via-navy-700/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-7 text-cream-100">
            <p className="text-xs uppercase tracking-[0.35em] text-cream-100/80">
              Línea
            </p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Ellos</h2>
            <p className="mt-2 max-w-xs text-sm text-cream-100/85">
              Camisas con estampados de nuestro folclor y los paisajes
              colombianos.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

function Destacados({
  productos,
}: {
  productos: ReturnType<typeof productosDestacados>;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-terracotta-600">
            Destacados
          </p>
          <h2 className="mt-2 font-display text-3xl text-navy-700 sm:text-4xl">
            Piezas que hablan de Colombia
          </h2>
        </div>
        <Link
          href="/coleccion"
          className="hidden items-center gap-1 text-sm font-medium text-teal-500 hover:text-terracotta-600 sm:inline-flex"
        >
          Ver toda la colección
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {productos.map((p) => (
          <ProductCard key={p.slug} producto={p} />
        ))}
      </div>
    </section>
  );
}

function NuestraHistoria() {
  return (
    <section className="bg-cream-200/70 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush-200">
          <Image
            src="/historia.jpg"
            alt="Diseñadora Lindamar en su taller"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-terracotta-600">
            Nuestra historia
          </p>
          <h2 className="mt-3 font-display text-4xl text-navy-700 sm:text-5xl">
            Hecho a mano,
            <br />
            tejido con identidad.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-700/85">
            <p>
              Lindamar es una marca colombiana de ropa nacida en el Huila con
              vocación nacional. Rendimos homenaje a la riqueza cultural y
              geográfica de Colombia — sus paisajes, su patrimonio, su folclor.
            </p>
            <p>
              Cada estampado es un pedazo de país: las estatuas de San Agustín,
              los frailejones del páramo, el Sanjuanero, las heliconias. Piezas
              para llevar Colombia contigo, donde quiera que vayas.
            </p>
          </div>
          <Link
            href="/historia"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal-500 hover:text-terracotta-600"
          >
            Conoce más sobre Lindamar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
