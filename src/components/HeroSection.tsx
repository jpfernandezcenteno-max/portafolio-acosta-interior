"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(taglineRef.current, { type: "lines" });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(split.lines, {
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
        })
        .from(ctaRef.current, { opacity: 0, y: 12, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(scrollRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(bgRef.current, {
          yPercent: 18,
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
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-dark/40" />
      </div>

      {/* Centered content */}
      <div ref={contentRef} className="relative z-10 text-center site-pad max-w-3xl mx-auto">
        <p
          ref={taglineRef}
          className="font-serif font-light text-light leading-[1.45] mb-10"
          style={{ fontSize: "clamp(1.1rem, 2.8vw, 2rem)" }}
        >
          Andrea Acosta combina arte con una gestión de proyectos experta para crear espacios
          de vida impregnados de personalidad y cultura.
        </p>

        <a
          ref={ctaRef}
          href="#estudio"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#estudio")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-3 font-sans text-[0.58rem] tracking-[0.42em] uppercase text-light border border-light/50 px-8 py-3.5 hover:bg-light hover:text-dark transition-all duration-300"
        >
          Conoce el estudio
        </a>
      </div>

      {/* Scroll */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="w-[1px] h-12 bg-light/25 overflow-hidden">
          <div className="scroll-line-inner w-full h-full bg-light/60 origin-top" />
        </div>
      </div>
    </section>
  );
}
