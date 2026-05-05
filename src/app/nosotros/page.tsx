"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  {
    number: "01",
    title: "Materialidad",
    body: "Cada material cuenta una historia. Elegimos texturas, acabados y superficies que envejecen bien y revelan carácter con el tiempo.",
  },
  {
    number: "02",
    title: "Propósito",
    body: "Un espacio hermoso que no funciona es un espacio fallido. El diseño nace de entender cómo vives, trabajas y te mueves en él.",
  },
  {
    number: "03",
    title: "Emoción",
    body: "Los mejores espacios te hacen sentir algo antes de que entiendas por qué. Esa resonancia emocional es la meta de todo proyecto.",
  },
];

export default function NosotrosPage() {
  const pageRef  = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(photoRef.current, {
        clipPath: "inset(0 100% 0 0)", duration: 1.8, ease: "power2.inOut", delay: 0.1,
      });
      gsap.from(".ns-fade", {
        opacity: 0, y: 20, stagger: 0.1, duration: 1.0, ease: "power2.out", delay: 0.35,
      });
      gsap.from(".pillar-item", {
        opacity: 0, y: 24, stagger: 0.12, duration: 1.0, ease: "power2.out",
        scrollTrigger: { trigger: ".pillar-item", start: "top 85%", once: true },
      });
      gsap.from(".ns-cta", {
        opacity: 0, y: 16, duration: 1.0, ease: "power2.out",
        scrollTrigger: { trigger: ".ns-cta", start: "top 88%", once: true },
      });
    },
    { scope: pageRef }
  );

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div ref={pageRef} className="bg-light">

        {/* ── Hero image ── */}
        <div
          ref={photoRef}
          className="w-full overflow-hidden"
          style={{ height: "clamp(420px, 70vh, 780px)", clipPath: "inset(0 100% 0 0)" }}
        >
          <img
            src="https://picsum.photos/seed/about-hero/1800/900"
            alt="Acosta Interior — estudio"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* ── Quiénes somos ── */}
        <div className="site-pad section-space border-b border-dark/8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">

            <div>
              <p className="ns-fade font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-5">
                Nosotros
              </p>
              <h1
                className="ns-fade font-serif font-light text-dark leading-[1.1]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
              >
                Acosta Interior
              </h1>
              <p className="ns-fade font-sans text-[0.58rem] tracking-[0.3em] uppercase text-dark/35 mt-3">
                Estudio de Diseño de Interior · Lima, Perú
              </p>
            </div>

            <div className="space-y-6">
              <p className="ns-fade font-sans font-light text-dark/55 text-[0.88rem] leading-[1.9]">
                Somos un estudio de arquitectura y diseño de interiores con sede en Lima, Perú.
                Nuestro trabajo combina rigor técnico con sensibilidad artística para crear
                espacios que se sienten inevitables — como si siempre hubieran existido
                exactamente así.
              </p>
              <p className="ns-fade font-sans font-light text-dark/55 text-[0.88rem] leading-[1.9]">
                Trabajamos con clientes residenciales y comerciales que valoran la permanencia
                por encima de la tendencia. Cada proyecto comienza con una conversación profunda
                sobre cómo vives, qué te mueve y qué quieres sentir cada vez que cruzas la puerta.
              </p>
              <p className="ns-fade font-sans font-light text-dark/55 text-[0.88rem] leading-[1.9]">
                Desde la concepción hasta la entrega, acompañamos cada etapa con el mismo nivel
                de compromiso y atención al detalle.
              </p>
            </div>

          </div>
        </div>

        {/* ── Filosofía ── */}
        <div className="site-pad section-space border-b border-dark/8">
          <p className="font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-12 md:mb-16">
            Nuestra filosofía
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {PILLARS.map(({ number, title, body }) => (
              <div key={number} className="pillar-item">
                <span className="font-sans text-[0.48rem] tracking-[0.42em] uppercase text-primary/55 tabular-nums">
                  {number}
                </span>
                <h2
                  className="font-serif font-light text-dark mt-4 mb-5 leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                >
                  {title}
                </h2>
                <p className="font-sans font-light text-dark/50 text-[0.85rem] leading-[1.85]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="ns-cta site-pad section-space">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <h2
              className="font-serif font-light text-dark leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              ¿Listo para crear<br />algo que te defina?
            </h2>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 font-sans text-[0.62rem] tracking-[0.4em] uppercase text-dark border border-dark/25 px-9 py-4 hover:bg-primary hover:border-primary hover:text-light transition-all duration-500 self-start md:self-auto flex-shrink-0"
            >
              Comenzar un proyecto
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-500" />
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
