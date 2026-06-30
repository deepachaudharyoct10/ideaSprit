"use client";

import { useState } from "react";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Project } from "@/types";

interface Props {
  onClose: () => void;
  onAdded: (project: Project) => void;
  onUpdated?: (project: Project) => void;
  project?: Project; // when provided → edit mode
}

const CATEGORIES = ["Web App", "Dashboard", "Mobile App", "Website", "Other"];

const emptyForm = {
  title: "",
  description: "",
  image: "",
  category: "Web App",
  demoLink: "",
  githubLink: "",
  featured: false,
  technologies: [""],
};

function projectToForm(p: Project) {
  return {
    title: p.title,
    description: p.description,
    image: p.image,
    category: p.category,
    demoLink: p.demoLink ?? "",
    githubLink: p.githubLink ?? "",
    featured: p.featured ?? false,
    technologies: p.technologies?.length ? p.technologies : [""],
  };
}

export default function AddProjectModal({ onClose, onAdded, onUpdated, project }: Props) {
  const isEdit = !!project;
  const [form, setForm] = useState(isEdit ? projectToForm(project) : emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof typeof emptyForm>(field: K, value: (typeof emptyForm)[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function setTech(i: number, value: string) {
    setForm((f) => {
      const arr = [...f.technologies];
      arr[i] = value;
      return { ...f, technologies: arr };
    });
  }
  function addTech() {
    setForm((f) => ({ ...f, technologies: [...f.technologies, ""] }));
  }
  function removeTech(i: number) {
    setForm((f) => {
      const arr = f.technologies.filter((_, idx) => idx !== i);
      return { ...f, technologies: arr.length ? arr : [""] };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        technologies: form.technologies.filter(Boolean),
        demoLink: form.demoLink || undefined,
        githubLink: form.githubLink || undefined,
      };

      if (isEdit) {
        const updated = await api.projects.update(project._id, payload);
        onUpdated?.(updated);
      } else {
        const created = await api.projects.create(payload as Omit<Project, "_id">);
        onAdded(created);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Failed to ${isEdit ? "update" : "add"} project`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col glass-card rounded-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <div>
            <h2 className="text-white font-bold text-lg">{isEdit ? "Edit Project" : "Add Project"}</h2>
            <p className="text-slate-500 text-xs mt-0.5">
              {isEdit ? `Editing: ${project.title}` : "Fields marked with * are required"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5">

          <Field label="Project Title *">
            <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. NexaShop E-Commerce Platform" className={input} />
          </Field>

          <Field label="Description *">
            <textarea required rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Brief description of the project..." className={`${input} resize-none`} />
          </Field>

          <Field label="Cover Image URL *">
            <input required value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." className={input} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category *">
              <select required value={form.category} onChange={(e) => set("category", e.target.value)} className={`${input} cursor-pointer`}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-slate-900">{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Featured">
              <div className="flex items-center gap-3 h-[42px]">
                <button
                  type="button"
                  onClick={() => set("featured", !form.featured)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.featured ? "bg-violet-600" : "bg-white/10"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.featured ? "translate-x-5" : "translate-x-0"}`} />
                </button>
                <span className="text-sm text-slate-400">{form.featured ? "Yes" : "No"}</span>
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Demo Link">
              <input value={form.demoLink} onChange={(e) => set("demoLink", e.target.value)} placeholder="https://..." className={input} />
            </Field>
            <Field label="GitHub Link">
              <input value={form.githubLink} onChange={(e) => set("githubLink", e.target.value)} placeholder="https://github.com/..." className={input} />
            </Field>
          </div>

          <Field label="Technologies *">
            <div className="space-y-2">
              {form.technologies.map((t, i) => (
                <div key={i} className="flex gap-2">
                  <input value={t} onChange={(e) => setTech(i, e.target.value)} placeholder="e.g. React" className={`${input} flex-1`} />
                  <button type="button" onClick={() => removeTech(i)} className="w-9 h-9 rounded-lg border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addTech} className={addBtn}>
                <Plus className="w-3.5 h-3.5" /> Add Technology
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
          <button onClick={handleSubmit} disabled={saving} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60 disabled:cursor-not-allowed">
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Add Project"
            )}
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
