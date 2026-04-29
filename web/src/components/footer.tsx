import Link from "next/link";
import { MessageCircle, Mail, Star } from "lucide-react";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const GOOGLE_REVIEW_URL = "https://g.page/r/CakqDxt-beSJEAE/review";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

const INSTAGRAM_URL = "https://www.instagram.com/lindamar_clothing_line/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61575019392936";

export function Footer() {
  const año = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-blush-200/60 bg-cream-200/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-teal-500">Lindamar</p>
          <p className="mt-2 text-sm italic text-navy-700/70">
            Amor por el Terruño
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-700/80">
            Diseño opita con identidad cultural colombiana, inspirado en las
            raíces, tradiciones y esencia de nuestro territorio.
          </p>
          <p className="mt-3 max-w-xs text-sm italic leading-relaxed text-navy-700/70">
            Prendas que fusionan historia y estilo, contando lo que llevas
            dentro.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-terracotta-600">
            Tienda
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-700/80">
            <li>
              <Link href="/ellas" className="hover:text-terracotta-600">
                Ellas
              </Link>
            </li>
            <li>
              <Link href="/ellos" className="hover:text-terracotta-600">
                Ellos
              </Link>
            </li>
            <li>
              <Link href="/cola-imperial" className="hover:text-terracotta-600">
                Cola Imperial
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-terracotta-600">
            Ayuda
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-700/80">
            <li>
              <Link href="/envios" className="hover:text-terracotta-600">
                Envíos
              </Link>
            </li>
            <li>
              <Link href="/cambios" className="hover:text-terracotta-600">
                Cambios y devoluciones
              </Link>
            </li>
            <li>
              <Link href="/historia" className="hover:text-terracotta-600">
                Nuestra historia
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-terracotta-600">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-700/80">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-teal-500" />
              <Link
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta-600"
              >
                {WHATSAPP_DISPLAY}
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-teal-500" />
              <span>hola@lindamar.com.co</span>
            </li>
            <li className="flex items-center gap-2">
              <InstagramIcon className="h-4 w-4 text-teal-500" />
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta-600"
              >
                @lindamar_clothing_line
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FacebookIcon className="h-4 w-4 text-teal-500" />
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta-600"
              >
                Lindamar en Facebook
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-teal-500" />
              <Link
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta-600"
              >
                Déjanos tu reseña en Google
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blush-200/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-navy-700/60 sm:flex-row sm:items-center sm:px-8">
          <p>© {año} Lindamar Clothing Line. Hecho con amor en Colombia.</p>
          <p>Diseño y desarrollo en proceso</p>
        </div>
      </div>
    </footer>
  );
}
