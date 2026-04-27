"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nameSplit = new SplitText(nameRef.current, { type: "chars" });
      const taglineSplit = new SplitText(taglineRef.current, { type: "words" });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          nameSplit.chars,
          {
            opacity: 0,
            y: 60,
            rotationX: -40,
            transformOrigin: "0% 50% -50",
            stagger: 0.025,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          taglineSplit.words,
          {
            opacity: 0,
            y: 24,
            stagger: 0.06,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
          },
          "-=0.2"
        );

      gsap.to(".scroll-line-inner", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.8,
        ease: "none",
        repeat: -1,
        delay: 2,
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
        nameSplit.revert();
        taglineSplit.revert();
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
        <div className="absolute inset-0 bg-light/82" />
      </div>

      {/* Decorative line left */}
      <div className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
        <div className="w-[1px] h-16 bg-primary/30" />
        <span
          className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-primary/50"
          style={{ writingMode: "vertical-rl" }}
        >
          Portafolio 2024
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          ref={labelRef}
          className="font-sans text-[0.65rem] tracking-[0.45em] uppercase text-primary mb-8 md:mb-10"
        >
          Diseño de Interiores · Lima, Perú
        </p>

        <h1
          ref={nameRef}
          aria-label="Valentina Acosta"
          className="font-serif font-light text-dark leading-[0.88] select-none"
          style={{ fontSize: "clamp(3.5rem, 11vw, 10.5rem)" }}
        >
          Valentina Acosta
        </h1>

        <p
          ref={taglineRef}
          className="font-sans font-light text-dark/60 mt-8 md:mt-10 max-w-sm md:max-w-none mx-auto tracking-wide"
          style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)" }}
        >
          Espacios que narran quiénes somos
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-primary/50">
          Desplazar
        </span>
        <div className="w-[1px] h-12 bg-primary/20 overflow-hidden">
          <div className="scroll-line-inner w-full h-full bg-primary origin-top" />
        </div>
      </div>
    </section>
  );
}
