import Link from "next/link";
import { getAllJobs } from "@/lib/content";
import { MapPin, Briefcase, IndianRupee, ArrowRight, Search, Sparkles } from "lucide-react";

export const metadata = {
  title: "Job Openings | Ruchitha Associates",
  description: "Find your dream job with top employers across India.",
};

export default function JobsPage() {
  const jobs = getAllJobs();

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      {/* Premium Page Header */}
      <section className="relative bg-brand-blue text-white py-24 md:py-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10 z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] opacity-60 translate-y-1/3 -translate-x-1/4 z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-6">
            <Sparkles size={16} className="text-brand-red" />
            <span>Premium Opportunities</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-rose-400">Dream Job</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover exclusive roles with industry-leading organizations and take the next definitive step in your career.
          </p>
        </div>
      </section>

      {/* Decorative Search/Filter Bar (Visually Premium) */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-brand-blue/5 p-4 md:p-6 border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by job title, sector, or keyword..." 
              className="w-full bg-gray-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-blue/20 outline-none text-brand-blue font-medium transition-all"
              disabled
            />
          </div>
          <div className="w-full md:w-1/3 flex gap-2">
            <button className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue/90 transition-all shadow-md">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          
          {jobs.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-brand-offwhite rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} className="text-gray-400" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-brand-blue mb-4">No exclusive openings right now</h2>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">Our elite partners are currently reviewing their requirements. Check back soon for premium placements.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <div 
                  key={job.slug} 
                  className="group bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 border border-gray-100 hover:border-brand-blue/10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:-translate-y-1"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-bold rounded-full uppercase tracking-wider">
                        {job.sector}
                      </div>
                      <span className="text-xs font-medium text-gray-400">Featured Role</span>
                    </div>
                    
                    <h2 className="font-serif text-3xl font-bold text-brand-blue mb-5 group-hover:text-brand-red transition-colors duration-300">
                      {job.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 font-medium">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <MapPin size={16} className="text-brand-red" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <Briefcase size={16} className="text-brand-red" />
                        {job.experience}
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <IndianRupee size={16} className="text-brand-red" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex items-center justify-start md:justify-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <Link 
                      href={`/jobs/${job.slug}`}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-brand-blue text-brand-blue font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all duration-300"
                    >
                      View Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </section>
    </div>
  );
}
