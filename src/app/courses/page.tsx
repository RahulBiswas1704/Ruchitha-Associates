import Link from "next/link";
import Image from "next/image";
import { getAllCourses } from "@/lib/content";
import { Clock, GraduationCap, IndianRupee, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Training Courses | Ruchitha Associates",
  description: "Industry-aligned skill development and training programs.",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      {/* Premium Page Header */}
      <section className="relative bg-brand-blue text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-10 z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] opacity-60 translate-y-1/3 -translate-x-1/4 z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">Training <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-rose-400">Courses</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Upskill yourself with our certified programs and get ready for the industry.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          
          {courses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-600 mb-2">No courses available right now</h2>
              <p className="text-gray-500">Please check back later or contact us directly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.slug} className="bg-white rounded-3xl shadow-xl shadow-brand-blue/5 hover:shadow-2xl hover:shadow-brand-blue/15 transition-all duration-500 hover:-translate-y-2 border border-transparent overflow-hidden flex flex-col group">
                  <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                    <Image 
                      src={course.image} 
                      alt={course.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-brand-red text-brand-blue text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {course.category}
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <h2 className="font-serif text-2xl font-bold text-brand-blue mb-3 line-clamp-2 group-hover:text-brand-red transition-colors">
                      {course.title}
                    </h2>
                    
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-grow">
                      {course.description}
                    </p>
                    
                    <div className="space-y-3 mb-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-brand-red" />
                        <span className="font-medium text-gray-900">Duration:</span> {course.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <GraduationCap size={16} className="text-brand-red" />
                        <span className="font-medium text-gray-900">Eligibility:</span> {course.eligibility}
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <IndianRupee size={16} className="text-brand-red mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 block mb-0.5">Fee:</span> 
                          <span className={course.fee.toLowerCase().includes('free') ? 'text-green-600 font-medium' : ''}>{course.fee}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/courses/${course.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-brand-blue text-brand-blue text-sm font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all duration-300 group-hover:shadow-lg"
                    >
                      View Course Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </section>
    </div>
  );
}
