"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(nameRef.current, { type: "chars" });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(labelRef.current, { opacity: 0, y: 10, duration: 0.8, ease: "power3.out" })
        .from(
          split.chars,
          {
            opacity: 0,
            y: 55,
            rotationX: -35,
            transformOrigin: "0% 50% -50",
            stagger: 0.025,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(titleRef.current, { opacity: 0, y: 10, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .from(taglineRef.current, { opacity: 0, y: 12, duration: 0.7, ease: "power3.out" }, "-=0.35")
        .from(scrollRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");

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
          yPercent: 20,
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
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-light/65" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-6">
        <p
          ref={labelRef}
          className="font-sans text-[0.52rem] tracking-[0.58em] uppercase text-dark/40 mb-8"
        >
          Lima, Perú
        </p>

        <h1 aria-label="Andrea Acosta" className="leading-none select-none">
          <span
            ref={nameRef}
            className="block font-serif font-light text-dark"
            style={{ fontSize: "clamp(3.4rem, 10vw, 9.5rem)" }}
          >
            Andrea Acosta
          </span>
          <span
            ref={titleRef}
            className="block font-sans font-light text-dark/45 tracking-[0.22em]"
            style={{
              fontSize: "clamp(0.68rem, 1.25vw, 1rem)",
              marginTop: "clamp(0.7rem, 1.3vw, 1rem)",
            }}
          >
            Arquitecta &amp; Diseñadora de Interiores
          </span>
        </h1>

        <p
          ref={taglineRef}
          className="font-sans font-light text-dark/35 mt-10 tracking-wide"
          style={{ fontSize: "clamp(0.74rem, 0.95vw, 0.88rem)" }}
        >
          Espacios que narran quiénes somos
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="w-[1px] h-12 bg-dark/15 overflow-hidden">
          <div className="scroll-line-inner w-full h-full bg-dark/32 origin-top" />
        </div>
        <span className="font-sans text-[0.43rem] tracking-[0.5em] uppercase text-dark/26">
          Scroll
        </span>
      </div>
    </section>
  );
}
