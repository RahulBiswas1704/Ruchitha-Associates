import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <main className="min-h-screen pt-32 pb-16">
      {/* Header Section */}
      <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
          Our Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-500">Partners</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          We collaborate with industry leaders and top-tier companies to connect talented professionals with exceptional career opportunities.
        </p>
      </section>

      {/* Partners Grid */}
      <section className="container mx-auto px-4 md:px-6">
        {partners.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-400 mb-2">No partners listed yet</h3>
            <p className="text-slate-500">Check back soon as we continuously expand our network.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {partners.map((partner: any) => (
              <Link 
                href={`/partners/${partner.slug}`} 
                key={partner.id}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 w-full bg-white dark:bg-white/90 flex items-center justify-center p-8 border-b border-slate-100 dark:border-slate-200 group-hover:bg-blue-50 dark:group-hover:bg-white transition-colors relative">
                  {partner.imageUrl ? (
                    <Image 
                      src={partner.imageUrl} 
                      alt={partner.name} 
                      fill
                      className="object-contain p-8 transition-all duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <Building2 size={64} className="text-slate-300 dark:text-slate-700" />
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-blue transition-colors">
                    {partner.name}
                  </h3>
                  {partner.description && (
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 flex-1">
                      {partner.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-brand-blue font-bold text-sm">
                    View Company Profile
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
