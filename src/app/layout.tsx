import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import prisma from "@/lib/prisma";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ruchithaassociatess.com"),
  title: {
    default: "Ruchitha Associates | Skill Development, Training & Placement in India",
    template: "%s | Ruchitha Associates"
  },
  description: "Top skill development, training, placement and recruitment company based in India. We empower youth with DDU-GKY and PMKVY programs.",
  keywords: ["Skill Development", "Placement Agency India", "Recruitment", "DDU-GKY India", "PMKVY Training", "Pan-India Jobs", "Employment Agency Telangana"],
  openGraph: {
    title: "Ruchitha Associates | Skill Development & Jobs",
    description: "Empowering careers through professional training and placement assistance across India.",
    url: "https://ruchithaassociatess.com",
    siteName: "Ruchitha Associates",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

import AnalyticsTracker from "@/components/AnalyticsTracker";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "name": "Ruchitha Associates",
  "url": "https://ruchithaassociatess.com",
  "logo": "https://ruchithaassociatess.com/logo-v3.png",
  "description": "Top skill development, training, placement and recruitment company based in India.",
  "telephone": "+91-7674074055",
  "email": "Hr.ruchithaassociates@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6F6G+565, Tukkuguda",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "501359",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://ruchithaassociatess.com"
  ]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let content = {};
  try {
    const contentDocs = await prisma.siteContent.findMany();
    content = contentDocs.reduce((acc: Record<string, string>, doc: any) => {
      acc[doc.key] = doc.value;
      return acc;
    }, {});
  } catch (error) {}

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans relative bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnalyticsTracker />
          {/* Global Film Grain Texture */}
          <div 
            className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          ></div>
          <Header />
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <Footer content={content} />
          <WhatsAppButton />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
