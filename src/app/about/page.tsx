import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us | Ruchitha Associates",
  description: "Learn about our vision, mission, and the team behind Ruchitha Associates.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Premium Page Header */}
      <section className="relative bg-brand-blue text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10 z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] opacity-60 translate-y-1/3 -translate-x-1/4 z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-rose-400">Us</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Connecting talent with opportunities, shaping careers, and building futures.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-brand-blue mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Established in Telangana, India, Ruchitha Associates was founded with a clear objective: to bridge the gap between skilled individuals and the industries that need them. We understand that finding the right talent or the right job can be challenging, which is why we provide end-to-end skill development, training, and placement solutions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                <div className="bg-brand-offwhite p-8 md:p-10 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300">
                  <h3 className="font-serif font-bold text-xl text-brand-blue mb-4">Our Vision</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    To be the most trusted and impactful skill development and recruitment partner in India, empowering individuals to achieve their career goals.
                  </p>
                </div>
                <div className="bg-brand-offwhite p-8 md:p-10 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300">
                  <h3 className="font-serif font-bold text-xl text-brand-blue mb-4">Our Mission</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    To provide high-quality training and connect dedicated talent with top-tier organizations, fostering growth and mutual success.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              {/* High-quality placeholder */}
              <Image 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Team Meeting" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-blue/5 border border-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-bl-full -z-0"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-40 h-40 shrink-0 relative rounded-full overflow-hidden shadow-xl shadow-brand-blue/10 border-4 border-white">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                  alt="Ravi Kumar Yelagapuri" 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-blue mb-2">Message from the Founder</h2>
                <p className="text-brand-red font-medium mb-4">Ravi Kumar Yelagapuri</p>
                <p className="text-gray-600 italic leading-relaxed mb-6">
                  "At Ruchitha Associates, we believe that the right skills can transform lives. Our commitment is to provide unparalleled training and guidance to our candidates, ensuring they are job-ready and confident. Simultaneously, we strive to be a dependable recruitment partner for employers, delivering talent that drives growth and innovation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approvals & Affiliations */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-12">Approvals & Affiliations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="text-brand-red w-10 h-10 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">DDU-GKY</h3>
              <p className="text-gray-400 text-sm">Deen Dayal Upadhyaya Grameen Kaushalya Yojana</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="text-brand-red w-10 h-10 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">PMKVY</h3>
              <p className="text-gray-400 text-sm">Pradhan Mantri Kaushal Vikas Yojana</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="text-brand-red w-10 h-10 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">[ADD: Registration]</h3>
              <p className="text-gray-400 text-sm">State Govt Registration Details</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="text-brand-red w-10 h-10 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">[ADD: Certificate]</h3>
              <p className="text-gray-400 text-sm">ISO / Quality Certification Details</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-blue mb-4">Our Core Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">Dedicated professionals working together to shape careers. Reach out to our main office for any queries.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="group">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-6 shadow-xl shadow-brand-blue/5 group-hover:shadow-2xl group-hover:shadow-brand-blue/15 transition-shadow">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                  alt="Ravi Kumar Yelagapuri" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-lg text-brand-blue">Ravi Kumar Yelagapuri</h3>
              <p className="text-brand-red text-sm font-medium">Founder & Managing Director</p>
            </div>

            {/* Team Member 2 */}
            <div className="group">
              <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-shadow flex items-center justify-center">
                <span className="text-gray-400">[ADD PHOTO]</span>
              </div>
              <h3 className="font-bold text-lg text-brand-blue">[ADD: Name]</h3>
              <p className="text-brand-red text-sm font-medium">[ADD: Role]</p>
            </div>

             {/* Team Member 3 */}
             <div className="group">
              <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-shadow flex items-center justify-center">
                <span className="text-gray-400">[ADD PHOTO]</span>
              </div>
              <h3 className="font-bold text-lg text-brand-blue">[ADD: Name]</h3>
              <p className="text-brand-red text-sm font-medium">[ADD: Role]</p>
            </div>

             {/* Team Member 4 */}
             <div className="group">
              <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-shadow flex items-center justify-center">
                <span className="text-gray-400">[ADD PHOTO]</span>
              </div>
              <h3 className="font-bold text-lg text-brand-blue">[ADD: Name]</h3>
              <p className="text-brand-red text-sm font-medium">[ADD: Role]</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
