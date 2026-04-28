import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

const GOOGLE_REVIEW_URL = "https://g.page/r/CakqDxt-beSJEAE/review";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description:
    "Lindamar es una marca opita que diseña ropa con identidad cultural colombiana. Conoce la historia detrás de cada prenda.",
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
        <div className="space-y-6 text-lg leading-relaxed text-navy-700/85">
          <p>
            Lindamar es una marca colombiana de ropa que celebra nuestras
            raíces. Diseñada con orgullo desde el Huila, cada prenda es un
            homenaje a la riqueza cultural y geográfica de Colombia.
          </p>
          <p>
            Cada estampado es un pedazo de país — las estatuas de San Agustín,
            los frailejones del páramo, el Sanjuanero, las heliconias, los
            colores y símbolos que nos hacen colombianos. Piezas para que lleves
            nuestra tierra contigo, donde quiera que vayas, y cuentes una
            historia con lo que te pones.
          </p>
          <p>
            Cada pieza se confecciona artesanalmente. Usamos telas frescas y
            ligeras pensadas para nuestro clima, y trabajamos con un equipo
            local que cuida cada detalle.
          </p>
          <p className="font-display text-2xl italic text-terracotta-600">
            Amor por el Terruño.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/coleccion"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-6 py-3 text-sm font-medium text-cream-100 transition hover:bg-terracotta-600"
          >
            Ver la colección
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={whatsappLink(
              "Hola Lindamar, me gustaría conocer más sobre la marca.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy-700/30 px-6 py-3 text-sm font-medium text-navy-700 transition hover:border-terracotta-500 hover:text-terracotta-600"
          >
            <MessageCircle className="h-4 w-4" />
            Escríbenos
          </Link>
        </div>
      </section>

      <section className="bg-cream-200/70 py-16">
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
            Huila.
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
