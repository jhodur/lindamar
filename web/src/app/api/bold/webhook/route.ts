import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/bold";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secretKey = process.env.BOLD_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Bold not configured" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();

  // DEBUG: capturar TODOS los headers para identificar formato de firma
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const signature =
    req.headers.get("x-bold-signature") ??
    req.headers.get("bold-signature") ??
    req.headers.get("x-signature") ??
    "";

  const valid = verifyWebhookSignature(rawBody, signature, secretKey);

  console.log("[bold-webhook] HEADERS:", JSON.stringify(headers));
  console.log("[bold-webhook] BODY:", rawBody);
  console.log("[bold-webhook] signature header value:", signature);
  console.log("[bold-webhook] signature valid:", valid);

  // MODO DEBUG: aceptamos todos los webhooks mientras identificamos formato.
  // TODO: re-activar el reject cuando confirmemos el header correcto.
  if (!valid) {
    console.warn(
      "[bold-webhook] firma inválida pero aceptado en modo debug",
    );
  }

  let event: unknown;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("[bold-webhook] event:", JSON.stringify(event));

  return NextResponse.json({ ok: true });
}

export async function GET() {
  // Probe sencillo para confirmar que el endpoint existe en producción.
  return NextResponse.json({ ok: true, info: "Bold webhook is alive" });
}
