"use server";

import prisma from "@/lib/prisma";
import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";
import { revalidatePath } from "next/cache";
import { sendAdminNotification } from "@/lib/email";

export async function trackPageView(path: string, referrer?: string, userAgent?: string, sessionId?: string) {
  try {
    await prisma.pageView.create({
      data: {
        path,
        referrer: referrer || null,
        userAgent: userAgent || null,
        sessionId: sessionId || null,
      }
    });
  } catch (error) {
    // Analytics should not crash the app, so we fail silently
  }
}

export async function trackEvent(eventName: string, eventData?: string, path?: string, sessionId?: string) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        eventName,
        eventData: eventData || null,
        path: path || null,
        sessionId: sessionId || null,
      }
    });
  } catch (error) {
    // Fail silently
  }
}

export async function applyForJob(formData: FormData) {
  try {
    const jobId = formData.get("jobId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string | null;
    const file = formData.get("resume") as File;

    if (!jobId || !name || !email || !phone || !file || file.size === 0) {
      return { error: "Missing required fields" };
    }

    // Upload resume
    const files = new Files({ adapter: neon({ bucket: "images" }) });
    const uniqueFilename = `resume-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    await files.upload(uniqueFilename, file, { contentType: file.type });
    const resumeUrl = `${process.env.AWS_ENDPOINT_URL_S3}/images/${uniqueFilename}`;

    await prisma.jobApplication.create({
      data: {
        jobId,
        name,
        email,
        phone,
        resumeUrl,
        coverLetter,
      },
    });

    // Send email notification
    await sendAdminNotification(
      `New Job Application: ${name}`,
      `You have received a new job application from ${name} for job ID: ${jobId}.\n\nEmail: ${email}\nPhone: ${phone}\nResume: ${resumeUrl}`,
      `<h2>New Job Application</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Job ID:</strong> ${jobId}</p>
       <br/>
       <p><strong>Cover Letter:</strong></p>
       <p>${coverLetter ? coverLetter.replace(/\n/g, '<br/>') : '<em>None provided</em>'}</p>
       <br/>
       <a href="${resumeUrl}" style="display:inline-block;padding:10px 20px;background-color:#1e40af;color:white;text-decoration:none;border-radius:5px;">Download Resume</a>`
    );

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Something went wrong" };
  }
}

export async function updateSiteContent(formData: FormData) {
  try {
    const keys = Array.from(formData.keys()).filter(k => k !== '$ACTION_ID_...' && !k.startsWith('$ACTION'));
    
    const updates = keys.map(key => {
      const value = formData.get(key) as string;
      return prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    });

    await prisma.$transaction(updates);
    
    revalidatePath("/", "layout"); // Revalidate entire site
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update content" };
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await prisma.jobApplication.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/applications");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update status" };
  }
}

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    
    if (!email || !email.includes("@")) {
      return { error: "Please provide a valid email address" };
    }

    // Try to find existing
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existing) {
      if (!existing.isActive) {
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true }
        });
        return { success: true, message: "Welcome back! You've been re-subscribed." };
      }
      return { error: "You are already subscribed to our newsletter." };
    }

    await prisma.newsletterSubscriber.create({
      data: { email }
    });

    // Send email notification for new subscriber
    await sendAdminNotification(
      "New Newsletter Subscriber",
      `A new user has subscribed to the newsletter: ${email}`,
      `<h2>New Newsletter Subscriber</h2>
       <p><strong>Email:</strong> ${email}</p>
       <p>This user has been added to your database.</p>`
    );

    return { success: true, message: "Thank you for subscribing to our newsletter!" };
  } catch (error: any) {
    return { error: "Failed to subscribe. Please try again later." };
  }
}

export async function updateTestimonial(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const content = formData.get("content") as string;
    const initials = formData.get("initials") as string | null;

    if (!id || !name || !role || !content) return { error: "Missing fields" };

    await prisma.testimonial.update({
      where: { id },
      data: { name, role, content, initials }
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function addTestimonial(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const content = formData.get("content") as string;
    const initials = formData.get("initials") as string | null;

    if (!name || !role || !content) return { error: "Missing fields" };

    await prisma.testimonial.create({
      data: { name, role, content, initials }
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
