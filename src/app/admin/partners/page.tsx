import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Building2, Trash2, Plus, Edit, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { addPartner, deletePartner, updatePartnerOrder } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Manage Partners</h2>
        <p className="text-slate-500 text-lg">Add or remove hiring partners, and manage their individual pages.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Partners List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Building2 size={20} className="text-brand-purple" />
              Active Partners ({partners.length})
            </h3>
            
            <div className="space-y-4">
              {partners.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                  No partners found. Add one to display it on the website.
                </div>
              ) : (
                partners.map((partner: any, index: number) => (
                  <div key={partner.id} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6">
                    {/* Image Thumbnail */}
                    <div className="w-full sm:w-32 h-20 rounded-xl overflow-hidden shrink-0 bg-white dark:bg-slate-800 flex items-center justify-center p-2">
                      {partner.imageUrl ? (
                         <img src={partner.imageUrl} alt={partner.name} className="w-full h-full object-contain" />
                      ) : (
                         <span className="font-bold text-brand-blue">{partner.name}</span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-slate-900 dark:text-white truncate">{partner.name}</h4>
                          {partner.domain && <p className="text-sm text-slate-500">{partner.domain}</p>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <form action={updatePartnerOrder.bind(null, partner.id, "up")}>
                            <button type="submit" disabled={index === 0} className="p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30 disabled:hover:bg-transparent rounded-xl transition-all" title="Move Up">
                              <ArrowUp size={18} />
                            </button>
                          </form>
                          <form action={updatePartnerOrder.bind(null, partner.id, "down")}>
                            <button type="submit" disabled={index === partners.length - 1} className="p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30 disabled:hover:bg-transparent rounded-xl transition-all" title="Move Down">
                              <ArrowDown size={18} />
                            </button>
                          </form>
                          <Link href={`/admin/partners/${partner.id}`} className="p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all" title="Edit Partner">
                            <Edit size={18} />
                          </Link>
                          <form action={deletePartner}>
                            <input type="hidden" name="id" value={partner.id} />
                            <button type="submit" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all shrink-0" title="Delete Partner">
                              <Trash2 size={18} />
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Add Partner Form */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus size={20} className="text-brand-blue" />
              Add Partner
            </h3>
            
            <form action={addPartner} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Company Name</label>
                <input type="text" name="name" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Acme Corp" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Domain (Optional)</label>
                <input type="text" name="domain" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="acmecorp.com" />
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-center cursor-pointer relative overflow-hidden group">
                <input type="file" name="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">Upload Logo</p>
                  <p className="text-xs text-slate-500">Click or drag and drop (JPG, PNG, SVG)</p>
                </div>
              </div>
              
              <button type="submit" className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors mt-4 shadow-lg shadow-blue-500/20">
                Add Partner
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
