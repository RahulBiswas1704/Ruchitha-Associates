export default function LoadingGallery() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-24">
      {/* Hero Skeleton */}
      <section className="relative py-20 lg:py-28 bg-slate-200 dark:bg-slate-900 overflow-hidden mb-16 animate-pulse">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="w-64 h-12 bg-slate-300 dark:bg-slate-800 rounded-2xl mb-6"></div>
          <div className="w-48 h-6 bg-slate-300 dark:bg-slate-800 rounded-lg"></div>
        </div>
      </section>

      {/* Gallery Grid Skeleton */}
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-pulse">
          <div className="w-20 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          <div className="w-32 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          <div className="w-28 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          <div className="w-36 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/3] rounded-3xl bg-slate-200 dark:bg-slate-800 border border-slate-100 dark:border-slate-800"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
