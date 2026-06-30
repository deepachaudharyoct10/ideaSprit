"use client";

import { Star, Quote } from "lucide-react";
import { clients } from "@/data/mockData";
import Image from "next/image";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "CEO & Founder",
    company: "TechStart India",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    rating: 5,
    review:
      "IdeaSprit transformed our entire digital presence. Their team delivered a stunning web app ahead of schedule, and the quality far exceeded our expectations. Truly professional.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Founder",
    company: "StyleCraft",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    rating: 5,
    review:
      "Working with IdeaSprit was a seamless experience from day one. They understood our vision perfectly and built exactly what we needed. Our e-commerce sales grew 40% after launch.",
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "CTO",
    company: "FinFlow Solutions",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    rating: 5,
    review:
      "The team's technical depth is exceptional. They built our fintech dashboard with complex real-time data visualizations — clean code, great communication, zero missed deadlines.",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Director of Operations",
    company: "HealthBridge",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    rating: 5,
    review:
      "From concept to deployment in just 6 weeks — IdeaSprit delivered our patient management portal flawlessly. Exceptional attention to UX detail and accessibility standards.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Managing Director",
    company: "EduPrime",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    rating: 4,
    review:
      "Our learning platform now handles 10,000+ students daily without a glitch. IdeaSprit's scalable architecture has been rock-solid. Highly recommend them for any ed-tech build.",
  },
];

const ROW2 = [
  TESTIMONIALS[2],
  TESTIMONIALS[3],
  TESTIMONIALS[4],
  TESTIMONIALS[0],
  TESTIMONIALS[1],
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-gold-400 fill-gold-400" : "text-slate-600"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div className="w-80 shrink-0 glass-card rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all group mx-3">
      <div className="flex items-start justify-between mb-3">
        <StarRating rating={t.rating} />
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
          <Quote className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-5 italic line-clamp-4">
        &ldquo;{t.review}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-violet-500/30 shrink-0">
          <Image src={t.image} alt={t.name} fill className="object-cover" unoptimized />
        </div>
        <div className="min-w-0">
          <div className="text-white font-semibold text-sm truncate">{t.name}</div>
          <div className="text-slate-500 text-xs truncate">{t.role}</div>
        </div>
        <span className="ml-auto shrink-0 px-2.5 py-1 text-xs font-semibold bg-violet-600/10 text-violet-400 border border-violet-500/20 rounded-full">
          {t.company}
        </span>
      </div>
    </div>
  );
}

export default function TrustedClients() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  const doubled2 = [...ROW2];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-space-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Client Love
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Trusted by{" "}
            <span className="gradient-text-cyan">60+ Clients</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We have helped startups and businesses across India build their digital presence.
          </p>
        </div>

        {/* Client logos marquee */}
        <div className="relative mb-16 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-space-900 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-space-900 to-transparent" />
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4 glass rounded-2xl border border-white/5 hover:border-violet-500/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 flex items-center justify-center">
                  <span className="text-sm font-black text-violet-300">{client.logo}</span>
                </div>
                <span className="text-white/60 font-semibold text-sm">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials infinite marquee */}
        <div className="space-y-5">
          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-space-900 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-space-900 to-transparent pointer-events-none" />
            <div className="flex animate-marquee-left" style={{ width: "max-content" }}>
              {doubled.map((t, i) => (
                <TestimonialCard key={`r1-${t.id}-${i}`} t={t} />
              ))}
            </div>
          </div>

        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          {[
            { label: "5-Star Rating", value: "4.9/5" },
            { label: "Project Success", value: "98%" },
            { label: "On-time Delivery", value: "95%" },
            { label: "Repeat Clients", value: "78%" },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <div className="text-2xl font-black gradient-text mb-1">{badge.value}</div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">{badge.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
