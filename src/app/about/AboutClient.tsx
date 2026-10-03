"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Target, Eye, Quote, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutClient({ testimonials, content }: { testimonials: any[], content: any }) {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-0">
      
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            About Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 text-blue-100 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-white">About Us</span>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO & STATS SECTION */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Image Area */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl bg-gradient-to-tr from-brand-blue to-blue-400">
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                  </svg>
                </div>
                
                {/* Floating Stat Card */}
                <div className="absolute -bottom-6 -right-6 lg:bottom-10 lg:-right-10 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 flex items-center gap-6 z-20">
                  <div className="text-5xl font-black text-brand-red">25+</div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight uppercase tracking-widest">
                    Years of <br/> Experience
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Text Area */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:w-1/2 lg:pl-10"
            >
              <span className="text-brand-red font-bold tracking-wider uppercase mb-3 block">Who We Are</span>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                Building Careers. Empowering People.
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Ruchitha Associates is a trusted manpower and career solutions company focused on connecting skilled professionals with the right opportunities. We support candidates and organizations through reliable recruitment, placement and workforce solutions.
              </p>
              
              <div className="flex items-center gap-8 mb-10 pb-10 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-brand-blue mb-1">350+</span>
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Completed Projects</span>
                </div>
                <div className="h-16 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-brand-blue mb-1">100%</span>
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Client Commitment</span>
                </div>
              </div>

              <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 group">
                Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-blue font-bold tracking-wider uppercase mb-3 block">Our Purpose</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Our Company Journey</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Ruchitha Associates is committed to creating valuable connections between talented individuals and growing organizations. Our approach combines professional recruitment, candidate support and industry-focused workforce solutions to deliver opportunities that create long-term value.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
          >
            {/* Vision Card */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-950 p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-blue group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Eye size={120} />
              </div>
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-brand-blue mb-8">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                {content.about_vision || "To become a trusted career and manpower partner by creating meaningful opportunities for individuals and organizations."}
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-950 p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-red group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Target size={120} />
              </div>
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-brand-red mb-8">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                {content.about_mission || "To connect the right talent with the right opportunities through professional, transparent and reliable recruitment solutions."}
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 4. EXPERTISE PROGRESS BARS */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                Professional Recruitment & Career Solutions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                We connect talented professionals with suitable opportunities while helping organizations find skilled and dependable manpower across different sectors.
              </p>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-900 dark:text-white">Recruitment Solutions</span>
                    <span className="font-bold text-brand-blue">82%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: "82%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-brand-blue rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-900 dark:text-white">Manpower Consulting</span>
                    <span className="font-bold text-brand-red">77%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: "77%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-brand-red rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-900 dark:text-white">Career & Placement Support</span>
                    <span className="font-bold text-green-500">86%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: "86%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-green-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:w-1/2 relative"
            >
               <div className="bg-slate-100 dark:bg-slate-900 rounded-[3rem] p-12 text-center shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[60px] pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/10 rounded-full blur-[60px] pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Empowering Skills. Creating Careers. Building Futures.</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                      Ruchitha Associates works to support individuals through skill development, training, placement and employment opportunities while helping organizations connect with capable talent.
                    </p>
                    <Link href="/services" className="inline-flex items-center gap-2 text-brand-blue dark:text-blue-400 font-bold hover:underline">
                      Discover Our Services <ArrowRight size={16} />
                    </Link>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-brand-blue text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">What Our Candidates Say</h2>
            <p className="text-blue-100 text-lg">Real stories from professionals who found their path with Ruchitha Associates.</p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div key={testimonial.id} variants={fadeInUp} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl relative">
                <Quote className="absolute top-8 right-8 text-white/20" size={64} />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                    {testimonial.initials || "US"}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{testimonial.name}</h4>
                    <p className="text-blue-200 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-lg text-blue-50 italic leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
