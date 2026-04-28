"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/* Each furniture piece: where it sits and where it flies to on scroll */
const PIECES = [
  /* sofa — large, bottom-left */
  {
    src: "https://picsum.photos/seed/sofa-piece/700/420",
    style: { bottom: "7%", left: "4%", width: "38%", aspectRatio: "5/3" },
    to: { x: "-130%", y: "90%", rotation: -7 },
    scrub: 1.0,
  },
  /* coffee table — bottom center */
  {
    src: "https://picsum.photos/seed/table-piece/420/280",
    style: { bottom: "5%", left: "36%", width: "22%", aspectRatio: "3/2" },
    to: { x: "10%", y: "130%", rotation: 4 },
    scrub: 0.8,
  },
  /* armchair — bottom right */
  {
    src: "https://picsum.photos/seed/chair-piece/380/340",
    style: { bottom: "8%", right: "6%", width: "22%", aspectRatio: "1/1" },
    to: { x: "120%", y: "80%", rotation: 9 },
    scrub: 1.1,
  },
  /* painting 1 — top left */
  {
    src: "https://picsum.photos/seed/art-piece-a/300/420",
    style: { top: "10%", left: "7%", width: "15%", aspectRatio: "5/7" },
    to: { x: "-160%", y: "-70%", rotation: -14 },
    scrub: 0.7,
  },
  /* painting 2 — top right */
  {
    src: "https://picsum.photos/seed/art-piece-b/260/360",
    style: { top: "9%", right: "10%", width: "13%", aspectRatio: "5/7" },
    to: { x: "160%", y: "-80%", rotation: 13 },
    scrub: 0.9,
  },
  /* tall plant — mid right */
  {
    src: "https://picsum.photos/seed/plant-piece/200/460",
    style: { bottom: "10%", right: "30%", width: "10%", aspectRatio: "4/9" },
    to: { x: "80%", y: "-90%", rotation: 6 },
    scrub: 1.2,
  },
  /* floor lamp — mid left */
  {
    src: "https://picsum.photos/seed/lamp-piece/160/480",
    style: { bottom: "8%", left: "44%", width: "7%", aspectRatio: "1/3" },
    to: { x: "-40%", y: "-120%", rotation: -5 },
    scrub: 0.6,
  },
  /* small decor / vase — table level */
  {
    src: "https://picsum.photos/seed/decor-piece/200/240",
    style: { bottom: "26%", right: "22%", width: "9%", aspectRatio: "5/6" },
    to: { x: "100%", y: "60%", rotation: 22 },
    scrub: 1.3,
  },
] as const;

export function HeroSection() {
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(nameRef.current, { type: "chars" });

      /* ── Entrance animation ── */
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
        .from(scrollRef.current, { opacity: 0, duration: 0.5 }, "-=0.2")
        .from(
          pieceRefs.current.filter(Boolean),
          { opacity: 0, scale: 0.92, stagger: 0.07, duration: 0.9, ease: "power2.out" },
          "<0.1"
        );

      /* ── Furniture scatter on scroll (sticky section scrolls through 200vh) ── */
      pieceRefs.current.forEach((el, i) => {
        if (!el) return;
        const { x, y, rotation } = PIECES[i].to;
        gsap.to(el, {
          x,
          y,
          rotation,
          opacity: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: PIECES[i].scrub,
          },
        });
      });

      /* ── Scroll line loop ── */
      gsap.to(".scroll-line-inner", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.8,
        ease: "none",
        repeat: -1,
        delay: 2.5,
      });

      return () => split.revert();
    },
    { scope: outerRef }
  );

  return (
    /* Outer: 200 vh tall — gives the scroll room for the scatter effect */
    <section id="inicio" ref={outerRef} style={{ height: "200vh" }}>
      {/* Sticky inner — stays pinned while furniture animates */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-secondary"
      >
        {/* Furniture pieces */}
        {PIECES.map((piece, i) => (
          <div
            key={i}
            ref={(el) => { pieceRefs.current[i] = el; }}
            className="absolute overflow-hidden will-animate"
            style={piece.style as React.CSSProperties}
          >
            <img
              src={piece.src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}

        {/* Text — centered, above furniture */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <p
            ref={labelRef}
            className="font-sans text-[0.52rem] tracking-[0.58em] uppercase text-dark/40 mb-8"
          >
            Lima, Perú
          </p>

          <h1 aria-label="Andrea Acosta" className="leading-none select-none text-center">
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
            className="font-sans font-light text-dark/30 mt-10 tracking-wide"
            style={{ fontSize: "clamp(0.74rem, 0.95vw, 0.88rem)" }}
          >
            Espacios que narran quiénes somos
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <div className="w-[1px] h-12 bg-dark/15 overflow-hidden">
            <div className="scroll-line-inner w-full h-full bg-dark/32 origin-top" />
          </div>
          <span className="font-sans text-[0.43rem] tracking-[0.5em] uppercase text-dark/26">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
