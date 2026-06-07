import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import {
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  GraduationCap,
  Briefcase,
  Award,
  Code2,
  MapPin,
  Star,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DeveloperProfile({ params }: { params: { id: string } }) {
  let dev;
  try {
    dev = await api.developers.get(params.id);
  } catch {
    notFound();
  }

  const skillLevels = [85, 90, 80, 75, 88];

  return (
    <main className="min-h-screen bg-space-900">
      <Navbar />

      {/* Hero section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/8 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/#team"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Team
          </Link>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Avatar & Quick Info */}
            <div className="glass-card rounded-2xl p-8 border border-white/5 lg:w-72 shrink-0 text-center">
              {/* Avatar */}
              <div className="relative mx-auto w-28 h-28 mb-5">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 blur-xl opacity-50" />
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

              <h1 className="text-xl font-black text-white mb-1">{dev.name}</h1>
              <p className="text-violet-400 text-sm font-medium mb-3">{dev.role}</p>

              <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mb-5">
                <Briefcase className="w-3 h-3" />
                <span>{dev.experience} experience</span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                ))}
                <span className="text-xs text-slate-400 ml-1">5.0</span>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[
                  { icon: Github, href: dev.github, color: "hover:text-white" },
                  { icon: Linkedin, href: dev.linkedin, color: "hover:text-blue-400" },
                  { icon: Twitter, href: dev.twitter, color: "hover:text-sky-400" },
                ].map(({ icon: Icon, href, color }, i) =>
                  href ? (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-500 ${color} transition-all`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ) : null
                )}
              </div>

              <Link
                href="/#contact"
                className="btn-primary w-full justify-center text-sm"
              >
                Hire Me
              </Link>
            </div>

            {/* Main content */}
            <div className="flex-1 space-y-6">
              {/* Bio */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-violet-400" />
                  About
                </h2>
                <p className="text-slate-400 leading-relaxed">{dev.bio}</p>
              </div>

              {/* Skills with progress */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-cyan-400" />
                  Skills & Expertise
                </h2>
                <div className="space-y-4">
                  {dev.skills.map((skill, i) => (
                    <div key={skill}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-300 text-sm font-medium">{skill}</span>
                        <span className="text-slate-500 text-xs">{skillLevels[i % skillLevels.length]}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${skillLevels[i % skillLevels.length]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {dev.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Education */}
              {dev.education.length > 0 && (
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-gold-400" />
                    Education
                  </h2>
                  {dev.education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{edu.degree}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="text-slate-400 text-xs">{edu.institution}</span>
                          <span className="text-slate-600 text-xs">•</span>
                          <span className="text-slate-500 text-xs">{edu.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements */}
              {dev.achievements.length > 0 && (
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-violet-400" />
                    Achievements & Certifications
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dev.achievements.map((ach, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl bg-violet-600/5 border border-violet-500/10"
                      >
                        <div className="w-6 h-6 rounded-lg bg-violet-600/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Award className="w-3.5 h-3.5 text-violet-400" />
                        </div>
                        <span className="text-slate-300 text-sm">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {dev.projects.length > 0 && (
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-cyan-400" />
                    Notable Projects
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {dev.projects.map((proj) => (
                      <span
                        key={proj}
                        className="px-4 py-2 glass rounded-xl text-sm text-slate-300 border border-white/5 hover:border-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
