"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "./ProjectModal";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const hoverImgRef = useRef<HTMLImageElement>(null);
  const isPortrait = index % 2 === 0;

  const onMouseEnter = () =>
    gsap.to(hoverImgRef.current, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
  const onMouseLeave = () =>
    gsap.to(hoverImgRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });

  return (
    <article
      className={`flex flex-col cursor-pointer group ${isPortrait ? "" : "md:mt-[20%]"}`}
      onClick={onOpen}
      data-cursor-hover
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div
        className="project-reveal-image relative overflow-hidden w-full"
        style={{ aspectRatio: isPortrait ? "3 / 4" : "4 / 3" }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <img
          ref={hoverImgRef}
          src={project.images?.[0] ?? project.coverImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
          loading="lazy"
        />
      </div>

      {/* Caption */}
      <div className="project-text-reveal mt-5 md:mt-6">
        <div className="flex items-baseline gap-1">
          <span
            className="font-serif font-light text-primary/70 leading-none flex-shrink-0 group-hover:text-primary transition-colors duration-300"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            {String(index + 1).padStart(2, "0")}.
          </span>
          <div className="ml-2">
            <p
              className="font-serif font-light text-dark/75 leading-snug group-hover:text-dark transition-colors duration-300"
              style={{ fontSize: "clamp(0.82rem, 1.2vw, 1rem)" }}
            >
              {project.title}
            </p>
            <p className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-dark/30 mt-1">
              {project.category}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray<HTMLElement>(".project-reveal-image");
      images.forEach((img, i) => {
        gsap.from(img, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.4,
          delay: i * 0.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: img, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-text-reveal").forEach((block, i) => {
        gsap.from(block, {
          opacity: 0,
          y: 16,
          delay: i * 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 90%", once: true },
        });
      });

      gsap.from(".projects-header", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".projects-header", start: "top 88%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section id="proyectos" ref={sectionRef} className="bg-light">
        {/* Header */}
        <div className="projects-header border-b border-dark/6">
          <div className="px-8 md:px-16 lg:px-24 pt-24 md:pt-32 pb-12 md:pb-14">
            <p className="font-sans text-[0.55rem] tracking-[0.52em] uppercase text-primary mb-5">
              Proyectos
            </p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2
                className="font-serif font-light text-dark leading-none"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
              >
                Trabajo seleccionado
              </h2>
              <span className="font-sans text-[0.55rem] text-dark/25 tracking-[0.22em] uppercase">
                2023 — 2024
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="px-8 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-8 lg:gap-x-10 gap-y-14 md:gap-y-0 items-end">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>

        {/* View all link */}
        <div className="px-8 md:px-16 lg:px-24 pb-20 md:pb-28 flex justify-center">
          <span className="font-sans text-[0.55rem] tracking-[0.45em] uppercase text-dark/25 border-b border-dark/15 pb-0.5">
            {projects.length} proyectos
          </span>
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
