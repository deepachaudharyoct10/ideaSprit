"use client";

import { useState } from "react";
import { X, Star, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Testimonial } from "@/types";

interface Props {
  onClose: () => void;
  onAdded: (testimonial: Testimonial) => void;
}

const empty = {
  name: "",
  role: "",
  company: "",
  image: "",
  rating: 5,
  review: "",
};

export default function AddTestimonialModal({ onClose, onAdded }: Props) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof typeof empty>(field: K, value: (typeof empty)[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const testimonial = await api.testimonials.create(form as Omit<Testimonial, "_id">);
      onAdded(testimonial);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add testimonial");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col glass-card rounded-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
          <div>
            <h2 className="text-white font-bold text-lg">Add Testimonial</h2>
            <p className="text-slate-500 text-xs mt-0.5">Fields marked with * are required</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5">

          {/* Name + Role */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Client Name *">
              <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Rohan Mehta" className={input} />
            </Field>
            <Field label="Role / Title *">
              <input required value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="CEO, TechVentures" className={input} />
            </Field>
          </div>

          {/* Company + Image */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company *">
              <input required value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="TechVentures" className={input} />
            </Field>
            <Field label="Photo URL *">
              <input required value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." className={input} />
            </Field>
          </div>

          {/* Rating */}
          <Field label="Rating *">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => set("rating", star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= form.rating ? "text-gold-400 fill-gold-400" : "text-slate-600"
                    }`}
                  />
                </button>
              ))}
              <span className="text-slate-400 text-sm ml-1">{form.rating}/5</span>
            </div>
          </Field>

          {/* Review */}
          <Field label="Review *">
            <textarea
              required
              rows={4}
              value={form.review}
              onChange={(e) => set("review", e.target.value)}
              placeholder="What did the client say about working with IdeaSprit?"
              className={`${input} resize-none`}
            />
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
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Add Testimonial"}
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
