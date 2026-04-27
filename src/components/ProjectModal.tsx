"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Project } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isClosing = useRef(false);

  const allImages = [project.coverImage, ...project.images];

  const handleClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;

    gsap.to(modalRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      delay: 0.1,
      onComplete: onClose,
    });
  }, [onClose]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, allImages.length - 1));
      setCurrentIndex(clamped);
    },
    [allImages.length]
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useGSAP(() => {
    gsap.from(overlayRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" });
    gsap.from(modalRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.1,
    });
  });

  /* Animate gallery track on index change */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.parentElement!.offsetWidth;
    gsap.to(track, {
      x: -currentIndex * slideWidth,
      duration: 0.65,
      ease: "power3.inOut",
    });
  }, [currentIndex]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose, next, prev]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[500] bg-dark/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Proyecto: ${project.title}`}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-7 md:px-12 py-5 border-b border-light/8 flex-shrink-0">
        <div ref={modalRef} className="flex items-center gap-6">
          <span className="font-sans text-[0.58rem] tracking-[0.45em] uppercase text-accent">
            {project.category}
          </span>
          <h2
            className="font-serif font-light text-light"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)" }}
          >
            {project.title}
          </h2>
          <span className="font-sans text-[0.65rem] text-light/30 hidden md:inline">
            {project.year}
          </span>
        </div>
        <button
          onClick={handleClose}
          aria-label="Cerrar proyecto"
          className="w-10 h-10 flex items-center justify-center text-light/50 hover:text-light transition-colors duration-200 border border-light/10 hover:border-light/30"
        >
          <X size={16} />
        </button>
      </header>

      {/* Gallery */}
      <div className="flex-1 relative overflow-hidden">
        {/* Track */}
        <div ref={trackRef} className="flex h-full" style={{ width: `${allImages.length * 100}%` }}>
          {allImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-full flex items-center justify-center p-4 md:p-8"
              style={{ width: `${100 / allImages.length}%` }}
            >
              <img
                src={src}
                alt={`${project.title} — imagen ${i + 1}`}
                className="max-w-full max-h-full object-contain"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label="Imagen anterior"
          className="absolute left-4 md:left-7 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-light/50 hover:text-light border border-light/10 hover:border-light/30 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none bg-dark/40 backdrop-blur-sm"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          disabled={currentIndex === allImages.length - 1}
          aria-label="Imagen siguiente"
          className="absolute right-4 md:right-7 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-light/50 hover:text-light border border-light/10 hover:border-light/30 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none bg-dark/40 backdrop-blur-sm"
        >
          <ChevronRight size={18} />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[0.6rem] tracking-widest text-light/30">
          {String(currentIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
        </div>
      </div>

      {/* Footer — description + thumbnails */}
      <footer className="flex-shrink-0 border-t border-light/8 px-7 md:px-12 py-5">
        <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-start md:items-center">
          {/* Description */}
          <p className="font-sans text-[0.74rem] font-light text-light/45 leading-relaxed max-w-xl flex-shrink-0">
            {project.description}
          </p>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1 flex-1 min-w-0">
            {allImages.map((src, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className="flex-shrink-0 w-12 h-9 overflow-hidden transition-opacity duration-200"
                style={{ opacity: i === currentIndex ? 1 : 0.35 }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Tags */}
          <div className="hidden md:flex flex-wrap gap-2 flex-shrink-0">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[0.58rem] tracking-wider uppercase text-accent/50 border border-accent/15 px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
