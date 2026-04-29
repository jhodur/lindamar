import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Camera,
  Package,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cambios por garantía",
  description:
    "Política de cambios por garantía de Lindamar — qué hacer si tu prenda llega con algún defecto.",
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

export default function CambiosPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeader
        eyebrow="Cambios por garantía"
        title="Si algo no quedó perfecto"
        subtitle="Cada prenda Lindamar pasa por revisión antes de despachar. Si aún así detectas un defecto al recibir, así te ayudamos."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <InfoBlock icon={Clock} title="Plazo para reportar">
          <p>
            Si la prenda presenta algún defecto, cuentas con{" "}
            <strong>hasta 7 días</strong> desde la recepción del pedido para
            reportarlo.
          </p>
        </InfoBlock>

        <InfoBlock icon={Camera} title="Validación con evidencia">
          <p>
            Es necesario enviar <strong>fotos claras</strong> de la zona
            defectuosa para gestionar el cambio.
          </p>
        </InfoBlock>

        <InfoBlock icon={Package} title="Reposición">
          <p>
            Una vez validado el caso, te enviamos{" "}
            <strong>una nueva prenda</strong> en óptimas condiciones, sin
            costo adicional.
          </p>
        </InfoBlock>

        <InfoBlock icon={AlertCircle} title="Importante">
          <p>
            La garantía aplica solo a defectos de confección. No cubre daños
            por mal uso, lavado incorrecto o desgaste normal.
          </p>
        </InfoBlock>
      </div>

      <div className="mt-14 rounded-2xl border border-blush-200 bg-blush-50 p-8 text-center">
        <p className="font-display text-xl text-navy-700">
          ¿Necesitas reportar un caso?
        </p>
        <p className="mt-2 text-sm text-navy-700/75">
          Escríbenos por WhatsApp con tu número de pedido y las fotos del
          defecto. Te respondemos lo antes posible.
        </p>
        <Link
          href={whatsappLink(
            "Hola Lindamar, necesito reportar un cambio por garantía. Te envío fotos de mi prenda.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          Iniciar reporte
        </Link>
      </div>
    </section>
  );
}
