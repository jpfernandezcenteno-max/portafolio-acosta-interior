"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const acostaRef = useRef<HTMLSpanElement>(null);
  const interiorRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const acostasSplit = new SplitText(acostaRef.current, { type: "chars" });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(labelRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          acostasSplit.chars,
          {
            opacity: 0,
            y: 70,
            rotationX: -45,
            transformOrigin: "0% 50% -50",
            stagger: 0.03,
            duration: 0.95,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          interiorRef.current,
          {
            opacity: 0,
            y: 14,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          taglineRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          scrollRef.current,
          { opacity: 0, y: 14, duration: 0.5 },
          "-=0.2"
        );

      gsap.to(".scroll-line-inner", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.8,
        ease: "none",
        repeat: -1,
        delay: 2.5,
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(bgRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => {
        acostasSplit.revert();
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <img
          src="https://picsum.photos/seed/arch-hero/1920/1080"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-light/80" />
      </div>

      {/* Decorative side rule */}
      <div className="absolute left-8 md:left-16 lg:left-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-[1px] h-20 bg-primary/25" />
        <span
          className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-primary/40"
          style={{ writingMode: "vertical-rl" }}
        >
          Portafolio 2024
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          ref={labelRef}
          className="font-sans text-[0.6rem] tracking-[0.5em] uppercase text-primary mb-10 md:mb-12"
        >
          Estudio de Diseño · Lima, Perú
        </p>

        <h1
          aria-label="Acosta Interior"
          className="leading-none select-none"
        >
          <span
            ref={acostaRef}
            className="block font-serif font-light text-dark"
            style={{ fontSize: "clamp(4rem, 12.5vw, 11rem)" }}
          >
            Acosta
          </span>
          <span
            ref={interiorRef}
            className="block font-sans font-light text-primary tracking-[0.55em] md:tracking-[0.7em] uppercase"
            style={{ fontSize: "clamp(0.72rem, 1.8vw, 1.35rem)", marginTop: "clamp(0.4rem, 1vw, 0.9rem)" }}
          >
            Interior
          </span>
        </h1>

        <p
          ref={taglineRef}
          className="font-sans font-light text-dark/55 mt-10 md:mt-12 mx-auto tracking-wide"
          style={{ fontSize: "clamp(0.82rem, 1.3vw, 1rem)" }}
        >
          Espacios que narran quiénes somos
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[0.5rem] tracking-[0.45em] uppercase text-primary/40">
          Desplazar
        </span>
        <div className="w-[1px] h-14 bg-primary/15 overflow-hidden">
          <div className="scroll-line-inner w-full h-full bg-primary origin-top" />
        </div>
      </div>
    </section>
  );
}
