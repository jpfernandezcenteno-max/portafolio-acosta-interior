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
    image: "https://picsum.photos/seed/srv-arch/800/450",
    title: "Diseño y arquitectura de interiores",
    description:
      "Gestión completa de reformas, desde la concepción del diseño hasta la ejecución, abarcando obra, instalaciones de iluminación, fontanería y climatización.",
  },
  {
    number: "02",
    image: "https://picsum.photos/seed/srv-furniture/800/450",
    title: "Diseño de mobiliario personalizado",
    description:
      "Creación y fabricación de piezas exclusivas, gabinetes o estanterías a medida para cada espacio.",
  },
  {
    number: "03",
    image: "https://picsum.photos/seed/srv-styling/800/450",
    title: "Styling",
    description:
      "Personalización de un espacio mediante la selección y disposición de accesorios, textiles, iluminación y objetos decorativos.",
  },
  {
    number: "04",
    image: "https://picsum.photos/seed/srv-super/800/450",
    title: "Supervisión de proyectos",
    description:
      "Seguimiento en obra para garantizar que el diseño se ejecute tal como fue concebido, con fidelidad a los materiales y detalles acordados.",
  },
  {
    number: "05",
    image: "https://picsum.photos/seed/srv-exec/800/450",
    title: "Ejecución de proyectos",
    description:
      "Coordinación de contratistas, proveedores, tiempos y control de costes para asegurar el resultado final dentro del plazo y presupuesto establecidos.",
  },
  {
    number: "06",
    image: "https://picsum.photos/seed/srv-advisory/800/450",
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
      gsap.from(".srv-card", {
        opacity: 0, y: 28, stagger: 0.12, duration: 0.9, ease: "power2.out",
        scrollTrigger: { trigger: ".srv-card", start: "top 88%", once: true },
      });
      gsap.from(".srv-cta", {
        opacity: 0, y: 16, duration: 1.0, ease: "power2.out",
        scrollTrigger: { trigger: ".srv-cta", start: "top 90%", once: true },
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

        {/* ── Cards grid ── */}
        <div className="site-pad section-space">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {SERVICES.map(({ number, image, title, description }) => (
              <div key={number} className="srv-card group flex flex-col">

                {/* Image */}
                <div className="overflow-hidden mb-6" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <span className="font-sans text-[0.46rem] tracking-[0.45em] uppercase text-primary/60 tabular-nums mb-3">
                    {number}
                  </span>
                  <h2
                    className="font-serif font-light text-dark leading-tight mb-4 group-hover:text-primary transition-colors duration-500"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}
                  >
                    {title}
                  </h2>
                  <p className="font-sans font-light text-dark/50 text-[0.84rem] leading-[1.85]">
                    {description}
                  </p>
                </div>

              </div>
            ))}
          </div>
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
              className="group inline-flex items-center gap-3 font-sans text-[0.62rem] tracking-[0.4em] uppercase text-dark border border-dark/25 px-9 py-4 hover:bg-primary hover:border-primary hover:text-light transition-all duration-500 self-start md:self-auto flex-shrink-0"
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
