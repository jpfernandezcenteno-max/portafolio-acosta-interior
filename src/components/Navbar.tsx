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

  useGSAP(() => {
    gsap.set(barRef.current, { y: -80, opacity: 0 });

    ScrollTrigger.create({
      trigger: "#inicio",
      start: "bottom top+=60",
      onEnter: () =>
        gsap.to(barRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }),
      onLeaveBack: () =>
        gsap.to(barRef.current, { y: -80, opacity: 0, duration: 0.3, ease: "power2.in" }),
    });

    gsap.set(overlayRef.current, { autoAlpha: 0 });
    const items = linksRef.current?.querySelectorAll("li");
    if (items) gsap.set(items, { y: 48, opacity: 0 });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.45, ease: "power2.out" })
      .to(
        items ? Array.from(items) : [],
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.65, ease: "power3.out" },
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
        className="fixed top-0 left-0 right-0 z-50 bg-light/94 backdrop-blur-md border-b border-secondary"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-[62px] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }}
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

          {/* Menu toggle */}
          <button
            onClick={handleToggle}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-dark/55 hover:text-primary transition-colors duration-300 flex items-center gap-2.5"
          >
            <span className="w-5 h-[1px] bg-current" />
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] bg-light flex flex-col"
        aria-hidden={!open}
      >
        {/* Overlay top bar */}
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 h-[62px] flex items-center justify-between flex-shrink-0">
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }}
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

          <button
            onClick={handleToggle}
            aria-label="Cerrar menú"
            className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-dark/55 hover:text-primary transition-colors duration-300 flex items-center gap-2.5"
          >
            <span className="w-5 h-[1px] bg-current" />
            Cerrar
          </button>
        </div>

        {/* Nav links — centered vertically */}
        <div className="flex-1 flex items-center max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20">
          <ul ref={linksRef} className="space-y-1 md:space-y-2">
            {links.map(({ label, href, num }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href); }}
                  className="group flex items-baseline gap-5 md:gap-8"
                >
                  <span className="font-sans text-[0.52rem] tracking-[0.35em] uppercase text-primary/40 group-hover:text-primary transition-colors duration-300 tabular-nums w-5 flex-shrink-0">
                    {num}
                  </span>
                  <span
                    className="font-serif font-light text-dark group-hover:text-primary transition-colors duration-300 leading-none"
                    style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.8rem)" }}
                  >
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom info bar */}
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 pb-10 md:pb-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 flex-shrink-0 border-t border-primary/10 pt-8">
          <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-dark/30">
            Estudio de Diseño · Lima, Perú
          </p>
          <p className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-dark/30">
            contacto@acostainterior.com
          </p>
        </div>
      </div>
    </>
  );
}
