import prisma from "@/lib/prisma";
import TestimonialsClient from "./TestimonialsClient";
import { revalidatePath } from "next/cache";
import { deleteTestimonial } from "@/lib/actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Testimonials | Ruchitha Admin",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <TestimonialsClient testimonials={testimonials} deleteAction={deleteTestimonial} />;
}
