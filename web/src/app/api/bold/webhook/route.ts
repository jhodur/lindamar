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
  const signature =
    req.headers.get("x-bold-signature") ??
    req.headers.get("bold-signature") ??
    "";

  if (!verifyWebhookSignature(rawBody, signature, secretKey)) {
    console.warn("[bold-webhook] firma inválida — rechazado");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: unknown;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Por ahora solo logueamos. Cuando exista DB, persistir orden y notificar.
  console.log("[bold-webhook]", JSON.stringify(event));

  return NextResponse.json({ ok: true });
}

export async function GET() {
  // Probe sencillo para confirmar que el endpoint existe en producción.
  return NextResponse.json({ ok: true, info: "Bold webhook is alive" });
}
