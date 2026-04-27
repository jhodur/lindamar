import crypto from "node:crypto";

export type BoldTxStatus = "APPROVED" | "REJECTED" | "PENDING" | "FAILED";

/**
 * Genera el hash de integridad que Bold espera en el botón de pago.
 *
 * Fórmula oficial: SHA-256( orderId + amount + currency + secretKey )
 * El resultado se entrega en hex (lowercase).
 *
 * IMPORTANTE: amount se pasa como pesos enteros (no centavos).
 */
export function computeIntegrity(
  orderId: string,
  amountPesos: number,
  currency: string,
  secretKey: string,
): string {
  const data = `${orderId}${amountPesos}${currency}${secretKey}`;
  return crypto.createHash("sha256").update(data, "utf8").digest("hex");
}

/**
 * Verifica la firma HMAC-SHA256 que Bold incluye en cada webhook.
 * Header esperado: `x-bold-signature` (base64 o hex según versión).
 * Probamos ambos formatos.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  secretKey: string,
): boolean {
  if (!signature) return false;

  const hmac = crypto.createHmac("sha256", secretKey).update(rawBody, "utf8");
  const expectedHex = hmac.digest("hex");
  const hmacB64 = crypto
    .createHmac("sha256", secretKey)
    .update(rawBody, "utf8")
    .digest("base64");

  // Comparación timing-safe
  const sig = Buffer.from(signature.trim(), "utf8");
  const exHex = Buffer.from(expectedHex, "utf8");
  const exB64 = Buffer.from(hmacB64, "utf8");

  return (
    (sig.length === exHex.length && crypto.timingSafeEqual(sig, exHex)) ||
    (sig.length === exB64.length && crypto.timingSafeEqual(sig, exB64))
  );
}

export function pesosFromCentavos(centavos: number): number {
  return Math.round(centavos / 100);
}
