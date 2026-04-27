"use client";

import { useEffect, useRef } from "react";

type CustomerData = {
  email: string;
  fullName: string;
  phone: string;
};

type Props = {
  orderId: string;
  amountPesos: number;
  integrity: string;
  identityKey: string;
  redirectionUrl: string;
  description?: string;
  customerData?: CustomerData;
};

/**
 * Renderiza el Botón de Pagos de Bold.
 *
 * Bold espera un <script> con atributos data-* que su JS detecta y reemplaza
 * por el botón. Lo inyectamos vía useEffect para que se re-renderice cuando
 * cambien los parámetros (ej. cliente cambia talla y por ende el orderId).
 */
export function BoldButton({
  orderId,
  amountPesos,
  integrity,
  identityKey,
  redirectionUrl,
  description,
  customerData,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://checkout.bold.co/library/boldPaymentButton.js";
    script.async = true;
    script.setAttribute("data-bold-button", "");
    script.setAttribute("data-order-id", orderId);
    script.setAttribute("data-currency", "COP");
    script.setAttribute("data-amount", String(amountPesos));
    script.setAttribute("data-api-key", identityKey);
    script.setAttribute("data-integrity-signature", integrity);
    script.setAttribute("data-redirection-url", redirectionUrl);
    script.setAttribute("data-render-mode", "embedded");
    if (description) script.setAttribute("data-description", description);
    if (customerData) {
      script.setAttribute("data-customer-data", JSON.stringify(customerData));
    }

    container.appendChild(script);
  }, [
    orderId,
    amountPesos,
    integrity,
    identityKey,
    redirectionUrl,
    description,
    customerData,
  ]);

  return <div ref={containerRef} className="w-full" />;
}
