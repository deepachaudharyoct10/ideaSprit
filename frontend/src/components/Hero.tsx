"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Code2, Sparkles, Globe, Cpu } from "lucide-react";
import { stats } from "@/data/mockData";

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 25);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const floatingCards = [
  { icon: Code2, label: "Clean Code", color: "violet", top: "15%", left: "5%" },
  { icon: Globe, label: "Web Apps", color: "cyan", top: "20%", right: "5%" },
  { icon: Cpu, label: "AI-Powered", color: "gold", bottom: "30%", left: "3%" },
  { icon: Sparkles, label: "Premium UI", color: "violet", bottom: "25%", right: "4%" },
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space-900">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-dots opacity-20" />

      {/* Radial glow orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          transform: `translate(calc(-50% + ${mousePos.x * 0.5}px), calc(${mousePos.y * 0.5}px))`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Floating tech cards */}
      {floatingCards.map(({ icon: Icon, label, color, ...pos }, i) => (
        <div
          key={label}
          className="absolute hidden lg:flex items-center gap-2 px-4 py-2.5 glass rounded-2xl animate-float"
          style={{
            ...pos,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${5 + i}s`,
          }}
        >
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              color === "violet"
                ? "bg-violet-600/20"
                : color === "cyan"
                ? "bg-cyan-500/20"
                : "bg-gold-500/20"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${
                color === "violet"
                  ? "text-violet-400"
                  : color === "cyan"
                  ? "text-cyan-400"
                  : "text-gold-400"
              }`}
            />
          </div>
          <span className="text-sm font-medium text-white/80">{label}</span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/20 text-violet-300 text-sm font-medium mb-8 animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          Available for new projects
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="text-white">Transform Your</span>
          <br />
          <span className="gradient-text">Ideas Into</span>
          <br />
          <span className="text-white">Digital Reality</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          We craft stunning websites and powerful web applications that drive business growth.
          From concept to deployment, we turn your vision into a competitive digital advantage.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link href="/#contact" className="btn-primary group">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/projects" className="btn-secondary group">
            <Play className="w-4 h-4" />
            View Our Work
          </Link>
          <Link
            href="/#team"
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 decoration-violet-500/40"
          >
            Meet the Team
          </Link>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 group">
              <div className="text-3xl font-black gradient-text mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-400 text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-violet-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
