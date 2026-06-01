---
name: IdeaSprit Project
description: Full-stack startup website for IdeaSprit – Next.js frontend + Express backend + MongoDB
type: project
---

Full-stack startup website for IdeaSprit built with:
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer-style custom animations
- **Backend**: Node.js, Express.js, TypeScript, MongoDB (Mongoose)
- **Deployment**: Vercel (frontend), Render/AWS (backend)

**Why:** Per requirements PDF – professional agency site with team showcase, project portfolio, contact form, and admin dashboard.

**Structure:**
- `frontend/` – Next.js app at `src/app/`; mock data in `src/data/mockData.ts`
- `backend/` – Express API at `src/index.ts`; models in `src/models/`; routes in `src/routes/`
- `.gitignore` – covers node_modules, .env, .next, dist, build, logs

**Pages:** `/` (home), `/projects`, `/team/[id]`, `/admin`

**Key design choices:** Deep space dark theme (#0a0a0f), violet+cyan+gold accent palette, glassmorphism cards, gradient text, animated hero, marquee clients section.

**How to apply:** When asked to extend this project, follow the existing glass-card / gradient-text design language. Backend uses soft deletes (isActive: false). Contact form sends dual emails (admin + client confirmation).
