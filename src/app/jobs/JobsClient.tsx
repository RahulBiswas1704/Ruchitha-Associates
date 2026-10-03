"use client";

import { motion } from "framer-motion";
import { ChevronRight, Search, MapPin, Briefcase, IndianRupee, Clock, ArrowRight, X, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ClientForm from "@/components/ClientForm";
import { SubmitButton } from "@/components/SubmitButton";
import { applyForJob, trackEvent } from "@/lib/actions";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  description?: string | null;
  postedAt: Date;
};

const ITEMS_PER_PAGE = 9;

export default function JobsClient({ 
  initialJobs, 
  totalJobs,
  totalPages,
  currentPage,
  currentSearch,
  currentCategory
}: { 
  initialJobs: Job[],
  totalJobs: number,
  totalPages: number,
  currentPage: number,
  currentSearch: string,
  currentCategory: string
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const categories = ["All", "Information Technology", "Human Resources", "Manufacturing", "BPO / ITES", "Finance", "Marketing"];

  const updateFilters = useCallback((search: string, category: string, page: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "All") params.set("category", category);
    if (page > 1) params.set("page", page.toString());
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [pathname, router]);

  // Debounce search
  useEffect(() => {
    if (searchTerm === currentSearch) return; // Prevent loop
    const delay = setTimeout(() => {
       updateFilters(searchTerm, currentCategory, 1);
    }, 400);
    return () => clearTimeout(delay);
  }, [searchTerm, currentCategory, currentSearch, updateFilters]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters(searchTerm, e.target.value, 1);
  };

  const handlePageChange = (newPage: number) => {
    updateFilters(searchTerm, currentCategory, newPage);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-24">
      
      {/* 1. HERO PAGE HEADER */}
      <section className="relative py-20 lg:py-28 bg-brand-blue dark:bg-slate-900 overflow-hidden mb-12">
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
            Find Your Dream Job
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 text-blue-100 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-white">Career</span>
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH AND FILTER SECTION */}
      <section className="container mx-auto px-4 md:px-6 relative -mt-24 z-20 mb-16">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl shadow-blue-900/10 dark:shadow-black/30 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-slate-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search job titles or companies..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 dark:text-white font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:w-64">
              <select
                className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 dark:text-white font-medium cursor-pointer appearance-none"
                value={currentCategory}
                onChange={handleCategoryChange}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
          </div>
          
          {isPending && (
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-b-3xl overflow-hidden">
              <div className="w-1/3 h-full bg-brand-blue animate-pulse rounded-full"></div>
            </div>
          )}
        </div>
      </section>

      {/* 3. JOB LISTINGS */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Available Positions <span className="text-slate-500 font-medium text-lg ml-2">({totalJobs})</span>
          </h2>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          {initialJobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_30px_rgb(0,0,0,0.4)] transition-all duration-300 group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-brand-blue dark:text-blue-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                  {job.category}
                </div>
                <div className="text-slate-400 dark:text-slate-500 text-sm font-medium flex items-center gap-1">
                  <Clock size={14} /> {new Date(job.postedAt).toLocaleDateString()}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-brand-blue transition-colors">
                {job.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{job.company}</p>
              
              {job.description && (
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 prose prose-sm dark:prose-invert line-clamp-3" dangerouslySetInnerHTML={{ __html: job.description }} />
              )}

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <MapPin size={16} />
                  </div>
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <Briefcase size={16} />
                  </div>
                  <span className="font-medium">{job.type}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <IndianRupee size={16} />
                  </div>
                  <span className="font-medium">{job.salary}</span>
                </div>
              </div>

              <div className="mt-auto">
                <button 
                  onClick={() => setSelectedJob(job)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold rounded-xl group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 border border-slate-200 dark:border-slate-800 group-hover:border-transparent"
                >
                  Apply Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || isPending}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="px-4 py-2 font-bold text-slate-900 dark:text-white">
              Page {currentPage} of {totalPages}
            </div>
            <button 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || isPending}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {initialJobs.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 mt-6">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No jobs found</h3>
            <p className="text-slate-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchTerm(""); updateFilters("", "All", 1); }}
              className="mt-6 px-6 py-2 bg-brand-blue text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. APPLY MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 dark:border-slate-800 relative"
          >
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Apply for {selectedJob.title}</h2>
                <p className="text-slate-500 font-medium">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              
              <ClientForm 
                action={applyForJob} 
                successMessage="Application submitted successfully!"
                onSuccess={() => {
                  setSelectedJob(null);
                  const sessionId = localStorage.getItem("analytics_session_id");
                  trackEvent("submit_application", selectedJob.title, window.location.pathname, sessionId || undefined).catch(() => {});
                }}
                className="space-y-5"
              >
                <input type="hidden" name="jobId" value={selectedJob.id} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Full Name *</label>
                    <input type="text" name="name" required className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address *</label>
                    <input type="email" name="email" required className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Phone Number *</label>
                  <input type="tel" name="phone" required className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="+91 98765 43210" />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Resume / CV *</label>
                  <div className="relative">
                    <input type="file" name="resume" required accept=".pdf,.doc,.docx" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer" />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Accepted formats: PDF, DOC, DOCX. Max size 5MB.</p>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Cover Letter (Optional)</label>
                  <textarea name="coverLetter" rows={4} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none" placeholder="Tell us why you're a great fit..."></textarea>
                </div>
                
                <SubmitButton className="w-full py-5 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors mt-8 shadow-lg shadow-blue-500/20 text-lg" loadingText="Submitting Application...">
                  Submit Application
                </SubmitButton>
              </ClientForm>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
