"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add Web3Forms access key
    // The user will need to add NEXT_PUBLIC_WEB3FORMS_KEY in their .env.local file
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "[ADD: WEB3FORMS_KEY]");
    formData.append("subject", "New Contact Form Submission - Ruchitha Associates");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-brand-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a question or want to get started? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            
            {/* Contact Information */}
            <div className="w-full lg:w-2/5 bg-brand-blue text-white p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl"></div>
              <div className="absolute top-12 -left-12 w-32 h-32 bg-brand-red/10 rounded-full blur-2xl"></div>
              
              <h2 className="font-serif text-3xl font-bold mb-8 relative z-10">Get in Touch</h2>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="text-brand-red" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone / WhatsApp</h3>
                    <p className="text-gray-300">+91 7674074055</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="text-brand-red" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-300">Hr.ruchithaassociates@gmail.com</p>
                    <p className="text-gray-300">info@ruchithaassociatess.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-red" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Placement Office</h3>
                    <p className="text-gray-300">6F6G+565, Tukkuguda,<br/>Telangana 501359</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-red" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Registered Office</h3>
                    <p className="text-gray-300">House no. 6-7, ST Colony, Annaram Village,<br/>Telangana 502313</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-3/5 p-8 md:p-12">
              <h2 className="font-serif text-3xl font-bold text-brand-blue mb-6">Send us a Message</h2>
              
              {isSuccess ? (
                <div className="bg-brand-teal/10 border border-brand-teal text-brand-blue p-8 rounded-xl flex flex-col items-center justify-center text-center h-[400px]">
                  <CheckCircle2 className="w-16 h-16 text-brand-teal mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 bg-brand-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot for spam protection */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <select 
                      id="subject_select" 
                      name="subject_select" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-colors bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Course Information">Course Information</option>
                      <option value="Placement Assistance">Placement Assistance</option>
                      <option value="Partnership">Partnership / Employer Query</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-colors resize-none"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand-blue text-white font-semibold rounded-md hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Map Placeholder */}
      <section className="h-[400px] w-full bg-gray-200 relative">
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15239.516086708609!2d78.473528!3d17.153401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbb0000000001%3A0x0!2zMTfCsDA5JzEyLjIiTiA3OMKwMjgnMzEuNyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
      </section>
    </div>
  );
}
