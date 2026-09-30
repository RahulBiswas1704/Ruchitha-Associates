"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: "Our Gallery" },
    { href: "/jobs", label: "Career" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="container mx-auto px-4 md:px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo-v3.png" 
            alt="Ruchitha Associates Logo" 
            width={300} 
            height={80} 
            className="h-16 md:h-20 w-auto object-contain"
            priority
          />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-brand-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200 dark:border-slate-800">
            <ThemeToggle />
            <Link 
              href="/contact"
              className="px-6 py-2.5 bg-brand-blue text-white text-sm font-semibold rounded-full hover:bg-brand-red hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-brand-blue"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4 shadow-lg absolute w-full">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-red"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-gray-100" />
            <Link 
              href="/contact"
              className="text-center px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
