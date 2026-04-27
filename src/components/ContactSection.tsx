"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Mail, Linkedin, Instagram } from "lucide-react";

const socials = [
  {
    label: "Email",
    href: "mailto:contacto@acostainterior.com",
    icon: Mail,
    display: "contacto@acostainterior.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    display: "in/acosta-interior",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    display: "@acosta.interior",
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".contact-content", {
        opacity: 0,
        y: 36,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".contact-link", {
        opacity: 0,
        y: 18,
        stagger: 0.13,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-link",
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <footer id="contacto" ref={sectionRef} className="bg-light">
      {/* Animated divider */}
      <div
        ref={dividerRef}
        className="h-[1px] bg-primary/20"
        style={{ margin: "0 clamp(1.5rem, 5vw, 5rem)" }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-14 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 lg:gap-32 items-start">

          {/* Left — CTA */}
          <div>
            <p className="contact-content font-sans text-[0.6rem] tracking-[0.48em] uppercase text-primary mb-7">
              Contacto
            </p>
            <h2
              className="contact-content font-serif font-light text-dark leading-[1.1] mb-7"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
            >
              ¿Tienes un proyecto
              <br />
              <em>en mente?</em>
            </h2>
            <p className="contact-content font-sans font-light text-dark/50 text-[0.87rem] leading-[1.85] max-w-xs">
              Estamos disponibles para proyectos residenciales, comerciales y
              conceptuales. Hablemos sobre cómo podemos transformar tu espacio.
            </p>
          </div>

          {/* Right — Social links */}
          <div className="space-y-7 pt-1">
            {socials.map(({ label, href, icon: Icon, display }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="contact-link group flex items-center gap-5 text-dark/55 hover:text-primary transition-colors duration-300"
              >
                <span className="w-10 h-10 flex items-center justify-center border border-dark/12 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300 flex-shrink-0">
                  <Icon size={14} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-sans text-[0.57rem] tracking-[0.38em] uppercase text-primary/55 mb-1 group-hover:text-primary transition-colors duration-300">
                    {label}
                  </p>
                  <p className="font-sans text-[0.85rem] text-dark/70 group-hover:text-dark transition-colors duration-300">
                    {display}
                  </p>
                </div>
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-20 md:mt-24 pt-6 border-t border-dark/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-serif italic text-dark/22 text-sm">
            Acosta Interior — Estudio de Diseño de Interiores
          </p>
          <p className="font-sans text-[0.58rem] tracking-[0.3em] uppercase text-dark/18">
            Lima, Perú · 2024
          </p>
        </div>
      </div>
    </footer>
  );
}
