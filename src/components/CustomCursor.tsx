"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    setIsPointerDevice(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useGSAP(() => {
    if (!ringRef.current || !dotRef.current || !isPointerDevice) return;

    gsap.set([ringRef.current, dotRef.current], { xPercent: -50, yPercent: -50 });

    const xRing = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3" });
    const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "none" });
    const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "none" });

    const onMove = (e: MouseEvent) => {
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, { dependencies: [isPointerDevice] });

  useEffect(() => {
    if (!isPointerDevice) return;

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      setHovering(
        el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          !!el.closest("[data-cursor-hover]")
      );
    };

    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isPointerDevice]);

  if (!isPointerDevice) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          className="rounded-full border border-primary"
          style={{
            width: hovering ? "54px" : "38px",
            height: hovering ? "54px" : "38px",
            transform: "translate(-50%, -50%)",
            transition: "width 0.3s ease, height 0.3s ease",
            mixBlendMode: "multiply",
          }}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-primary"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    </>
  );
}
