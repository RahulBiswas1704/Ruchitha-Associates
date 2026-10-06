import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { MessageSquare, Mail, Phone, Trash2, CheckCircle, Clock } from "lucide-react";

import { markAsRead, deleteMessage } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Inbox</h2>
        <p className="text-slate-500 text-lg">Read and manage inquiries from your website visitors.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <MessageSquare size={20} className="text-brand-blue" />
          All Messages ({messages.length})
        </h3>
        
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
              Your inbox is empty. No new messages at this time.
            </div>
          ) : (
            messages.map((msg: any) => (
              <div 
                key={msg.id} 
                className={`p-6 rounded-2xl border ${
                  msg.isRead 
                    ? "bg-slate-50 dark:bg-slate-950/50 border-slate-100 dark:border-slate-800/50" 
                    : "bg-white dark:bg-slate-900 border-brand-blue/20 shadow-md shadow-blue-500/5"
                } transition-all`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h4 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
                      {msg.name}
                      {!msg.isRead && <span className="px-2 py-0.5 bg-brand-red text-white text-[10px] uppercase font-bold rounded-md">New</span>}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 mt-2">
                      <span className="flex items-center gap-1.5"><Mail size={14} /> <a href={`mailto:${msg.email}`} className="hover:text-brand-blue transition-colors">{msg.email}</a></span>
                      <span className="flex items-center gap-1.5"><Phone size={14} /> <a href={`tel:${msg.phone}`} className="hover:text-brand-blue transition-colors">{msg.phone}</a></span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {!msg.isRead && (
                      <form action={markAsRead}>
                        <input type="hidden" name="id" value={msg.id} />
                        <button type="submit" className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-brand-blue rounded-lg text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                          <CheckCircle size={14} /> Mark Read
                        </button>
                      </form>
                    )}
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={msg.id} />
                      <button type="submit" className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors" title="Delete Message">
                        <Trash2 size={14} />
                      </button>
                    </form>
                  </div>
                </div>
                
                <div className="bg-slate-100/50 dark:bg-slate-800/30 p-4 rounded-xl">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject: {msg.subject}</div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {msg.message || "No additional message provided."}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
