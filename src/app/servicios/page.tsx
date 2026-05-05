"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    number: "01",
    title: "Diseño y arquitectura de interiores",
    description:
      "Gestión completa de reformas, desde la concepción del diseño hasta la ejecución, abarcando obra, instalaciones de iluminación, fontanería y climatización.",
  },
  {
    number: "02",
    title: "Diseño de mobiliario personalizado",
    description:
      "Creación y fabricación de piezas exclusivas, gabinetes o estanterías a medida para cada espacio.",
  },
  {
    number: "03",
    title: "Styling",
    description:
      "Personalización de un espacio mediante la selección y disposición de accesorios, textiles, iluminación y objetos decorativos.",
  },
  {
    number: "04",
    title: "Supervisión de proyectos",
    description:
      "Seguimiento en obra para garantizar que el diseño se ejecute tal como fue concebido, con fidelidad a los materiales y detalles acordados.",
  },
  {
    number: "05",
    title: "Ejecución de proyectos",
    description:
      "Coordinación de contratistas, proveedores, tiempos y control de costes para asegurar el resultado final dentro del plazo y presupuesto establecidos.",
  },
  {
    number: "06",
    title: "Asesorías integrales",
    description:
      "Consultas puntuales por horas para resolver dudas sobre diseño, funcionalidad, decoración, paletas de colores o reordenación de muebles.",
  },
];

export default function ServiciosPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".srv-header", {
        opacity: 0, y: 20, duration: 1.0, ease: "power2.out", delay: 0.2,
      });
      gsap.from(".srv-row", {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.9, ease: "power2.out",
        scrollTrigger: { trigger: ".srv-row", start: "top 86%", once: true },
      });
      gsap.from(".srv-cta", {
        opacity: 0, y: 16, duration: 1.0, ease: "power2.out",
        scrollTrigger: { trigger: ".srv-cta", start: "top 88%", once: true },
      });
    },
    { scope: pageRef }
  );

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div ref={pageRef} className="bg-light min-h-screen">

        {/* ── Header ── */}
        <div className="site-pad section-space border-b border-dark/8">
          <div className="srv-header grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-end">
            <div>
              <p className="font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-4">
                Lo que hacemos
              </p>
              <h1
                className="font-serif font-light text-dark leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
              >
                Servicios
              </h1>
            </div>
            <p className="font-sans font-light text-dark/50 text-[0.88rem] leading-[1.9]">
              Desde la visión hasta la entrega, ofrecemos un acompañamiento
              completo adaptado a cada etapa y necesidad del proyecto.
            </p>
          </div>
        </div>

        {/* ── Services list ── */}
        <div className="site-pad" style={{ paddingTop: "clamp(3rem, 5vw, 4.5rem)", paddingBottom: "clamp(4rem, 7vw, 7rem)" }}>
          {SERVICES.map(({ number, title, description }) => (
            <div
              key={number}
              className="srv-row group border-t border-dark/10 last:border-b last:border-dark/10 py-10 md:py-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-[4rem_1fr_1.4fr] gap-6 md:gap-12 items-start">

                {/* Number */}
                <span className="font-sans text-[0.48rem] tracking-[0.42em] uppercase text-primary/55 tabular-nums pt-1">
                  {number}
                </span>

                {/* Title */}
                <h2
                  className="font-serif font-light text-dark group-hover:text-primary transition-colors duration-500 leading-tight"
                  style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)" }}
                >
                  {title}
                </h2>

                {/* Description */}
                <p className="font-sans font-light text-dark/50 text-[0.87rem] leading-[1.9]">
                  {description}
                </p>

              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="srv-cta site-pad border-t border-dark/8" style={{ paddingTop: "clamp(4rem, 7vw, 7rem)", paddingBottom: "clamp(4rem, 7vw, 7rem)" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <h2
              className="font-serif font-light text-dark leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              ¿Por dónde empezamos?
            </h2>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 font-sans text-[0.62rem] tracking-[0.4em] uppercase text-dark border border-dark/25 px-7 py-3.5 hover:bg-dark hover:text-light transition-all duration-500 self-start md:self-auto flex-shrink-0"
            >
              Solicitar una asesoría
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-500" />
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
