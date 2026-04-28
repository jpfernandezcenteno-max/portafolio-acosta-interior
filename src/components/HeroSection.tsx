"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const titleRef   = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      /* Subtle zoom-in on load — image starts at rest, slowly approaches */
      gsap.fromTo(
        imgRef.current,
        { scale: 1.0 },
        { scale: 1.08, duration: 9, ease: "power1.inOut" }
      );

      /* Parallax on scroll */
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

      /* Text entrance */
      const nameSplit = new SplitText(nameRef.current, { type: "chars" });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(nameSplit.chars, {
          opacity: 0,
          y: 60,
          rotationX: -40,
          transformOrigin: "0% 50% -50",
          stagger: 0.025,
          duration: 1,
          ease: "power3.out",
        })
        .from(titleRef.current, { opacity: 0, y: 10, duration: 0.7, ease: "power3.out" }, "-=0.4");

      return () => { nameSplit.revert(); mm.revert(); };
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
      <div ref={bgRef} className="absolute inset-0">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover will-change-transform"
          loading="eager"
        />
        <div className="absolute inset-0 bg-dark/42" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center select-none">
        <h1
          ref={nameRef}
          className="font-serif font-light text-light leading-none"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9.5rem)" }}
        >
          Andrea Acosta
        </h1>
        <p
          ref={titleRef}
          className="font-sans font-light text-light/55 tracking-[0.3em] uppercase mt-5"
          style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.9rem)" }}
        >
          Diseñadora de Interiores
        </p>
      </div>
    </section>
  );
}
