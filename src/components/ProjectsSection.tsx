"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "./ProjectModal";
import { ArrowRight } from "lucide-react";

function ProjectLayoutA({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  const onMouseEnter = () =>
    gsap.to(imageRef.current, { scale: 1.06, duration: 0.8, ease: "power2.out" });
  const onMouseLeave = () =>
    gsap.to(imageRef.current, { scale: 1, duration: 0.8, ease: "power2.out" });

  return (
    <article
      className="relative overflow-hidden"
      style={{ height: "clamp(480px, 82vh, 900px)" }}
      data-cursor-hover
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div className="project-reveal-image absolute inset-0">
        <img
          ref={imageRef}
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-8 md:px-16 pb-14 md:pb-20">
        <div className="project-text-reveal max-w-2xl">
          <p className="font-sans text-[0.58rem] tracking-[0.45em] uppercase text-accent mb-4">
            {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; {project.category}
          </p>
          <h3
            className="font-serif font-light text-light leading-none mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-5 mb-8">
            <span className="font-sans text-[0.7rem] text-light/40">{project.year}</span>
            {project.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-sans text-[0.65rem] text-light/30 hidden md:inline"
              >
                — {tag}
              </span>
            ))}
          </div>
          <button
            onClick={onOpen}
            className="group inline-flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.28em] uppercase text-light border border-light/25 px-7 py-3.5 hover:bg-light hover:text-dark hover:border-light transition-all duration-300"
          >
            Ver proyecto
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectLayoutB({
  project,
  index,
  onOpen,
  reversed = false,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
  reversed?: boolean;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  const onMouseEnter = () =>
    gsap.to(imageRef.current, { scale: 1.06, duration: 0.8, ease: "power2.out" });
  const onMouseLeave = () =>
    gsap.to(imageRef.current, { scale: 1, duration: 0.8, ease: "power2.out" });

  const textPanel = (
    <div className="flex flex-col justify-center px-8 md:px-14 py-16 md:py-20 bg-[#141412]">
      <div className="project-text-reveal max-w-sm">
        <p className="font-sans text-[0.58rem] tracking-[0.45em] uppercase text-accent mb-5">
          {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; {project.category}
        </p>
        <h3
          className="font-serif font-light text-light leading-tight mb-4"
          style={{ fontSize: "clamp(1.9rem, 3.2vw, 3rem)" }}
        >
          {project.title}
        </h3>
        <p className="font-sans text-[0.78rem] font-light text-light/40 leading-relaxed mb-8">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[0.6rem] tracking-wider uppercase text-accent/60 border border-accent/20 px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-sans text-[0.65rem] text-light/30">{project.year}</span>
          <button
            onClick={onOpen}
            className="group inline-flex items-center gap-2.5 font-sans text-[0.62rem] tracking-[0.28em] uppercase text-accent hover:text-light transition-colors duration-300"
          >
            Ver proyecto
            <ArrowRight
              size={11}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );

  const imagePanel = (
    <div
      className="relative overflow-hidden min-h-[50vw] md:min-h-0"
      data-cursor-hover
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-reveal-image absolute inset-0">
        <img
          ref={imageRef}
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );

  return (
    <article className="grid grid-cols-1 md:grid-cols-2 border-t border-light/5 min-h-[65vh]">
      {reversed ? (
        <>
          {textPanel}
          {imagePanel}
        </>
      ) : (
        <>
          {imagePanel}
          {textPanel}
        </>
      )}
    </article>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray<HTMLElement>(".project-reveal-image");
      images.forEach((img) => {
        gsap.from(img, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            once: true,
          },
        });
      });

      const textBlocks = gsap.utils.toArray<HTMLElement>(".project-text-reveal");
      textBlocks.forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 35,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.from(".projects-header", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section id="proyectos" ref={sectionRef} className="bg-dark">
        {/* Section header */}
        <div className="projects-header px-8 md:px-16 pt-24 pb-16 border-b border-light/5">
          <p className="font-sans text-[0.62rem] tracking-[0.45em] uppercase text-accent mb-5">
            Proyectos
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2
              className="font-serif font-light text-light leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Trabajo seleccionado
            </h2>
            <span className="font-sans text-[0.65rem] text-light/25 tracking-widest">
              2023 — 2024
            </span>
          </div>
        </div>

        {/* Project list */}
        {projects.map((project, index) =>
          index % 2 === 0 ? (
            <ProjectLayoutA
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setSelectedProject(project)}
            />
          ) : (
            <ProjectLayoutB
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setSelectedProject(project)}
              reversed={index === 3}
            />
          )
        )}
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
