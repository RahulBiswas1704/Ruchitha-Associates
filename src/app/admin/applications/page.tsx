import prisma from "@/lib/prisma";
import KanbanBoard from "./KanbanBoard";
import ExportCsvButton from "@/components/ExportCsvButton";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  // Fetch all applications for the Kanban board
  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      job: true
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Application Pipeline</h2>
          <p className="text-slate-500 text-lg">Drag and drop candidates to update their status.</p>
        </div>
        
        <div className="flex shrink-0">
          <ExportCsvButton 
            data={applications.map((app: any) => ({
              ID: app.id,
              Name: app.name,
              Email: app.email,
              Phone: app.phone,
              "Job Title": app.job.title,
              Company: app.job.company,
              Status: app.status,
              "Applied Date": new Date(app.createdAt).toLocaleDateString(),
              "Resume URL": app.resumeUrl,
              "Cover Letter": app.coverLetter || ""
            }))} 
            filename="candidates_export.csv" 
          />
        </div>
      </div>

      <div className="-mx-4 sm:mx-0">
        <KanbanBoard initialApplications={applications} />
      </div>
    </div>
  );
}


