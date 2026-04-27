"use server";

import { computeIntegrity } from "./bold";

export type BoldPaymentParams = {
  orderId: string;
  amountPesos: number;
  currency: "COP";
  integrity: string;
};

/**
 * Calcula el hash de integridad para el botón de Bold del lado del servidor.
 * La llave secreta NUNCA llega al cliente.
 */
export async function prepareBoldPayment(
  orderId: string,
  amountPesos: number,
): Promise<BoldPaymentParams> {
  const secretKey = process.env.BOLD_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "BOLD_SECRET_KEY no configurada. Define la env var en .env.local o en Vercel.",
    );
  }

  const integrity = computeIntegrity(orderId, amountPesos, "COP", secretKey);

  return { orderId, amountPesos, currency: "COP", integrity };
}
