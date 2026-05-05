"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  "Diseño y arquitectura de interiores",
  "Diseño de mobiliario personalizado",
  "Styling",
  "Supervisión de proyectos",
  "Ejecución de proyectos",
  "Asesorías integrales",
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
      gsap.from(".ct-header", {
        opacity: 0, y: 20, duration: 1.0, ease: "power2.out", delay: 0.2,
      });
      gsap.from(".ct-image", {
        clipPath: "inset(0 100% 0 0)", duration: 1.6, ease: "power2.inOut", delay: 0.15,
      });
      gsap.from(".ct-field", {
        opacity: 0, y: 16, stagger: 0.08, duration: 0.9, ease: "power2.out", delay: 0.4,
      });
    },
    { scope: pageRef }
  );

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
    "w-full bg-transparent border-0 border-b border-dark/20 focus:border-dark outline-none font-sans font-light text-dark text-[0.88rem] leading-none pb-3 pt-1 placeholder:text-dark/30 transition-colors duration-300";

  const labelClass = "font-sans text-[0.46rem] tracking-[0.48em] uppercase text-primary/70 mb-2 block";

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div ref={pageRef} className="bg-light min-h-screen">

        {/* ── Header ── */}
        <div className="site-pad section-space border-b border-dark/8">
          <div className="ct-header grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-end">
            <div>
              <p className="font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-4">
                Hablemos
              </p>
              <h1
                className="font-serif font-light text-dark leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
              >
                Contacto
              </h1>
            </div>
            <p className="font-sans font-light text-dark/50 text-[0.88rem] leading-[1.9]">
              Cuéntanos sobre tu proyecto y te respondemos en menos de 48 horas
              para agendar una primera conversación.
            </p>
          </div>
        </div>

        {/* ── Content: form + image ── */}
        <div className="site-pad section-space">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Form */}
            <div>
              {status === "success" ? (
                <div className="py-16 space-y-5">
                  <p className="font-sans text-[0.46rem] tracking-[0.48em] uppercase text-primary">
                    Mensaje enviado
                  </p>
                  <p
                    className="font-serif font-light text-dark leading-tight"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                  >
                    Gracias por escribirnos.
                  </p>
                  <p className="font-sans font-light text-dark/50 text-[0.88rem] leading-[1.9]">
                    Te responderemos a la brevedad para coordinar los próximos pasos.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ nombre: "", correo: "", telefono: "", servicio: "", nota: "" }); }}
                    className="mt-4 font-sans text-[0.62rem] tracking-[0.4em] uppercase text-dark/50 hover:text-dark transition-colors duration-300 underline underline-offset-4"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-9">

                  <div className="ct-field">
                    <label className={labelClass}>Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={set("nombre")}
                      placeholder="Andrea García"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                    <div className="ct-field">
                      <label className={labelClass}>Correo electrónico *</label>
                      <input
                        type="email"
                        required
                        value={form.correo}
                        onChange={set("correo")}
                        placeholder="hola@ejemplo.com"
                        className={inputClass}
                      />
                    </div>
                    <div className="ct-field">
                      <label className={labelClass}>Teléfono</label>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={set("telefono")}
                        placeholder="+51 999 000 000"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label className={labelClass}>Servicio de interés *</label>
                    <select
                      required
                      value={form.servicio}
                      onChange={set("servicio")}
                      className={`${inputClass} cursor-pointer appearance-none`}
                    >
                      <option value="" disabled>Selecciona un servicio</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="ct-field">
                    <label className={labelClass}>Nota adicional</label>
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
                      Ocurrió un error. Por favor intenta de nuevo o escríbenos directamente.
                    </p>
                  )}

                  <div className="ct-field pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex items-center gap-3 font-sans text-[0.62rem] tracking-[0.4em] uppercase text-dark border border-dark/25 px-7 py-3.5 hover:bg-dark hover:text-light disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500"
                    >
                      {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                      <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-500" />
                    </button>
                  </div>

                </form>
              )}
            </div>

            {/* Image */}
            <div
              className="ct-image overflow-hidden hidden lg:block"
              style={{
                height: "clamp(500px, 70vh, 780px)",
                clipPath: "inset(0 100% 0 0)",
              }}
            >
              <img
                src="https://picsum.photos/seed/contact-studio/900/1200"
                alt="Acosta Interior — estudio"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

          </div>
        </div>

        {/* ── Footer info ── */}
        <div className="site-pad border-t border-dark/8" style={{ paddingTop: "clamp(3rem, 5vw, 5rem)", paddingBottom: "clamp(3rem, 5vw, 5rem)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div>
              <p className="font-sans text-[0.46rem] tracking-[0.48em] uppercase text-primary/70 mb-3">Ubicación</p>
              <p className="font-sans font-light text-dark/55 text-[0.85rem] leading-[1.8]">Lima, Perú</p>
            </div>
            <div>
              <p className="font-sans text-[0.46rem] tracking-[0.48em] uppercase text-primary/70 mb-3">Correo</p>
              <a
                href="mailto:jp.fernandez.centeno@gmail.com"
                className="font-sans font-light text-dark/55 text-[0.85rem] leading-[1.8] hover:text-dark transition-colors duration-300"
              >
                jp.fernandez.centeno@gmail.com
              </a>
            </div>
            <div>
              <p className="font-sans text-[0.46rem] tracking-[0.48em] uppercase text-primary/70 mb-3">Servicios</p>
              <Link
                href="/servicios"
                className="font-sans font-light text-dark/55 text-[0.85rem] leading-[1.8] hover:text-dark transition-colors duration-300"
              >
                Ver todos los servicios →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
