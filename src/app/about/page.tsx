import AboutClient from "./AboutClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | Ruchitha Associates",
  description: "Learn more about Ruchitha Associates, our mission, vision, and the impact we make in the placement and recruitment industry.",
};

export default async function AboutPage() {
  let testimonials: any[] = [];
  let content = {};

  try {
    testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "asc" }
    });
    
    const contentDocs = await prisma.siteContent.findMany();
    content = contentDocs.reduce((acc: Record<string, string>, doc: any) => {
      acc[doc.key] = doc.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Database not ready", error);
  }

  // Provide fallback if none exist
  if (testimonials.length === 0) {
    testimonials = [
      {
        id: "t1",
        name: "Priya Sharma",
        role: "Placed Candidate",
        initials: "PS",
        content: "From understanding my requirements to connecting me with the right opportunity, the team provided excellent support and guidance throughout the process."
      },
      {
        id: "t2",
        name: "Rahul Kumar",
        role: "Placed Candidate",
        initials: "RK",
        content: "Ruchitha Associates helped me find the right career opportunity and guided me throughout the placement process. Their professional support made my job search much easier."
      }
    ];
  }

  return <AboutClient testimonials={testimonials} content={content} />;
}
