"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { ProjectModal } from "@/components/ProjectModal";
import { projects } from "@/data/projects";
import { Project } from "@/types";

export default function ProyectosPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  useGSAP(
    () => {
      gsap.from(".page-header", {
        opacity: 0, y: 24, duration: 0.9, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".card-item", {
        opacity: 0, y: 36, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".card-item", start: "top 90%", once: true },
      });
    },
    { scope: pageRef }
  );

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div ref={pageRef} className="bg-light min-h-screen">
        <div className="site-pad section-space">

          {/* Header */}
          <div className="page-header mb-14 md:mb-20">
            <p className="font-sans text-[0.5rem] tracking-[0.52em] uppercase text-primary mb-3">
              Portafolio
            </p>
            <h1
              className="font-serif font-light text-dark leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              Todos los proyectos
            </h1>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16 md:gap-x-14 md:gap-y-24">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="card-item group cursor-pointer"
                onClick={() => setSelected(project)}
                data-cursor-hover
              >
                {/* Image */}
                <div className="overflow-hidden mb-5" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </div>

                {/* Info */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2
                      className="font-serif font-light text-dark group-hover:text-primary transition-colors duration-300 leading-tight"
                      style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
                    >
                      {project.title}
                    </h2>
                    <p className="font-sans text-[0.5rem] tracking-[0.38em] uppercase text-dark/35 mt-1.5">
                      {project.category}
                    </p>
                  </div>
                  <span className="font-sans text-[0.5rem] tracking-[0.3em] text-dark/25 flex-shrink-0">
                    {project.year}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
