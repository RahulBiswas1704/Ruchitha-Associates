import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Users, Trash2, Plus, Briefcase, Link as LinkIcon } from "lucide-react";
import Image from "next/image";


import ClientForm from "@/components/ClientForm";
import { SubmitButton } from "@/components/SubmitButton";

import { addMember, moveMember, deleteMember } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const team = await prisma.associate.findMany({
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ]
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Team Members</h2>
        <p className="text-slate-500 text-lg">Manage the associates and team members shown on the homepage.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Team List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Users size={20} className="text-emerald-500" />
              Active Associates ({team.length})
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.length === 0 ? (
                <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                  No team members found. Add some using the form!
                </div>
              ) : (
                team.map((member: any, idx: number) => (
                  <div key={member.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center gap-4 group">
                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                      {member.imageSrc ? (
                        <img src={member.imageSrc} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Users size={24} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">{member.name}</h4>
                      <p className="text-sm font-medium text-brand-blue truncate mb-1">{member.role}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {member.phone && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[10px] uppercase font-bold truncate max-w-[100px]">{member.phone}</span>}
                        {member.email && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[10px] uppercase font-bold truncate max-w-[100px]" title={member.email}>{member.email}</span>}
                        {member.linkedinUrl && <a href={member.linkedinUrl} target="_blank" className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-brand-blue rounded text-[10px] uppercase font-bold truncate max-w-[100px]">LinkedIn</a>}
                        {member.otherLink && <a href={member.otherLink} target="_blank" className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[10px] uppercase font-bold truncate max-w-[100px]">Link</a>}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1 items-center justify-center pr-2 border-r border-slate-200 dark:border-slate-800">
                      <form action={moveMember}>
                        <input type="hidden" name="id" value={member.id} />
                        <input type="hidden" name="direction" value="up" />
                        <button type="submit" disabled={idx === 0} className={`p-1.5 rounded-lg transition-all ${idx === 0 ? 'opacity-30 cursor-not-allowed text-slate-300' : 'text-slate-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/20'}`} title="Move Up">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                        </button>
                      </form>
                      
                      <form action={moveMember}>
                        <input type="hidden" name="id" value={member.id} />
                        <input type="hidden" name="direction" value="down" />
                        <button type="submit" disabled={idx === team.length - 1} className={`p-1.5 rounded-lg transition-all ${idx === team.length - 1 ? 'opacity-30 cursor-not-allowed text-slate-300' : 'text-slate-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/20'}`} title="Move Down">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6-6"/></svg>
                        </button>
                      </form>
                    </div>

                    <form action={deleteMember} className="pl-2">
                      <input type="hidden" name="id" value={member.id} />
                      <button type="submit" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all" title="Remove Member">
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Add Member Form */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus size={20} className="text-brand-blue" />
              Add Team Member
            </h3>
            
            <ClientForm action={addMember} successMessage="Team Member added!" className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Full Name</label>
                <input type="text" name="name" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Sarah Connor" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Job Title / Role</label>
                <input type="text" name="role" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Senior HR Manager" />
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-center cursor-pointer relative overflow-hidden group">
                <input type="file" name="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">Upload Profile Photo</p>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Phone (Optional)</label>
                  <input type="tel" name="phone" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="+91..." />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Email (Optional)</label>
                  <input type="email" name="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="hello@..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">LinkedIn URL (Optional)</label>
                  <input type="url" name="linkedinUrl" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="https://linkedin.com/in/..." />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Other Link (Optional)</label>
                  <input type="url" name="otherLink" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="https://twitter.com/..." />
                </div>
              </div>
              
              <SubmitButton className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors mt-4 shadow-lg shadow-emerald-500/20" loadingText="Adding Member...">
                Add to Team
              </SubmitButton>
            </ClientForm>
          </div>
        </div>

      </div>
    </div>
  );
}
