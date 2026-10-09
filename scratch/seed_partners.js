const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
  { name: "Premier Energies", domain: "premierenergies.com", image: "/partners/premier_energies.png" },
];

async function seed() {
  for (const [index, p] of partners.entries()) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.partner.upsert({
      where: { slug },
      update: {
        imageUrl: p.image,
        domain: p.domain,
        order: index,
      },
      create: {
        name: p.name,
        slug,
        domain: p.domain,
        imageUrl: p.image,
        order: index,
        description: `Explore open vacancies and details for ${p.name}.`,
      }
    });
  }
  console.log("Seeded partners");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
