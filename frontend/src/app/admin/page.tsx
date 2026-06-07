"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  MessageSquare,
  Mail,
  ArrowLeft,
  TrendingUp,
  Eye,
  Trash2,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import { isAuthenticated, clearToken } from "@/lib/auth";
import type { Developer, Project, Testimonial, Contact } from "@/types";

type TabType = "overview" | "developers" | "projects" | "testimonials" | "contacts";

const statusConfig = {
  new: { label: "New", color: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20", icon: AlertCircle },
  in_progress: { label: "In Progress", color: "bg-gold-500/10 text-gold-400 border border-gold-500/20", icon: Clock },
  done: { label: "Done", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", icon: CheckCircle },
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [devs, projs, testi, conts] = await Promise.all([
        api.developers.list(),
        api.projects.list(),
        api.testimonials.list(),
        api.contacts.list(),
      ]);
      setDevelopers(devs);
      setProjects(projs);
      setTestimonials(testi);
      setContacts(conts);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin/login");
      return;
    }
    fetchAll();
  }, [fetchAll, router]);

  async function deleteDeveloper(id: string) {
    if (!confirm("Remove this developer?")) return;
    await api.developers.delete(id);
    setDevelopers((prev) => prev.filter((d) => d._id !== id));
  }

  async function deleteProject(id: string) {
    if (!confirm("Remove this project?")) return;
    await api.projects.delete(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Remove this testimonial?")) return;
    await api.testimonials.delete(id);
    setTestimonials((prev) => prev.filter((t) => t._id !== id));
  }

  function handleLogout() {
    clearToken();
    router.replace("/");
  }

  async function deleteContact(id: string) {
    if (!confirm("Delete this contact request?")) return;
    await api.contacts.delete(id);
    setContacts((prev) => prev.filter((c) => c._id !== id));
  }

  async function updateContactStatus(id: string, status: string) {
    const updated = await api.contacts.updateStatus(id, status);
    setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
  }

  const newContacts = contacts.filter((c) => c.status === "new");

  const stats = [
    { label: "Total Developers", value: developers.length, icon: Users, color: "violet", change: "from database" },
    { label: "Active Projects", value: projects.length, icon: FolderOpen, color: "cyan", change: "from database" },
    { label: "Testimonials", value: testimonials.length, icon: MessageSquare, color: "gold", change: "from database" },
    { label: "New Contacts", value: newContacts.length, icon: Mail, color: "green", change: `${newContacts.length} unread` },
  ];

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: LayoutDashboard },
    { id: "developers" as TabType, label: "Developers", icon: Users },
    { id: "projects" as TabType, label: "Projects", icon: FolderOpen },
    { id: "testimonials" as TabType, label: "Testimonials", icon: MessageSquare },
    { id: "contacts" as TabType, label: "Contact Requests", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-space-950 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 glass border-r border-violet-600/10 flex flex-col fixed top-0 bottom-0 left-0 z-20">
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-base font-bold">
                <span className="gradient-text">Idea</span>
                <span className="text-white">Sprit</span>
              </span>
              <p className="text-xs text-slate-500 -mt-0.5">Admin Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                activeTab === tab.id
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"}`} />
              {tab.label}
              {tab.id === "contacts" && newContacts.length > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">
                  {newContacts.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white capitalize">
              {activeTab === "overview" ? "Dashboard Overview" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-xs text-slate-500">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white/5 border border-white/8 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/40 w-48"
              />
            </div>
            <button className="relative w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              {newContacts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
              )}
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-slate-400 text-sm">Loading data from database...</div>
            </div>
          ) : (
            <>
              {/* Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                      <div key={stat.label} className="glass-card rounded-2xl p-5 border border-white/5">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            stat.color === "violet" ? "bg-violet-600/15 text-violet-400" :
                            stat.color === "cyan" ? "bg-cyan-500/15 text-cyan-400" :
                            stat.color === "gold" ? "bg-gold-500/15 text-gold-400" :
                            "bg-emerald-500/15 text-emerald-400"
                          }`}>
                            <stat.icon className="w-5 h-5" />
                          </div>
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-slate-400 text-sm">{stat.label}</div>
                        <div className="text-emerald-400 text-xs mt-1">{stat.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent contacts */}
                  <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-white/5">
                      <h2 className="text-white font-bold">Recent Contact Requests</h2>
                      <button onClick={() => setActiveTab("contacts")} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.slice(0, 4).map((contact) => {
                            const s = statusConfig[contact.status as keyof typeof statusConfig];
                            return (
                              <tr key={contact._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                <td className="px-5 py-3">
                                  <div className="text-white text-sm font-medium">{contact.name}</div>
                                  <div className="text-slate-500 text-xs">{contact.email}</div>
                                </td>
                                <td className="px-5 py-3 text-slate-400 text-sm">{contact.company || "—"}</td>
                                <td className="px-5 py-3">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.color}`}>
                                    <s.icon className="w-3 h-3" />
                                    {s.label}
                                  </span>
                                </td>
                                <td className="px-5 py-3 text-slate-500 text-xs">
                                  {new Date(contact.createdAt).toLocaleDateString("en-IN")}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Developers Tab */}
              {activeTab === "developers" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-sm">{developers.length} developers</p>
                    <button className="btn-primary text-sm py-2 px-4">
                      <Plus className="w-4 h-4" />
                      Add Developer
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {developers.map((dev) => (
                      <div key={dev._id} className="glass-card rounded-2xl p-5 border border-white/5 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-violet-500/20">
                            <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm truncate">{dev.name}</h3>
                            <p className="text-violet-400 text-xs truncate">{dev.role}</p>
                          </div>
                          <span className="text-xs text-slate-500 shrink-0">{dev.experience}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {dev.skills.slice(0, 3).map((s) => (
                            <span key={s} className="px-2 py-0.5 text-xs bg-space-700 text-slate-300 rounded-md">{s}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/team/${dev._id}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-violet-400 border border-violet-500/20 hover:bg-violet-600/10 transition-all">
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </Link>
                          <button
                            onClick={() => deleteDeveloper(dev._id)}
                            className="w-9 h-9 rounded-xl border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-sm">{projects.length} projects</p>
                    <button className="btn-primary text-sm py-2 px-4">
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>
                  <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Project</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Featured</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((proj) => (
                          <tr key={proj._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                            <td className="px-5 py-4">
                              <div className="text-white font-medium text-sm">{proj.title}</div>
                              <div className="text-slate-500 text-xs mt-0.5 truncate max-w-xs">{proj.description.slice(0, 60)}...</div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="px-2.5 py-1 text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                                {proj.category}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {proj.featured ? (
                                <span className="flex items-center gap-1.5 text-xs text-gold-400">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Featured
                                </span>
                              ) : (
                                <span className="text-xs text-slate-600">—</span>
                              )}
                            </td>
                            <td className="px-5 py-4">
                              <button
                                onClick={() => deleteProject(proj._id)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Testimonials Tab */}
              {activeTab === "testimonials" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-sm">{testimonials.length} testimonials</p>
                    <button className="btn-primary text-sm py-2 px-4">
                      <Plus className="w-4 h-4" />
                      Add Testimonial
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((t) => (
                      <div key={t._id} className="glass-card rounded-2xl p-5 border border-white/5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img src={t.image} alt={t.name} className="w-9 h-9 rounded-xl" />
                            <div>
                              <div className="text-white font-semibold text-sm">{t.name}</div>
                              <div className="text-slate-500 text-xs">{t.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <span key={i} className="text-gold-400 text-xs">★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed italic mb-3">
                          &ldquo;{t.review.slice(0, 120)}...&rdquo;
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => deleteTestimonial(t._id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contacts Tab */}
              {activeTab === "contacts" && (
                <div className="space-y-5">
                  <p className="text-slate-400 text-sm">{contacts.length} requests</p>
                  <div className="space-y-4">
                    {contacts.map((contact) => {
                      const s = statusConfig[contact.status as keyof typeof statusConfig];
                      return (
                        <div key={contact._id} className="glass-card rounded-2xl p-5 border border-white/5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400 font-bold text-sm shrink-0">
                                {contact.name.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-white font-semibold text-sm">{contact.name}</h3>
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${s.color}`}>
                                    <s.icon className="w-3 h-3" />
                                    {s.label}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                  <span>{contact.email}</span>
                                  {contact.company && <><span>•</span><span>{contact.company}</span></>}
                                  <span>•</span>
                                  <span>{new Date(contact.createdAt).toLocaleDateString("en-IN")}</span>
                                </div>
                                <p className="text-slate-400 text-sm">{contact.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {contact.status !== "in_progress" && (
                                <button
                                  onClick={() => updateContactStatus(contact._id, "in_progress")}
                                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gold-400 border border-gold-500/20 hover:bg-gold-500/10 transition-all"
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                  In Progress
                                </button>
                              )}
                              {contact.status !== "done" && (
                                <button
                                  onClick={() => updateContactStatus(contact._id, "done")}
                                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 transition-all"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Done
                                </button>
                              )}
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-violet-400 border border-violet-500/20 hover:bg-violet-600/10 transition-all"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                Reply
                              </a>
                              <button
                                onClick={() => deleteContact(contact._id)}
                                className="w-8 h-8 rounded-xl border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
