"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "./ProjectModal";
import { ArrowRight } from "lucide-react";

export function ProjectsSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const imgRefs      = useRef<(HTMLImageElement | null)[]>([]);
  const rowRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const linkRef      = useRef<HTMLAnchorElement>(null);
  const linkUnderRef = useRef<HTMLSpanElement>(null);
  const [active, setActive]     = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);

  /* GSAP crossfade between images */
  const handleEnter = (i: number) => {
    if (i !== active) {
      gsap.to(imgRefs.current[active], { opacity: 0, duration: 0.45, ease: "power2.inOut" });
      gsap.to(imgRefs.current[i],      { opacity: 1, duration: 0.45, ease: "power2.inOut" });
      setActive(i);
    }
    /* Row expand */
    gsap.to(rowRefs.current[i], { paddingTop: "2.2rem", paddingBottom: "2.2rem", duration: 0.35, ease: "power3.out" });
    /* Underline in */
    gsap.to(underlineRefs.current[i], { scaleX: 1, duration: 0.35, ease: "power3.out" });
  };

  const handleLeave = (i: number) => {
    gsap.to(rowRefs.current[i], { paddingTop: "1.5rem", paddingBottom: "1.5rem", duration: 0.3, ease: "power2.in" });
    gsap.to(underlineRefs.current[i], { scaleX: 0, duration: 0.25, ease: "power2.in" });
  };

  useGSAP(
    () => {
      gsap.from(".proj-header", {
        opacity: 0, y: 20, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-header", start: "top 88%", once: true },
      });
      gsap.from(".proj-row", {
        opacity: 0, y: 28, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-row", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  const onLinkEnter = () =>
    gsap.to(linkUnderRef.current, { scaleX: 1, duration: 0.35, ease: "power3.out" });
  const onLinkLeave = () =>
    gsap.to(linkUnderRef.current, { scaleX: 0, duration: 0.25, ease: "power2.in" });

  return (
    <>
      <section id="proyectos" ref={sectionRef} className="bg-light">
        <div className="site-pad section-space">

          {/* Header */}
          <div className="proj-header mb-16 md:mb-22 flex items-end justify-between gap-8">
            <div>
              <p className="font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-3">
                Portafolio
              </p>
              <h2
                className="font-serif font-light text-dark leading-none"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Nuestros Proyectos
              </h2>
            </div>

            {/* Explore link — right of header */}
            <div className="flex-shrink-0 pb-1">
              <a
                ref={linkRef}
                href="#proyectos"
                onClick={e => { e.preventDefault(); setSelected(projects[0]); }}
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
                className="group inline-flex items-center gap-3 font-sans text-[0.68rem] tracking-[0.42em] uppercase text-dark/50 hover:text-dark transition-colors duration-300 relative"
              >
                <span>Explorar el portafolio</span>
                <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                <span
                  ref={linkUnderRef}
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-dark origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </a>
            </div>
          </div>

          {/* Two-column layout — both columns same height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">

            {/* ── Left: project list ── */}
            <div>
              {projects.map((project, i) => (
                  <div
                    key={project.id}
                    ref={el => { rowRefs.current[i] = el; }}
                    className="proj-row group border-t border-dark/10 last:border-b last:border-dark/10"
                    style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                    onClick={() => setSelected(project)}
                    data-cursor-hover
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-baseline gap-4 md:gap-6">
                        <span className="font-sans text-[0.48rem] tracking-[0.42em] uppercase text-primary/60 tabular-nums flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="relative">
                          <h3
                            className="font-serif font-light text-dark group-hover:text-primary transition-colors duration-300 leading-tight"
                            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
                          >
                            {project.title}
                          </h3>
                          {/* Animated underline per row */}
                          <span
                            ref={el => { underlineRefs.current[i] = el; }}
                            className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary origin-left"
                            style={{ transform: "scaleX(0)" }}
                          />
                        </div>
                      </div>
                      <span className="font-sans text-[0.48rem] tracking-[0.35em] uppercase text-dark/25 flex-shrink-0 ml-4 hidden sm:block">
                        {project.category}
                      </span>
                    </div>
                  </div>
              ))}
            </div>

            {/* ── Right: image — fixed height, never resizes ── */}
            <div
              className="relative overflow-hidden hidden md:block self-stretch"
              style={{ minHeight: "clamp(420px, 65vh, 780px)" }}
            >
              {projects.map((project, i) => (
                <img
                  key={project.id}
                  ref={el => { imgRefs.current[i] = el; }}
                  src={project.coverImage}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  loading="lazy"
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
