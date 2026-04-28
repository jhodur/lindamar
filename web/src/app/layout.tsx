import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lindamar · Amor por el Terruño",
    template: "%s · Lindamar",
  },
  description:
    "Tienda online de Lindamar Clothing Line: ropa con identidad cultural colombiana. Vestidos Cola Imperial, camisas y kimonos inspirados en los paisajes, el folclor y el patrimonio de Colombia.",
  metadataBase: new URL("https://lindamar.com.co"),
  openGraph: {
    title: "Lindamar · Amor por el Terruño",
    description:
      "Diseño colombiano con identidad cultural. Vestidos, camisas y kimonos que celebran nuestra tierra.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-100 text-navy-700">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
