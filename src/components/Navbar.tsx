"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const links = [
  { label: "Inicio", href: "#inicio", num: "01" },
  { label: "Sobre mí", href: "#sobre-mi", num: "02" },
  { label: "Proyectos", href: "#proyectos", num: "03" },
  { label: "Contacto", href: "#contacto", num: "04" },
];

export function Navbar() {
  const barRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#inicio",
      start: "bottom top+=40",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    gsap.set(overlayRef.current, { autoAlpha: 0 });
    const items = linksRef.current?.querySelectorAll("li");
    if (items) gsap.set(items, { y: 56, opacity: 0 });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.5, ease: "power2.out" })
      .to(
        items ? Array.from(items) : [],
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.75, ease: "power3.out" },
        "-=0.2"
      );
  });

  const handleToggle = () => {
    if (!open) {
      document.body.style.overflow = "hidden";
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse().then(() => {
        document.body.style.overflow = "";
      });
    }
    setOpen((v) => !v);
  };

  const handleNav = (href: string) => {
    document.body.style.overflow = "";
    tlRef.current?.reverse().then(() => {
      setOpen(false);
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      {/* Fixed bar */}
      <nav
        ref={barRef}
        role="navigation"
        aria-label="Navegación principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-light/95 backdrop-blur-md border-b border-dark/6" : "bg-transparent"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 h-16 md:h-[72px] flex items-center justify-between">
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }}
            aria-label="Acosta Interior — Inicio"
            className="flex flex-col leading-none"
          >
            <span className="font-serif text-[1rem] font-light tracking-[0.28em] text-dark">
              Acosta
            </span>
            <span className="font-sans text-[0.42rem] tracking-[0.65em] uppercase text-dark/40 -mt-0.5">
              Interior
            </span>
          </a>

          <button
            onClick={handleToggle}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="font-sans text-[0.56rem] tracking-[0.48em] uppercase text-dark/55 hover:text-dark transition-colors duration-200"
          >
            Menú
          </button>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] bg-secondary flex flex-col"
        aria-hidden={!open}
      >
        {/* Top bar */}
        <div className="px-6 md:px-12 lg:px-20 h-16 md:h-[72px] flex items-center justify-between flex-shrink-0">
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }}
            className="flex flex-col leading-none"
          >
            <span className="font-serif text-[1rem] font-light tracking-[0.28em] text-dark">Acosta</span>
            <span className="font-sans text-[0.42rem] tracking-[0.65em] uppercase text-dark/40 -mt-0.5">Interior</span>
          </a>
          <button
            onClick={handleToggle}
            className="font-sans text-[0.56rem] tracking-[0.48em] uppercase text-dark/55 hover:text-dark transition-colors duration-200"
          >
            Cerrar
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20">
          <ul ref={linksRef} className="space-y-1">
            {links.map(({ label, href, num }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href); }}
                  className="group flex items-baseline gap-5 md:gap-8"
                >
                  <span className="font-sans text-[0.48rem] tracking-[0.4em] uppercase text-dark/25 w-5 flex-shrink-0 group-hover:text-primary transition-colors duration-300">
                    {num}
                  </span>
                  <span
                    className="font-serif font-light text-dark/75 group-hover:text-dark transition-colors duration-300 leading-[1.05]"
                    style={{ fontSize: "clamp(2.6rem, 7.5vw, 7rem)" }}
                  >
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom info */}
        <div className="px-6 md:px-12 lg:px-20 pb-10 md:pb-14 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 flex-shrink-0">
          <p className="font-sans text-[0.55rem] tracking-[0.38em] uppercase text-dark/25">
            Estudio de Diseño de Interiores · Lima, Perú
          </p>
          <p className="font-sans text-[0.55rem] tracking-[0.38em] uppercase text-dark/25">
            contacto@acostainterior.com
          </p>
        </div>
      </div>
    </>
  );
}
