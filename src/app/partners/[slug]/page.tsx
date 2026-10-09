import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PartnerPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const partner = await prisma.partner.findUnique({
    where: { slug: params.slug }
  });

  if (!partner) return notFound();

  // Find jobs for this company
  const jobs = await prisma.job.findMany({
    where: { company: partner.name },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header section */}
      <section className="bg-gradient-to-br from-slate-900 via-brand-blue to-slate-900 text-white pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-red/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Logo */}
            <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-3xl p-4 md:p-8 shadow-2xl flex items-center justify-center shrink-0 border-4 border-white/10 relative z-20 backdrop-blur-sm bg-white/95">
              {partner.imageUrl ? (
                <img src={partner.imageUrl} alt={partner.name} className="w-full h-full object-contain" />
              ) : (
                <span className="font-bold text-brand-blue text-xl md:text-2xl text-center">{partner.name}</span>
              )}
            </div>
            
            {/* Partner Info */}
            <div className="text-center md:text-left flex-1">
              <Link href="/#partners" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4 transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Partners
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{partner.name}</h1>
              {partner.description && (
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8 leading-relaxed opacity-90">{partner.description}</p>
              )}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {partner.domain && (
                  <a href={partner.domain.startsWith('http') ? partner.domain : `https://${partner.domain}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-blue hover:bg-blue-50 border border-transparent rounded-xl transition-all shadow-lg hover:shadow-xl font-bold">
                    Visit Website <ExternalLink size={18} />
                  </a>
                )}
                {partner.pdfUrl && (
                  <a href={partner.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red text-white hover:bg-red-600 border border-transparent rounded-xl transition-all shadow-lg hover:shadow-xl font-bold">
                    Download Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-brand-offwhite flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-brand-blue mb-6">About {partner.name}</h2>
              {partner.content ? (
                <div 
                  className="prose prose-lg prose-slate dark:prose-invert max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: partner.content }}
                />
              ) : (
                <p className="text-gray-500 italic">No additional details have been provided for this partner yet.</p>
              )}
            </div>
            
            {/* Sidebar / Jobs */}
            <div className="md:col-span-1 space-y-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <Briefcase className="text-brand-red" size={24} />
                  Open Vacancies
                </h3>
                
                {jobs.length > 0 ? (
                  <div className="space-y-4">
                    {jobs.map((job: any) => (
                      <div key={job.id} className="block group">
                        <h4 className="font-bold text-gray-900 group-hover:text-brand-blue transition-colors line-clamp-2 mb-1">{job.title}</h4>
                        <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          {job.location}
                        </p>
                        <Link href={`/jobs/${job.id}`} className="text-sm font-semibold text-brand-red group-hover:text-red-700 transition-colors inline-flex items-center gap-1">
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-sm">No open vacancies at the moment.</p>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <Link href="/jobs" className="text-brand-blue hover:text-blue-700 font-semibold text-sm transition-colors">
                    View All Jobs &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
