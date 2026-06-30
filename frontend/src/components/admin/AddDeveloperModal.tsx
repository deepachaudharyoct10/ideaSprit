"use client";

import { useState } from "react";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Developer } from "@/types";

interface Props {
  onClose: () => void;
  onAdded: (dev: Developer) => void;
  onUpdated?: (dev: Developer) => void;
  developer?: Developer; // when provided → edit mode
}

const empty = {
  name: "",
  role: "",
  image: "",
  bio: "",
  experience: "",
  github: "",
  linkedin: "",
  twitter: "",
  skills: [""],
  education: [{ degree: "", institution: "", year: "" }],
  achievements: [""],
  projects: [""],
};

function devToForm(d: Developer) {
  return {
    name: d.name,
    role: d.role,
    image: d.image,
    bio: d.bio,
    experience: d.experience,
    github: d.github ?? "",
    linkedin: d.linkedin ?? "",
    twitter: d.twitter ?? "",
    skills: d.skills?.length ? d.skills : [""],
    education: d.education?.length ? d.education : [{ degree: "", institution: "", year: "" }],
    achievements: d.achievements?.length ? d.achievements : [""],
    projects: d.projects?.length ? d.projects : [""],
  };
}

export default function AddDeveloperModal({ onClose, onAdded, onUpdated, developer }: Props) {
  const isEdit = !!developer;
  const [form, setForm] = useState(isEdit ? devToForm(developer) : empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ── scalar fields ──────────────────────────────────────────────
  function set(field: keyof typeof empty, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // ── array of strings ──────────────────────────────────────────
  function setArr(field: "skills" | "achievements" | "projects", i: number, value: string) {
    setForm((f) => {
      const arr = [...(f[field] as string[])];
      arr[i] = value;
      return { ...f, [field]: arr };
    });
  }
  function addArr(field: "skills" | "achievements" | "projects") {
    setForm((f) => ({ ...f, [field]: [...(f[field] as string[]), ""] }));
  }
  function removeArr(field: "skills" | "achievements" | "projects", i: number) {
    setForm((f) => {
      const arr = (f[field] as string[]).filter((_, idx) => idx !== i);
      return { ...f, [field]: arr.length ? arr : [""] };
    });
  }

  // ── education rows ────────────────────────────────────────────
  function setEdu(i: number, key: "degree" | "institution" | "year", value: string) {
    setForm((f) => {
      const edu = f.education.map((e, idx) => (idx === i ? { ...e, [key]: value } : e));
      return { ...f, education: edu };
    });
  }
  function addEdu() {
    setForm((f) => ({ ...f, education: [...f.education, { degree: "", institution: "", year: "" }] }));
  }
  function removeEdu(i: number) {
    setForm((f) => {
      const edu = f.education.filter((_, idx) => idx !== i);
      return { ...f, education: edu.length ? edu : [{ degree: "", institution: "", year: "" }] };
    });
  }

  // ── submit ────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        skills: form.skills.filter(Boolean),
        achievements: form.achievements.filter(Boolean),
        projects: form.projects.filter(Boolean),
        education: form.education.filter((e) => e.degree && e.institution && e.year),
        github: form.github || undefined,
        linkedin: form.linkedin || undefined,
        twitter: form.twitter || undefined,
      };
      if (isEdit) {
        const updated = await api.developers.update(developer._id, payload);
        onUpdated?.(updated);
      } else {
        const dev = await api.developers.create(payload as Omit<Developer, "_id">);
        onAdded(dev);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Failed to ${isEdit ? "update" : "add"} developer`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col glass-card rounded-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <div>
            <h2 className="text-white font-bold text-lg">{isEdit ? "Edit Developer" : "Add Developer"}</h2>
            <p className="text-slate-500 text-xs mt-0.5">{isEdit ? `Editing: ${developer.name}` : "Fill in all required fields marked with *"}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">

          {/* Basic info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name *">
              <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Arjun Sharma" className={input} />
            </Field>
            <Field label="Role *">
              <input required value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Full Stack Developer" className={input} />
            </Field>
            <Field label="Experience *">
              <input required value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="4 years" className={input} />
            </Field>
            <Field label="Profile Image URL *">
              <input required value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." className={input} />
            </Field>
          </div>

          {/* Bio */}
          <Field label="Bio *">
            <textarea required rows={3} value={form.bio} onChange={(e) => set("bio", e.target.value)} placeholder="Short bio about the developer..." className={`${input} resize-none`} />
          </Field>

          {/* Social links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="GitHub">
              <input value={form.github} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/..." className={input} />
            </Field>
            <Field label="LinkedIn">
              <input value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/..." className={input} />
            </Field>
            <Field label="Twitter">
              <input value={form.twitter} onChange={(e) => set("twitter", e.target.value)} placeholder="https://twitter.com/..." className={input} />
            </Field>
          </div>

          {/* Skills */}
          <Field label="Skills *">
            <div className="space-y-2">
              {form.skills.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input value={s} onChange={(e) => setArr("skills", i, e.target.value)} placeholder="e.g. React" className={`${input} flex-1`} />
                  <button type="button" onClick={() => removeArr("skills", i)} className="w-9 h-9 rounded-lg border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArr("skills")} className={addBtn}>
                <Plus className="w-3.5 h-3.5" /> Add Skill
              </button>
            </div>
          </Field>

          {/* Education */}
          <Field label="Education">
            <div className="space-y-3">
              {form.education.map((edu, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">Education {i + 1}</span>
                    <button type="button" onClick={() => removeEdu(i)} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <input value={edu.degree} onChange={(e) => setEdu(i, "degree", e.target.value)} placeholder="Degree *" className={input} />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={edu.institution} onChange={(e) => setEdu(i, "institution", e.target.value)} placeholder="Institution *" className={input} />
                    <input value={edu.year} onChange={(e) => setEdu(i, "year", e.target.value)} placeholder="Year (e.g. 2020) *" className={input} />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addEdu} className={addBtn}>
                <Plus className="w-3.5 h-3.5" /> Add Education
              </button>
            </div>
          </Field>

          {/* Achievements */}
          <Field label="Achievements">
            <div className="space-y-2">
              {form.achievements.map((a, i) => (
                <div key={i} className="flex gap-2">
                  <input value={a} onChange={(e) => setArr("achievements", i, e.target.value)} placeholder="e.g. AWS Certified" className={`${input} flex-1`} />
                  <button type="button" onClick={() => removeArr("achievements", i)} className="w-9 h-9 rounded-lg border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArr("achievements")} className={addBtn}>
                <Plus className="w-3.5 h-3.5" /> Add Achievement
              </button>
            </div>
          </Field>

          {/* Projects */}
          <Field label="Notable Projects">
            <div className="space-y-2">
              {form.projects.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input value={p} onChange={(e) => setArr("projects", i, e.target.value)} placeholder="e.g. E-Commerce Platform" className={`${input} flex-1`} />
                  <button type="button" onClick={() => removeArr("projects", i)} className="w-9 h-9 rounded-lg border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addArr("projects")} className={addBtn}>
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>
          </Field>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/5 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white glass border border-white/8 hover:border-white/15 transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : isEdit ? "Save Changes" : "Add Developer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      {children}
    </div>
  );
}

const input = "w-full px-3.5 py-2.5 bg-white/5 border border-white/8 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all";
const addBtn = "flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors py-1";
