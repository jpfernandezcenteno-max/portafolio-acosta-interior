"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Mail, Linkedin, Instagram } from "lucide-react";

const socials = [
  {
    label: "Email",
    href: "mailto:valentina.acosta@ejemplo.com",
    icon: Mail,
    display: "valentina.acosta@ejemplo.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    display: "in/valentina-acosta",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    display: "@valentina.acosta.id",
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
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".contact-content", {
        opacity: 0,
        y: 40,
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
        y: 20,
        stagger: 0.12,
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
      {/* Divider */}
      <div ref={dividerRef} className="h-[1px] bg-primary/20 mx-8 md:mx-16" />

      <div className="px-8 md:px-16 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-end">
          {/* Left — CTA */}
          <div>
            <p className="contact-content font-sans text-[0.62rem] tracking-[0.45em] uppercase text-primary mb-6">
              Contacto
            </p>
            <h2
              className="contact-content font-serif font-light text-dark leading-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
            >
              ¿Tienes un proyecto
              <br />
              <em>en mente?</em>
            </h2>
            <p className="contact-content font-sans font-light text-dark/55 text-[0.88rem] leading-relaxed max-w-sm">
              Estoy disponible para proyectos académicos, colaboraciones y
              prácticas profesionales. Hablemos sobre cómo puedo contribuir
              a tu visión.
            </p>
          </div>

          {/* Right — Links */}
          <div className="space-y-6">
            {socials.map(({ label, href, icon: Icon, display }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="contact-link group flex items-center gap-5 text-dark/60 hover:text-primary transition-colors duration-300"
              >
                <span className="w-9 h-9 flex items-center justify-center border border-dark/15 group-hover:border-primary transition-colors duration-300 flex-shrink-0">
                  <Icon size={14} />
                </span>
                <div>
                  <p className="font-sans text-[0.58rem] tracking-[0.35em] uppercase text-primary/60 mb-0.5">
                    {label}
                  </p>
                  <p className="font-sans text-[0.83rem]">{display}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-6 border-t border-dark/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-serif italic text-dark/25 text-sm">
            Valentina Acosta — Diseño de Interiores
          </p>
          <p className="font-sans text-[0.62rem] tracking-widest uppercase text-dark/20">
            Lima, Perú · 2024
          </p>
        </div>
      </div>
    </footer>
  );
}
