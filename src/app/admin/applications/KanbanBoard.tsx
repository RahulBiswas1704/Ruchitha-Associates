"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, FileText, User, Trash2 } from "lucide-react";
import { updateApplicationStatus, deleteApplication } from "@/lib/actions";
import { toast } from "sonner";

export type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string | null;
  status: string;
  createdAt: Date;
  job: { title: string; company: string };
};

const COLUMNS = ["Pending", "Reviewed", "Interview", "Hired", "Rejected"];

const COLUMN_STYLES: Record<string, string> = {
  Pending: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900",
  Reviewed: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
  Interview: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900",
  Hired: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900",
  Rejected: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900",
};

const HEADER_STYLES: Record<string, string> = {
  Pending: "text-amber-700 dark:text-amber-400",
  Reviewed: "text-blue-700 dark:text-blue-400",
  Interview: "text-purple-700 dark:text-purple-400",
  Hired: "text-emerald-700 dark:text-emerald-400",
  Rejected: "text-red-700 dark:text-red-400",
};

export default function KanbanBoard({ initialApplications }: { initialApplications: Application[] }) {
  const [columns, setColumns] = useState<Record<string, Application[]>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Group applications by status
    const initialCols: Record<string, Application[]> = {};
    COLUMNS.forEach(col => initialCols[col] = []);
    
    initialApplications.forEach(app => {
      // Migrate old statuses just in case
      let status = app.status;
      if (!COLUMNS.includes(status)) status = "Pending";
      initialCols[status].push(app);
    });
    
    setColumns(initialCols);
  }, [initialApplications]);

  const handleDeleteApplication = async (appId: string, status: string) => {
    if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;
    
    // Optimistic Update
    const newColumns = { ...columns };
    newColumns[status] = newColumns[status].filter(app => app.id !== appId);
    setColumns(newColumns);

    try {
      const res = await deleteApplication(appId);
      if (res.error) throw new Error(res.error);
      toast.success("Application deleted");
    } catch (e) {
      toast.error("Failed to delete application");
      // Could revert here if needed
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    
    // If dropped in the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;
    
    // Optimistic UI Update
    const newColumns = { ...columns };
    const sourceApps = [...newColumns[sourceCol]];
    const destApps = [...newColumns[destCol]];
    
    const [movedApp] = sourceApps.splice(source.index, 1);
    movedApp.status = destCol; // Update status field locally
    destApps.splice(destination.index, 0, movedApp);
    
    newColumns[sourceCol] = sourceApps;
    newColumns[destCol] = destApps;
    setColumns(newColumns);
    
    // API Call
    try {
      const res = await updateApplicationStatus(draggableId, destCol);
      if (res.error) throw new Error(res.error);
      toast.success(`Moved to ${destCol}`);
    } catch (e) {
      toast.error("Failed to move application");
      // Revert in real app (omitted here for simplicity, page will refresh eventually)
    }
  };

  if (!isClient) return null; // Avoid hydration mismatch for DnD

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
        {COLUMNS.map((columnId) => (
          <div key={columnId} className="snap-center shrink-0 w-[350px]">
            <div className={`rounded-3xl border ${COLUMN_STYLES[columnId]} p-4 flex flex-col h-[75vh] max-h-[800px]`}>
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className={`font-black text-lg ${HEADER_STYLES[columnId]}`}>{columnId}</h3>
                <span className="bg-white/60 dark:bg-black/20 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {columns[columnId]?.length || 0}
                </span>
              </div>
              
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 overflow-y-auto min-h-[100px] rounded-2xl transition-colors ${snapshot.isDraggingOver ? 'bg-black/5 dark:bg-white/5' : ''}`}
                  >
                    <div className="space-y-3 p-1">
                      {columns[columnId]?.map((app, index) => (
                        <Draggable key={app.id} draggableId={app.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all ${snapshot.isDragging ? 'shadow-xl scale-105 rotate-1 z-50 ring-2 ring-brand-blue' : 'hover:shadow-md'}`}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-900 dark:text-white truncate" title={app.name}>{app.name}</h4>
                                {app.status === 'Pending' && <Clock size={16} className="text-amber-500 shrink-0" />}
                                {app.status === 'Hired' && <CheckCircle size={16} className="text-emerald-500 shrink-0" />}
                                {app.status === 'Rejected' && <XCircle size={16} className="text-red-500 shrink-0" />}
                              </div>
                              
                              <p className="text-xs text-brand-blue font-bold mb-1 truncate" title={app.job.title}>{app.job.title}</p>
                              <p className="text-xs text-slate-500 truncate mb-4">{app.job.company}</p>
                              
                              <div className="flex gap-2 justify-between items-center mt-4">
                                <div className="text-[10px] text-slate-400 font-medium">
                                  {new Date(app.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex gap-2">
                                  <a 
                                    href={app.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FileText size={14} /> Resume
                                  </a>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteApplication(app.id, app.status);
                                    }}
                                    className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                    title="Delete Application"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
