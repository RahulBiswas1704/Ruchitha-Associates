import HomeClient from "./HomeClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  let associates: any[] = [];
  let content = {};
  let partners: any[] = [];
  
  try {
    associates = await prisma.associate.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    
    partners = await prisma.partner.findMany({
      orderBy: { order: 'asc' }
    });
    
    const contentDocs = await prisma.siteContent.findMany();
    content = contentDocs.reduce((acc: Record<string, string>, doc: any) => {
      acc[doc.key] = doc.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Database not ready", error);
  }

  // If no associates exist yet, we will supply the original defaults
  // so the site doesn't look empty before the admin adds real people.
  if (associates.length === 0) {
    associates = [
      { id: "1", name: "Madhan Mohan Reddy", role: "Supervisor", imageSrc: null, linkedinUrl: null },
      { id: "2", name: "Shiek Basha", role: "HR", imageSrc: null, linkedinUrl: null },
      { id: "3", name: "SS RAO", role: "Supervisor", imageSrc: null, linkedinUrl: null },
      { id: "4", name: "Y Joseph", role: "Placement Officer", imageSrc: null, linkedinUrl: null },
      { id: "5", name: "K Himani", role: "Supervisor", imageSrc: null, linkedinUrl: null },
      { id: "6", name: "A Pallavi", role: "Supervisor", imageSrc: null, linkedinUrl: null },
      { id: "7", name: "P Rajesh", role: "Placement Manager", imageSrc: null, linkedinUrl: null },
      { id: "8", name: "A Rahul", role: "Supervisor", imageSrc: null, linkedinUrl: null },
      { id: "9", name: "G Praveen", role: "Placement Manager", imageSrc: null, linkedinUrl: null },
    ] as any;
  }

  return <HomeClient associates={associates} content={content} partners={partners} />;
}
