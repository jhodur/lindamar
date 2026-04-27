export const WHATSAPP_NUMBER = "573153075590";
export const WHATSAPP_DISPLAY = "+57 315 307 5590";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function productInquiryMessage(name: string, ref: string): string {
  return `Hola Lindamar, me interesa la prenda *${name}* (REF ${ref}). ¿Me cuentas tallas y disponibilidad?`;
}
