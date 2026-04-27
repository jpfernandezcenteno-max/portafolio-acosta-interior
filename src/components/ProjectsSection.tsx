"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "./ProjectModal";
import { ArrowRight } from "lucide-react";

/* ─── Layout A: imagen inmersiva con texto superpuesto ─────────────────── */
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
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.9, ease: "power2.out" });
  const onMouseLeave = () =>
    gsap.to(imageRef.current, { scale: 1, duration: 0.9, ease: "power2.out" });

  return (
    <article
      className="relative overflow-hidden border-b border-primary/10"
      style={{ height: "clamp(500px, 80vh, 860px)" }}
      data-cursor-hover
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Imagen */}
      <div className="project-reveal-image absolute inset-0">
        <img
          ref={imageRef}
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradiente claro en la zona del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/35 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="max-w-[1440px] mx-auto w-full px-8 md:px-14 lg:px-20 pb-12 md:pb-16">
          <div className="project-text-reveal max-w-2xl">
            <p className="font-sans text-[0.58rem] tracking-[0.45em] uppercase text-primary mb-4">
              {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; {project.category}
            </p>
            <h3
              className="font-serif font-light text-dark leading-none mb-4"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
            >
              {project.title}
            </h3>
            <div className="flex items-center gap-5 mb-8">
              <span className="font-sans text-[0.7rem] text-dark/45">{project.year}</span>
              {project.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="font-sans text-[0.65rem] text-dark/35 hidden md:inline">
                  — {tag}
                </span>
              ))}
            </div>
            <button
              onClick={onOpen}
              className="group inline-flex items-center gap-3 font-sans text-[0.63rem] tracking-[0.28em] uppercase text-dark border border-dark/25 px-7 py-3.5 hover:bg-dark hover:text-light hover:border-dark transition-all duration-300"
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
    </article>
  );
}

/* ─── Layout B: editorial — imagen + panel de texto ───────────────────── */
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
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.9, ease: "power2.out" });
  const onMouseLeave = () =>
    gsap.to(imageRef.current, { scale: 1, duration: 0.9, ease: "power2.out" });

  const textPanel = (
    <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-14 md:py-20 bg-light border-r border-primary/8 last:border-r-0">
      <div className="project-text-reveal max-w-md">
        <p className="font-sans text-[0.58rem] tracking-[0.45em] uppercase text-primary mb-5">
          {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; {project.category}
        </p>
        <h3
          className="font-serif font-light text-dark leading-tight mb-5"
          style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
        >
          {project.title}
        </h3>
        <p className="font-sans text-[0.82rem] font-light text-dark/55 leading-[1.85] mb-8">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-9">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[0.58rem] tracking-wider uppercase text-primary/70 border border-primary/20 px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-dark/8">
          <span className="font-sans text-[0.65rem] text-dark/35">{project.year}</span>
          <button
            onClick={onOpen}
            className="group inline-flex items-center gap-2.5 font-sans text-[0.63rem] tracking-[0.28em] uppercase text-primary hover:text-dark transition-colors duration-300"
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
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(320px, 55vh, 680px)" }}
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
    <article className="grid grid-cols-1 md:grid-cols-2 border-b border-primary/10">
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

/* ─── Sección principal ────────────────────────────────────────────────── */
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
          y: 32,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            once: true,
          },
        });
      });

      gsap.from(".projects-header", {
        opacity: 0,
        y: 36,
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
        {/* Cabecera de sección */}
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

        {/* Lista de proyectos */}
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
