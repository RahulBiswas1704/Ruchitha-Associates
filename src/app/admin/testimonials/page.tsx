import prisma from "@/lib/prisma";
import TestimonialsClient from "./TestimonialsClient";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Testimonials | Ruchitha Admin",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function deleteTestimonial(formData: FormData) {
    "use server";
    
    const id = formData.get("id") as string;
    await prisma.testimonial.delete({ where: { id } });
    
    revalidatePath("/admin/testimonials");
    revalidatePath("/about");
  }

  return <TestimonialsClient testimonials={testimonials} deleteAction={deleteTestimonial} />;
}
