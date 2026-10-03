import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  
  async function handleLogin(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    
    // Default password is 'admin123' if not set in .env
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    
    if (password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      redirect("/admin");
    } else {
      redirect("/login?error=Invalid password");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 dark:border-slate-800">
        
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock size={32} />
        </div>
        
        <h1 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-2">Admin Access</h1>
        <p className="text-center text-slate-500 mb-8">Please enter the master password to access the Ruchitha Associates dashboard.</p>
        
        {searchParams?.error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold text-center rounded-xl">
            {searchParams.error}
          </div>
        )}

        <form action={handleLogin} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Master Password</label>
            <input 
              type="password" 
              name="password" 
              required
              autoFocus
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 dark:text-white font-medium transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group"
          >
            Access Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
      </div>
      
      <a href="/" className="mt-8 text-slate-500 font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
        &larr; Back to Website
      </a>
    </div>
  );
}
