"use client";

import { Code2, Smartphone, Bot, Shield, ArrowRight, Check } from "lucide-react";
import { services } from "@/data/mockData";

const iconMap = {
  Code2,
  Smartphone,
  Bot,
  Shield,
};

const colorMap = {
  violet: {
    icon: "bg-violet-600/15 text-violet-400",
    border: "hover:border-violet-500/40",
    badge: "bg-violet-600/10 text-violet-400",
    glow: "group-hover:shadow-glow-violet",
    check: "text-violet-400",
    dot: "bg-violet-500",
  },
  cyan: {
    icon: "bg-cyan-500/15 text-cyan-400",
    border: "hover:border-cyan-500/40",
    badge: "bg-cyan-500/10 text-cyan-400",
    glow: "group-hover:shadow-glow-cyan",
    check: "text-cyan-400",
    dot: "bg-cyan-500",
  },
  gold: {
    icon: "bg-gold-500/15 text-gold-400",
    border: "hover:border-gold-500/40",
    badge: "bg-gold-500/10 text-gold-400",
    glow: "group-hover:shadow-glow-gold",
    check: "text-gold-400",
    dot: "bg-gold-500",
  },
  green: {
    icon: "bg-emerald-500/15 text-emerald-400",
    border: "hover:border-emerald-500/40",
    badge: "bg-emerald-500/10 text-emerald-400",
    glow: "",
    check: "text-emerald-400",
    dot: "bg-emerald-500",
  },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-space-800" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            What We Do
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Our{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            From concept to launch, we deliver end-to-end digital solutions tailored to your business goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            const colors = colorMap[service.color as keyof typeof colorMap];

            return (
              <div
                key={service.id}
                className={`group relative glass-card rounded-2xl p-8 border border-white/5 transition-all duration-300 cursor-pointer ${colors.border} ${colors.glow}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Number */}
                <div className="absolute top-6 right-6 text-6xl font-black text-white/3 select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${colors.icon} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className={`w-4 h-4 ${colors.check} shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className={`flex items-center gap-2 text-sm font-semibold ${colors.check} group/btn`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity ${colors.check}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
