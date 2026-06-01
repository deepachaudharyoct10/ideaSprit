"use client";

import { useState } from "react";
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
import { developers, projects, testimonials } from "@/data/mockData";

type TabType = "overview" | "developers" | "projects" | "testimonials" | "contacts";

const mockContacts = [
  { id: "1", name: "Amit Kumar", email: "amit@startup.com", company: "TechStart", status: "new", date: "2024-01-15", description: "Need a full e-commerce platform with admin panel." },
  { id: "2", name: "Priya Joshi", email: "priya@agency.in", company: "Creative Agency", status: "in_progress", date: "2024-01-14", description: "Looking for UI/UX redesign of existing web app." },
  { id: "3", name: "Sanjay Gupta", email: "sanjay@corp.com", company: "CorpSolutions", status: "done", date: "2024-01-12", description: "Enterprise dashboard development." },
  { id: "4", name: "Neha Reddy", email: "neha@startup.io", company: "HealthTech", status: "new", date: "2024-01-10", description: "Mobile app for healthcare platform." },
];

const stats = [
  { label: "Total Developers", value: developers.length, icon: Users, color: "violet", change: "+2 this month" },
  { label: "Active Projects", value: projects.length, icon: FolderOpen, color: "cyan", change: "+3 this month" },
  { label: "Testimonials", value: testimonials.length, icon: MessageSquare, color: "gold", change: "+1 this week" },
  { label: "New Contacts", value: mockContacts.filter(c => c.status === "new").length, icon: Mail, color: "green", change: "2 unread" },
];

const statusConfig = {
  new: { label: "New", color: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20", icon: AlertCircle },
  in_progress: { label: "In Progress", color: "bg-gold-500/10 text-gold-400 border border-gold-500/20", icon: Clock },
  done: { label: "Done", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", icon: CheckCircle },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");

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
              {tab.id === "contacts" && mockContacts.filter(c => c.status === "new").length > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">
                  {mockContacts.filter(c => c.status === "new").length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
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
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-6">
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
                      {mockContacts.slice(0, 4).map((contact) => {
                        const s = statusConfig[contact.status as keyof typeof statusConfig];
                        return (
                          <tr key={contact.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                            <td className="px-5 py-3">
                              <div className="text-white text-sm font-medium">{contact.name}</div>
                              <div className="text-slate-500 text-xs">{contact.email}</div>
                            </td>
                            <td className="px-5 py-3 text-slate-400 text-sm">{contact.company}</td>
                            <td className="px-5 py-3">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.color}`}>
                                <s.icon className="w-3 h-3" />
                                {s.label}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-slate-500 text-xs">{contact.date}</td>
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
                  <div key={dev.id} className="glass-card rounded-2xl p-5 border border-white/5 group">
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
                      <Link href={`/team/${dev.id}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-violet-400 border border-violet-500/20 hover:bg-violet-600/10 transition-all">
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                      <button className="w-9 h-9 rounded-xl border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all">
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
                      <tr key={proj.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
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
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-400 hover:bg-violet-600/10 transition-all">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
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
                  <div key={t.id} className="glass-card rounded-2xl p-5 border border-white/5">
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
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-400 hover:bg-violet-600/10 transition-all">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
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
              <p className="text-slate-400 text-sm">{mockContacts.length} requests</p>
              <div className="space-y-4">
                {mockContacts.map((contact) => {
                  const s = statusConfig[contact.status as keyof typeof statusConfig];
                  return (
                    <div key={contact.id} className="glass-card rounded-2xl p-5 border border-white/5">
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
                              <span>•</span>
                              <span>{contact.company}</span>
                              <span>•</span>
                              <span>{contact.date}</span>
                            </div>
                            <p className="text-slate-400 text-sm">{contact.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-violet-400 border border-violet-500/20 hover:bg-violet-600/10 transition-all">
                            <Mail className="w-3.5 h-3.5" />
                            Reply
                          </button>
                          <button className="w-8 h-8 rounded-xl border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all">
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
        </div>
      </main>
    </div>
  );
}
