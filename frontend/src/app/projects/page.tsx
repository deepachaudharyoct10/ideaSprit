"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/mockData";
import { ExternalLink, Github, ArrowLeft, Filter, Sparkles } from "lucide-react";

const categories = ["All", "Web App", "Dashboard", "Mobile App", "Website"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-space-900">
      <Navbar />

      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="section-badge mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Our Portfolio
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              Project{" "}
              <span className="gradient-text">Showcase</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A collection of our best work — from SaaS platforms to mobile apps.
              Each project built with care, precision, and passion.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <Filter className="w-4 h-4 text-slate-500" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white shadow-glow-violet"
                    : "glass text-slate-400 hover:text-white border border-white/5 hover:border-violet-500/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <div
                key={project.id}
                className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/25"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-900/80 via-transparent to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/80 text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/80 text-white backdrop-blur-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    <a
                      href={project.demoLink}
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-violet-600/50 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.githubLink}
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-violet-600/50 transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium bg-space-700 text-slate-300 rounded-lg border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.demoLink}
                      className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                    <span className="text-slate-700">•</span>
                    <a
                      href={project.githubLink}
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
