"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import type { Developer } from "@/types";
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Briefcase,
  Mail,
  ShieldCheck,
  CheckCircle,
  RefreshCw,
  Zap,
  Users,
} from "lucide-react";

type Step = "email" | "otp" | "verified";

const SESSION_KEY = "ideasprit_team_verified";

export default function TeamPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState("");
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [devLoading, setDevLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check session — skip OTP if already verified this session
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1") {
      setStep("verified");
      loadDevelopers();
    }
  }, []);

  async function loadDevelopers() {
    setDevLoading(true);
    try {
      const devs = await api.developers.list();
      setDevelopers(devs);
    } catch {
      setError("Failed to load developers.");
    } finally {
      setDevLoading(false);
    }
  }

  async function handleSendOtp() {
    if (!email) return;
    setError("");
    setOtpLoading(true);
    try {
      const res = await fetch("/api/contact/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to send OTP");
      setStep("otp");
      setOtp("");
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send OTP");
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleVerify() {
    if (otp.replace(/\s/g, "").length < 6) return;
    setError("");
    setVerifyLoading(true);
    try {
      const res = await fetch("/api/team/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Invalid OTP");
      sessionStorage.setItem(SESSION_KEY, "1");
      setStep("verified");
      loadDevelopers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setVerifyLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    const chars = otp.padEnd(6, " ").split("");
    chars[index] = char || " ";
    const combined = chars.join("").trimEnd();
    setOtp(combined);
    if (char && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (otp[index] && otp[index] !== " ") {
        const chars = otp.padEnd(6, " ").split("");
        chars[index] = " ";
        setOtp(chars.join("").trimEnd());
      } else if (index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "Enter" && otp.replace(/\s/g, "").length === 6) handleVerify();
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length) {
      setOtp(pasted);
      otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  }

  const otpComplete = otp.replace(/\s/g, "").length === 6;

  return (
    <main className="min-h-screen bg-space-900">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/8 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-badge mb-4 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            The People Behind the Magic
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Meet Our <span className="gradient-text">Full Team</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A talented group of developers and designers passionate about building exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* Gate / Developers */}
      <section className="relative pb-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── STEP: email ── */}
          {step === "email" && (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="w-full max-w-md">
                <div className="glass-card rounded-2xl p-8 border border-white/5">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-violet-600/15 flex items-center justify-center mx-auto mb-5">
                    <Users className="w-7 h-7 text-violet-400" />
                  </div>
                  <h2 className="text-white font-bold text-xl text-center mb-2">Verify to View Team</h2>
                  <p className="text-slate-400 text-sm text-center mb-7 leading-relaxed">
                    Enter your email address — we&apos;ll send a one-time password to unlock the full team directory.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(""); }}
                          onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/8 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm px-1">{error}</p>
                    )}

                    <button
                      onClick={handleSendOtp}
                      disabled={!email || otpLoading}
                      className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {otpLoading ? (
                        <><RefreshCw className="w-4 h-4 animate-spin" /> Sending OTP...</>
                      ) : (
                        <>Send OTP <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP: otp ── */}
          {step === "otp" && (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="w-full max-w-md">
                <div className="glass-card rounded-2xl p-8 border border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-violet-600/15 flex items-center justify-center mx-auto mb-5">
                    <ShieldCheck className="w-7 h-7 text-violet-400" />
                  </div>
                  <h2 className="text-white font-bold text-xl text-center mb-2">Check Your Email</h2>
                  <p className="text-slate-400 text-sm text-center mb-2 leading-relaxed">
                    We sent a 6-digit OTP to
                  </p>
                  <p className="text-violet-400 text-sm font-semibold text-center mb-7">{email}</p>

                  {/* 6-box OTP */}
                  <div className="flex gap-2.5 justify-center mb-6" onPaste={handleOtpPaste}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[i] && otp[i] !== " " ? otp[i] : ""}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className={`w-12 h-13 text-center text-xl font-bold rounded-xl border transition-all outline-none bg-white/5 text-white
                          ${otp[i] && otp[i] !== " "
                            ? "border-violet-500 bg-violet-600/15"
                            : "border-white/10 focus:border-violet-500/60"
                          }`}
                        style={{ height: "52px" }}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center mb-4">{error}</p>
                  )}

                  <button
                    onClick={handleVerify}
                    disabled={!otpComplete || verifyLoading}
                    className="btn-primary w-full justify-center py-3 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {verifyLoading ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> Verifying...</>
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Verify & View Team</>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-sm">
                    <button
                      onClick={() => { setStep("email"); setError(""); setOtp(""); }}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      ← Change email
                    </button>
                    <button
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                      className="text-slate-500 hover:text-violet-400 transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${otpLoading ? "animate-spin" : ""}`} />
                      Resend OTP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP: verified — show all developers ── */}
          {step === "verified" && (
            <>
              {devLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="glass-card rounded-2xl border border-white/5 p-6 animate-pulse">
                      <div className="w-20 h-20 rounded-2xl bg-white/5 mx-auto mb-4" />
                      <div className="h-4 bg-white/5 rounded mx-auto w-3/4 mb-2" />
                      <div className="h-3 bg-white/5 rounded mx-auto w-1/2" />
                    </div>
                  ))}
                </div>
              )}

              {!devLoading && developers.length === 0 && (
                <p className="text-center text-slate-500 py-24">No team members found.</p>
              )}

              {!devLoading && developers.length > 0 && (
                <>
                  {/* Verified badge */}
                  <div className="flex items-center justify-center gap-2 mb-10 text-emerald-400 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Email verified — showing all {developers.length} developers
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {developers.map((dev, index) => (
                      <div
                        key={dev._id}
                        className="group relative glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition-all"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="h-1 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 bg-[length:200%_100%] group-hover:animate-gradient-x" />

                        <div className="p-6">
                          <div className="relative mx-auto w-20 h-20 mb-4">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-violet-500/30">
                              <Image src={dev.image} alt={dev.name} fill className="object-cover" unoptimized />
                            </div>
                          </div>

                          <div className="text-center mb-4">
                            <h3 className="text-white font-bold text-base mb-1">{dev.name}</h3>
                            <p className="text-violet-400 text-xs font-medium mb-2">{dev.role}</p>
                            <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs">
                              <Briefcase className="w-3 h-3" />
                              <span>{dev.experience} experience</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                            {dev.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="skill-tag text-xs">{skill}</span>
                            ))}
                            {dev.skills.length > 3 && (
                              <span className="skill-tag text-xs opacity-60">+{dev.skills.length - 3}</span>
                            )}
                          </div>

                          <div className="flex items-center justify-center gap-2 mb-4">
                            {[
                              { icon: Github, href: dev.github },
                              { icon: Linkedin, href: dev.linkedin },
                              { icon: Twitter, href: dev.twitter },
                            ].map(({ icon: Icon, href }, i) =>
                              href ? (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-violet-400 transition-all">
                                  <Icon className="w-3.5 h-3.5" />
                                </a>
                              ) : null
                            )}
                          </div>

                          <Link href={`/team/${dev._id}`}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-violet-400 border border-violet-500/20 hover:bg-violet-600/10 hover:border-violet-500/40 transition-all group/btn">
                            View Profile
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Hiring CTA */}
      <section className="relative py-16 border-t border-white/5">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Want to join our team?</h3>
          <p className="text-slate-400 text-sm mb-5">
            We are always looking for talented developers and designers to grow with us.
          </p>
          <a href="mailto:idea.sprit@gmail.com"
            className="btn-primary justify-center mx-auto w-fit">
            Apply Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
