"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth layer 0..1 (drives size + parallax)
  tw: number; // twinkle phase
  tws: number; // twinkle speed
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let scrollY = window.scrollY;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(260, Math.floor((w * h) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * (h * 2.2),
        z: Math.random(),
        tw: Math.random() * Math.PI * 2,
        tws: 0.006 + Math.random() * 0.02,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += s.tws;
        const parallax = scrollY * (0.12 + s.z * 0.4);
        let y = s.y - parallax;
        // wrap vertically
        const span = h * 2.2;
        y = ((y % span) + span) % span;
        if (y > h) continue;

        const size = 0.4 + s.z * 1.5;
        const twinkle = 0.45 + Math.abs(Math.sin(s.tw)) * 0.55;
        const alpha = (0.25 + s.z * 0.6) * twinkle;

        // brighter stars get a cyan tint
        if (s.z > 0.82) {
          ctx.fillStyle = `rgba(150, 225, 255, ${alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(56, 225, 255, 0.7)";
        } else {
          ctx.fillStyle = `rgba(210, 225, 245, ${alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(s.x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    build();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", build);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {/* deep-space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 72% -10%, rgba(23,64,110,0.45), transparent 60%)," +
            "radial-gradient(900px 600px at 12% 8%, rgba(56,225,255,0.08), transparent 55%)," +
            "linear-gradient(180deg, #04060d 0%, #05070f 60%, #04060d 100%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* subtle HUD grid + vignette */}
      <div className="grid-overlay absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(2,4,9,0.85) 100%)",
        }}
      />
    </div>
  );
}
