import prisma from "@/lib/prisma";
import ClientForm from "@/components/ClientForm";
import { SubmitButton } from "@/components/SubmitButton";
import { updateSiteContent } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const contentDocs = await prisma.siteContent.findMany();
  
  // Transform array into an object for easier lookup
  const content = contentDocs.reduce((acc: Record<string, string>, doc: any) => {
    acc[doc.key] = doc.value;
    return acc;
  }, {});

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Site Content</h2>
        <p className="text-slate-500 text-lg">Manage the text that appears on your public website.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <ClientForm action={updateSiteContent} successMessage="Content updated successfully!" className="p-8">
          
          <div className="space-y-10">
            {/* HOME PAGE SECTION */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-brand-blue border-b border-slate-100 dark:border-slate-800 pb-2">Home Page</h3>
              
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Hero Headline</label>
                <input 
                  type="text" 
                  name="home_hero_title" 
                  defaultValue={content.home_hero_title || "Connecting Talent with Opportunity Across India"} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Hero Subheadline</label>
                <textarea 
                  name="home_hero_subtitle" 
                  rows={2}
                  defaultValue={content.home_hero_subtitle || "Premier recruitment and staffing solutions for IT, HR, Manufacturing, BPO, Finance, and Marketing sectors."} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none" 
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">About Section Title</label>
                <input 
                  type="text" 
                  name="home_about_title" 
                  defaultValue={content.home_about_title || "Why Choose Ruchitha Associates?"} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">About Section Text</label>
                <textarea 
                  name="home_about_text" 
                  rows={4}
                  defaultValue={content.home_about_text || "With years of industry expertise, we specialize in bridging the gap between exceptional talent and industry-leading organizations. Our rigorous selection process ensures that we deliver candidates who not only meet technical requirements but also align with your company culture."} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none" 
                />
              </div>
            </div>

            {/* ABOUT PAGE SECTION */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-brand-blue border-b border-slate-100 dark:border-slate-800 pb-2">About Page</h3>
              
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Our Mission</label>
                <textarea 
                  name="about_mission" 
                  rows={3}
                  defaultValue={content.about_mission || "Our mission is to empower businesses by providing them with top-tier talent while helping professionals achieve their career aspirations through strategic placements."} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none" 
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Our Vision</label>
                <textarea 
                  name="about_vision" 
                  rows={3}
                  defaultValue={content.about_vision || "To be India's most trusted and innovative recruitment partner, setting industry standards for excellence, integrity, and successful talent acquisition."} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none" 
                />
              </div>
            </div>

            {/* FOOTER SECTION */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-brand-blue border-b border-slate-100 dark:border-slate-800 pb-2">Footer</h3>
              
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Footer Description</label>
                <textarea 
                  name="footer_description" 
                  rows={2}
                  defaultValue={content.footer_description || "Your trusted partner in professional recruitment and staffing solutions across India."} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none" 
                />
              </div>
              
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Contact Email</label>
                <input 
                  type="email" 
                  name="contact_email" 
                  defaultValue={content.contact_email || "hr@ruchithaassociates.com"} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Contact Phone</label>
                <input 
                  type="text" 
                  name="contact_phone" 
                  defaultValue={content.contact_phone || "+91 98765 43210"} 
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                />
              </div>
            </div>

          </div>

          <SubmitButton className="w-full mt-10 py-5 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 text-lg">
            Save All Changes
          </SubmitButton>
        </ClientForm>
      </div>
    </div>
  );
}
