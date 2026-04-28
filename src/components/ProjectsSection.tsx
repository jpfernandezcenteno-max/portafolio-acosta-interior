"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "./ProjectModal";
import { ArrowRight } from "lucide-react";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.04, duration: 0.8, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
  };
  const onMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.8, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <article
      className="project-card group cursor-pointer"
      onClick={onOpen}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-cursor-hover
    >
      {/* Image */}
      <div className="relative overflow-hidden w-full mb-4" style={{ aspectRatio: "4/3" }}>
        <img
          ref={imgRef}
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-dark/20 flex items-center justify-center opacity-0"
        >
          <span className="font-sans text-[0.55rem] tracking-[0.42em] uppercase text-light border border-light/60 px-5 py-2.5">
            Ver proyecto
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[0.5rem] tracking-[0.42em] uppercase text-primary mb-1.5">
            {String(index + 1).padStart(2, "0")} · {project.category}
          </p>
          <h3
            className="font-serif font-light text-dark group-hover:text-primary transition-colors duration-300"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)" }}
          >
            {project.title}
          </h3>
        </div>
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="text-dark/25 flex-shrink-0 mt-1 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
        />
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      gsap.from(".projects-title", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".projects-title", start: "top 88%", once: true },
      });

      gsap.from(".project-card", {
        opacity: 0,
        y: 32,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".project-card", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section id="proyectos" ref={sectionRef} className="bg-light">
        <div className="site-pad pt-24 md:pt-32 pb-20 md:pb-28">

          {/* Header */}
          <div className="projects-title flex items-end justify-between gap-4 mb-14 md:mb-16">
            <div>
              <p className="font-sans text-[0.52rem] tracking-[0.5em] uppercase text-primary mb-4">
                Portafolio
              </p>
              <h2
                className="font-serif font-light text-dark leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Nuestro Trabajo
              </h2>
            </div>
            <span className="font-sans text-[0.52rem] text-dark/22 tracking-[0.22em] uppercase hidden md:block">
              {projects.length} proyectos
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-14 md:gap-y-16">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-20 flex justify-center">
            <button
              onClick={() => setSelectedProject(projects[0])}
              className="group inline-flex items-center gap-3 font-sans text-[0.56rem] tracking-[0.42em] uppercase text-dark/50 border-b border-dark/20 pb-1 hover:text-dark hover:border-dark transition-all duration-300"
            >
              Explorar el portafolio
              <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
