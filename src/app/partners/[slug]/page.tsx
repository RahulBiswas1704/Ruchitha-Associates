import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PartnerPage({ params }: { params: { slug: string } }) {
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
      <section className="bg-brand-blue text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1932&auto=format&fit=crop" 
            alt="Corporate Environment" 
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Logo */}
            <div className="w-40 h-40 bg-white rounded-3xl p-6 shadow-2xl flex items-center justify-center shrink-0 border-4 border-white/20">
              {partner.imageUrl ? (
                <img src={partner.imageUrl} alt={partner.name} className="w-full h-full object-contain" />
              ) : (
                <span className="font-bold text-brand-blue text-2xl text-center">{partner.name}</span>
              )}
            </div>
            
            {/* Partner Info */}
            <div className="text-center md:text-left flex-1">
              <Link href="/#partners" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4 transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Partners
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{partner.name}</h1>
              {partner.description && (
                <p className="text-lg text-blue-100 max-w-2xl mb-6">{partner.description}</p>
              )}
              {partner.domain && (
                <a href={`https://${partner.domain}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors font-medium">
                  Visit Website <ExternalLink size={18} />
                </a>
              )}
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
                    {jobs.map(job => (
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
