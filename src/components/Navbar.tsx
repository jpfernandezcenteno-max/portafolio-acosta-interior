"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(navRef.current, { y: -80, opacity: 0 });

    ScrollTrigger.create({
      trigger: "#inicio",
      start: "bottom top+=60",
      onEnter: () =>
        gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }),
      onLeaveBack: () =>
        gsap.to(navRef.current, { y: -80, opacity: 0, duration: 0.3, ease: "power2.in" }),
    });
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Navegación principal"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-5 bg-light/90 backdrop-blur-sm border-b border-secondary/60"
    >
      <a
        href="#inicio"
        onClick={(e) => handleClick(e, "#inicio")}
        className="font-serif text-xl font-light tracking-widest text-dark hover:text-primary transition-colors duration-300"
        aria-label="Valentina Acosta — Inicio"
      >
        VA
      </a>

      <div className="hidden md:flex items-center gap-10">
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-dark/50 hover:text-primary transition-colors duration-300"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
