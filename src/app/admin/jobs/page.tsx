import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Briefcase, Trash2, Plus, MapPin } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import Link from "next/link";
import ClientForm from "@/components/ClientForm";
import { SubmitButton } from "@/components/SubmitButton";

import { createJob, deleteJob } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage(props: { searchParams: Promise<{ page?: string; company?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const ITEMS_PER_PAGE = 10;
  
  const whereClause = searchParams.company ? { company: searchParams.company } : {};
  
  const totalJobs = await prisma.job.count({ where: whereClause });
  const totalPages = Math.ceil(totalJobs / ITEMS_PER_PAGE);

  const jobs = await prisma.job.findMany({
    where: whereClause,
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: { createdAt: 'desc' }
  });

  const partners = await prisma.partner.findMany({
    select: { name: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Manage Jobs</h2>
        <p className="text-slate-500 text-lg">Add new open positions or remove filled ones.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Job List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-brand-blue" />
              Active Postings ({jobs.length})
            </h3>
            
            <div className="space-y-4">
              {jobs.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                  No jobs currently posted. Use the form to add one.
                </div>
              ) : (
                jobs.map((job: any) => (
                  <div key={job.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex justify-between items-center group hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-brand-blue dark:text-blue-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                          {job.category}
                        </span>
                        <span className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                          {job.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">{job.title}</h4>
                      <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-1">
                        {job.company} <span className="mx-1">•</span> <MapPin size={12} /> {job.location}
                      </p>
                    </div>
                    
                    <ClientForm action={deleteJob} successMessage="Job Deleted!">
                      <input type="hidden" name="id" value={job.id} />
                      <button type="submit" className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all" title="Delete Job">
                        <Trash2 size={20} />
                      </button>
                    </ClientForm>
                  </div>
                ))
              )}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <Link 
                  href={`/admin/jobs?page=${Math.max(1, page - 1)}`}
                  className={`px-4 py-2 rounded-lg font-bold text-sm ${page === 1 ? 'opacity-50 pointer-events-none text-slate-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-brand-blue hover:text-white border border-slate-200 dark:border-slate-800'} transition-colors`}
                >
                  Previous
                </Link>
                <div className="text-sm font-bold text-slate-500">
                  Page {page} of {totalPages}
                </div>
                <Link 
                  href={`/admin/jobs?page=${Math.min(totalPages, page + 1)}`}
                  className={`px-4 py-2 rounded-lg font-bold text-sm ${page === totalPages ? 'opacity-50 pointer-events-none text-slate-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-brand-blue hover:text-white border border-slate-200 dark:border-slate-800'} transition-colors`}
                >
                  Next
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: Add Job Form */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus size={20} className="text-brand-blue" />
              Post New Job
            </h3>
            
            <ClientForm action={createJob} successMessage="Job Published!" className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Job Title</label>
                <input type="text" name="title" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. HR Manager" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Company / Client</label>
                <input type="text" name="company" defaultValue={searchParams.company || ""} list="companies-list" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Top IT MNC (Type or select)" />
                <datalist id="companies-list">
                  {partners.map((p: any) => (
                    <option key={p.name} value={p.name} />
                  ))}
                </datalist>
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Location</label>
                <input type="text" name="location" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Hyderabad, Telangana" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Type</label>
                  <select name="type" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none">
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Night Shift">Night Shift</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Category</label>
                  <input type="text" name="category" list="categories-list" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Information Technology" />
                  <datalist id="categories-list">
                    <option value="Information Technology" />
                    <option value="Human Resources" />
                    <option value="Manufacturing" />
                    <option value="BPO / ITES" />
                    <option value="Finance" />
                    <option value="Marketing" />
                    <option value="Renewable Energy" />
                    <option value="Healthcare" />
                  </datalist>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Salary Range</label>
                <input type="text" name="salary" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. ₹5L - ₹8L p.a." />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Job Description</label>
                <RichTextEditor name="description" placeholder="Requirements, responsibilities, etc." />
              </div>
              
              <SubmitButton className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors mt-4 shadow-lg shadow-blue-500/20" loadingText="Publishing Job...">
                Publish Job
              </SubmitButton>
            </ClientForm>
          </div>
        </div>

      </div>
    </div>
  );
}
