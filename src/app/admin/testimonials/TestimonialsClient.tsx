"use client";

import { useState, useTransition, useRef } from "react";
import { Star, Plus, Trash2, Edit, Quote, X } from "lucide-react";
import { toast } from "sonner";
import { addTestimonial, updateTestimonial } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";
import ClientForm from "@/components/ClientForm";

export default function TestimonialsClient({ testimonials, deleteAction }: { testimonials: any[], deleteAction: (formData: FormData) => Promise<void> }) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const editFormRef = useRef<HTMLFormElement>(null);

  const handleEdit = (testimonial: any) => {
    setEditingId(testimonial.id);
    // Smooth scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const editingTestimonial = testimonials.find(t => t.id === editingId);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Manage Testimonials</h2>
        <p className="text-slate-500 text-lg">Add, edit, or remove candidate and client testimonials shown on the About page.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Testimonials List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Star size={20} className="text-amber-500" />
              Active Testimonials ({testimonials.length})
            </h3>
            
            <div className="space-y-4">
              {testimonials.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                  No testimonials found. Add some to display them on the About page.
                </div>
              ) : (
                testimonials.map((testimonial: any) => (
                  <div key={testimonial.id} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-6 relative group">
                    <Quote className="absolute top-6 right-6 text-slate-200 dark:text-slate-800" size={40} />
                    
                    <div className="w-14 h-14 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 z-10">
                      {testimonial.initials || testimonial.name.substring(0, 2).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0 z-10">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-slate-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-brand-blue font-semibold">{testimonial.role}</p>
                        </div>
                        <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(testimonial)}
                            className="p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all" 
                            title="Edit Testimonial"
                          >
                            <Edit size={18} />
                          </button>
                          <ClientForm action={deleteAction} successMessage="Testimonial Deleted!">
                            <input type="hidden" name="id" value={testimonial.id} />
                            <button type="submit" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all shrink-0" title="Delete Testimonial">
                              <Trash2 size={18} />
                            </button>
                          </ClientForm>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 italic">"{testimonial.content}"</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Add/Edit Testimonial Form */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-28">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {editingId ? (
                  <><Edit size={20} className="text-amber-500" /> Edit Testimonial</>
                ) : (
                  <><Plus size={20} className="text-brand-blue" /> Add Testimonial</>
                )}
              </h3>
              {editingId && (
                <button onClick={cancelEdit} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X size={20} />
                </button>
              )}
            </div>
            
            <ClientForm 
              action={editingId ? updateTestimonial : addTestimonial}
              onSuccess={() => {
                if (editingId) setEditingId(null);
                else {
                  // If it was a new add, the form resets itself natively via ClientForm, but just to be sure
                }
              }}
              successMessage={editingId ? "Testimonial updated!" : "Testimonial added!"}
              className="space-y-4"
              key={editingId || "new"} // Forces form to remount with new default values when editing changes
            >
              {editingId && <input type="hidden" name="id" value={editingId} />}
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Full Name *</label>
                <input type="text" name="name" defaultValue={editingTestimonial?.name || ""} required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Priya Sharma" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Role *</label>
                  <input type="text" name="role" defaultValue={editingTestimonial?.role || ""} required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="Placed Candidate" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Initials</label>
                  <input type="text" name="initials" defaultValue={editingTestimonial?.initials || ""} maxLength={2} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue uppercase" placeholder="PS" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Testimonial Content *</label>
                <textarea name="content" defaultValue={editingTestimonial?.content || ""} required rows={5} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none" placeholder="The actual quote..." />
              </div>
              
              <SubmitButton className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors mt-4 shadow-lg shadow-blue-500/20" loadingText="Saving...">
                {editingId ? "Update Testimonial" : "Add Testimonial"}
              </SubmitButton>
            </ClientForm>
          </div>
        </div>

      </div>
    </div>
  );
}
