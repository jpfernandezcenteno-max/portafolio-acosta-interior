"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Navegación principal"
      className="fixed top-0 left-0 right-0 z-50 bg-light/94 backdrop-blur-md border-b border-secondary"
    >
      {/* Main bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-[62px] flex items-center justify-between">
        {/* Logo wordmark */}
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleClick("#inicio"); }}
          aria-label="Acosta Interior — Inicio"
          className="flex flex-col leading-none group"
        >
          <span className="font-serif text-[1.05rem] font-light tracking-[0.22em] text-dark group-hover:text-primary transition-colors duration-300">
            Acosta
          </span>
          <span className="font-sans text-[0.48rem] tracking-[0.55em] uppercase text-primary/70 group-hover:text-primary transition-colors duration-300 -mt-0.5">
            Interior
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleClick(href); }}
              className="font-sans text-[0.63rem] tracking-[0.28em] uppercase text-dark/45 hover:text-primary transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-dark/60 hover:text-primary transition-colors duration-200"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-64 border-t border-secondary" : "max-h-0"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 py-5 space-y-1 bg-light">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleClick(href); }}
              className="flex items-center gap-3 font-sans text-[0.7rem] tracking-[0.3em] uppercase text-dark/55 hover:text-primary transition-colors duration-200 py-2.5 border-b border-secondary/50 last:border-0"
            >
              <span className="w-3 h-[1px] bg-primary/40 flex-shrink-0" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
