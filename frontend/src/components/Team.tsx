"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Twitter, Briefcase } from "lucide-react";
import { developers } from "@/data/mockData";

export default function Team() {
  return (
    <section id="team" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-space-800" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            The People Behind the Magic
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Meet Our{" "}
            <span className="gradient-text">Team</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A talented group of developers and designers passionate about building exceptional digital experiences.
          </p>
        </div>

        {/* Developer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {developers.map((dev, index) => (
            <div
              key={dev.id}
              className="group relative glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Top gradient bar */}
              <div className="h-1 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 bg-[length:200%_100%] group-hover:animate-gradient-x" />

              <div className="p-6">
                {/* Avatar */}
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-violet-500/30">
                    <Image
                      src={dev.image}
                      alt={dev.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-white font-bold text-base mb-1">{dev.name}</h3>
                  <p className="text-violet-400 text-xs font-medium mb-2">{dev.role}</p>
                  <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs">
                    <Briefcase className="w-3 h-3" />
                    <span>{dev.experience} experience</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                  {dev.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="skill-tag text-xs">
                      {skill}
                    </span>
                  ))}
                  {dev.skills.length > 3 && (
                    <span className="skill-tag text-xs opacity-60">+{dev.skills.length - 3}</span>
                  )}
                </div>

                {/* Social links */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[
                    { icon: Github, href: dev.github },
                    { icon: Linkedin, href: dev.linkedin },
                    { icon: Twitter, href: dev.twitter },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-violet-400 hover:border-violet-500/30 transition-all"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>

                {/* View Profile button */}
                <Link
                  href={`/team/${dev.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-violet-400 border border-violet-500/20 hover:bg-violet-600/10 hover:border-violet-500/40 transition-all group/btn"
                >
                  View Profile
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-slate-400 text-sm">
            Want to join our team?{" "}
            <a href="mailto:careers@ideasprit.com" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              We're hiring!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
