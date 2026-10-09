"use client";

import { useState } from "react";
import Link from "next/link";

const PartnerLogo = ({ partner }: { partner: any }) => {
  const inner = (
    <div className="group flex items-center justify-center min-w-[240px] h-28 mx-4 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] border border-gray-100 dark:border-white/10 hover:shadow-[0_12px_40px_-4px_rgba(8,31,92,0.15)] dark:hover:shadow-[0_12px_40px_-4px_rgba(255,255,255,0.1)] hover:-translate-y-2 hover:border-brand-blue/30 dark:hover:border-white/30 transition-all duration-500 cursor-pointer p-6">
      {partner.imageUrl || partner.image ? (
        <img 
          src={partner.imageUrl || partner.image} 
          alt={`${partner.name} logo`} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className="font-sans font-black text-2xl text-brand-blue whitespace-nowrap tracking-tight group-hover:scale-105 transition-transform duration-500">
          {partner.name}
        </span>
      )}
    </div>
  );
  
  if (partner.slug) {
    return <Link href={`/partners/${partner.slug}`}>{inner}</Link>;
  }

  return inner;
};

export default function PartnersMarquee({ partners = [] }: { partners?: any[] }) {
  if (!partners || partners.length === 0) {
    return null;
  }

  const half = Math.ceil(partners.length / 2);
  const row1Partners = partners.slice(0, half);
  const row2Partners = partners.slice(half);

  // Quadruple the arrays to ensure they are wide enough for ultra-wide screens
  // The CSS animation translates by -50%, so the first half must identical to the second half.
  const row1 = [...row1Partners, ...row1Partners, ...row1Partners, ...row1Partners];
  const row2 = [...row2Partners, ...row2Partners, ...row2Partners, ...row2Partners];

  return (
    <section id="partners" className="py-16 bg-white dark:bg-slate-950 overflow-hidden relative transition-colors duration-500">
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-sm font-bold tracking-[0.2em] text-brand-red dark:text-red-400 uppercase mb-4">Trusted Hiring Partners</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">Empowering the Future Workforce</h2>
      </div>
      
      <div className="relative flex flex-col gap-2 overflow-hidden group">
        {/* Left/Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        
        {/* Top Track (Moving Left) */}
        <div className="flex w-max animate-marquee py-6 hover:[animation-play-state:paused]">
          {row1.map((partner, index) => (
            <PartnerLogo key={`row1-${partner.name}-${index}`} partner={partner} />
          ))}
        </div>

        {/* Bottom Track (Moving Right) */}
        <div className="flex w-max animate-marquee-reverse py-6 hover:[animation-play-state:paused]">
          {row2.map((partner, index) => (
            <PartnerLogo key={`row2-${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
