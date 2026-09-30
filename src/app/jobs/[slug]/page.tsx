import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobBySlug, getAllJobs } from "@/lib/content";
import { MapPin, Briefcase, IndianRupee, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} | Ruchitha Associates`,
    description: job.description.substring(0, 160),
  };
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);
  
  if (!job) {
    notFound();
  }

  const formattedDate = new Date(job.postedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-brand-offwhite min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-blue mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to all jobs
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Job Header */}
          <div className="bg-brand-blue text-white p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-bl-full pointer-events-none"></div>
            
            <div className="inline-block px-3 py-1 bg-brand-red/20 text-brand-red text-xs font-bold rounded-full mb-4 uppercase tracking-wider border border-brand-red/30">
              {job.sector}
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6 relative z-10">{job.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-200 relative z-10">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-brand-red" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-brand-red" />
                {job.experience}
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee size={18} className="text-brand-red" />
                {job.salary}
              </div>
            </div>
          </div>
          
          {/* Job Content */}
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">
              <Calendar size={16} />
              Posted on {formattedDate}
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 mb-12">
              <h3 className="font-serif text-2xl font-bold text-brand-blue mb-4">Job Description</h3>
              <p className="whitespace-pre-wrap leading-relaxed">{job.description}</p>
              
              <h3 className="font-serif text-2xl font-bold text-brand-blue mt-10 mb-4">Requirements & Eligibility</h3>
              <ul className="list-none pl-0 space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-brand-red shrink-0 mt-1" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Application Section */}
            <div className="bg-brand-offwhite p-8 rounded-2xl border border-gray-200">
              <h3 className="font-serif text-2xl font-bold text-brand-blue mb-2">Interested in this role?</h3>
              <p className="text-gray-600 mb-6">Apply now and our placement team will review your profile.</p>
              
              {/* Application Form linked to Web3Forms */}
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
                {/* The user will replace this value with their real key in the code or use env var */}
                <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "[ADD: WEB3FORMS_KEY]"} />
                <input type="hidden" name="subject" value={`Job Application for ${job.title}`} />
                <input type="hidden" name="job_slug" value={job.slug} />
                <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification *</label>
                    <input type="text" name="qualification" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (Google Drive, Dropbox, etc.) *</label>
                  <input type="url" name="resume_link" required placeholder="https://" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                  <p className="text-xs text-gray-500 mt-1">Please ensure the link is publicly accessible.</p>
                </div>
                
                <button type="submit" className="w-full px-6 py-4 bg-brand-red text-brand-blue font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-md text-lg">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
