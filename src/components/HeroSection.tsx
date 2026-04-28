"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

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
      const split = new SplitText(acostaRef.current, { type: "chars" });

      const tl = gsap.timeline({ delay: 0.4 });

      tl.from(labelRef.current, { opacity: 0, y: 14, duration: 0.8, ease: "power3.out" })
        .from(
          split.chars,
          {
            opacity: 0,
            y: 60,
            rotationX: -40,
            transformOrigin: "0% 50% -50",
            stagger: 0.03,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(interiorRef.current, { opacity: 0, y: 12, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(taglineRef.current, { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(scrollRef.current, { opacity: 0, duration: 0.6 }, "-=0.2");

      gsap.to(".scroll-line-inner", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.8,
        ease: "none",
        repeat: -1,
        delay: 2.8,
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(bgRef.current, {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      return () => { split.revert(); mm.revert(); };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-end justify-start"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <img
          src="https://picsum.photos/seed/arch-hero/1920/1080"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-light/72" />
      </div>

      {/* Main content — bottom-left */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-20 md:pb-28 w-full">
        <p
          ref={labelRef}
          className="font-sans text-[0.55rem] tracking-[0.55em] uppercase text-dark/40 mb-8 md:mb-10"
        >
          Estudio de Diseño · Lima, Perú
        </p>

        <h1 aria-label="Acosta Interior" className="leading-none select-none">
          <span
            ref={acostaRef}
            className="block font-serif font-light text-dark"
            style={{ fontSize: "clamp(4.5rem, 13vw, 12rem)" }}
          >
            Acosta
          </span>
          <span
            ref={interiorRef}
            className="block font-sans font-light text-dark/50 tracking-[0.6em] uppercase"
            style={{
              fontSize: "clamp(0.68rem, 1.7vw, 1.25rem)",
              marginTop: "clamp(0.3rem, 0.8vw, 0.7rem)",
            }}
          >
            Interior
          </span>
        </h1>

        <p
          ref={taglineRef}
          className="font-sans font-light text-dark/40 mt-8 md:mt-10 tracking-wide max-w-sm"
          style={{ fontSize: "clamp(0.78rem, 1.1vw, 0.95rem)" }}
        >
          Espacios que narran quiénes somos
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 right-6 md:right-12 lg:right-20 flex flex-col items-center gap-3"
      >
        <div className="w-[1px] h-12 bg-dark/15 overflow-hidden">
          <div className="scroll-line-inner w-full h-full bg-dark/40 origin-top" />
        </div>
        <span
          className="font-sans text-[0.46rem] tracking-[0.45em] uppercase text-dark/30"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
