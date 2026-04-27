"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { Skill } from "@/types";

const skills: Skill[] = [
  { name: "AutoCAD", level: 90 },
  { name: "SketchUp", level: 85 },
  { name: "Revit", level: 75 },
  { name: "3ds Max", level: 70 },
  { name: "V-Ray", level: 65 },
  { name: "Photoshop", level: 82 },
  { name: "Illustrator", level: 76 },
  { name: "InDesign", level: 72 },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const titleSplit = new SplitText(titleRef.current, { type: "lines" });

      gsap.from(titleSplit.lines, {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".about-text-block", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-block",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(photoRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: photoRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const bars = gsap.utils.toArray<HTMLElement>(".skill-bar-fill");
      bars.forEach((bar) => {
        const level = bar.getAttribute("data-level") || "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      return () => titleSplit.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className="bg-light py-28 md:py-40 px-6 md:px-14"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left — Biography */}
        <div>
          <p className="font-sans text-[0.62rem] tracking-[0.45em] uppercase text-primary mb-6">
            Sobre mí
          </p>
          <h2
            ref={titleRef}
            className="font-serif font-light text-dark leading-tight mb-10"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)" }}
          >
            Diseñar es narrar
            <br />
            <em>espacios que hablan.</em>
          </h2>

          <div className="space-y-5">
            <p className="about-text-block font-sans font-light text-dark/70 leading-relaxed text-[0.93rem]">
              Soy Valentina Acosta, estudiante de Diseño de Interiores en la Universidad de Lima.
              Mi trabajo parte de una premisa simple: los espacios no son neutros —
              cada decisión, desde la proporción de un vano hasta la textura de un material,
              habla del mundo que habitamos.
            </p>
            <p className="about-text-block font-sans font-light text-dark/70 leading-relaxed text-[0.93rem]">
              Mi enfoque combina rigor técnico con sensibilidad artística. Investigo
              el comportamiento de la luz natural, la relación entre materialidad y emoción,
              y la manera en que la arquitectura interior puede mejorar el bienestar
              de quienes viven y trabajan en un espacio.
            </p>
            <p className="about-text-block font-sans font-light text-dark/70 leading-relaxed text-[0.93rem]">
              Cada proyecto es una conversación entre el lugar, el cliente y mi visión.
              El resultado: espacios que se sienten inevitables, como si siempre
              hubieran debido existir exactamente así.
            </p>
          </div>

        </div>

        {/* Right — Photo + Skills */}
        <div className="space-y-14">
          {/* Photo */}
          <div
            ref={photoRef}
            className="relative overflow-hidden aspect-[4/3]"
          >
            <img
              src="https://picsum.photos/seed/designer-portrait/800/600"
              alt="Valentina Acosta, diseñadora de interiores"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-light/60 to-transparent" />
          </div>

          {/* Skills */}
          <div>
            <p className="font-sans text-[0.62rem] tracking-[0.45em] uppercase text-primary mb-8">
              Habilidades y software
            </p>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-sans text-[0.78rem] tracking-wide text-dark/80">
                      {skill.name}
                    </span>
                    <span className="font-sans text-[0.68rem] text-primary/70">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-[1px] w-full bg-secondary overflow-hidden">
                    <div
                      className="skill-bar-fill h-full bg-primary"
                      data-level={skill.level}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
