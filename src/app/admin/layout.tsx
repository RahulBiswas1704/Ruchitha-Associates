"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Image as ImageIcon, Users, MessageSquare, LogOut, Settings, Layers, Star, Menu, X, Activity, FileText, Building2 } from "lucide-react";

const sidebarLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Deep Analytics", href: "/admin/analytics", icon: Activity },
  { name: "Manage Services", href: "/admin/services", icon: Layers },
  { name: "Manage Partners", href: "/admin/partners", icon: Building2 },
  { name: "Manage Jobs", href: "/admin/jobs", icon: Briefcase },
  { name: "Applications", href: "/admin/applications", icon: FileText },
  { name: "Gallery Images", href: "/admin/gallery", icon: ImageIcon },
  { name: "Team Members", href: "/admin/team", icon: Users },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Contact Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans text-slate-900 dark:text-slate-50">
      
      {/* Desktop Sidebar */}
      <aside className="w-full md:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm hidden md:flex min-h-screen sticky top-0">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="text-2xl font-black text-brand-blue dark:text-blue-500 tracking-tight flex items-center gap-2">
            RUCHITHA <span className="text-brand-red dark:text-red-500 text-sm">ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-2 px-3">Main Menu</div>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-brand-blue text-white shadow-md shadow-blue-500/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-slate-500"} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link prefetch={false} href="/api/logout" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-brand-red font-medium transition-colors">
            <LogOut size={20} />
            Exit Dashboard
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="relative w-72 max-w-[80%] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <Link href="/" className="text-xl font-black text-brand-blue dark:text-blue-500 tracking-tight flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                RUCHITHA <span className="text-brand-red dark:text-red-500 text-xs">ADMIN</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-2 px-3">Main Menu</div>
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive 
                        ? "bg-brand-blue text-white shadow-md shadow-blue-500/20" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-white" : "text-slate-500"} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <Link prefetch={false} href="/api/logout" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-brand-red font-medium transition-colors">
                <LogOut size={20} />
                Exit Dashboard
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate">
              {sidebarLinks.find(link => link.href === pathname)?.name || "Admin Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <Link href="/admin/settings" className="hidden md:flex p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-800 rounded-full">
              <Settings size={20} />
            </Link>
            <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
