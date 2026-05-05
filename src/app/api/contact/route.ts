import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { nombre, correo, telefono, servicio, nota } = await req.json();

    if (!nombre || !correo || !servicio) {
      return NextResponse.json({ error: "Campos requeridos incompletos." }, { status: 400 });
    }

    // TODO: conectar nodemailer/Gmail SMTP
    console.log("Nuevo contacto:", { nombre, correo, telefono, servicio, nota });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al procesar la solicitud." }, { status: 500 });
  }
}
