"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-fade", {
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-fade",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <footer id="contacto" ref={sectionRef} className="bg-secondary">
      <div className="px-8 md:px-16 lg:px-24 pt-24 md:pt-36 pb-16 md:pb-20">

        {/* CTA */}
        <p className="contact-fade font-sans text-[0.55rem] tracking-[0.52em] uppercase text-primary mb-10 md:mb-14">
          Contacto
        </p>

        <h2
          className="contact-fade font-serif font-light text-dark leading-[1.05] mb-10 md:mb-14"
          style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
        >
          ¿Comenzamos?
        </h2>

        <a
          href="mailto:contacto@acostainterior.com"
          className="contact-fade group inline-block font-serif font-light text-dark/50 hover:text-dark transition-colors duration-300 border-b border-dark/20 hover:border-dark pb-1"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          contacto@acostainterior.com
        </a>

        {/* Social links */}
        <div className="contact-fade flex items-center gap-10 mt-14 md:mt-16">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.56rem] tracking-[0.42em] uppercase text-dark/35 hover:text-dark transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.56rem] tracking-[0.42em] uppercase text-dark/35 hover:text-dark transition-colors duration-300"
          >
            LinkedIn
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-24 md:mt-32 pt-6 border-t border-dark/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-serif italic text-dark/18 text-[0.9rem]">
            Acosta Interior
          </p>
          <p className="font-sans text-[0.52rem] tracking-[0.32em] uppercase text-dark/18">
            Lima, Perú · 2024
          </p>
        </div>

      </div>
    </footer>
  );
}
