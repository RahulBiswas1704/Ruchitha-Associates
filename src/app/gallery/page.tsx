import GalleryClient from "./GalleryClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Ruchitha Associates",
  description: "Explore our gallery of placement drives, skill training sessions, corporate events, and office culture.",
};

export default async function GalleryPage() {
  // Fetch real images from the database
  let images: any[] = [];
  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Database not ready", error);
  }

  // Pass dynamic data to the Client Component for interactivity
  return <GalleryClient initialImages={images} />;
}
