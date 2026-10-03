"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendAdminNotification } from "@/lib/email";

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      }
    });
    
    // Revalidate the admin dashboard so the new message appears immediately
    revalidatePath("/admin");
    revalidatePath("/admin/messages");
    
    // Send email notification
    await sendAdminNotification(
      `New Contact Message: ${data.subject}`,
      `You have received a new contact message from ${data.name}.\n\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
      `<h2>New Contact Message</h2>
       <p><strong>Name:</strong> ${data.name}</p>
       <p><strong>Email:</strong> ${data.email}</p>
       <p><strong>Phone:</strong> ${data.phone}</p>
       <p><strong>Subject:</strong> ${data.subject}</p>
       <br/>
       <p><strong>Message:</strong></p>
       <p>${data.message.replace(/\n/g, '<br/>')}</p>`
    );
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return { success: false, error: "Failed to submit message." };
  }
}
