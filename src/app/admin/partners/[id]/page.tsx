import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { updatePartnerContent } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminEditPartnerPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const partner = await prisma.partner.findUnique({
    where: { id: params.id }
  });

  if (!partner) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/partners" className="p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">Edit {partner.name}</h2>
          <p className="text-slate-500">Update vacancies and details for this partner.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <form action={updatePartnerContent} className="space-y-6">
          <input type="hidden" name="id" value={partner.id} />
          
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Short Description</label>
            <input 
              type="text" 
              name="description" 
              defaultValue={partner.description || ""}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" 
              placeholder="A short description of this partner or current hiring status..." 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Partner Page Content (Vacancies & Details)</label>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950">
               <RichTextEditor name="content" defaultValue={partner.content || ""} placeholder="List vacancies, job requirements, and company details here..." />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-8 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
