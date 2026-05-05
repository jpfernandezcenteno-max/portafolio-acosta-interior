import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { nombre, correo, telefono, servicio, nota } = await req.json();

    if (!nombre || !correo || !servicio) {
      return NextResponse.json({ error: "Campos requeridos incompletos." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Acosta Interior <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "jp.fernandez.centeno@gmail.com",
      replyTo: correo,
      subject: `Nuevo contacto — ${servicio}`,
      html: `
        <div style="font-family:sans-serif;color:#1a1a18;max-width:560px;margin:0 auto">
          <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#696c51;margin-bottom:24px">Acosta Interior — Nuevo contacto</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.8">
            <tr><td style="padding:10px 0;border-bottom:1px solid #e5e1dc;color:#888;width:120px">Nombre</td><td style="padding:10px 0;border-bottom:1px solid #e5e1dc">${nombre}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e5e1dc;color:#888">Correo</td><td style="padding:10px 0;border-bottom:1px solid #e5e1dc"><a href="mailto:${correo}" style="color:#696c51">${correo}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e5e1dc;color:#888">Teléfono</td><td style="padding:10px 0;border-bottom:1px solid #e5e1dc">${telefono || "—"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e5e1dc;color:#888">Servicio</td><td style="padding:10px 0;border-bottom:1px solid #e5e1dc">${servicio}</td></tr>
            <tr><td style="padding:10px 0;color:#888;vertical-align:top">Nota</td><td style="padding:10px 0;white-space:pre-wrap">${nota || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al enviar el mensaje." }, { status: 500 });
  }
}
