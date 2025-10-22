import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json(
      { error: "Falta la variable de entorno N8N_WEBHOOK_URL" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await res.json().catch(() => ({ ok: res.ok }))
      : await res.text();

    return NextResponse.json(
      {
        message: "Workflow n8n ejecutado",
        upstreamStatus: res.status,
        data: payload,
      },
      { status: res.ok ? 200 : res.status }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "No se pudo ejecutar el workflow de n8n",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
