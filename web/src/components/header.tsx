import Image from "next/image";
import Link from "next/link";
import { CartButton } from "./cart-button";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/ellas", label: "Ellas" },
  { href: "/ellos", label: "Ellos" },
  { href: "/cola-imperial", label: "Cola Imperial" },
  { href: "/historia", label: "Nuestra Historia" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-blush-200/60 bg-cream-100/85 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 sm:h-28">
        <Link href="/" className="flex items-center gap-3" aria-label="Lindamar">
          <Image
            src="/logo.png"
            alt="Lindamar"
            width={220}
            height={220}
            priority
            className="h-20 w-auto sm:h-24"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-700 transition-colors hover:text-terracotta-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <CartButton />
      </div>
    </header>
  );
}
