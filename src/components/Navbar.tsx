"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Estudio", href: "#estudio" },
  { label: "Contacto", href: "#contacto" },
];

const OVERLAY_LINKS = [
  { label: "Proyectos", href: "#proyectos", num: "01" },
  { label: "Proceso", href: "#proceso", num: "02" },
  { label: "Estudio", href: "#estudio", num: "03" },
  { label: "Testimonios", href: "#testimonios", num: "04" },
  { label: "Contacto", href: "#contacto", num: "05" },
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
    if (items) gsap.set(items, { y: 48, opacity: 0 });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.45, ease: "power2.out" })
      .to(
        items ? Array.from(items) : [],
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out" },
        "-=0.15"
      );
  });

  const handleToggle = () => {
    if (!open) {
      document.body.style.overflow = "hidden";
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse().then(() => { document.body.style.overflow = ""; });
    }
    setOpen((v) => !v);
  };

  const handleNav = (href: string) => {
    document.body.style.overflow = "";
    setOpen(false);
    tlRef.current?.reverse().then(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <nav
        ref={barRef}
        role="navigation"
        aria-label="Navegación principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-light/96 backdrop-blur-md border-b border-dark/6"
            : "bg-transparent"
        }`}
      >
        <div className="site-pad h-[68px] flex items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }}
            aria-label="Acosta Interior"
            className="flex flex-col leading-none flex-shrink-0"
          >
            <span className="font-serif text-[0.98rem] font-light tracking-[0.28em] text-dark">
              Acosta
            </span>
            <span className="font-sans text-[0.4rem] tracking-[0.65em] uppercase text-dark/40 -mt-0.5">
              Interior
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                className="font-sans text-[0.58rem] tracking-[0.35em] uppercase text-dark/50 hover:text-dark transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right — Consultar CTA + mobile toggle */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); handleNav("#contacto"); }}
              className="hidden md:inline-flex font-sans text-[0.55rem] tracking-[0.38em] uppercase text-light bg-dark px-5 py-2.5 hover:bg-primary transition-colors duration-300"
            >
              Consultar
            </a>
            <button
              onClick={handleToggle}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="md:hidden text-dark/60 hover:text-dark transition-colors duration-200"
            >
              {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] bg-secondary flex flex-col md:hidden"
        aria-hidden={!open}
      >
        <div className="site-pad h-[68px] flex items-center justify-between flex-shrink-0">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }} className="flex flex-col leading-none">
            <span className="font-serif text-[0.98rem] font-light tracking-[0.28em] text-dark">Acosta</span>
            <span className="font-sans text-[0.4rem] tracking-[0.65em] uppercase text-dark/40 -mt-0.5">Interior</span>
          </a>
          <button onClick={handleToggle} className="text-dark/60 hover:text-dark transition-colors duration-200">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 flex items-center site-pad">
          <ul ref={linksRef} className="space-y-1 w-full">
            {OVERLAY_LINKS.map(({ label, href, num }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href); }}
                  className="group flex items-baseline gap-5"
                >
                  <span className="font-sans text-[0.46rem] tracking-[0.4em] uppercase text-dark/22 w-5 flex-shrink-0">
                    {num}
                  </span>
                  <span
                    className="font-serif font-light text-dark/80 group-hover:text-dark transition-colors duration-300 leading-[1.05]"
                    style={{ fontSize: "clamp(2.4rem, 8vw, 4.5rem)" }}
                  >
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-pad pb-10 flex justify-between items-end flex-shrink-0">
          <p className="font-sans text-[0.52rem] tracking-[0.35em] uppercase text-dark/25">Lima, Perú</p>
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); handleNav("#contacto"); }}
            className="font-sans text-[0.52rem] tracking-[0.38em] uppercase text-light bg-dark px-5 py-2.5"
          >
            Consultar
          </a>
        </div>
      </div>
    </>
  );
}
