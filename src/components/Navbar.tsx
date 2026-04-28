"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const LINKS = [
  { label: "Acerca de mí", href: "#sobre-mi", num: "01" },
  { label: "Proyectos",    href: "#proyectos",  num: "02" },
  { label: "Contacto",     href: "#contacto",   num: "03" },
];

export function Navbar() {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const linksRef    = useRef<HTMLUListElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#inicio",
      start: "bottom top+=40",
      onEnter:    () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    gsap.set(overlayRef.current, { autoAlpha: 0 });
    gsap.set(lineRef.current,    { scaleX: 0, transformOrigin: "left center" });
    const items = linksRef.current?.querySelectorAll("li");
    if (items) gsap.set(items, { y: 64, opacity: 0 });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
      .to(lineRef.current,    { scaleX: 1, duration: 0.6, ease: "power3.inOut" }, "-=0.1")
      .to(
        items ? Array.from(items) : [],
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
  });

  const handleToggle = () => {
    if (!open) {
      document.body.style.overflow = "hidden";
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse().then(() => { document.body.style.overflow = ""; });
    }
    setOpen(v => !v);
  };

  const handleNav = (href: string) => {
    document.body.style.overflow = "";
    tlRef.current?.reverse().then(() => {
      setOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      {/* ── Fixed bar ─────────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Navegación principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          open
            ? "bg-transparent"
            : scrolled
            ? "bg-light/96 backdrop-blur-md border-b border-dark/6"
            : "bg-transparent"
        }`}
      >
        <div className="site-pad h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={e => { e.preventDefault(); open ? handleNav("#inicio") : document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" }); }}
            aria-label="Acosta Interior"
            className={`flex flex-col leading-none transition-colors duration-300 ${open ? "opacity-0 pointer-events-none" : ""}`}
          >
            <span className="font-serif text-[1rem] font-light tracking-[0.28em] text-dark">Acosta</span>
            <span className="font-sans text-[0.4rem] tracking-[0.65em] uppercase text-dark/40 -mt-0.5">Interior</span>
          </a>

          {/* Menu toggle — always visible */}
          <button
            onClick={handleToggle}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className={`flex items-center gap-2.5 font-sans text-[0.56rem] tracking-[0.45em] uppercase transition-colors duration-200 ${
              open ? "text-light/70 hover:text-light" : "text-dark/55 hover:text-dark"
            }`}
          >
            {/* animated lines icon */}
            <span className="flex flex-col gap-[5px] w-5">
              <span className={`block h-[1px] bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block h-[1px] bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[1px] bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </span>
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      {/* ── Full-screen overlay ────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] bg-dark flex flex-col overflow-hidden"
        aria-hidden={!open}
      >
        {/* Top bar */}
        <div className="site-pad h-[68px] flex items-center justify-between flex-shrink-0">
          <a
            href="#inicio"
            onClick={e => { e.preventDefault(); handleNav("#inicio"); }}
            className="flex flex-col leading-none"
          >
            <span className="font-serif text-[1rem] font-light tracking-[0.28em] text-light/80">Acosta</span>
            <span className="font-sans text-[0.4rem] tracking-[0.65em] uppercase text-light/30 -mt-0.5">Interior</span>
          </a>
          <button
            onClick={handleToggle}
            className="flex items-center gap-2.5 font-sans text-[0.56rem] tracking-[0.45em] uppercase text-light/50 hover:text-light transition-colors duration-200"
          >
            <span className="flex flex-col gap-[5px] w-5">
              <span className="block h-[1px] bg-current rotate-45 translate-y-[6px]" />
              <span className="block h-[1px] bg-current opacity-0" />
              <span className="block h-[1px] bg-current -rotate-45 -translate-y-[6px]" />
            </span>
            Cerrar
          </button>
        </div>

        {/* Divider line */}
        <div ref={lineRef} className="h-[1px] bg-light/10 mx-0 flex-shrink-0" />

        {/* Nav links — vertically centered */}
        <div className="flex-1 flex items-center site-pad">
          <ul ref={linksRef} className="space-y-0 w-full">
            {LINKS.map(({ label, href, num }) => (
              <li key={href} className="border-b border-light/8 last:border-b-0">
                <a
                  href={href}
                  onClick={e => { e.preventDefault(); handleNav(href); }}
                  className="group flex items-center justify-between py-7 md:py-9"
                >
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span className="font-sans text-[0.5rem] tracking-[0.45em] text-primary/70 flex-shrink-0 tabular-nums">
                      {num}
                    </span>
                    <span
                      className="font-serif font-light text-light group-hover:text-primary transition-colors duration-400 leading-none"
                      style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
                    >
                      {label}
                    </span>
                  </div>
                  <span className="font-sans text-[0.5rem] tracking-[0.35em] uppercase text-light/20 group-hover:text-primary/60 transition-colors duration-300 hidden md:block">
                    Ver sección →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom info */}
        <div className="site-pad pb-10 md:pb-14 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 flex-shrink-0 border-t border-light/8">
          <p className="font-sans text-[0.52rem] tracking-[0.38em] uppercase text-light/20">
            Estudio de Diseño de Interiores · Lima, Perú
          </p>
          <a
            href="mailto:contacto@acostainterior.com"
            className="font-sans text-[0.52rem] tracking-[0.38em] uppercase text-light/20 hover:text-light/50 transition-colors duration-200"
          >
            contacto@acostainterior.com
          </a>
        </div>
      </div>
    </>
  );
}
