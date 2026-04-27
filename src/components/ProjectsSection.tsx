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
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoverImgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  /* portrait for 0,2 — landscape for 1,3 */
  const isPortrait = index % 2 === 0;

  const onMouseEnter = () => {
    gsap.to(hoverImgRef.current, { opacity: 1, duration: 0.55, ease: "power2.inOut" });
    gsap.to(captionRef.current, { color: "var(--color-primary)", duration: 0.3 });
  };

  const onMouseLeave = () => {
    gsap.to(hoverImgRef.current, { opacity: 0, duration: 0.55, ease: "power2.inOut" });
    gsap.to(captionRef.current, { color: "var(--color-dark)", duration: 0.3 });
  };

  return (
    <article
      className={`flex flex-col cursor-pointer group ${isPortrait ? "" : "mt-0 md:mt-[18%]"}`}
      onClick={onOpen}
      data-cursor-hover
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image container */}
      <div
        ref={wrapRef}
        className="project-reveal-image relative overflow-hidden w-full"
        style={{ aspectRatio: isPortrait ? "3 / 4" : "4 / 3" }}
      >
        {/* Cover image */}
        <img
          src={project.coverImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Hover image — crossfade */}
        <img
          ref={hoverImgRef}
          src={project.images?.[0] ?? project.coverImage}
          alt={`${project.title} — detalle`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
          loading="lazy"
        />
      </div>

      {/* Caption */}
      <div ref={captionRef} className="project-text-reveal mt-4 md:mt-5">
        <div className="flex items-baseline gap-0">
          <span
            className="font-serif font-light text-primary leading-none flex-shrink-0"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}
          >
            {String(index + 1).padStart(2, "0")}.&nbsp;
          </span>
          <div>
            <p
              className="font-serif font-light text-dark leading-snug"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.1rem)" }}
            >
              {project.title.split(" ").slice(0, Math.ceil(project.title.split(" ").length / 2)).join(" ")}
            </p>
            <p
              className="font-serif font-light text-dark/70 leading-snug"
              style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.1rem)" }}
            >
              {project.title.split(" ").slice(Math.ceil(project.title.split(" ").length / 2)).join(" ")}
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
          delay: i * 0.12,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            once: true,
          },
        });
      });

      const textBlocks = gsap.utils.toArray<HTMLElement>(".project-text-reveal");
      textBlocks.forEach((block, i) => {
        gsap.from(block, {
          opacity: 0,
          y: 18,
          delay: i * 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 90%",
            once: true,
          },
        });
      });

      gsap.from(".projects-header", {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section id="proyectos" ref={sectionRef} className="bg-secondary">
        {/* Section header */}
        <div className="projects-header border-b border-primary/10">
          <div className="max-w-[1440px] mx-auto px-8 md:px-14 lg:px-20 pt-24 md:pt-32 pb-14 md:pb-16">
            <p className="font-sans text-[0.6rem] tracking-[0.48em] uppercase text-primary mb-5">
              Proyectos
            </p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2
                className="font-serif font-light text-dark leading-none"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              >
                Trabajo seleccionado
              </h2>
              <span className="font-sans text-[0.6rem] text-dark/28 tracking-[0.2em] uppercase">
                2023 — 2024
              </span>
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="max-w-[1440px] mx-auto px-8 md:px-14 lg:px-20 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-7 lg:gap-x-9 gap-y-12 md:gap-y-0 items-end">
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
