import JobsClient from "./JobsClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Career & Jobs | Ruchitha Associates",
  description: "Find your dream job across India. We offer placements in IT, HR, Manufacturing, BPO, Finance, and Marketing sectors.",
};

export default async function CareerPage({ searchParams }: { searchParams: Promise<{ page?: string, search?: string, category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const search = resolvedSearchParams.search || "";
  const category = resolvedSearchParams.category || "All";
  const ITEMS_PER_PAGE = 9;

  const whereClause: any = {};
  if (category !== "All") {
    whereClause.category = category;
  }
  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
    ];
  }

  let jobs: any[] = [];
  let totalJobs = 0;
  
  try {
    totalJobs = await prisma.job.count({ where: whereClause });
    jobs = await prisma.job.findMany({
      where: whereClause,
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Database not ready", error);
  }

  const totalPages = Math.ceil(totalJobs / ITEMS_PER_PAGE);

  // Pass dynamic data to the Client Component for interactivity
  return (
    <JobsClient 
      initialJobs={jobs} 
      totalJobs={totalJobs}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
      currentCategory={category}
    />
  );
}
