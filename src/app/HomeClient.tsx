"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, GraduationCap, Briefcase, Users, Building, Play, Star, Phone, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import PartnersMarquee from "@/components/PartnersMarquee";

const AssociateAvatar = ({ associate }: { associate: any }) => {
  const [error, setError] = useState(false);
  const initials = associate.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

  if (!associate.imageSrc || error) {
    return (
      <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-900 text-brand-blue dark:text-blue-400 flex items-center justify-center text-4xl font-black tracking-widest group-hover:scale-105 transition-transform duration-500 shadow-xl border-[6px] border-white dark:border-slate-950 relative z-20">
        {initials}
      </div>
    );
  }

  return (
    <div className="w-32 h-32 rounded-full overflow-hidden border-[6px] border-white dark:border-slate-950 shadow-xl group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-500 bg-slate-100 dark:bg-slate-800 relative z-20">
      <img 
        src={associate.imageSrc} 
        alt={associate.name} 
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function HomeClient({ associates, content }: { associates: any[], content: any }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      
      {/* 1. MODERN AGENCY HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white dark:bg-slate-950">
        {/* Background Decorative Elements (Blob/Shapes) */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 dark:opacity-5">
          <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1E3A8A" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.8C87.4,-34.5,90,-20.1,89.5,-6C89,8.1,85.5,22,78.8,34.4C72.1,46.8,62.2,57.7,50.1,65.2C38,72.7,23.6,76.8,9.7,78.6C-4.2,80.4,-17.6,79.9,-29.7,75.2C-41.8,70.5,-52.7,61.7,-61.7,50.8C-70.8,40,-78.1,27.1,-82.1,13.1C-86.1,-0.9,-86.8,-16.1,-81.2,-28.9C-75.6,-41.7,-63.7,-52.1,-50.7,-59.6C-37.7,-67.1,-23.7,-71.7,-9.1,-75.4C5.5,-79.1,20.9,-81.9,30.6,-83.6L44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left: Text Content */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-brand-blue dark:text-blue-400 font-semibold text-sm mb-6 shadow-sm border border-blue-100 dark:border-blue-800">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                Top Recruitment Agency in India
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-6 tracking-tight">
                {content.home_hero_title || "Connecting Talent with Opportunity Across India"}
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {content.home_hero_subtitle || "Premier recruitment and staffing solutions for IT, HR, Manufacturing, BPO, Finance, and Marketing sectors."}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  href="/jobs" 
                  className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Find Opportunities
                </Link>
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 font-semibold rounded-xl hover:border-brand-blue dark:hover:border-blue-500 hover:text-brand-blue dark:hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-brand-blue/10 dark:group-hover:bg-blue-900/30 transition-colors">
                    <Play size={12} className="text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 fill-current" />
                  </div>
                  Watch Video
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right: Modern Image Layout */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg ml-auto">
                {/* Main Image */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl z-10">
                  <Image 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                    alt="HR Professional"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Floating Experience Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl z-20 border border-slate-100 dark:border-slate-700 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 dark:text-orange-400">
                    <Star size={28} className="fill-current" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-slate-900 dark:text-white">10+</div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Years Experience</div>
                  </div>
                </motion.div>
                
                {/* Accent Shape */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-red rounded-full -z-10 blur-2xl opacity-40"></div>
                <div className="absolute -bottom-10 right-10 w-40 h-40 bg-brand-blue rounded-full -z-10 blur-3xl opacity-30"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. LOGO CLOUD */}
      <div className="bg-white dark:bg-slate-950 py-10 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6 mb-6">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider">Trusted by 50+ Companies Worldwide</p>
        </div>
        <PartnersMarquee />
      </div>

      {/* 3. ABOUT / WHY CHOOSE US */}
      <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Team meeting" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-brand-blue/10 dark:bg-slate-900/20"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-blue dark:bg-blue-900 rounded-3xl -z-10"></div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.span variants={fadeInUp} className="text-brand-red dark:text-red-400 font-bold text-sm uppercase tracking-wider mb-2 block">About Our Agency</motion.span>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                {content.home_about_title || "Why Choose Ruchitha Associates?"}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                {content.home_about_text || "With years of industry expertise, we specialize in bridging the gap between exceptional talent and industry-leading organizations. Our rigorous selection process ensures that we deliver candidates who not only meet technical requirements but also align with your company culture."}
              </motion.p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Verified & Certified Talent Pool",
                  "Authorized DDU-GKY & PMKVY Partners",
                  "End-to-End Placement Support",
                  "Customized Corporate Hiring Solutions"
                ].map((item, idx) => (
                  <motion.div variants={fadeInUp} key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500 dark:text-green-400 shrink-0" size={24} />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp}>
                <Link href="/about" className="inline-flex items-center gap-2 text-brand-blue dark:text-blue-400 font-bold hover:gap-3 transition-all">
                  Discover More About Us <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. MODERN SERVICE CARDS */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-red dark:text-red-400 font-bold text-sm uppercase tracking-wider mb-2 block">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">High-Impact HR Solutions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            
            {/* Card 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-brand-blue dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue dark:group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Building size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Corporate Hiring</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Providing organizations with pre-screened, certified, and highly motivated candidates at scale.</p>
              <Link href="/services" className="text-slate-900 dark:text-white font-bold flex items-center gap-2 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-brand-red dark:text-red-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-red dark:group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <GraduationCap size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Skill Development</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Industry-aligned curriculum designed to equip candidates with exact technical and soft skills.</p>
              <Link href="/services" className="text-slate-900 dark:text-white font-bold flex items-center gap-2 group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors">
                Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Card 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} transition={{ delay: 0.2 }} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 dark:group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                <Briefcase size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Placement Support</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Comprehensive support including resume building, mock interviews, and guaranteed interviews.</p>
              <Link href="/services" className="text-slate-900 dark:text-white font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Card 4 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} transition={{ delay: 0.3 }} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 dark:group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <Users size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Govt. Training</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">Authorized partners for DDU-GKY and PMKVY providing free training to empower youth.</p>
              <Link href="/services" className="text-slate-900 dark:text-white font-bold flex items-center gap-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4.5 OUR ASSOCIATES */}
      <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-brand-red/5 dark:bg-brand-red/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-brand-blue dark:text-blue-400 font-bold text-sm mb-6 border border-blue-100 dark:border-blue-800/50 shadow-sm">
              <Users size={16} />
              <span>THE TEAM</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Meet Our Associates</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              The dedicated professionals working tirelessly to connect exceptional talent with outstanding opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 max-w-7xl mx-auto">
            {associates.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                Team members will appear here once added in the dashboard.
              </div>
            ) : (
              associates.map((associate, idx) => (
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} transition={{ delay: idx * 0.05 }}
                  key={associate.id || idx} 
                  className="bg-white dark:bg-slate-950 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800/60 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-500 group flex flex-col relative overflow-hidden"
                >
                  {/* Premium Banner Background */}
                  <div className="h-32 w-full bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/90 to-brand-red/90 z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
                    {associate.imageSrc && (
                       <img src={associate.imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-60 mix-blend-overlay" />
                    )}
                  </div>
                  
                  <div className="px-8 pb-8 pt-0 flex flex-col items-center flex-1 w-full text-center relative z-20">
                    <div className="-mt-16 mb-5">
                      <AssociateAvatar associate={associate} />
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">{associate.name}</h3>
                    
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-full mb-8 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tracking-wide uppercase">{associate.role}</span>
                    </div>
                    
                    <div className="mt-auto w-full pt-6 border-t border-slate-100 dark:border-slate-800/60 flex justify-center gap-3">
                      {associate.phone && (
                        <a href={`tel:${associate.phone}`} className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-white hover:bg-emerald-500 hover:-translate-y-1 transition-all border border-slate-200 dark:border-slate-800 hover:border-transparent shadow-sm" title={associate.phone}>
                          <Phone size={16} />
                        </a>
                      )}
                      {associate.email && (
                        <a href={`mailto:${associate.email}`} className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-white hover:bg-orange-500 hover:-translate-y-1 transition-all border border-slate-200 dark:border-slate-800 hover:border-transparent shadow-sm" title={associate.email}>
                          <Mail size={16} />
                        </a>
                      )}
                      {associate.linkedinUrl && (
                        <a href={associate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-white hover:bg-[#0A66C2] hover:-translate-y-1 transition-all border border-slate-200 dark:border-slate-800 hover:border-transparent shadow-sm" title="LinkedIn">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      )}
                      {associate.otherLink && (
                        <a href={associate.otherLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-white hover:bg-brand-blue hover:-translate-y-1 transition-all border border-slate-200 dark:border-slate-800 hover:border-transparent shadow-sm" title="Website/Link">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {!associate.phone && !associate.email && !associate.linkedinUrl && !associate.otherLink && (
                        <div className="text-slate-400 dark:text-slate-600 font-medium text-xs italic flex items-center justify-center h-10">
                          Team Member
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 bg-brand-blue dark:bg-blue-950 relative overflow-hidden">
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

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Accelerate Your Hiring?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Get in touch with our experts today and discover how we can help you build the perfect team or find your dream career.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-1">
              Contact Us Now
            </Link>
            <Link href="/jobs" className="px-8 py-4 bg-white dark:bg-slate-900 text-brand-blue dark:text-blue-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-all transform hover:-translate-y-1">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
