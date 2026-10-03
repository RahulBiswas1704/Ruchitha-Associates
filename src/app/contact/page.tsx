"use client";

import { motion, Variants } from "framer-motion";
import { ChevronRight, Phone, Mail, MapPin, Send, Clock, Building2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { submitContactMessage } from "./actions";
import { trackEvent } from "@/lib/actions";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Call the server action to save to database
    const result = await submitContactMessage(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      const sessionId = localStorage.getItem("analytics_session_id");
      trackEvent("submit_contact_message", formData.subject, window.location.pathname, sessionId || undefined).catch(() => {});
      
      toast.success("Message sent successfully!");
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-0">
      
      {/* 1. HERO PAGE HEADER */}
      <section className="relative py-20 lg:py-28 bg-brand-blue dark:bg-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="2" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 text-blue-100 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-white">Contact</span>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Contact Info */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="lg:w-5/12 space-y-8"
            >
              <div>
                <span className="text-brand-red font-bold tracking-wider uppercase mb-3 block">Get In Touch</span>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                  We're Here to Help You Succeed
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                  Whether you're looking for your next career opportunity or searching for the perfect candidate to join your team, we'd love to hear from you.
                </p>
              </div>

              {/* Info Cards */}
              <motion.div variants={fadeInUp} className="flex gap-6 items-start p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 min-w-14 bg-blue-50 dark:bg-blue-900/30 text-brand-blue rounded-2xl flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Phone Number</h4>
                  <a href="tel:+917674074055" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors block text-lg font-medium">+91 7674074055</a>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-6 items-start p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 min-w-14 bg-red-50 dark:bg-red-900/30 text-brand-red rounded-2xl flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email Address</h4>
                  <a href="mailto:Hr.ruchithaassociates@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors block font-medium mb-1 break-all">Hr.ruchithaassociates@gmail.com</a>
                  <a href="mailto:info@ruchithaassociatess.com" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors block font-medium break-all">info@ruchithaassociatess.com</a>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-6 items-start p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 min-w-14 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Office Locations</h4>
                  <div className="mb-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-1">Placement Office:</span>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">6F6G+565, Tukkuguda, Telangana 501359</p>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-1">Registered Office:</span>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">House no.6-7, st colony, annaram village, telangana, 502313.</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:w-7/12"
            >
              <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] pointer-events-none"></div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 relative z-10">Send Us a Message</h3>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-8 rounded-2xl text-center border border-green-100 dark:border-green-800 relative z-10"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={24} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Message Sent Successfully!</h4>
                    <p className="font-medium">Thank you for reaching out. Our team will get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Name *</label>
                        <input 
                          type="text" id="name" name="name" required
                          value={formData.name} onChange={handleChange}
                          className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 dark:text-white font-medium transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number *</label>
                        <input 
                          type="tel" id="phone" name="phone" required
                          value={formData.phone} onChange={handleChange}
                          className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 dark:text-white font-medium transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                        <input 
                          type="email" id="email" name="email" required
                          value={formData.email} onChange={handleChange}
                          className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 dark:text-white font-medium transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-slate-300">I am a... *</label>
                        <select 
                          id="subject" name="subject" required
                          value={formData.subject} onChange={handleChange}
                          className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 dark:text-white font-medium transition-all appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em' }}
                        >
                          <option value="" disabled>Select an option</option>
                          <option value="candidate">Candidate seeking a job</option>
                          <option value="employer">Employer looking to hire</option>
                          <option value="training">Interested in Training (PMKVY/DDU-GKY)</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Message</label>
                      <textarea 
                        id="message" name="message" rows={5}
                        value={formData.message} onChange={handleChange}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 dark:text-white font-medium transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-brand-blue text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="h-[500px] w-full bg-slate-200 dark:bg-slate-800 relative">
        <iframe 
          src="https://maps.google.com/maps?q=Tukkuguda,%20Telangana%20501359&t=&z=14&ie=UTF8&iwloc=&output=embed" 
          className="w-full h-full border-0 grayscale opacity-80 mix-blend-multiply dark:mix-blend-luminosity dark:opacity-60" 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Ruchitha Associates Office Location"
        ></iframe>
        
        {/* Floating Map Label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-brand-blue text-white rounded-xl flex items-center justify-center animate-bounce">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Visit Our Office</h4>
            <p className="text-sm font-medium text-slate-500">Tukkuguda, Telangana</p>
          </div>
        </div>
      </section>

    </div>
  );
}
