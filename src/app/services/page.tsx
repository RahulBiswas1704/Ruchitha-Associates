import { BookOpen, Briefcase, GraduationCap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Our Services | Ruchitha Associates",
  description: "Skill development, training, placement assistance, and manpower recruitment services in Telangana.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "skill-development",
      title: "Skill Development",
      description: "Our skill development programs are designed to bridge the gap between academic education and industry requirements. We offer specialized modules that focus on practical, hands-on learning, ensuring candidates are ready to face real-world challenges from day one.",
      icon: <BookOpen size={32} />,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      features: ["Industry-aligned curriculum", "Practical, hands-on sessions", "Expert instructors", "Soft skills and communication training"],
      link: "/courses"
    },
    {
      id: "training",
      title: "Training Programs",
      description: "We are a proud partner in implementing government-backed training initiatives like DDU-GKY and PMKVY. These programs are structured to empower rural and urban youth by providing them with free, high-quality training and certification in various trades.",
      icon: <GraduationCap size={32} />,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
      features: ["Government certified (DDU-GKY, PMKVY)", "Free training for eligible candidates", "State-of-the-art lab facilities", "Continuous assessment and mentoring"],
      link: "/courses"
    },
    {
      id: "placement",
      title: "Placement Assistance",
      description: "Getting certified is just the first step. Our dedicated placement cell works tirelessly to connect our trained candidates with top employers across India. We provide resume building, mock interviews, and direct referrals to ensure a smooth transition into the workforce.",
      icon: <Users size={32} />,
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
      features: ["100% placement assistance", "Resume and interview preparation", "Direct tie-ups with top companies", "Post-placement support"],
      link: "/jobs"
    },
    {
      id: "recruitment",
      title: "Recruitment & Manpower",
      description: "For employers, we act as a reliable partner to source, verify, and deliver skilled manpower. Whether you need bulk hiring for a new project or specialized talent for niche roles, we have a vast database of pre-screened, certified professionals ready to join your team.",
      icon: <Briefcase size={32} />,
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1932&auto=format&fit=crop",
      features: ["Pre-screened and certified candidates", "Bulk hiring solutions", "Reduced time-to-hire", "Customized recruitment drives"],
      link: "/employers"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Premium Page Header */}
      <section className="relative bg-brand-blue text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10 z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] opacity-60 translate-y-1/3 -translate-x-1/4 z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-rose-400">Services</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Comprehensive solutions for career growth and organizational success.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-24">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`flex flex-col gap-12 items-center group ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 border border-transparent">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="w-full md:w-1/2">
                <div className="w-16 h-16 bg-white text-brand-red rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-brand-blue/10 border border-transparent group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h2 className="font-serif text-3xl font-bold text-brand-blue mb-4">{service.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={service.link}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white font-bold rounded-full hover:bg-brand-red hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  Explore {service.title} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-red py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-blue mb-4">Need a customized solution?</h2>
          <p className="text-brand-blue/80 mb-8 max-w-2xl mx-auto">Get in touch with us to discuss how we can tailor our services to meet your specific needs.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-brand-blue text-white font-bold rounded-full hover:bg-rose-500 hover:scale-105 transition-all duration-300 shadow-xl shadow-brand-blue/20">
            Contact Us Today <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
