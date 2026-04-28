"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PRESS = [
  "AD España",
  "Elle Decoration",
  "Architectural Digest",
  "Casa Viva",
  "Casas & Jardines",
];

export function PressSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".press-item", {
        opacity: 0,
        y: 14,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-light border-b border-dark/6">
      <div className="site-pad py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
          <p className="font-sans text-[0.52rem] tracking-[0.5em] uppercase text-dark/30 md:pr-10 md:border-r md:border-dark/10 flex-shrink-0">
            Destacada en
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-3 md:pl-10">
            {PRESS.map((name) => (
              <span
                key={name}
                className="press-item font-serif italic text-dark/35 hover:text-dark/60 transition-colors duration-300 cursor-default"
                style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
