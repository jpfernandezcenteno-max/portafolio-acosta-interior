"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  "Diseño de interiores",
  "Mobiliario personalizado",
  "Styling",
  "Supervisión de obras",
  "Ejecución de proyectos",
  "Asesoría integral",
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactoPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    servicio: "",
    nota: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  useGSAP(
    () => {
      gsap.fromTo(".ct-photo",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "power2.inOut", delay: 0.1 }
      );
      gsap.from(".ct-fade", {
        opacity: 0, y: 18, stagger: 0.07, duration: 0.9, ease: "power2.out", delay: 0.3,
      });
    },
    { scope: pageRef }
  );

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-dark/18 focus:border-dark outline-none font-sans font-light text-dark text-[0.88rem] pb-3 pt-1 placeholder:text-dark/28 transition-colors duration-300";

  const labelClass = "font-sans text-[0.52rem] tracking-[0.42em] uppercase text-dark/40";

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div ref={pageRef} className="bg-light min-h-screen flex flex-col md:flex-row">

        {/* ── Left: photograph ── */}
        <div className="hidden md:block md:w-[45%] lg:w-[42%] flex-shrink-0 relative" style={{ minHeight: "100vh" }}>
          <div
            className="ct-photo sticky top-0 w-full overflow-hidden"
            style={{ height: "100vh" }}
          >
            <img
              src="https://picsum.photos/seed/contact-studio/900/1400"
              alt="Acosta Interior — estudio"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
            {/* Studio label bottom-left */}
            <div className="absolute bottom-10 left-10">
              <p className="font-sans text-[0.44rem] tracking-[0.55em] uppercase text-light/60 mb-1">
                Acosta Interior
              </p>
              <p className="font-sans text-[0.44rem] tracking-[0.45em] uppercase text-light/40">
                Lima, Perú
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="flex-1 site-pad" style={{ paddingTop: "clamp(6rem, 10vw, 9rem)", paddingBottom: "clamp(4rem, 7vw, 7rem)" }}>
          <div style={{ maxWidth: "520px" }}>

            {status === "success" ? (
              <div className="space-y-6 py-10">
                <p className="ct-fade font-sans text-[0.48rem] tracking-[0.5em] uppercase text-primary">
                  Mensaje enviado
                </p>
                <p
                  className="ct-fade font-serif font-light text-dark leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                >
                  Gracias por escribirnos.
                </p>
                <p className="ct-fade font-sans font-light text-dark/50 text-[0.88rem] leading-[1.9]">
                  Te responderemos a la brevedad para coordinar los próximos pasos.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ nombre: "", correo: "", telefono: "", servicio: "", nota: "" }); }}
                  className="font-sans text-[0.58rem] tracking-[0.38em] uppercase text-dark/45 hover:text-dark transition-colors duration-300 underline underline-offset-4"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Heading */}
                <div className="ct-fade mb-12">
                  <p className="font-sans text-[0.48rem] tracking-[0.52em] uppercase text-primary mb-4">
                    Hablemos
                  </p>
                  <h1
                    className="font-serif font-light text-dark leading-none"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    Escríbenos
                  </h1>
                </div>

                {/* Service radio buttons */}
                <div className="ct-fade" style={{ marginBottom: "3rem" }}>
                  <p className={labelClass} style={{ marginBottom: "0.6rem" }}>Servicio de interés *</p>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-6">
                    {SERVICES.map(s => (
                      <label
                        key={s}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="servicio"
                          value={s}
                          checked={form.servicio === s}
                          onChange={() => setForm(f => ({ ...f, servicio: s }))}
                          className="sr-only"
                        />
                        <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                          form.servicio === s ? "border-primary" : "border-dark/35 group-hover:border-dark/60"
                        }`}>
                          {form.servicio === s && (
                            <span className="w-2 h-2 rounded-full bg-primary block" />
                          )}
                        </span>
                        <span className={`font-sans text-[0.8rem] tracking-[0.12em] uppercase leading-tight transition-colors duration-200 ${
                          form.servicio === s ? "text-dark" : "text-dark/60 group-hover:text-dark/85"
                        }`}>
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Text fields */}
                <div className="flex flex-col" style={{ gap: "2.8rem" }}>

                  <div className="ct-fade">
                    <label className={labelClass} style={{ marginBottom: "0.6rem" }}>Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={set("nombre")}
                      placeholder="Andrea García"
                      className={inputClass}
                    />
                  </div>

                  <div className="ct-fade">
                    <label className={labelClass} style={{ marginBottom: "0.6rem" }}>Correo electrónico *</label>
                    <input
                      type="email"
                      required
                      value={form.correo}
                      onChange={set("correo")}
                      placeholder="hola@ejemplo.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="ct-fade">
                    <label className={labelClass} style={{ marginBottom: "0.6rem" }}>Teléfono</label>
                    <input
                      type="tel"
                      value={form.telefono}
                      onChange={set("telefono")}
                      placeholder="+51 999 000 000"
                      className={inputClass}
                    />
                  </div>

                  <div className="ct-fade">
                    <label className={labelClass} style={{ marginBottom: "0.6rem" }}>Nota adicional</label>
                    <textarea
                      rows={4}
                      value={form.nota}
                      onChange={set("nota")}
                      placeholder="Cuéntanos brevemente sobre tu espacio, tiempos o cualquier detalle relevante…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-sans text-[0.75rem] text-red-500">
                      Ocurrió un error. Por favor intenta de nuevo.
                    </p>
                  )}

                  <div className="ct-fade">
                    <button
                      type="submit"
                      disabled={status === "sending" || !form.servicio}
                      className="group inline-flex items-center gap-4 font-sans text-[0.62rem] tracking-[0.4em] uppercase bg-primary text-light hover:bg-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500"
                      style={{ padding: "0.9rem 3.5rem" }}
                    >
                      {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                      <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-500" />
                    </button>
                  </div>

                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </>
  );
}
