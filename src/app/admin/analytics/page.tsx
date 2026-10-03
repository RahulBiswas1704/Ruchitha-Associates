import { Activity, Users, MousePointerClick, Globe, ArrowRight, Eye, BarChart2, Briefcase, MessageSquare, Target } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnalyticsDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6); // 7 days including today
  sevenDaysAgo.setHours(0, 0, 0, 0);

  // 1. Total & Today Page Views
  const totalViews = await prisma.pageView.count();
  const todayViews = await prisma.pageView.count({ where: { createdAt: { gte: today } } });

  // 2. Unique Visitors (Session grouping)
  const uniqueSessionsRaw = await prisma.pageView.groupBy({
    by: ['sessionId'],
  });
  const totalUniqueVisitors = uniqueSessionsRaw.length;

  const todayUniqueSessionsRaw = await prisma.pageView.groupBy({
    by: ['sessionId'],
    where: { createdAt: { gte: today } }
  });
  const todayUniqueVisitors = todayUniqueSessionsRaw.length;

  // 3. Traffic Sources (Referrers)
  const referrers = await prisma.pageView.groupBy({
    by: ['referrer'],
    _count: { referrer: true },
    orderBy: { _count: { referrer: 'desc' } },
    take: 10
  });

  // Clean referrers
  const cleanReferrers = referrers.map((r: any) => {
    let name = r.referrer;
    if (!name || name === "") name = "Direct Traffic";
    else if (name.includes("google")) name = "Google Search";
    else if (name.includes("linkedin")) name = "LinkedIn";
    else if (name.includes("facebook") || name.includes("fb")) name = "Facebook";
    else if (name.includes("instagram")) name = "Instagram";
    else {
      try {
        const url = new URL(name);
        name = url.hostname;
      } catch (e) {}
    }
    return { name, count: r._count.referrer };
  });

  // Group similar referrers
  const finalReferrersMap = new Map<string, number>();
  cleanReferrers.forEach((r: any) => {
    finalReferrersMap.set(r.name, (finalReferrersMap.get(r.name) || 0) + r.count);
  });
  const finalReferrers = Array.from(finalReferrersMap.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  // 4. Events / Clicks
  const events = await prisma.analyticsEvent.groupBy({
    by: ['eventName'],
    _count: { eventName: true },
    orderBy: { _count: { eventName: 'desc' } }
  });

  // 4.5 Conversions
  const [totalApplications, todayApplications, totalMessages, todayMessages] = await Promise.all([
    prisma.jobApplication.count(),
    prisma.jobApplication.count({ where: { createdAt: { gte: today } } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { createdAt: { gte: today } } })
  ]);
  
  const totalConversions = totalApplications + totalMessages;
  const todayConversions = todayApplications + todayMessages;
  const conversionRate = totalUniqueVisitors > 0 ? ((totalConversions / totalUniqueVisitors) * 100).toFixed(2) : 0;

  // 5. 7-Day Chart Data
  const last7DaysViews = await prisma.pageView.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
    select: { createdAt: true }
  });

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      views: 0
    };
  });

  last7DaysViews.forEach((view: any) => {
    const viewDateStr = view.createdAt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const day = chartData.find(d => d.date === viewDateStr);
    if (day) day.views++;
  });

  const maxViews = Math.max(...chartData.map(d => d.views), 1); // Avoid div by 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Deep Analytics</h2>
          <p className="text-slate-500 text-lg">Understand your audience, traffic sources, and engagement.</p>
        </div>
        <Link href="/admin" className="px-5 py-2.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          Back to Dashboard
        </Link>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-brand-blue"><Eye size={24} /></div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Total Page Views</h3>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{totalViews} <span className="text-sm font-bold text-emerald-500 ml-2">+{todayViews} today</span></p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-500"><Users size={24} /></div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Unique Visitors</h3>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{totalUniqueVisitors} <span className="text-sm font-bold text-emerald-500 ml-2">+{todayUniqueVisitors} today</span></p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-500"><MousePointerClick size={24} /></div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Tracked Actions</h3>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{events.reduce((acc: number, e: any) => acc + e._count.eventName, 0)}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500"><Target size={24} /></div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Conversion Rate</h3>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{conversionRate}%</p>
        </div>
      </div>
      
      {/* Conversions & Leads Grid */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4 flex items-center gap-2">
        <Target className="text-brand-red" size={20} />
        Conversions & Leads
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-500"><Briefcase size={24} /></div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Job Applications</h3>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{totalApplications} <span className="text-sm font-bold text-emerald-500 ml-2">+{todayApplications} today</span></p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 rounded-2xl bg-brand-blue/10 text-brand-blue"><MessageSquare size={24} /></div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Contact Messages</h3>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{totalMessages} <span className="text-sm font-bold text-emerald-500 ml-2">+{todayMessages} today</span></p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 rounded-2xl bg-brand-red/10 text-brand-red"><Target size={24} /></div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Total Conversions</h3>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{totalConversions} <span className="text-sm font-bold text-emerald-500 ml-2">+{todayConversions} today</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 7-Day Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <BarChart2 className="text-brand-blue" />
              7-Day Activity
            </h3>
          </div>
          
          <div className="flex-1 flex items-end gap-2 h-64 w-full mt-auto">
            {chartData.map((day: any, i: number) => (
              <div key={i} className="flex flex-col items-center justify-end flex-1 gap-3 group h-full">
                <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-t-xl relative h-full flex items-end border-b-2 border-slate-100 dark:border-slate-800">
                   <div 
                     className="w-full bg-brand-blue rounded-t-xl transition-all duration-500 group-hover:bg-blue-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                     style={{ height: `${(day.views / maxViews) * 100}%`, minHeight: day.views > 0 ? '4px' : '0' }}
                   ></div>
                   <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg font-bold left-1/2 -translate-x-1/2 shadow-xl z-10 pointer-events-none">
                     {day.views} views
                   </div>
                </div>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{day.date.split(',')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Globe className="text-brand-blue" />
              Traffic Sources
            </h3>
          </div>
          
          <div className="space-y-4">
            {finalReferrers.length === 0 ? (
              <div className="text-center py-8 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">No sources recorded yet.</div>
            ) : (
              finalReferrers.map((ref: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                    {ref.name}
                  </span>
                  <span className="text-slate-500 font-bold px-3 py-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                    {ref.count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Custom Events / Clicks */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <MousePointerClick className="text-brand-blue" />
              Tracked Actions & Clicks
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">No events recorded yet.</div>
            ) : (
              events.map((event: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-brand-blue/30 transition-colors">
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 capitalize text-lg">{event.eventName.replace(/_/g, ' ')}</h4>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-500 font-medium text-sm">Times Clicked</span>
                    <span className="text-3xl font-black text-brand-blue">{event._count.eventName}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
