export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
        <div className="absolute w-20 h-20 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
        <div className="w-6 h-6 bg-brand-red rounded-full animate-pulse"></div>
      </div>
      <h2 className="mt-8 text-sm font-bold text-slate-500 dark:text-slate-400 animate-pulse tracking-[0.2em] uppercase">
        Loading...
      </h2>
    </div>
  );
}
