"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ArrowDown } from "lucide-react";

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
  const ctaRef     = useRef<HTMLDivElement>(null);

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

      /* Text + CTA entrance */
      const nameSplit = new SplitText(nameRef.current, { type: "chars" });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(nameSplit.chars, {
          opacity: 0, y: 60, rotationX: -40,
          transformOrigin: "0% 50% -50", stagger: 0.025,
          duration: 1, ease: "power3.out",
        })
        .from(titleRef.current, { opacity: 0, y: 10, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(ctaRef.current,   { opacity: 0, y: 10, duration: 0.7, ease: "power3.out" }, "-=0.3");

      /* Gentle CTA bounce */
      gsap.to(ctaRef.current, {
        y: 6, repeat: -1, yoyo: true, duration: 1.4, ease: "power1.inOut", delay: 1.5,
      });

      /* Slideshow — two-door split */
      let idx = 0;
      const advance = () => {
        const prev = idx;
        idx = (idx + 1) % SLIDES.length;

        const nextSlide = slideRefs.current[idx];
        const prevSlide = slideRefs.current[prev];
        const prevLeft  = leftRefs.current[prev];
        const prevRight = rightRefs.current[prev];

        /* Incoming slide behind, start its zoom */
        gsap.set(nextSlide, { opacity: 1, zIndex: 0, scale: 1 });
        gsap.to(nextSlide, { scale: 1.08, duration: 9, ease: "power1.inOut" });

        /* Doors slide apart */
        gsap.to(prevLeft,  { x: "-100%", duration: 1.4, ease: "power2.inOut" });
        gsap.to(prevRight, { x: "100%",  duration: 1.4, ease: "power2.inOut",
          onComplete: () => {
            gsap.set(prevSlide, { opacity: 0, zIndex: 0, scale: 1 });
            gsap.set([prevLeft, prevRight], { x: 0 });
          },
        });
      };

      const intervalId = setInterval(advance, 5500);

      return () => {
        nameSplit.revert();
        mm.revert();
        clearInterval(intervalId);
      };
    },
    { scope: sectionRef }
  );

  const scrollToNext = () =>
    document.querySelector("#proyectos")?.scrollIntoView({ behavior: "smooth" });

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
            style={{ position: "absolute", inset: 0 }}
          >
            {/* Left door — shows left half.
                Image is 200% wide so object-cover scales against the full
                viewport width; the door container clips the left 50%. */}
            <div
              ref={el => { leftRefs.current[i] = el; }}
              style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "50%", overflow: "hidden" }}
            >
              <img
                src={src}
                alt=""
                style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "100%", objectFit: "cover" }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>

            {/* Right door — same image, anchored right so both imgs share the
                same full-viewport coordinate frame; door clips the right 50%. */}
            <div
              ref={el => { rightRefs.current[i] = el; }}
              style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "50%", overflow: "hidden" }}
            >
              <img
                src={src}
                alt=""
                style={{ position: "absolute", top: 0, right: 0, width: "200%", height: "100%", objectFit: "cover" }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dark overlay */}
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

      {/* Scroll CTA */}
      <div
        ref={ctaRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNext}
      >
        <span className="font-sans text-[0.5rem] tracking-[0.45em] uppercase text-light/50">
          Ver más
        </span>
        <ArrowDown size={13} strokeWidth={1.5} className="text-light/40" />
      </div>
    </section>
  );
}
