export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="w-64 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl mb-3"></div>
        <div className="w-96 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left main area */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
             <div className="w-48 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg mb-8"></div>
             
             <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="w-full h-24 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 flex gap-4">
                   <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                   <div className="flex-1 space-y-3 py-2">
                     <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                     <div className="w-1/4 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right side form area */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
             <div className="w-40 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg mb-8"></div>
             <div className="space-y-6">
                <div>
                  <div className="w-24 h-3 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                  <div className="w-full h-12 bg-slate-50 dark:bg-slate-950 rounded-xl"></div>
                </div>
                <div>
                  <div className="w-32 h-3 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                  <div className="w-full h-12 bg-slate-50 dark:bg-slate-950 rounded-xl"></div>
                </div>
                <div>
                  <div className="w-28 h-3 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                  <div className="w-full h-12 bg-slate-50 dark:bg-slate-950 rounded-xl"></div>
                </div>
                <div className="w-full h-14 bg-slate-200 dark:bg-slate-800 rounded-xl mt-4"></div>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
