"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GitBranch, Linkedin, X, Briefcase, Users } from "lucide-react";
import { api } from "@/lib/api";
import type { Developer } from "@/types";

export default function Team() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.developers
      .list()
      .then(setDevelopers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const shown = developers.slice(0, 2);

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

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row gap-5 items-stretch justify-center">

          {/* Developer cards grid — same height via items-stretch + auto-rows-fr */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 auto-rows-fr" style={{ maxWidth: "640px", width: "100%" }}>

            {loading && Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl border border-white/5 p-6 animate-pulse flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-2xl bg-white/5" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            ))}

            {!loading && shown.map((dev, index) => (
              <div
                key={dev._id}
                className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition-all flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-0.5 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600" />

                <div className="p-6 flex flex-col items-center text-center flex-1">
                  {/* Avatar */}
                  <div className="relative mb-4 shrink-0">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 blur-md opacity-40" />
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-violet-500/40">
                      <Image
                        src={dev.image}
                        alt={dev.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Name & role */}
                  <h3 className="text-white font-bold text-base mb-0.5">{dev.name}</h3>
                  <p className="text-violet-400 text-sm font-medium mb-2">{dev.role}</p>

                  {/* Experience */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
                    <Briefcase className="w-3 h-3" />
                    <span>{dev.experience}</span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                    {dev.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="skill-tag text-xs">{skill}</span>
                    ))}
                    {dev.skills.length > 3 && (
                      <span className="skill-tag text-xs opacity-60">+{dev.skills.length - 3}</span>
                    )}
                  </div>

                  {/* Social icons */}
                  <div className="flex items-center gap-2 justify-center mb-4">
                    {[
                      { icon: GitBranch, href: dev.github },
                      { icon: Linkedin, href: dev.linkedin },
                      { icon: X, href: dev.twitter },
                    ].map(({ icon: Icon, href }, i) =>
                      href ? (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-violet-400 transition-all border border-white/5 hover:border-violet-500/20">
                          <Icon className="w-3.5 h-3.5" />
                        </a>
                      ) : null
                    )}
                  </div>

                  {/* View Profile — pinned to bottom */}
                  <Link
                    href={`/team/${dev._id}`}
                    className="mt-auto flex items-center justify-center gap-1.5 w-full text-xs font-semibold text-violet-400 border border-violet-500/20 hover:bg-violet-600/10 hover:border-violet-500/40 px-3 py-2.5 rounded-xl transition-all group/btn"
                  >
                    View Profile
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}

            {!loading && developers.length === 0 && (
              <p className="text-slate-500 text-sm col-span-2 text-center py-8">No team members found.</p>
            )}
          </div>

          {/* Right CTA panel — desktop only */}
          <div className="hidden lg:flex lg:w-52 xl:w-60 glass-card rounded-2xl border border-white/5 p-5 flex-col gap-4 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-violet-600/15 flex items-center justify-center">
              <Users className="w-4.5 h-4.5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Meet the full team</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Verify your email to explore everyone on our team.
              </p>
            </div>
            <Link href="/team" className="btn-primary w-full justify-center text-xs py-2.5 mt-auto">
              <Users className="w-3.5 h-3.5" />
              View All Developers
            </Link>
          </div>

        </div>

        {/* Mobile: button below */}
        <div className="mt-6 lg:hidden text-center">
          <Link href="/team" className="btn-primary justify-center mx-auto w-fit text-sm">
            <Users className="w-4 h-4" />
            View All Developers
          </Link>
        </div>
      </div>
    </section>
  );
}
