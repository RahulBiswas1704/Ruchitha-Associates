"use client";

import { useState } from "react";

const partners = [
  { name: "RenewSys", domain: "renewsysworld.com", image: "/partners/renewsys.png" },
  { name: "Frontier Energies", domain: "frontierenergies.com", image: "/partners/frontier_energies.webp" },
  { name: "Brightgrid", domain: "brightgrid.ai", image: "/partners/brightgrid.png" },
  { name: "OSI Maritime", domain: "osimaritime.com", image: "/partners/osi_maritime.png" },
  { name: "Cyient DLM", domain: "cyientdlm.com", image: "/partners/cyient_dlm.png" },
  { name: "Foxconn", domain: "foxconn.com", image: "/partners/foxconn.svg" },
  { name: "Schneider Electric", domain: "se.com", image: "/partners/schneider_electric.svg" },
  { name: "Zap91", domain: "zap91.com", image: "/partners/zap91.png" },
  { name: "Rapiscan Systems", domain: "rapiscansystems.com", image: "/partners/rapiscan_systems.png" },
  { name: "Resolute Electronics", domain: "resoluteelectronics.com", image: "/partners/resolute_electronics.png" },
  { name: "Amber Resojet", domain: "amberresojet.com", image: "/partners/amber_resojet.png" },
  { name: "Orient Electric", domain: "orientelectric.com", image: "/partners/orient_electric.png" },
  { name: "Avishkar Industries", domain: "avishkarindustries.com", image: "/partners/avishkar_industries.jpg" },
  { name: "Radiant Appliances", domain: "radiantappliances.com", image: "/partners/radiant_appliances.png" },
];

const PartnerLogo = ({ partner }: { partner: typeof partners[0] }) => {
  return (
    <div className="group flex items-center justify-center min-w-[240px] h-28 mx-4 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_12px_40px_-4px_rgba(8,31,92,0.15)] hover:-translate-y-2 hover:border-brand-blue/30 transition-all duration-500 cursor-pointer p-6">
      {partner.image ? (
        <img 
          src={partner.image} 
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
};

export default function PartnersMarquee() {
  const row1Partners = partners.slice(0, 7);
  const row2Partners = partners.slice(7, 14);

  // Quadruple the arrays to ensure they are wide enough for ultra-wide screens
  // The CSS animation translates by -50%, so the first half must identical to the second half.
  const row1 = [...row1Partners, ...row1Partners, ...row1Partners, ...row1Partners];
  const row2 = [...row2Partners, ...row2Partners, ...row2Partners, ...row2Partners];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 overflow-hidden relative transition-colors duration-500">
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-sm font-bold tracking-[0.2em] text-brand-red uppercase mb-4">Trusted Hiring Partners</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Empowering the Future Workforce</h2>
      </div>
      
      <div className="relative flex flex-col gap-8 overflow-hidden group">
        {/* Left/Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        {/* Top Track (Moving Left) */}
        <div className="flex w-max animate-marquee">
          {row1.map((partner, index) => (
            <PartnerLogo key={`row1-${partner.name}-${index}`} partner={partner} />
          ))}
        </div>

        {/* Bottom Track (Moving Right) */}
        <div className="flex w-max animate-marquee-reverse">
          {row2.map((partner, index) => (
            <PartnerLogo key={`row2-${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
