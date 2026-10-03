export default function LoadingJobs() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-pulse">
          <div className="w-32 h-8 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-6"></div>
          <div className="w-3/4 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl mx-auto mb-6"></div>
          <div className="w-2/3 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto"></div>
        </div>

        {/* Filters skeleton */}
        <div className="flex flex-wrap gap-4 mb-12 items-center justify-center animate-pulse">
           <div className="w-32 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
           <div className="w-24 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
           <div className="w-40 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
           <div className="w-28 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800">
              <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-6"></div>
              <div className="w-3/4 h-6 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
              <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-800 rounded mb-6"></div>
              <div className="space-y-3 mb-8">
                <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="w-5/6 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                <div className="w-24 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
