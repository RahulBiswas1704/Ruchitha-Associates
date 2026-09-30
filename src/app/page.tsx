"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users, Sparkles, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PartnersMarquee from "@/components/PartnersMarquee";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms for background orbs and main image
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Variants for staggered reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 15 } }
  };

  return (
    <div className="flex flex-col overflow-hidden" ref={containerRef}>
      {/* Hero Section - Premium Modern Look */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        {/* Background Gradients with Parallax */}
        <div className="absolute inset-0 bg-brand-offwhite dark:bg-slate-950 transition-colors duration-500 z-0"></div>
        
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/3 z-0"
        ></motion.div>
        
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[100px] opacity-60 translate-y-1/3 -translate-x-1/4 z-0"
        ></motion.div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-brand-red/20 text-brand-red font-medium text-sm mb-8"
            >
              <Sparkles size={16} />
              <span>Empowering India's Youth</span>
            </motion.div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-blue dark:text-white leading-[1.1] mb-6 tracking-tight transition-colors duration-500">
              Connecting Talent,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-rose-400">
                Creating Opportunities.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-xl transition-colors duration-500">
              Ruchitha Associates is committed to connecting skilled and talented people with the right opportunities and helping organizations build a strong workforce.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link 
                href="/jobs" 
                className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/90 hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Find a Job <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-brand-blue font-semibold rounded-full hover:border-brand-red/30 hover:bg-brand-red/5 transition-all duration-300 flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          <div className="hidden lg:block relative h-full">
            <motion.div 
              style={{ y: imgY }}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Students collaborating"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent"></div>
            </motion.div>
            
            {/* Floating Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
              whileHover={{ y: -10, rotate: 2, scale: 1.05 }}
              className="absolute -bottom-8 -left-12 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-brand-blue/10 border border-white max-w-xs z-20 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-brand-blue">10k+</h4>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Careers Launched</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hiring Partners Infinite Marquee */}
      <PartnersMarquee />

      {/* Services Grid - Premium UI with Scroll Reveals */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500 relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-blue dark:text-white mb-6 transition-colors duration-500">How We Help You Grow</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-500">From skill building to final placement, our end-to-end ecosystem ensures success for both candidates and employers.</p>
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 text-brand-red font-medium hover:gap-3 transition-all">
              Learn more about us <ArrowRight size={18} />
            </Link>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 pb-16"
          >
            {/* Service 1 */}
            <motion.div variants={itemVariants} className="group bg-brand-offwhite dark:bg-slate-800 p-10 rounded-3xl border border-gray-100 dark:border-slate-700 hover:border-brand-blue/10 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 shadow-sm rounded-2xl flex items-center justify-center mb-8 text-brand-red group-hover:scale-110 transition-transform duration-500">
                <BookOpen size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-brand-blue dark:text-white transition-colors">Skill Development</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 transition-colors">Industry-aligned programs to equip you with the exact technical and soft skills top employers are desperately looking for.</p>
              <div className="flex items-center text-brand-blue dark:text-brand-red font-semibold text-sm transition-colors">
                Explore Programs <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            {/* Service 2 - Pushed Down */}
            <motion.div variants={itemVariants} className="group bg-brand-offwhite dark:bg-slate-800 p-10 rounded-3xl border border-gray-100 dark:border-slate-700 hover:border-brand-blue/10 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 cursor-pointer md:mt-20">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 shadow-sm rounded-2xl flex items-center justify-center mb-8 text-brand-red group-hover:scale-110 transition-transform duration-500">
                <GraduationCap size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-brand-blue dark:text-white transition-colors">Government Training</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 transition-colors">Authorized partners for DDU-GKY and PMKVY, providing free, certified training programs for rural and urban youth.</p>
              <div className="flex items-center text-brand-blue dark:text-brand-red font-semibold text-sm transition-colors">
                View Schemes <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            {/* Service 3 - Normal */}
            <motion.div variants={itemVariants} className="group bg-brand-offwhite dark:bg-slate-800 p-10 rounded-3xl border border-gray-100 dark:border-slate-700 hover:border-brand-blue/10 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 cursor-pointer">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 shadow-sm rounded-2xl flex items-center justify-center mb-8 text-brand-red group-hover:scale-110 transition-transform duration-500">
                <Briefcase size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-brand-blue dark:text-white transition-colors">Placement Assistance</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 transition-colors">Our dedicated placement cell provides resume building, mock interviews, and direct access to premium job openings.</p>
              <div className="flex items-center text-brand-blue dark:text-brand-red font-semibold text-sm transition-colors">
                Find Jobs <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            {/* Service 4 - Pushed Down & Overlapping Decor */}
            <motion.div variants={itemVariants} className="group bg-brand-blue dark:bg-slate-950 p-10 rounded-3xl border border-brand-blue dark:border-slate-800 text-white hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-500 cursor-pointer relative overflow-hidden md:mt-20">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-red/20"></div>
              {/* Overlapping massive icon to break the grid feel */}
              <Users size={200} className="absolute -bottom-10 -right-10 text-white/5 dark:text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform duration-500 border border-white/10">
                  <Users size={32} />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">Corporate Recruitment</h3>
                <p className="text-white/80 dark:text-gray-300 leading-relaxed mb-8">Looking to hire? We connect organizations with pre-screened, certified, and highly motivated talent pools.</p>
                <div className="flex items-center text-white font-semibold text-sm">
                  Partner With Us <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 bg-brand-offwhite dark:bg-slate-950 transition-colors duration-500 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-brand-blue rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center max-w-5xl mx-auto shadow-2xl"
          >
            {/* Decorative blurs */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Ready to transform your future?</h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Join thousands of successful candidates who have built their careers through Ruchitha Associates.</p>
              
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-red text-white text-lg font-bold rounded-full hover:bg-rose-500 hover:scale-105 transition-all duration-300 shadow-xl shadow-brand-red/20"
              >
                Get Started Today <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
