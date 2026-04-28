"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(titleRef.current, { type: "lines" });
      gsap.from(split.lines, {
        opacity: 0, y: 36, stagger: 0.1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 82%", once: true },
      });

      gsap.from(".about-text", {
        opacity: 0, y: 24, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 84%", once: true },
      });

      gsap.from(photoRef.current, {
        clipPath: "inset(0 100% 0 0)", duration: 1.5, ease: "power3.inOut",
        scrollTrigger: { trigger: photoRef.current, start: "top 80%", once: true },
      });

      return () => split.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="sobre-mi" ref={sectionRef} className="bg-secondary">

      {/* Top statement — full width */}
      <div className="site-pad pt-24 md:pt-32 pb-20 md:pb-24 border-b border-dark/6">
        <p className="about-text font-sans text-[0.52rem] tracking-[0.5em] uppercase text-primary mb-8">
          El Enfoque Acosta
        </p>
        <h2
          ref={titleRef}
          className="font-serif font-light text-dark leading-[1.12] max-w-4xl"
          style={{ fontSize: "clamp(1.7rem, 3.8vw, 3.4rem)" }}
        >
          Nuestro proceso de diseño holístico está fundamentado en una
          planificación cuidadosa y una gestión de proyectos altamente organizada.
        </h2>
      </div>

      {/* Two column — text + photo */}
      <div id="proceso" className="site-pad py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 lg:gap-28 items-center">

          {/* Text */}
          <div className="space-y-6">
            <p className="about-text font-sans font-light text-dark/55 text-[0.9rem] leading-[1.9]">
              Creamos espacios interiores que reflejan tus cualidades únicas, intereses y
              requisitos funcionales. Pensamos tanto en los detalles pequeños como en la
              visión global, aprendemos y anticipamos tus necesidades individuales, y
              aportamos energía y diligencia a cada detalle del proceso.
            </p>
            <p className="about-text font-sans font-light text-dark/55 text-[0.9rem] leading-[1.9]">
              Somos logística y visión combinadas, impulsando el proceso de renovación
              y creando un hogar que ofrece refugio y complementa tu estilo de vida.
            </p>
            <p className="about-text font-sans font-light text-dark/55 text-[0.9rem] leading-[1.9]">
              Cada proyecto nace de una conversación profunda con el cliente. El resultado
              son espacios que se sienten inevitables — como si siempre hubieran debido
              existir exactamente así.
            </p>

            <div className="about-text pt-4 flex items-center gap-6">
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 font-sans text-[0.56rem] tracking-[0.4em] uppercase text-light bg-dark px-6 py-3 hover:bg-primary transition-colors duration-300"
              >
                Conoce el proceso
                <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </a>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-sans text-[0.56rem] tracking-[0.4em] uppercase text-dark/40 hover:text-dark transition-colors duration-300 border-b border-dark/20 pb-0.5"
              >
                Consultar
              </a>
            </div>
          </div>

          {/* Photo */}
          <div ref={photoRef} className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <img
              src="https://picsum.photos/seed/designer-portrait/800/1000"
              alt="Andrea Acosta — Estudio de diseño de interiores"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

        </div>
      </div>

      {/* Philosophy quote — full width */}
      <div className="site-pad py-20 md:py-28 border-t border-dark/6">
        <div className="max-w-3xl">
          <p
            className="about-text font-serif font-light text-dark/70 leading-[1.5] mb-10"
            style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.9rem)" }}
          >
            "Somos visión y logística, impulsando el proceso de diseño y creando
            hogares que ofrecen refugio mientras complementan tu estilo de vida activo."
          </p>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="about-text group inline-flex items-center gap-3 font-sans text-[0.56rem] tracking-[0.42em] uppercase text-dark/45 hover:text-dark transition-colors duration-300 border-b border-dark/18 pb-0.5"
          >
            Iniciar un proyecto
            <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

    </section>
  );
}
