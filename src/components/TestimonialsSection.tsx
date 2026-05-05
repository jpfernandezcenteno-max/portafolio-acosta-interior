"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "El equipo de Andrea ha entregado de manera consistente espacios que superaron incluso nuestras más altas expectativas.",
    author: "María & Carlos Vega",
    project: "Casa Miraflores",
  },
  {
    quote: "Andrea convierte la visión artística en espacios habitables mientras gestiona sin problemas la complejidad y la ejecución.",
    author: "Sofía Ramírez",
    project: "Oficinas Palomino",
  },
  {
    quote: "Desde el momento en que trabajamos con ella, quedó claro que estábamos en manos expertas.",
    author: "Familia Torres",
    project: "Loft Barranco",
  },
  {
    quote: "Las habilidades organizativas y de comunicación de Andrea no tienen parangón. Cada detalle estuvo perfectamente coordinado.",
    author: "Lucía Mendoza",
    project: "Galería Norte",
  },
  {
    quote: "Andrea es una diseñadora de interiores de primer nivel. Transformó nuestro espacio en algo que nunca imaginamos posible.",
    author: "Roberto & Ana Flores",
    project: "Casa Miraflores",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);

  useGSAP(
    () => {
      gsap.from(".testimonials-header", {
        opacity: 0, y: 24, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".testimonials-header", start: "top 88%", once: true },
      });
    },
    { scope: sectionRef }
  );

  const goTo = useCallback((next: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.to([quoteRef.current, authorRef.current], {
      opacity: 0, y: -12, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setCurrent(next);
        gsap.fromTo(
          [quoteRef.current, authorRef.current],
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out",
            onComplete: () => { isAnimating.current = false; },
          }
        );
      },
    });
  }, []);

  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((current + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonios" ref={sectionRef} className="bg-light">
      <div className="site-pad section-space">

        {/* Header */}
        <div className="testimonials-header flex items-end justify-between mb-16 md:mb-20">
          <div>
            <p className="font-sans text-[0.52rem] tracking-[0.5em] uppercase text-primary mb-4">
              Clientes
            </p>
            <h2
              className="font-serif font-light text-dark leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Lo que dicen
            </h2>
          </div>
          {/* Navigation arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Testimonio anterior"
              className="w-10 h-10 flex items-center justify-center border border-dark/15 text-dark/40 hover:border-primary hover:text-primary transition-all duration-200"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              aria-label="Testimonio siguiente"
              className="w-10 h-10 flex items-center justify-center border border-dark/15 text-dark/40 hover:border-primary hover:text-primary transition-all duration-200"
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-3xl">
          <p
            ref={quoteRef}
            className="font-serif font-light text-dark/70 leading-[1.55] mb-10"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
          >
            "{t.quote}"
          </p>
          <div ref={authorRef}>
            <p className="font-sans text-[0.62rem] tracking-[0.3em] uppercase text-dark/55">
              {t.author}
            </p>
            <p className="font-sans text-[0.55rem] tracking-[0.28em] uppercase text-primary/60 mt-1">
              {t.project}
            </p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-14">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              className={`transition-all duration-300 ${
                i === current
                  ? "w-6 h-[2px] bg-primary"
                  : "w-2 h-[2px] bg-dark/18 hover:bg-dark/35"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
