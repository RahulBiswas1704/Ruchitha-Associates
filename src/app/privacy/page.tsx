import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Ruchitha Associates",
  description: "Privacy Policy for Ruchitha Associates. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-3 text-blue-100 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-white">Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* 2. CONTENT */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 font-medium mb-8">
            Last updated: October 2026
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">1. Introduction</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Welcome to Ruchitha Associates. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">2. The Data We Collect About You</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-6 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
            <li><strong>Professional Data:</strong> includes your resume, employment history, educational background, and skills.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">3. How We Use Your Personal Data</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 mb-6 space-y-2">
            <li>To match your profile with relevant job opportunities and employers.</li>
            <li>To enroll you in training programs like PMKVY and DDU-GKY.</li>
            <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
            <li>To improve our website, services, marketing, and candidate experiences.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">4. Data Security</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">5. Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <br/><br/>
            <strong>Ruchitha Associates</strong><br/>
            Email: Hr.ruchithaassociates@gmail.com<br/>
            Phone: +91 7674074055<br/>
            Address: 6F6G+565, Tukkuguda, Telangana 501359
          </p>
        </div>
      </section>

    </div>
  );
}
