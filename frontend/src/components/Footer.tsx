import Link from "next/link";
import { Zap, Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-space-950 border-t border-violet-600/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      <div className="absolute -top-40 left-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />
      <div className="absolute -top-40 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">Idea</span>
                <span className="text-white">Sprit</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Transforming ideas into stunning digital realities. We build modern websites and web applications that drive results.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/#services" },
                { label: "Projects", href: "/projects" },
                { label: "Our Team", href: "/#team" },
                { label: "Contact Us", href: "/#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-violet-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-violet-500/40 group-hover:bg-violet-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Services</h3>
            <ul className="space-y-2.5">
              {[
                "Website Development",
                "Web App Development",
                "UI/UX Design",
                "Mobile Apps",
                "Maintenance & Support",
              ].map((s) => (
                <li key={s}>
                  <span className="text-slate-400 hover:text-violet-400 text-sm cursor-pointer transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                <a href="mailto:contact.ideasprit@gmail.com" className="hover:text-violet-400 transition-colors">
                  contact.ideasprit@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <a href="tel:+919540409089" className="hover:text-cyan-400 transition-colors">
                  +91 95404 09089
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>Bangalore, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} IdeaSprit. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link key={item} href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
