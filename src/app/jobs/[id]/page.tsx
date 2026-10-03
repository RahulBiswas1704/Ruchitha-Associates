import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase, IndianRupee, Clock, ArrowLeft, Share2 } from "lucide-react";
import JobShareClient from "./JobShareClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = await prisma.job.findUnique({ where: { id: resolvedParams.id } });
  
  if (!job) return { title: "Job Not Found | Ruchitha Associates" };

  return {
    title: `${job.title} at ${job.company} | Ruchitha Associates`,
    description: job.description ? job.description.substring(0, 160) : `Hiring ${job.title} in ${job.location}. Apply now!`,
    openGraph: {
      title: `Hiring: ${job.title} | ${job.company}`,
      description: `${job.location} • ${job.type} • ${job.salary}`,
      url: `https://ruchithaassociatess.com/jobs/${job.id}`,
      siteName: "Ruchitha Associates",
      type: "website",
    }
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = await prisma.job.findUnique({ where: { id: resolvedParams.id } });

  if (!job) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || `Hiring ${job.title} at ${job.company}`,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location
      }
    },
    "employmentType": job.type,
    "datePosted": job.postedAt.toISOString()
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-blue mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to all jobs
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          <div className="bg-brand-blue p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none"></div>
            
            <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              {job.category}
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-black text-white mb-6 relative z-10">{job.title}</h1>
            <p className="text-xl text-blue-100 font-medium mb-8">{job.company}</p>
            
            <div className="flex flex-wrap gap-6 text-sm text-white relative z-10">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="opacity-70" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="opacity-70" />
                {job.type}
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee size={18} className="opacity-70" />
                {job.salary}
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={16} />
                Posted on {new Date(job.postedAt).toLocaleDateString()}
              </div>
              
              <JobShareClient jobId={job.id} jobTitle={job.title} />
            </div>
            
            {job.description && (
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mb-12">
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">Job Description</h3>
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>
            )}
            
            <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <h3 className="font-serif text-2xl font-black text-slate-900 dark:text-white mb-2">Interested in this role?</h3>
              <p className="text-slate-500 mb-6">Our placement team is ready to review your profile.</p>
              
              <Link href="/jobs" className="inline-block px-8 py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 text-lg">
                View & Apply
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
}
