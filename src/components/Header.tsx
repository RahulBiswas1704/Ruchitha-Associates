"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: "Our Gallery" },
    { href: "/partners", label: "Partners" },
    { href: "/jobs", label: "Career" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        scrolled ? "pt-0 px-0" : "pt-6 px-4 md:px-6"
      }`}
    >
      <div className="w-full flex justify-center">
        <div 
          className={`w-full mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
            scrolled 
              ? "max-w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-none shadow-sm border-b border-slate-200 dark:border-slate-800/70 py-3 px-4 md:px-8" 
              : "max-w-7xl bg-white dark:bg-slate-950 rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 py-4 px-6 md:px-8"
          }`}
        >
          
          {/* Logo */}
          <Link href="/" className="flex items-center z-10 relative">
            <Image 
              src="/logo-v3.png" 
              alt="Ruchitha Associates Logo" 
              width={180} 
              height={50} 
              className="h-10 w-auto object-contain dark:bg-white dark:px-2 dark:py-1 dark:rounded-md transition-all"
              priority
            />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="relative group font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 transition-colors py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-blue rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 z-10 relative">
            <ThemeToggle />
            <Link 
              href="/contact"
              className="px-6 py-2.5 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 ml-2"
            >
              Get Consulting
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 lg:hidden z-10 relative">
            <ThemeToggle />
            <button 
              className="text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white dark:bg-slate-900 m-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-4">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-brand-blue rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="mt-4 px-6 py-4 bg-brand-blue text-white text-center font-bold rounded-xl shadow-lg shadow-blue-500/20"
              onClick={() => setIsOpen(false)}
            >
              Get Consulting
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
