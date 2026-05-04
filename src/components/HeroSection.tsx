"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const SLIDES = [
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80",
  "https://picsum.photos/seed/hero-slide-2/1920/1080",
  "https://picsum.photos/seed/hero-slide-3/1920/1080",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const slideRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const leftRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const titleRef   = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      /* Initial state */
      slideRefs.current.forEach((slide, i) => {
        gsap.set(slide, { zIndex: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0 });
      });

      /* Zoom on first slide */
      gsap.to(slideRefs.current[0], { scale: 1.08, duration: 9, ease: "power1.inOut" });

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
          opacity: 0, y: 60, rotationX: -40,
          transformOrigin: "0% 50% -50", stagger: 0.025,
          duration: 1, ease: "power3.out",
        })
        .from(titleRef.current, { opacity: 0, y: 10, duration: 0.7, ease: "power3.out" }, "-=0.4");

      /* Slideshow — two-door split */
      let idx = 0;
      const advance = () => {
        const prev = idx;
        idx = (idx + 1) % SLIDES.length;

        const nextSlide = slideRefs.current[idx];
        const prevSlide = slideRefs.current[prev];
        const prevLeft  = leftRefs.current[prev];
        const prevRight = rightRefs.current[prev];

        /* Place incoming slide behind, reset its scale, start its zoom */
        gsap.set(nextSlide, { opacity: 1, zIndex: 0, scale: 1 });
        gsap.to(nextSlide, { scale: 1.08, duration: 9, ease: "power1.inOut" });

        /* Doors open on departing slide */
        gsap.to(prevLeft,  { x: "-100%", duration: 1.4, ease: "power2.inOut" });
        gsap.to(prevRight, { x: "100%",  duration: 1.4, ease: "power2.inOut",
          onComplete: () => {
            gsap.set(prevSlide, { opacity: 0, zIndex: 0, scale: 1 });
            gsap.set([prevLeft, prevRight], { x: 0 });
          },
        });
      };

      const intervalId = setInterval(advance, 5000);

      return () => {
        nameSplit.revert();
        mm.revert();
        clearInterval(intervalId);
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
      {/* Slides */}
      <div ref={bgRef} className="absolute inset-0">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            ref={el => { slideRefs.current[i] = el; }}
            className="absolute inset-0 will-change-transform"
          >
            {/* Left door — shows left half of image */}
            <div
              ref={el => { leftRefs.current[i] = el; }}
              className="absolute left-0 inset-y-0 w-1/2 overflow-hidden"
            >
              <img
                src={src}
                alt=""
                className="absolute inset-y-0 left-0 w-[200%] h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>

            {/* Right door — shows right half of image */}
            <div
              ref={el => { rightRefs.current[i] = el; }}
              className="absolute right-0 inset-y-0 w-1/2 overflow-hidden"
            >
              <img
                src={src}
                alt=""
                className="absolute inset-y-0 right-0 w-[200%] h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dark overlay — above slides, below text */}
      <div className="absolute inset-0 bg-dark/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center select-none">
        <h1
          ref={nameRef}
          className="font-serif font-light text-light leading-none"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9.5rem)" }}
        >
          Acosta Interior
        </h1>
        <p
          ref={titleRef}
          className="font-sans font-light text-light/55 tracking-[0.3em] uppercase mt-5"
          style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.9rem)" }}
        >
          Estudio de Diseño de Interior
        </p>
      </div>
    </section>
  );
}
