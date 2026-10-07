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

export async function deleteTestimonial(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
    revalidatePath("/about");
    return;
  } catch (error: any) {
    console.error("Failed to delete testimonial", error);
  }
}

export async function addMember(formData: FormData) {
  try {
    let fileUrl = "";
    const file = formData.get("file") as File;
    
    if (file && file.size > 0) {
      const files = new Files({ adapter: neon({ bucket: "images" }) });
      const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      await files.upload(uniqueFilename, file, { contentType: file.type });
      fileUrl = `${process.env.AWS_ENDPOINT_URL_S3}/images/${uniqueFilename}`;
    }
    
    if (!fileUrl) {
      fileUrl = formData.get("imageUrl") as string;
    }

    await prisma.associate.create({
      data: {
        name: formData.get("name") as string,
        role: formData.get("role") as string,
        imageSrc: fileUrl || null,
        phone: (formData.get("phone") as string) || null,
        email: (formData.get("email") as string) || null,
        linkedinUrl: (formData.get("linkedinUrl") as string) || null,
        otherLink: (formData.get("otherLink") as string) || null,
      }
    });

    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to add member" };
  }
}

export async function moveMember(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const direction = formData.get("direction") as "up" | "down";

    const allMembers = await prisma.associate.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });

    const currentIndex = allMembers.findIndex((m: any) => m.id === id);
    if (currentIndex === -1) return;

    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= allMembers.length) return;

    const currentMember = allMembers[currentIndex];
    const swapMember = allMembers[swapIndex];

    const updates = [...allMembers];
    updates[currentIndex] = swapMember;
    updates[swapIndex] = currentMember;

    await prisma.$transaction(
      updates.map((member, index) => 
        prisma.associate.update({
          where: { id: member.id },
          data: { order: index }
        })
      )
    );

    revalidatePath("/admin/team");
    revalidatePath("/");
  } catch (error: any) {
    console.error("Failed to move member", error);
  }
}

export async function deleteMember(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.associate.delete({ where: { id } });
    
    revalidatePath("/admin/team");
    revalidatePath("/");
  } catch (error: any) {
    console.error("Failed to delete member", error);
  }
}

// --- SERVICES ---
export async function addService(formData: FormData) {
  try {
    let fileUrl = "";
    const file = formData.get("file") as File;
    
    if (file && file.size > 0) {
      const files = new Files({ adapter: neon({ bucket: "images" }) });
      const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      await files.upload(uniqueFilename, file, { contentType: file.type });
      fileUrl = `${process.env.AWS_ENDPOINT_URL_S3}/images/${uniqueFilename}`;
    }
    
    if (!fileUrl) {
      fileUrl = formData.get("imageUrl") as string;
    }

    await prisma.service.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        iconName: (formData.get("iconName") as string) || null,
        imageUrl: fileUrl || null,
        features: formData.get("features") as string,
        link: (formData.get("link") as string) || null,
      }
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
  } catch (error) {
    console.error("Failed to add service", error);
  }
}

export async function deleteService(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    revalidatePath("/services");
  } catch (error) {
    console.error("Failed to delete service", error);
  }
}

// --- MESSAGES ---
export async function markAsRead(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Failed to mark message as read", error);
  }
}

export async function deleteMessage(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Failed to delete message", error);
  }
}

// --- JOBS ---
export async function createJob(formData: FormData) {
  try {
    await prisma.job.create({
      data: {
        title: formData.get("title") as string,
        company: formData.get("company") as string,
        location: formData.get("location") as string,
        type: formData.get("type") as string,
        category: formData.get("category") as string,
        salary: formData.get("salary") as string,
        description: formData.get("description") as string,
      }
    });
    revalidatePath("/admin/jobs");
    revalidatePath("/jobs");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create job" };
  }
}

export async function deleteJob(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.job.delete({ where: { id } });
    revalidatePath("/admin/jobs");
    revalidatePath("/jobs");
  } catch (error) {
    console.error("Failed to delete job", error);
  }
}

// --- GALLERY ---
export async function addImage(formData: FormData) {
  try {
    let fileUrl = "";
    const file = formData.get("file") as File;
    
    if (file && file.size > 0) {
      const files = new Files({ adapter: neon({ bucket: "images" }) });
      const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      await files.upload(uniqueFilename, file, { contentType: file.type });
      fileUrl = `${process.env.AWS_ENDPOINT_URL_S3}/images/${uniqueFilename}`;
    }
    
    if (!fileUrl) {
      fileUrl = formData.get("url") as string;
    }

    if (!fileUrl) return;

    await prisma.galleryImage.create({
      data: {
        src: fileUrl,
        category: formData.get("category") as string,
        alt: (formData.get("caption") as string) || "Gallery Image",
      }
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
  } catch (error) {
    console.error("Failed to add image", error);
  }
}

export async function deleteImage(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.galleryImage.delete({ where: { id } });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
  } catch (error) {
    console.error("Failed to delete image", error);
  }
}
