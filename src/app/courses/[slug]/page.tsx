import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCourseBySlug, getAllCourses } from "@/lib/content";
import { Clock, GraduationCap, IndianRupee, ArrowLeft, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} | Ruchitha Associates`,
    description: course.description.substring(0, 160),
  };
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  
  if (!course) {
    notFound();
  }

  return (
    <div className="bg-brand-offwhite min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-blue mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to all courses
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="flex flex-col lg:flex-row">
            {/* Image Header */}
            <div className="w-full lg:w-2/5 relative h-[300px] lg:h-auto bg-gray-200">
              <Image 
                src={course.image} 
                alt={course.title} 
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-6 left-6 bg-brand-red text-brand-blue text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {course.category}
              </div>
            </div>
            
            {/* Course Details */}
            <div className="w-full lg:w-3/5 p-8 md:p-12">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-blue mb-6">
                {course.title}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {course.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 pb-10 border-b border-gray-100">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <Clock className="text-brand-red shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 mb-1">Duration</h3>
                    <p className="text-gray-600">{course.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <GraduationCap className="text-brand-red shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 mb-1">Eligibility</h3>
                    <p className="text-gray-600">{course.eligibility}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 sm:col-span-2">
                  <IndianRupee className="text-brand-red shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 mb-1">Course Fee</h3>
                    <p className={course.fee.toLowerCase().includes('free') ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                      {course.fee}
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-brand-blue mb-6">What you will learn</h3>
              <ul className="grid grid-cols-1 gap-4 mb-10">
                {course.modules.map((module, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-brand-teal shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{module}</span>
                  </li>
                ))}
              </ul>
              
              {/* Application CTA */}
              <div className="mt-8">
                <Link 
                  href="/contact"
                  className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 bg-brand-blue text-white text-lg font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-md"
                >
                  Apply for this Course
                </Link>
                <p className="text-center text-sm text-gray-500 mt-4">
                  For bulk enrollments, please contact our placement office directly.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
