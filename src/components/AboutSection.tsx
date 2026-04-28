"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const quoteSplit = new SplitText(quoteRef.current, { type: "lines" });

      gsap.from(quoteSplit.lines, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".about-fade", {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-fade",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(photoRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: photoRef.current,
          start: "top 78%",
          once: true,
        },
      });

      return () => quoteSplit.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className="bg-light"
    >
      {/* Statement quote — full width */}
      <div className="px-8 md:px-16 lg:px-24 pt-28 md:pt-40 pb-20 md:pb-28 border-b border-dark/6">
        <p className="about-fade font-sans text-[0.55rem] tracking-[0.52em] uppercase text-primary mb-8 md:mb-12">
          Sobre mí
        </p>
        <h2
          ref={quoteRef}
          className="font-serif font-light text-dark leading-[1.12] max-w-4xl"
          style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.8rem)" }}
        >
          Creando espacios con propósito, con materiales
          cuidadosamente seleccionados — interiores hechos
          para <em>perdurar en el tiempo.</em>
        </h2>
      </div>

      {/* Bio + Photo */}
      <div className="px-8 md:px-16 lg:px-24 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-36 items-start">

          {/* Left — text */}
          <div className="space-y-8 md:pt-4">
            <p className="about-fade font-sans font-light text-dark/55 text-[0.9rem] leading-[1.9]">
              Acosta Interior es un estudio de diseño de interiores con sede en Lima, Perú.
              Nuestro trabajo parte de una premisa simple: los espacios no son neutros —
              cada decisión, desde la proporción de un vano hasta la textura de un material,
              comunica algo sobre el mundo que habitamos.
            </p>
            <p className="about-fade font-sans font-light text-dark/55 text-[0.9rem] leading-[1.9]">
              Combinamos rigor técnico con sensibilidad artística. Investigamos el comportamiento
              de la luz natural, la relación entre materialidad y emoción, y la manera en que
              la arquitectura interior puede mejorar el bienestar de quienes viven y trabajan
              en un espacio.
            </p>
            <p className="about-fade font-sans font-light text-dark/55 text-[0.9rem] leading-[1.9]">
              Cada proyecto es una conversación entre el lugar, el cliente y nuestra visión.
              El resultado: espacios que se sienten inevitables, como si siempre hubieran
              debido existir exactamente así.
            </p>

            <div className="about-fade pt-4">
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-sans text-[0.58rem] tracking-[0.42em] uppercase text-dark/40 hover:text-primary transition-colors duration-300 border-b border-current pb-0.5"
              >
                Hablemos de tu proyecto
              </a>
            </div>
          </div>

          {/* Right — photo */}
          <div
            ref={photoRef}
            className="relative overflow-hidden"
            style={{ aspectRatio: "4/5" }}
          >
            <img
              src="https://picsum.photos/seed/designer-portrait/800/1000"
              alt="Acosta Interior — estudio de diseño de interiores"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
