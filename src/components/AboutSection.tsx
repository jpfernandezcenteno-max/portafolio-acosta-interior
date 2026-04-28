"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const photoRef    = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.from(photoRef.current, {
        clipPath: "inset(0 100% 0 0)", duration: 1.6, ease: "power3.inOut",
        scrollTrigger: { trigger: photoRef.current, start: "top 80%", once: true },
      });
      gsap.from(".about-fade", {
        opacity: 0, y: 24, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".about-fade", start: "top 82%", once: true },
      });
    },
    { scope: sectionRef }
  );

  const onEnter = () =>
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.35, ease: "power3.out" });
  const onLeave = () =>
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.25, ease: "power2.in" });

  return (
    <section id="sobre-mi" ref={sectionRef} className="bg-secondary">

      {/* Full-width image */}
      <div
        ref={photoRef}
        className="w-full overflow-hidden"
        style={{ height: "clamp(340px, 60vh, 700px)" }}
      >
        <img
          src="https://picsum.photos/seed/about-studio/1600/900"
          alt="Andrea Acosta — Estudio de diseño de interiores"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Text below image */}
      <div className="site-pad section-space">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-end">

          <div>
            <p className="about-fade font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-5">
              Sobre mí
            </p>
            <p
              className="about-fade font-serif font-light text-dark leading-[1.3]"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
            >
              Creo espacios que reflejan quién eres — con propósito,
              materialidad y emoción.
            </p>
          </div>

          <div className="space-y-5">
            <p className="about-fade font-sans font-light text-dark/50 text-[0.88rem] leading-[1.9]">
              Soy arquitecta y diseñadora de interiores con sede en Lima, Perú.
              Mi trabajo combina rigor técnico con sensibilidad artística para crear
              espacios que se sienten inevitables — como si siempre hubieran existido
              exactamente así.
            </p>
            <div className="about-fade">
              <a
                href="#contacto"
                onClick={e => { e.preventDefault(); document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" }); }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className="group inline-flex items-center gap-3 font-sans text-[0.56rem] tracking-[0.4em] uppercase text-dark/50 hover:text-dark transition-colors duration-300 relative"
              >
                Conoce más sobre mí
                <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                <span
                  ref={underlineRef}
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-dark origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
