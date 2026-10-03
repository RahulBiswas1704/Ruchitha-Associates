import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Ruchitha Associates",
  description: "Terms and Conditions for Ruchitha Associates. Read our terms of service before using our platform.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-24">
      
      {/* 1. HERO PAGE HEADER */}
      <section className="relative py-20 bg-brand-blue dark:bg-slate-900 overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="2" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Terms & Conditions
          </h1>
          <div className="flex items-center justify-center gap-3 text-blue-100 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-white">Terms</span>
          </div>
        </div>
      </section>

      {/* 2. CONTENT */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 font-medium mb-8">
            Last updated: October 2026
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">1. Agreement to Terms</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            By accessing or using our website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you may not use our services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">2. Description of Services</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Ruchitha Associates provides skill development, training, and placement services across India. We act as a facilitator connecting job seekers with prospective employers and providing training under programs such as PMKVY and DDU-GKY.
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-6 space-y-2">
            <li>We do not guarantee employment to every candidate who registers with us.</li>
            <li>We do not charge candidates for standard job placements unless explicitly stated under a specialized paid training model.</li>
            <li>Employers are responsible for the final selection and hiring decisions.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">3. User Responsibilities</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            You agree to provide accurate, current, and complete information during the registration or application process. You are solely responsible for the authenticity of the information, documents, and credentials you submit to us. Misrepresentation of facts may result in immediate termination of our services to you.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">4. Intellectual Property</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            The website and its original content, features, and functionality are owned by Ruchitha Associates and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">5. Limitation of Liability</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            In no event shall Ruchitha Associates, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use our services.
          </p>
        </div>
      </section>

    </div>
  );
}
