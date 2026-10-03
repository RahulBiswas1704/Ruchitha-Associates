import { Briefcase, Image as ImageIcon, Users, MessageSquare, ArrowRight, Eye, Activity } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch stats from database safely
  let statsData = { jobs: 0, images: 0, team: 0, messages: 0, pageViews: 0, todayViews: 0 };
  let recentMessages: any[] = [];
  let topPages: any[] = [];
  
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [jobCount, imageCount, associateCount, messageCount, totalViews, todayViews] = await Promise.all([
      prisma.job.count(),
      prisma.galleryImage.count(),
      prisma.associate.count(),
      prisma.contactMessage.count(),
      prisma.pageView.count(),
      prisma.pageView.count({
        where: { createdAt: { gte: today } }
      })
    ]);
    statsData = { jobs: jobCount, images: imageCount, team: associateCount, messages: messageCount, pageViews: totalViews, todayViews };
    
    recentMessages = await prisma.contactMessage.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' }
    });

    const rawPageViews = await prisma.pageView.groupBy({
      by: ['path'],
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: 5
    } as any);
    topPages = rawPageViews;
  } catch (error) {
    console.error("Database not initialized yet.", error);
  }

  const stats = [
    { name: "Website Visits (Total)", value: statsData.pageViews, icon: Activity, color: "text-brand-blue", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { name: "Visits Today", value: statsData.todayViews, icon: Eye, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { name: "Unread Messages", value: statsData.messages, icon: MessageSquare, color: "text-brand-red", bg: "bg-red-50 dark:bg-red-900/20" },
    { name: "Total Active Jobs", value: statsData.jobs, icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome Back!</h2>
        <p className="text-slate-500 text-lg">Here is an overview of your website's performance and data today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-slate-500 font-medium mb-1">{stat.name}</h3>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 lg:col-span-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <Link href="/admin/analytics" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-brand-blue transition-colors group">
              <div className="flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300">
                <Activity size={18} className="text-brand-blue" />
                Deep Analytics
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
            </Link>
            <Link href="/admin/jobs" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-brand-blue transition-colors group">
              <div className="flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300">
                <Briefcase size={18} className="text-brand-blue" />
                Post a New Job
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
            </Link>
            <Link href="/admin/gallery" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-brand-blue transition-colors group">
              <div className="flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300">
                <ImageIcon size={18} className="text-brand-blue" />
                Upload Gallery Photo
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
            </Link>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Messages</h3>
            <Link href="/admin/messages" className="text-brand-blue font-medium hover:underline text-sm">View All</Link>
          </div>
          
          <div className="space-y-4">
            {recentMessages.length === 0 ? (
              <div className="text-center py-8 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                No recent messages found.
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {msg.name}
                      {!msg.isRead && <span className="w-2 h-2 rounded-full bg-brand-red block"></span>}
                    </h4>
                    <p className="text-sm text-slate-500 mb-1">{msg.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-2">{new Date(msg.createdAt).toLocaleDateString()}</p>
                    <Link href="/admin/messages" className="px-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
         {/* Top Visited Pages */}
         <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Top Visited Pages</h3>
             <Activity className="text-brand-blue opacity-50" size={24} />
           </div>
           <div className="space-y-4">
             {topPages.length === 0 ? (
               <div className="text-center py-8 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                 No visits recorded yet.
               </div>
             ) : (
               topPages.map((page, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-brand-blue/30 transition-colors">
                   <div className="flex items-center gap-3">
                     <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-brand-blue flex items-center justify-center font-bold text-sm">#{idx + 1}</span>
                     <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-xs">{page.path === '/' ? 'Home Page' : page.path}</span>
                   </div>
                   <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                     <Eye size={16} className="text-emerald-500" />
                     {page._count.path}
                   </div>
                 </div>
               ))
             )}
           </div>
         </div>
         
         <div className="bg-brand-blue p-8 rounded-3xl shadow-sm text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute right-[-10%] top-[-10%] opacity-10">
               <Activity size={300} />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Analytics Engine is Live</h3>
            <p className="text-blue-100 mb-6 text-lg max-w-md relative z-10">
              The dashboard now tracks every page view dynamically without using third-party cookies.
              Track how your customers are engaging with your website in real-time.
            </p>
            <div className="mt-auto relative z-10">
              <Link href="/" className="inline-flex px-6 py-3 bg-white text-brand-blue rounded-xl font-bold hover:bg-slate-50 transition-colors">
                View Live Site
              </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
