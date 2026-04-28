"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "./ProjectModal";
import { ArrowRight } from "lucide-react";

export function ProjectsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgRefs     = useRef<(HTMLImageElement | null)[]>([]);
  const linkRef     = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);

  /* GSAP crossfade between images */
  const handleEnter = (i: number) => {
    if (i === active) return;
    gsap.to(imgRefs.current[active], { opacity: 0, duration: 0.45, ease: "power2.inOut" });
    gsap.to(imgRefs.current[i],      { opacity: 1, duration: 0.45, ease: "power2.inOut" });
    setActive(i);
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

  /* "Explorar" link underline hover */
  const onLinkEnter = () =>
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.35, ease: "power3.out" });
  const onLinkLeave = () =>
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.25, ease: "power2.in" });

  return (
    <>
      <section id="proyectos" ref={sectionRef} className="bg-light">
        <div className="site-pad pt-24 md:pt-32 pb-20 md:pb-28">

          {/* Header */}
          <div className="proj-header mb-12 md:mb-14">
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

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

            {/* ── Left: project list ── */}
            <div>
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className="proj-row group border-t border-dark/10 last:border-b last:border-dark/10"
                  onMouseEnter={() => handleEnter(i)}
                  onClick={() => setSelected(project)}
                  data-cursor-hover
                >
                  <div className="flex items-center justify-between py-6 md:py-7 cursor-pointer">
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="font-sans text-[0.48rem] tracking-[0.42em] uppercase text-primary/60 tabular-nums flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className="font-serif font-light text-dark group-hover:text-primary transition-colors duration-300 leading-tight"
                        style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-sans text-[0.48rem] tracking-[0.35em] uppercase text-dark/25 flex-shrink-0 ml-4 hidden sm:block">
                      {project.category}
                    </span>
                  </div>
                </div>
              ))}

              {/* Explore link */}
              <div className="mt-10 md:mt-12">
                <a
                  ref={linkRef}
                  href="#proyectos"
                  onClick={e => { e.preventDefault(); setSelected(projects[0]); }}
                  onMouseEnter={onLinkEnter}
                  onMouseLeave={onLinkLeave}
                  className="group inline-flex items-center gap-3 font-sans text-[0.55rem] tracking-[0.42em] uppercase text-dark/50 hover:text-dark transition-colors duration-300 relative"
                >
                  <span>Explorar el portafolio</span>
                  <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                  {/* animated underline */}
                  <span
                    ref={underlineRef}
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-dark origin-left"
                    style={{ transform: "scaleX(0)" }}
                  />
                </a>
              </div>
            </div>

            {/* ── Right: image ── */}
            <div
              className="relative overflow-hidden hidden md:block"
              style={{ aspectRatio: "4/3" }}
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
