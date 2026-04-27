"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectModal } from "./ProjectModal";
import { ArrowRight } from "lucide-react";

function ProjectStrip({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const stripRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const innerWrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const onMouseEnter = () => {
    gsap.to(coverRef.current, { scale: 1.04, duration: 0.9, ease: "power2.out" });
    gsap.to(innerWrapRef.current, { y: -6, duration: 0.7, ease: "power2.out" });
    gsap.to(innerRef.current, { scale: 1.06, duration: 0.9, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 6, duration: 0.4, ease: "power2.out" });
  };

  const onMouseLeave = () => {
    gsap.to(coverRef.current, { scale: 1, duration: 0.9, ease: "power2.out" });
    gsap.to(innerWrapRef.current, { y: 0, duration: 0.7, ease: "power2.out" });
    gsap.to(innerRef.current, { scale: 1, duration: 0.9, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 0, duration: 0.4, ease: "power2.out" });
  };

  const isReversed = index % 2 !== 0;

  const textPanel = (
    <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20">
      <div className="project-text-reveal">
        <p
          className="font-serif font-light text-primary/12 leading-none select-none mb-2 md:mb-4"
          style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </p>

        <p className="font-sans text-[0.57rem] tracking-[0.45em] uppercase text-primary mb-5">
          {project.category}
        </p>

        <h3
          className="font-serif font-light text-dark leading-[1.05] mb-6"
          style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
        >
          {project.title}
        </h3>

        <p className="font-sans text-[0.82rem] font-light text-dark/50 leading-[1.85] max-w-sm mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-sans text-[0.55rem] tracking-wider uppercase text-primary/60 border border-primary/20 px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-dark/8 max-w-sm">
          <span className="font-sans text-[0.62rem] tracking-[0.25em] uppercase text-dark/30">
            {project.year}
          </span>
          <button
            onClick={onOpen}
            className="group inline-flex items-center gap-3 font-sans text-[0.6rem] tracking-[0.32em] uppercase text-dark/55 hover:text-primary transition-colors duration-300"
          >
            Ver proyecto
            <ArrowRight
              ref={arrowRef}
              size={11}
              className="flex-shrink-0"
            />
          </button>
        </div>
      </div>
    </div>
  );

  const imagePanel = (
    <div
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(380px, 60vh, 760px)" }}
      data-cursor-hover
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Cover image */}
      <div className="project-reveal-image absolute inset-0">
        <img
          ref={coverRef}
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-secondary/8" />
      </div>

      {/* Inset detail image */}
      {project.images?.[0] && (
        <div
          ref={innerWrapRef}
          className="absolute bottom-6 left-6 w-[38%] max-w-[180px] shadow-lg overflow-hidden z-10"
          style={{ aspectRatio: "3/4" }}
        >
          <img
            ref={innerRef}
            src={project.images[0]}
            alt={`${project.title} — detalle`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );

  return (
    <article
      ref={stripRef}
      className="grid grid-cols-1 lg:grid-cols-2 border-b border-primary/10"
    >
      {isReversed ? (
        <>
          {imagePanel}
          {textPanel}
        </>
      ) : (
        <>
          {textPanel}
          {imagePanel}
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
            start: "top 82%",
            once: true,
          },
        });
      });

      const textBlocks = gsap.utils.toArray<HTMLElement>(".project-text-reveal");
      textBlocks.forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 28,
          duration: 0.9,
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
        y: 32,
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

        {/* Project strips */}
        {projects.map((project, index) => (
          <ProjectStrip
            key={project.id}
            project={project}
            index={index}
            onOpen={() => setSelectedProject(project)}
          />
        ))}
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
