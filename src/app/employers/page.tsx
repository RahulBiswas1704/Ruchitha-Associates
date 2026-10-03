"use client";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Send, Building2, Users, Clock, ShieldCheck } from "lucide-react";
import { submitContactMessage } from "@/app/contact/actions";

export default function EmployersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Convert employer specific fields into a readable message body
    const company = formData.get("company") as string;
    const contactPerson = formData.get("contact_person") as string;
    const jobRole = formData.get("job_role") as string;
    const vacancies = formData.get("vacancies") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;

    const messageBody = `
Company: ${company}
Contact Person: ${contactPerson}
Job Role: ${jobRole}
Vacancies: ${vacancies}
Location: ${location}

Description:
${description}
    `.trim();

    try {
      const response = await submitContactMessage({
        name: contactPerson,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        subject: `Talent Request for ${company}`,
        message: messageBody,
      });

      if (response.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setError(response.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send request. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { title: "Pre-Screened Candidates", desc: "Every candidate undergoes rigorous skill testing and background verification before placement.", icon: <ShieldCheck size={24} /> },
    { title: "Customized Training", desc: "We can tailor our training modules to align exactly with your company's specific job roles.", icon: <Users size={24} /> },
    { title: "Faster Time-to-Hire", desc: "With a ready pool of trained resources, we significantly reduce your recruitment turnaround time.", icon: <Clock size={24} /> },
    { title: "Bulk Hiring Solutions", desc: "Whether you need 5 or 500 employees, we have the capacity and network to fulfill bulk requirements.", icon: <Building2 size={24} /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-brand-blue text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1932&auto=format&fit=crop" 
            alt="Corporate Environment" 
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Partner With Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Source reliable, skilled, and certified manpower for your organization.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-brand-blue mb-4">Why Hire Through Us?</h2>
            <div className="w-20 h-1 bg-brand-red mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-brand-offwhite p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center">
                <div className="w-14 h-14 bg-white text-brand-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-xl text-brand-blue mb-3">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Request Form */}
      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-[100px] pointer-events-none"></div>
            
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-brand-blue mb-4">Request Talent</h2>
              <p className="text-gray-600">Fill out the form below with your requirements, and our placement cell will get in touch with you.</p>
            </div>

            {isSuccess ? (
              <div className="bg-brand-teal/10 border border-brand-teal text-brand-blue p-12 rounded-xl flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-20 h-20 text-brand-teal mb-6" />
                <h3 className="text-2xl font-bold mb-3">Requirement Submitted!</h3>
                <p className="text-gray-600 mb-8 max-w-md">Thank you for choosing Ruchitha Associates. Our placement coordinator will contact you within 24 hours.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-brand-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                
                {/* Company Details */}
                <div className="p-6 bg-brand-offwhite rounded-xl border border-gray-100 space-y-6">
                  <h3 className="font-serif font-bold text-xl text-brand-blue border-b border-gray-200 pb-2">Company Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Company Name *</label>
                      <input type="text" name="company" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Contact Person *</label>
                      <input type="text" name="contact_person" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                      <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                      <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                    </div>
                  </div>
                </div>

                {/* Requirement Details */}
                <div className="p-6 bg-brand-offwhite rounded-xl border border-gray-100 space-y-6">
                  <h3 className="font-serif font-bold text-xl text-brand-blue border-b border-gray-200 pb-2">Requirement Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Job Role / Designation *</label>
                      <input type="text" name="job_role" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Number of Vacancies *</label>
                      <input type="number" name="vacancies" required min="1" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Job Location *</label>
                      <input type="text" name="location" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Additional Information / Job Description</label>
                      <textarea name="description" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 resize-none"></textarea>
                    </div>
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm font-medium px-2">{error}</div>}

                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 bg-brand-blue text-white font-semibold rounded-md hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : (
                      <>Submit Request <Send size={20} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
