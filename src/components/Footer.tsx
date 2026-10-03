"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, ArrowRight, Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { subscribeToNewsletter } from "@/lib/actions";
import { toast } from "sonner";
import { useState } from "react";

export default function Footer({ content = {} }: { content?: any }) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    const formData = new FormData();
    formData.append("email", email);
    const result = await subscribeToNewsletter(formData);
    setIsSubscribing(false);
    
    if (result.success) {
      toast.success(result.message);
      setEmail("");
    } else {
      toast.error(result.error);
    }
  };
  
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 pt-20 pb-8 relative overflow-hidden border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      
      {/* Decorative Glows (Only visible in dark mode to prevent light mode wash-out) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue rounded-full blur-[150px] opacity-0 dark:opacity-20 -translate-y-1/2 pointer-events-none transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red rounded-full blur-[150px] opacity-0 dark:opacity-10 translate-y-1/2 pointer-events-none transition-opacity duration-300"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Section: Newsletter / CTA Block */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm transition-colors duration-300">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Subscribe to our Newsletter</h3>
            <p className="text-slate-600 dark:text-slate-400">Get the latest job openings and industry insights delivered straight to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md flex relative">
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address" 
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-6 py-4 rounded-xl focus:outline-none focus:border-brand-blue dark:focus:border-blue-500 transition-colors shadow-sm"
            />
            <button disabled={isSubscribing} type="submit" className="absolute right-2 top-2 bottom-2 bg-brand-blue text-white px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubscribing ? "Wait..." : "Subscribe"} {!isSubscribing && <Send size={16} />}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & About */}
          <div className="lg:col-span-4 lg:pr-8">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo-v3.png" 
                alt="Ruchitha Associates Logo" 
                width={180} 
                height={50} 
                className="h-12 w-auto object-contain dark:bg-white dark:px-3 dark:py-1.5 dark:rounded-xl transition-all"
              />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-medium">
              {content.footer_description || "We are a specialized HR & Recruitment agency committed to connecting top-tier talent with industry-leading organizations across India."}
            </p>
            <div className="flex gap-4">
              {[
                { icon: FaFacebook, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaLinkedin, href: "#" }
              ].map((Social, i) => (
                <a key={i} href={Social.href} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue dark:hover:text-white hover:border-brand-blue hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <Social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Our Services', 'Job Openings', 'Gallery', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Job Openings' ? '/jobs' : item === 'About Us' ? '/about' : item === 'Our Services' ? '/services' : item === 'Gallery' ? '/gallery' : '/contact'} className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-brand-blue dark:hover:text-white transition-colors font-medium">
                    <ArrowRight size={16} className="mr-3 text-brand-blue dark:text-blue-400 opacity-0 -ml-7 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Expertise</h3>
            <ul className="space-y-3">
              {['Corporate Hiring', 'Skill Development', 'Placement Support', 'Govt. Training'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-brand-red dark:hover:text-white transition-colors font-medium">
                    <ArrowRight size={16} className="mr-3 text-brand-red dark:text-red-400 opacity-0 -ml-7 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors">
                  <MapPin size={18} className="text-brand-blue dark:text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pt-1 font-medium group-hover:text-brand-blue dark:group-hover:text-white transition-colors">
                  6F6G+565, Tukkuguda,<br/>Telangana 501359
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors">
                  <Phone size={18} className="text-brand-blue dark:text-blue-400 group-hover:text-white" />
                </div>
                <a href={`tel:${content.contact_phone || '+917674074055'}`} className="text-slate-600 dark:text-slate-400 text-sm font-medium group-hover:text-brand-blue dark:group-hover:text-white transition-colors">
                  {content.contact_phone || "+91 7674074055"}
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-white/5 border border-red-100 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:border-brand-red transition-colors">
                  <Mail size={18} className="text-brand-red dark:text-red-400 group-hover:text-white" />
                </div>
                <a href={`mailto:${content.contact_email || 'info@ruchithaassociatess.com'}`} className="text-slate-600 dark:text-slate-400 text-sm font-medium group-hover:text-brand-red dark:group-hover:text-white transition-colors break-all">
                  {content.contact_email || "info@ruchithaassociatess.com"}
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium text-center md:text-left">
            Copyright © {currentYear}. All Rights Reserved. Created by{" "}
            <a href="https://rahul-biswas.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-white hover:text-brand-blue dark:hover:text-brand-blue transition-colors font-bold border-b border-transparent hover:border-brand-blue pb-0.5">Rahul Biswas</a> with Caffeine.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 font-medium flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-brand-blue dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-blue dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
