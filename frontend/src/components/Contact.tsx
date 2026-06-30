"use client";

import { useState, useRef } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle, ShieldCheck, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  description: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  description: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Reset OTP if email changes
    if (name === "email") {
      setOtpSent(false);
      setOtp("");
    }
  };

  const handleSendOtp = async () => {
    if (!form.email) return;
    setOtpLoading(true);
    try {
      const res = await fetch("/api/contact/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to send OTP");
      setOtpSent(true);
      setOtp("");
      toast.success(`OTP sent to ${form.email}`);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const chars = otp.padEnd(6, " ").split("");
    chars[index] = char || " ";
    const combined = chars.join("").trimEnd();
    setOtp(combined);
    if (char && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const chars = otp.padEnd(6, " ").split("");
        chars[index] = " ";
        setOtp(chars.join("").trimEnd());
      } else if (index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length) {
      setOtp(pasted);
      otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!otpSent || otp.length < 6) {
      toast.error("Please verify your email with the OTP first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to send");
      setSubmitted(true);
      setForm(initialForm);
      setOtp("");
      setOtpSent(false);
      toast.success("Message sent! We'll get back to you soon.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = otpSent && otp.replace(/\s/g, "").length === 6 && !loading;

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-space-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-violet-600/6 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Let&apos;s Build{" "}
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Have a project in mind? We&apos;d love to hear about it. Send us a message and we&apos;ll get back within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: Mail,
                label: "Email Us",
                value: "contact.ideasprit@gmail.com",
                sub: "We reply within 24 hours",
                color: "violet",
              },
              {
                icon: Phone,
                label: "Call Us",
                value: "+91 95404 09089",
                sub: "Mon–Fri, 9am–6pm IST",
                color: "cyan",
              },
              {
                icon: MapPin,
                label: "Visit Us",
                value: "Bangalore, India",
                sub: "HSR Layout, 560102",
                color: "gold",
              },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <div
                key={label}
                className="flex items-start gap-4 glass-card p-5 rounded-2xl border border-white/5 group hover:border-violet-500/20"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    color === "violet"
                      ? "bg-violet-600/15 text-violet-400"
                      : color === "cyan"
                      ? "bg-cyan-500/15 text-cyan-400"
                      : "bg-gold-500/15 text-gold-400"
                  } group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white font-semibold text-sm">{value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}

            {/* Availability */}
            <div className="glass-card p-5 rounded-2xl border border-violet-500/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-white font-semibold text-sm">Currently Available</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                We&apos;re accepting new projects. Average project kickoff:{" "}
                <span className="text-violet-400 font-medium">within 1 week</span>.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full glass-card rounded-2xl border border-emerald-500/20 flex flex-col items-center justify-center p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 mb-6">
                  Thank you for reaching out. We&apos;ll review your project and get back to you within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl border border-white/5 p-8 space-y-5"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Full Name <span className="text-violet-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Email Address <span className="text-violet-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="rahul@company.com"
                        className="input-field flex-1 min-w-0"
                        required
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!form.email || otpLoading}
                        className={`shrink-0 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                          otpSent
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 cursor-default"
                            : "bg-violet-600/15 border-violet-500/30 text-violet-400 hover:bg-violet-600/25 disabled:opacity-40 disabled:cursor-not-allowed"
                        }`}
                      >
                        {otpLoading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : otpSent ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          "Get OTP"
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* OTP input — appears after OTP is sent */}
                {otpSent && (
                  <div className="rounded-2xl border border-violet-500/20 bg-violet-600/5 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-violet-400" />
                        <span className="text-sm font-medium text-slate-300">
                          Enter the 6-digit OTP sent to{" "}
                          <span className="text-violet-400">{form.email}</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpLoading}
                        className="text-xs text-slate-500 hover:text-violet-400 transition-colors flex items-center gap-1"
                      >
                        <RefreshCw className={`w-3 h-3 ${otpLoading ? "animate-spin" : ""}`} />
                        Resend
                      </button>
                    </div>

                    <div
                      className="flex gap-2.5 justify-center"
                      onPaste={handleOtpPaste}
                    >
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
                          className={`w-11 h-12 text-center text-lg font-bold rounded-xl border transition-all outline-none bg-white/5 text-white
                            ${otp[i] && otp[i] !== " "
                              ? "border-violet-500 bg-violet-600/15"
                              : "border-white/10 focus:border-violet-500/60"
                            }`}
                        />
                      ))}
                    </div>

                    {otp.replace(/\s/g, "").length === 6 && (
                      <p className="text-center text-xs text-emerald-400 mt-3 flex items-center justify-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        OTP entered — you can now submit
                      </p>
                    )}
                  </div>
                )}

                {/* Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 95404 09089"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company Ltd."
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Project Description <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tell us about your project — what you need, your timeline, and budget range..."
                    rows={5}
                    className="input-field resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      {!otpSent
                        ? "Verify Email to Submit"
                        : otp.replace(/\s/g, "").length < 6
                        ? "Enter OTP to Submit"
                        : "Send Message"}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  By submitting, you agree to our Privacy Policy. We never share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
