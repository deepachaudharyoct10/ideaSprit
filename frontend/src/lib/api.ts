import type { Developer, Project, Testimonial, Contact } from "@/types";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "API error");
  return data.data as T;
}

export const api = {
  developers: {
    list: () => apiFetch<Developer[]>("/api/developers"),
    get: (id: string) => apiFetch<Developer>(`/api/developers/${id}`),
    create: (body: Omit<Developer, "_id">) =>
      apiFetch<Developer>("/api/developers", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    delete: (id: string) =>
      apiFetch<void>(`/api/developers/${id}`, { method: "DELETE" }),
  },
  projects: {
    list: (category?: string) =>
      apiFetch<Project[]>(
        `/api/projects${category && category !== "All" ? `?category=${encodeURIComponent(category)}` : ""}`
      ),
    create: (body: Omit<Project, "_id">) =>
      apiFetch<Project>("/api/projects", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    delete: (id: string) =>
      apiFetch<void>(`/api/projects/${id}`, { method: "DELETE" }),
  },
  testimonials: {
    list: () => apiFetch<Testimonial[]>("/api/testimonials"),
    create: (body: Omit<Testimonial, "_id">) =>
      apiFetch<Testimonial>("/api/testimonials", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    delete: (id: string) =>
      apiFetch<void>(`/api/testimonials/${id}`, { method: "DELETE" }),
  },
  contacts: {
    list: () => apiFetch<Contact[]>("/api/contact"),
    updateStatus: (id: string, status: string) =>
      apiFetch<Contact>(`/api/contact/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    delete: (id: string) =>
      apiFetch<void>(`/api/contact/${id}`, { method: "DELETE" }),
  },
};
