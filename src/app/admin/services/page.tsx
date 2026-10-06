import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Layers, Trash2, Plus, Link as LinkIcon, AlertCircle } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

import { addService, deleteService } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Manage Services</h2>
        <p className="text-slate-500 text-lg">Add or remove services offered by Ruchitha Associates.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Services List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Layers size={20} className="text-brand-purple" />
              Active Services ({services.length})
            </h3>
            
            <div className="space-y-4">
              {services.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                  No services found. Add one to display it on the public services page.
                </div>
              ) : (
                services.map((service: any) => (
                  <div key={service.id} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-6">
                    {/* Image Thumbnail */}
                    {service.imageUrl && (
                      <div className="w-full sm:w-40 h-32 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                        <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white truncate">{service.title}</h4>
                        <form action={deleteService}>
                          <input type="hidden" name="id" value={service.id} />
                          <button type="submit" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all shrink-0" title="Delete Service">
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </div>
                      <div className="text-sm text-slate-500 line-clamp-2 mb-4 prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: service.description }} />
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {service.features.split(',').map((feat: string, i: number) => (
                          <span key={i} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400">
                            {feat.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Add Service Form */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus size={20} className="text-brand-blue" />
              Add Service
            </h3>
            
            <form action={addService} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Service Title</label>
                <input type="text" name="title" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Skill Development" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Description</label>
                <RichTextEditor name="description" placeholder="Write a detailed description of the service..." />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Key Features (Comma Separated)</label>
                <input type="text" name="features" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="Feature 1, Feature 2, Feature 3" />
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-center cursor-pointer relative overflow-hidden group">
                <input type="file" name="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">Upload Cover Image</p>
                  <p className="text-xs text-slate-500">Click or drag and drop (JPG, PNG)</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">OR PASTE URL</span>
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LinkIcon className="text-slate-400" size={16} />
                  </div>
                  <input type="url" name="imageUrl" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Learn More Link</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LinkIcon className="text-slate-400" size={16} />
                  </div>
                  <input type="text" name="link" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="/courses or /jobs" defaultValue="/contact" />
                </div>
              </div>
              
              <button type="submit" className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors mt-4 shadow-lg shadow-blue-500/20">
                Create Service
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
