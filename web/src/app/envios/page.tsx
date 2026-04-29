import type { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  Truck,
  Package,
  Zap,
  Scissors,
  Clock,
  MessageCircle,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Envíos y pagos",
  description:
    "Información sobre formas de pago, costos de envío, transportadoras y tiempos de producción de Lindamar Clothing Line.",
};

type InfoBlockProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  children: React.ReactNode;
};

function InfoBlock({ icon: Icon, title, children }: InfoBlockProps) {
  return (
    <div className="rounded-2xl border border-blush-200 bg-cream-50 p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg text-navy-700">{title}</h3>
          <div className="mt-2 text-sm leading-relaxed text-navy-700/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EnviosPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeader
        eyebrow="Envíos, pagos y disponibilidad"
        title="Cómo funciona"
        subtitle="Te contamos paso a paso qué pasa después de tu pedido — desde el pago hasta que la prenda llega a tu puerta."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <InfoBlock icon={CreditCard} title="Formas de pago">
          <p>
            Aceptamos transferencias a <strong>Bancolombia, Nequi,
            Daviplata, Confía y Cofisan</strong>. También recibimos pagos por
            llaves o transferencias inmediatas.
          </p>
        </InfoBlock>

        <InfoBlock icon={CheckCircle2} title="Confirmación de pago">
          <p>
            El despacho se realiza únicamente una vez confirmado el{" "}
            <strong>pago total de la prenda</strong>.
          </p>
        </InfoBlock>

        <InfoBlock icon={Truck} title="Costo de envío">
          <p>
            <strong>No está incluido</strong> en el valor de la prenda. El
            costo se paga directamente al recibir el pedido (
            <strong>pago contra entrega del servicio de mensajería</strong>).
          </p>
        </InfoBlock>

        <InfoBlock icon={Package} title="Transportadoras">
          <p>
            Trabajamos con <strong>Servientrega</strong> e{" "}
            <strong>Interrapidísimo</strong>. Llegamos a todo Colombia.
          </p>
        </InfoBlock>

        <InfoBlock icon={Zap} title="Despachos inmediatos">
          <p>
            Si la prenda está disponible en la talla solicitada, se envía
            <strong> el mismo día o al día siguiente</strong>, según la hora
            del pago.
          </p>
        </InfoBlock>

        <InfoBlock icon={Scissors} title="Prendas por encargo">
          <p>
            Si la talla no está disponible, la prenda se{" "}
            <strong>elabora bajo pedido</strong>.
          </p>
        </InfoBlock>

        <InfoBlock icon={Clock} title="Tiempos de producción">
          <p>
            Entre <strong>20 y 30 días</strong>, con un plazo máximo de hasta{" "}
            <strong>2 meses</strong>.
          </p>
        </InfoBlock>
      </div>

      <div className="mt-14 rounded-2xl border border-blush-200 bg-blush-50 p-8 text-center">
        <p className="font-display text-xl text-navy-700">
          ¿Necesitas confirmar algo de tu pedido?
        </p>
        <p className="mt-2 text-sm text-navy-700/75">
          Estamos disponibles por WhatsApp para resolver tus dudas.
        </p>
        <Link
          href={whatsappLink(
            "Hola Lindamar, tengo una pregunta sobre envíos o pagos.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          Escríbenos por WhatsApp
        </Link>
      </div>
    </section>
  );
}
