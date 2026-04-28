"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Instagram, Linkedin, ArrowRight } from "lucide-react";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-fade", {
        opacity: 0, y: 28, stagger: 0.09, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-fade", start: "top 84%", once: true },
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer id="contacto" ref={sectionRef} className="bg-dark">

      {/* Main CTA block */}
      <div className="site-pad pt-24 md:pt-32 pb-16 md:pb-20 border-b border-light/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left */}
          <div>
            <p className="contact-fade font-sans text-[0.52rem] tracking-[0.5em] uppercase text-light/30 mb-8">
              Contacto
            </p>
            <h2
              className="contact-fade font-serif font-light text-light leading-[1.05] mb-8"
              style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)" }}
            >
              ¿Comenzamos?
            </h2>
            <a
              href="mailto:contacto@acostainterior.com"
              className="contact-fade group inline-flex items-center gap-3 font-sans text-[0.56rem] tracking-[0.42em] uppercase text-light border border-light/25 px-7 py-3.5 hover:bg-light hover:text-dark transition-all duration-300 mb-10"
            >
              Enviar consulta
              <ArrowRight size={11} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>

            <div className="contact-fade space-y-3">
              <a
                href="mailto:contacto@acostainterior.com"
                className="block font-sans text-[0.72rem] text-light/45 hover:text-light transition-colors duration-300"
              >
                contacto@acostainterior.com
              </a>
              <p className="font-sans text-[0.65rem] text-light/25">Lima, Perú</p>
            </div>
          </div>

          {/* Right — Newsletter */}
          <div className="md:pt-16">
            <p className="contact-fade font-serif font-light text-light leading-tight mb-3"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              Por dentro
            </p>
            <p className="contact-fade font-sans font-light text-light/35 text-[0.8rem] leading-relaxed mb-7">
              Recibe perspectivas exclusivas, inspiración y actualizaciones del estudio.
            </p>

            {submitted ? (
              <p className="contact-fade font-sans text-[0.62rem] tracking-[0.3em] uppercase text-primary">
                ¡Estás dentro!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="contact-fade flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  required
                  className="flex-1 bg-transparent border border-light/18 px-4 py-3 font-sans text-[0.72rem] text-light placeholder:text-light/25 focus:outline-none focus:border-light/40 transition-colors duration-200 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-primary text-light font-sans text-[0.52rem] tracking-[0.35em] uppercase px-5 py-3 hover:bg-accent transition-colors duration-300 flex-shrink-0"
                >
                  Suscribir
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Footer bar */}
      <div className="site-pad py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Logo */}
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[0.95rem] font-light tracking-[0.28em] text-light/60">Acosta</span>
            <span className="font-sans text-[0.38rem] tracking-[0.65em] uppercase text-light/30 -mt-0.5">Interior</span>
          </div>

          {/* Footer nav */}
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {["Proyectos", "Proceso", "Estudio", "Testimonios", "Contacto"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-sans text-[0.5rem] tracking-[0.38em] uppercase text-light/28 hover:text-light/60 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-light/28 hover:text-light/70 transition-colors duration-200"
            >
              <Instagram size={15} strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-light/28 hover:text-light/70 transition-colors duration-200"
            >
              <Linkedin size={15} strokeWidth={1.5} />
            </a>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-light/6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-sans text-[0.48rem] tracking-[0.28em] uppercase text-light/18">
            © 2024 Acosta Interior. Todos los derechos reservados.
          </p>
          <p className="font-sans text-[0.48rem] tracking-[0.28em] uppercase text-light/18">
            Lima, Perú
          </p>
        </div>
      </div>

    </footer>
  );
}
