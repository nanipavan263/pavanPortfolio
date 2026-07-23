"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, Mail, Phone, MapPin, Instagram, Sparkles } from "lucide-react";
import portfolioData from "@/content/portfolio.json";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgyaekj";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `New portfolio inquiry: ${data.subject}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed");
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full glass border-[#fffdec]/10 text-xs font-mono text-[#e1e440] mb-3"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#fffdec] mb-4"
          >
            Let&apos;s Create Something <span className="text-gradient-accent">Extraordinary</span>
          </motion.h2>
          <p className="text-[#fffdec]/60 text-base font-inter max-w-xl">
            Have a brand campaign, commercial ad, or graphic design project in mind? Reach out and let&apos;s build magic together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-strong rounded-3xl p-8 border-[#fffdec]/15 space-y-6">
              <h3 className="font-space text-2xl font-bold text-[#fffdec] mb-6">Contact Details</h3>

              <a
                href={`mailto:${portfolioData.socials.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#fffdec]/5 hover:bg-[#fffdec]/10 transition-colors group border border-[#fffdec]/5"
              >
                <div className="p-3 rounded-xl bg-[#e1e440]/10 text-[#e1e440] border border-[#e1e440]/20 group-hover:bg-[#e1e440] group-hover:text-[#070d0c] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#fffdec]/40 font-mono">Direct Email</p>
                  <p className="text-sm font-space font-semibold text-[#fffdec] group-hover:text-[#e1e440] transition-colors">
                    {portfolioData.socials.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${portfolioData.socials.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#fffdec]/5 hover:bg-[#fffdec]/10 transition-colors group border border-[#fffdec]/5"
              >
                <div className="p-3 rounded-xl bg-[#186e4f]/10 text-[#186e4f] border border-[#186e4f]/20 group-hover:bg-[#186e4f] group-hover:text-[#fffdec] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#fffdec]/40 font-mono">Phone & WhatsApp</p>
                  <p className="text-sm font-space font-semibold text-[#fffdec] group-hover:text-[#186e4f] transition-colors">
                    {portfolioData.socials.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#fffdec]/5 border border-[#fffdec]/5">
                <div className="p-3 rounded-xl bg-[#fffdec]/10 text-[#fffdec] border border-[#fffdec]/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#fffdec]/40 font-mono">Location Base</p>
                  <p className="text-sm font-space font-semibold text-[#fffdec]">
                    {portfolioData.socials.location}
                  </p>
                </div>
              </div>

              <a
                href={portfolioData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl glass hover:bg-[#fffdec]/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-[#e1e440]" />
                  <span className="text-sm font-space font-bold text-[#fffdec]">@pavannanifx</span>
                </div>
                <span className="text-xs font-mono text-[#e1e440]">Follow →</span>
              </a>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="glass-strong rounded-3xl p-8 sm:p-10 border-[#fffdec]/15 relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-16 text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#186e4f]/20 border border-[#186e4f]/40 text-[#186e4f] flex items-center justify-center mb-6 animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-space text-2xl font-bold text-[#fffdec] mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-[#fffdec]/60 text-sm font-inter max-w-md">
                      Thank you for reaching out. Pavan will review your inquiry and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-[#fffdec]/70 mb-2">Your Name</label>
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="Jane Doe"
                          className="w-full px-4 py-3.5 bg-[#fffdec]/5 rounded-2xl border border-[#fffdec]/10 text-[#fffdec] placeholder-[#fffdec]/30 focus:outline-none focus:border-[#e1e440] focus:ring-1 focus:ring-[#e1e440] transition-all text-sm"
                        />
                        {errors.name && (
                          <p className="text-[#e1e440] text-xs mt-1 font-mono">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#fffdec]/70 mb-2">Email Address</label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3.5 bg-[#fffdec]/5 rounded-2xl border border-[#fffdec]/10 text-[#fffdec] placeholder-[#fffdec]/30 focus:outline-none focus:border-[#e1e440] focus:ring-1 focus:ring-[#e1e440] transition-all text-sm"
                        />
                        {errors.email && (
                          <p className="text-[#e1e440] text-xs mt-1 font-mono">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-[#fffdec]/70 mb-2">Phone Number</label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3.5 bg-[#fffdec]/5 rounded-2xl border border-[#fffdec]/10 text-[#fffdec] placeholder-[#fffdec]/30 focus:outline-none focus:border-[#e1e440] focus:ring-1 focus:ring-[#e1e440] transition-all text-sm"
                        />
                        {errors.phone && (
                          <p className="text-[#e1e440] text-xs mt-1 font-mono">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#fffdec]/70 mb-2">Project Subject</label>
                        <input
                          {...register("subject")}
                          type="text"
                          placeholder="Commercial Video Editing Campaign"
                          className="w-full px-4 py-3.5 bg-[#fffdec]/5 rounded-2xl border border-[#fffdec]/10 text-[#fffdec] placeholder-[#fffdec]/30 focus:outline-none focus:border-[#e1e440] focus:ring-1 focus:ring-[#e1e440] transition-all text-sm"
                        />
                        {errors.subject && (
                          <p className="text-[#e1e440] text-xs mt-1 font-mono">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#fffdec]/70 mb-2">Project Details</label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Tell me about your brand goals, timeline, and deliverables..."
                        className="w-full px-4 py-3.5 bg-[#fffdec]/5 rounded-2xl border border-[#fffdec]/10 text-[#fffdec] placeholder-[#fffdec]/30 focus:outline-none focus:border-[#e1e440] focus:ring-1 focus:ring-[#e1e440] transition-all text-sm resize-none"
                      />
                      {errors.message && (
                        <p className="text-[#e1e440] text-xs mt-1 font-mono">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#186e4f] to-[#e1e440] font-space font-bold text-sm text-[#070d0c] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    {submitError && (
                      <p className="text-[#e1e440] text-xs text-center font-mono">{submitError}</p>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
