import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles, Star } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

const GOOGLE_REVIEW_URL = "https://g.page/r/CakqDxt-beSJEAE/review";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description:
    "Lindamar nace del orgullo opita, una marca de ropa colombiana que rinde homenaje a las raíces de nuestro país. Conoce la historia detrás de cada prenda.",
};

export default function HistoriaPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-blush-200">
        <div className="absolute inset-0">
          <Image
            src="/historia.jpg"
            alt="Diseñadora Lindamar en su taller"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-700/70 via-navy-700/30 to-navy-700/40" />
        </div>
        <div className="relative mx-auto flex min-h-[55vh] max-w-5xl flex-col justify-end px-5 pb-14 pt-32 sm:px-8 sm:pb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-cream-100/90">
            Nuestra historia
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-cream-100 sm:text-6xl">
            Hecho a mano,
            <br />
            tejido con identidad.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <div className="space-y-7 text-lg leading-relaxed text-navy-700/85">
          <p>
            <strong className="text-navy-700">Lindamar</strong> nace del{" "}
            <em>orgullo opita</em>, una marca de ropa que rinde homenaje a las
            raíces de nuestro país. Inspirada en la riqueza cultural de
            Colombia, cada diseño es una representación viva del territorio:
            sus <strong>tradiciones</strong>, su <strong>folclore</strong>, su{" "}
            <strong>gastronomía</strong>, sus <strong>paisajes</strong> y sus{" "}
            <strong>celebraciones más emblemáticas</strong>.
          </p>
          <p>
            A través de sus prendas, Lindamar cuenta historias de festividades,
            tradiciones y expresiones culturales que conectan con la esencia de
            cada región.
          </p>
          <p>
            Más allá de lo tradicional, Lindamar también crea piezas{" "}
            <strong>contemporáneas</strong> que resaltan la esencia de quien
            las lleva, combinando identidad cultural con un estilo{" "}
            <em>chic, fresco y auténtico</em>.
          </p>

          <p className="!mt-12 border-l-4 border-terracotta-500 pl-6 font-display text-2xl italic leading-snug text-navy-700">
            &ldquo;Lindamar no solo diseña ropa…
            <br />
            crea conexiones entre la moda, el territorio y la identidad.&rdquo;
          </p>

          <p className="!mt-8 text-sm uppercase tracking-[0.4em] text-terracotta-600">
            Amor por el Terruño
          </p>
        </div>
      </section>

      <section className="bg-cream-200/70 py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="rounded-3xl border border-terracotta-200 bg-gradient-to-br from-blush-50 to-cream-50 p-8 sm:p-12">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-terracotta-500 text-cream-100 sm:h-14 sm:w-14">
                <Sparkles className="h-6 w-6" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.4em] text-terracotta-600">
                  Diseños personalizados
                </p>
                <h2 className="mt-3 font-display text-3xl text-navy-700 sm:text-4xl">
                  Una prenda hecha
                  <br className="hidden sm:block" /> a tu medida y a tu historia
                </h2>
                <p className="mt-5 text-base leading-relaxed text-navy-700/80 sm:text-lg">
                  Diseñamos piezas únicas para quienes desean reflejar su
                  propia historia, sus gustos o aquello que los representa.
                  Desde elementos florales hasta conceptos únicos, cada prenda
                  se convierte en una <strong>pieza especial</strong>, creada
                  con <strong>intención y significado</strong>.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={whatsappLink(
                      "Hola Lindamar, me interesa un diseño personalizado. Cuéntenme cómo funciona el proceso y los tiempos.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-6 py-3 text-sm font-medium text-cream-100 transition hover:bg-terracotta-600"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Pedir un diseño personalizado
                  </Link>
                  <Link
                    href="/coleccion"
                    className="inline-flex items-center gap-2 rounded-full border border-navy-700/30 px-6 py-3 text-sm font-medium text-navy-700 transition hover:border-terracotta-500 hover:text-terracotta-600"
                  >
                    Ver la colección actual
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-100 py-16">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600">
            <Star className="h-5 w-5" strokeWidth={2} />
          </div>
          <h2 className="mt-5 font-display text-3xl text-navy-700 sm:text-4xl">
            ¿Ya tienes una prenda Lindamar?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-navy-700/75">
            Cuéntale al mundo tu experiencia. Tu reseña en Google ayuda a otras
            personas a descubrir nuestra marca y a seguir creciendo desde el
            Huila hacia toda Colombia.
          </p>
          <Link
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-medium text-cream-100 transition hover:bg-navy-900"
          >
            <Star className="h-4 w-4" />
            Déjanos tu reseña en Google
          </Link>
        </div>
      </section>
    </>
  );
}
