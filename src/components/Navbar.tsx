"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Instagram, Linkedin, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Acerca de mí", href: "#sobre-mi" },
  { label: "Proyectos",    href: "#proyectos" },
  { label: "Contacto",     href: "#contacto"  },
];

export function Navbar() {
  const barRef      = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useGSAP(() => {
    /* Start hidden above viewport */
    gsap.set(barRef.current, { yPercent: -100 });

    /* Appear when hero bottom leaves the top of the screen */
    ScrollTrigger.create({
      trigger: "#inicio",
      start: "bottom top",
      onEnter:    () => gsap.to(barRef.current, { yPercent: 0,    duration: 0.55, ease: "power3.out" }),
      onLeaveBack: () => gsap.to(barRef.current, { yPercent: -100, duration: 0.35, ease: "power2.in" }),
    });
  });

  return (
    <nav
      ref={barRef}
      role="navigation"
      aria-label="Navegación principal"
      className="fixed top-0 left-0 right-0 z-50 bg-light/96 backdrop-blur-md border-b border-dark/6"
    >
      {/* ── Main bar ── */}
      <div className="site-pad h-[64px] flex items-center justify-between gap-6">

        {/* Logo */}
        <a
          href="#inicio"
          onClick={e => { e.preventDefault(); scrollTo("#inicio"); }}
          className="flex flex-col leading-none flex-shrink-0"
          aria-label="Acosta Interior"
        >
          <span className="font-serif text-[0.96rem] font-light tracking-[0.28em] text-dark">Acosta</span>
          <span className="font-sans text-[0.38rem] tracking-[0.65em] uppercase text-dark/38 -mt-0.5">Interior</span>
        </a>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={e => { e.preventDefault(); scrollTo(href); }}
              className="font-sans text-[0.58rem] tracking-[0.32em] uppercase text-dark/50 hover:text-dark transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-dark group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right — socials (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden md:flex items-center gap-3.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-dark/35 hover:text-dark transition-colors duration-200"
            >
              <Instagram size={15} strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-dark/35 hover:text-dark transition-colors duration-200"
            >
              <Linkedin size={15} strokeWidth={1.5} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden text-dark/50 hover:text-dark transition-colors duration-200"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-light border-t border-dark/6 ${mobileOpen ? "max-h-64" : "max-h-0"}`}>
        <div className="site-pad py-5 flex flex-col gap-1">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={e => { e.preventDefault(); scrollTo(href); }}
              className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-dark/55 hover:text-dark py-3 border-b border-dark/5 last:border-0 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <div className="flex gap-5 pt-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark/35 hover:text-dark transition-colors duration-200"><Instagram size={15} strokeWidth={1.5} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark/35 hover:text-dark transition-colors duration-200"><Linkedin size={15} strokeWidth={1.5} /></a>
          </div>
        </div>
      </div>
    </nav>
  );
}
