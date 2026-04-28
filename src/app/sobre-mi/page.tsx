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
    body: "Cada material cuenta una historia. Elijo texturas, acabados y superficies que envejecen bien y revelan carácter con el tiempo.",
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

export default function SobreMiPage() {
  const pageRef  = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(photoRef.current, {
        clipPath: "inset(0 100% 0 0)", duration: 1.8, ease: "power3.inOut", delay: 0.1,
      });
      gsap.from(".sm-fade", {
        opacity: 0, y: 28, stagger: 0.1, duration: 0.9, ease: "power3.out", delay: 0.3,
      });
      gsap.from(".pillar-item", {
        opacity: 0, y: 32, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".pillar-item", start: "top 85%", once: true },
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
            alt="Andrea Acosta — estudio"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-dark/20" />
        </div>

        {/* ── Bio ── */}
        <div className="site-pad section-space border-b border-dark/8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">

            <div className="sm-fade">
              <p className="font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-5">
                Sobre mí
              </p>
              <h1
                className="font-serif font-light text-dark leading-[1.1]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
              >
                Andrea Acosta
              </h1>
              <p
                className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-dark/35 mt-3"
              >
                Arquitecta & Diseñadora de Interiores
              </p>
            </div>

            <div className="space-y-6">
              <p className="sm-fade font-sans font-light text-dark/55 text-[0.88rem] leading-[1.9]">
                Soy arquitecta y diseñadora de interiores con sede en Lima, Perú.
                Estudié arquitectura en la Universidad Ricardo Palma y me especialicé
                en diseño de interiores en Barcelona, donde descubrí que los espacios
                más memorables nacen de una escucha profunda.
              </p>
              <p className="sm-fade font-sans font-light text-dark/55 text-[0.88rem] leading-[1.9]">
                Mi trabajo combina rigor técnico con sensibilidad artística para
                crear espacios que se sienten inevitables — como si siempre hubieran
                existido exactamente así. Trabajo con clientes residenciales y
                comerciales que valoran la permanencia por encima de la tendencia.
              </p>
              <p className="sm-fade font-sans font-light text-dark/55 text-[0.88rem] leading-[1.9]">
                Cada proyecto comienza con una conversación larga sobre cómo vives,
                qué te mueve y qué quieres sentir cada vez que cruzas la puerta.
              </p>
            </div>

          </div>
        </div>

        {/* ── Pillars ── */}
        <div className="site-pad section-space border-b border-dark/8">
          <p className="font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-12 md:mb-16">
            Mi filosofía
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
        <div className="site-pad section-space">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <h2
              className="font-serif font-light text-dark leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              ¿Listo para crear<br />algo que te defina?
            </h2>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-3 font-sans text-[0.56rem] tracking-[0.4em] uppercase text-dark border border-dark/25 px-7 py-3.5 hover:bg-dark hover:text-light transition-all duration-300 self-start md:self-auto flex-shrink-0"
            >
              Comenzar un proyecto
              <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
