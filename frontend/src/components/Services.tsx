"use client";

import { useState } from "react";
import { Code2, Smartphone, Bot, Shield, ArrowRight, Check, X, Rocket, Database, Server, Monitor, Plug, TestTube2, PenTool, Layers, Brain, Wrench, ShieldCheck, HardDrive, BarChart3, FileSearch, Zap } from "lucide-react";
import { services } from "@/data/mockData";

const iconMap = { Code2, Smartphone, Bot, Shield };

const colorMap = {
  violet: {
    icon: "bg-violet-600/15 text-violet-400",
    border: "hover:border-violet-500/40",
    glow: "group-hover:shadow-glow-violet",
    check: "text-violet-400",
    step: "bg-violet-600 text-white",
    stepLine: "bg-violet-600/30",
    badge: "bg-violet-600/10 text-violet-400 border-violet-500/20",
    btn: "bg-violet-600 hover:bg-violet-500",
  },
  cyan: {
    icon: "bg-cyan-500/15 text-cyan-400",
    border: "hover:border-cyan-500/40",
    glow: "group-hover:shadow-glow-cyan",
    check: "text-cyan-400",
    step: "bg-cyan-600 text-white",
    stepLine: "bg-cyan-600/30",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    btn: "bg-cyan-600 hover:bg-cyan-500",
  },
  gold: {
    icon: "bg-gold-500/15 text-gold-400",
    border: "hover:border-gold-500/40",
    glow: "group-hover:shadow-glow-gold",
    check: "text-gold-400",
    step: "bg-gold-500 text-white",
    stepLine: "bg-gold-500/30",
    badge: "bg-gold-500/10 text-gold-400 border-gold-500/20",
    btn: "bg-gold-500 hover:bg-gold-400",
  },
  green: {
    icon: "bg-emerald-500/15 text-emerald-400",
    border: "hover:border-emerald-500/40",
    glow: "",
    check: "text-emerald-400",
    step: "bg-emerald-600 text-white",
    stepLine: "bg-emerald-600/30",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    btn: "bg-emerald-600 hover:bg-emerald-500",
  },
};

const SERVICE_STEPS: Record<string, { icon: React.ElementType; title: string; desc: string }[]> = {
  "1": [
    { icon: FileSearch, title: "Discovery & Planning", desc: "We understand your requirements, define the project scope, and design the system architecture before writing a single line of code." },
    { icon: Database, title: "Database Design", desc: "MongoDB schema design, data modeling, indexing strategy, and relationship planning for optimal performance." },
    { icon: Server, title: "Backend API Development", desc: "Secure, scalable REST APIs built with Node.js and Express — fully documented and tested." },
    { icon: Monitor, title: "Frontend UI Development", desc: "Pixel-perfect, fully responsive UI crafted with Next.js and Tailwind CSS for a seamless user experience." },
    { icon: Plug, title: "API Integration & Testing", desc: "Connecting all services end-to-end, third-party API integrations, and thorough QA testing." },
    { icon: Rocket, title: "Deployment & Launch", desc: "Cloud deployment with CI/CD pipelines, environment setup, domain configuration, and a smooth go-live." },
  ],
  "2": [
    { icon: PenTool, title: "UI/UX Wireframing", desc: "Designing intuitive user flows, wireframes, and interactive prototypes before any development begins." },
    { icon: Layers, title: "Project Setup", desc: "React Native environment, Android Studio configuration, and project scaffolding with best practices." },
    { icon: Code2, title: "Core Feature Development", desc: "Building all screens, navigation, state management, and business logic with clean, maintainable code." },
    { icon: Zap, title: "Real-time Integration", desc: "Kafka event streaming for live data, push notifications, and real-time features across devices." },
    { icon: TestTube2, title: "Testing & Debugging", desc: "Device testing on Android & iOS, performance profiling, crash reporting setup, and bug fixes." },
    { icon: Rocket, title: "Store Deployment", desc: "Play Store & App Store submission, review process support, and post-launch monitoring." },
  ],
  "3": [
    { icon: FileSearch, title: "Requirement Analysis", desc: "Understanding your exact use case — customer support, sales automation, or internal workflows." },
    { icon: Brain, title: "AI Model Selection", desc: "Choosing the right LLM (GPT-4, Gemini, or custom model) based on your domain and budget." },
    { icon: Layers, title: "NLP & Intent Setup", desc: "Training intents, entities, and conversation flows tailored specifically to your business context." },
    { icon: Plug, title: "API & CRM Integration", desc: "Connecting the chatbot to your existing tools — CRM, helpdesk, database, or WhatsApp Business API." },
    { icon: TestTube2, title: "Testing & Fine-tuning", desc: "Conversation testing, edge case handling, accuracy improvement, and user acceptance testing." },
    { icon: BarChart3, title: "Go Live & Monitoring", desc: "Multi-channel deployment (web, WhatsApp, Slack) with an analytics dashboard to track performance." },
  ],
  "4": [
    { icon: FileSearch, title: "System Audit", desc: "Full review of your existing codebase, infrastructure, performance bottlenecks, and technical debt." },
    { icon: Wrench, title: "Bug Identification & Fixing", desc: "Systematic debugging with error tracking tools, root cause analysis, and permanent fixes." },
    { icon: Zap, title: "Performance Optimization", desc: "Code splitting, caching strategies, database query optimization, and CDN configuration." },
    { icon: ShieldCheck, title: "Security Updates", desc: "Dependency audits, vulnerability patches, rate limiting, and comprehensive security hardening." },
    { icon: HardDrive, title: "Regular Backups", desc: "Automated backup schedules, disaster recovery planning, and data integrity verification." },
    { icon: BarChart3, title: "24/7 Monitoring", desc: "Uptime monitoring, real-time alerting, and rapid incident response around the clock." },
  ],
};

type Service = (typeof services)[0];

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const colors = colorMap[service.color as keyof typeof colorMap];
  const steps = SERVICE_STEPS[service.id] ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-white/5 shrink-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl ${colors.icon} flex items-center justify-center shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-lg leading-tight">{service.title}</h2>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed">{service.description}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl glass border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {service.features.map((f) => (
              <span key={f} className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colors.badge}`}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="overflow-y-auto flex-1 p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
            Our Process
          </p>
          <div className="space-y-0">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <div key={i} className="flex gap-4">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-xl ${colors.step} flex items-center justify-center shrink-0 shadow-lg`}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    {!isLast && (
                      <div className={`w-px flex-1 my-1.5 ${colors.stepLine}`} style={{ minHeight: "24px" }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 ${isLast ? "pb-0" : "pb-5"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-white font-semibold text-sm">{step.title}</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-white/5 shrink-0">
          <a
            href="#contact"
            onClick={onClose}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-all ${colors.btn}`}
          >
            Get Started with {service.title.split(" ")[0]} {service.title.split(" ")[1] ?? ""}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-space-800" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
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
            Our <span className="gradient-text">Services</span>
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
                <div className="absolute top-6 right-6 text-6xl font-black text-white/3 select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className={`w-14 h-14 rounded-2xl ${colors.icon} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className={`w-4 h-4 ${colors.check} shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelected(service)}
                  className={`flex items-center gap-2 text-sm font-semibold ${colors.check} group/btn`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity ${colors.check}`} />
              </div>
            );
          })}
        </div>
      </div>

      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
