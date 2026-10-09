import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import ClientForm from "@/components/ClientForm";
import { SubmitButton } from "@/components/SubmitButton";
import { updatePartnerContent, deletePartnerPdf } from "@/lib/actions";

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
        <ClientForm action={updatePartnerContent} resetOnSuccess={false} successMessage="Changes Saved!" className="space-y-6">
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

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Upload Company PDF / Brochure</label>
            <div className="flex flex-col gap-3">
              {partner.pdfUrl && (
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 text-brand-blue rounded-xl text-sm font-medium border border-blue-100 dark:border-blue-800">
                  <a href={partner.pdfUrl} target="_blank" rel="noreferrer" className="underline hover:text-blue-700">View Current PDF</a>
                  <button type="submit" formAction={deletePartnerPdf} className="text-red-500 hover:text-red-700 font-bold px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors text-xs uppercase tracking-wider">
                    Remove PDF
                  </button>
                </div>
              )}
              <input 
                type="file" 
                name="pdfFile" 
                accept=".pdf,application/pdf"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" 
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <SubmitButton>
              <Save size={18} />
              Save Changes
            </SubmitButton>
          </div>
        </ClientForm>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mt-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Partner Job Openings</h3>
            <p className="text-sm text-slate-500">Manage vacancies for {partner.name}</p>
          </div>
          <Link href={`/admin/jobs?company=${encodeURIComponent(partner.name)}`} className="px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors">
            Manage All Jobs
          </Link>
        </div>

        <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
           To add, edit or delete job openings for this partner, please use the central <Link href="/admin/jobs" className="text-brand-blue font-bold hover:underline">Jobs Management Panel</Link>. When adding a new job, simply enter <strong>{partner.name}</strong> as the Company / Client name to link it to this page.
        </div>
      </div>
    </div>
  );
}
