import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNewsBySlug, getAllNews } from "@/lib/content";
import { Calendar, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const newsList = getAllNews();
  return newsList.map((news) => ({
    slug: news.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const news = getNewsBySlug(params.slug);
  if (!news) return { title: "Article Not Found" };
  return {
    title: `${news.title} | Ruchitha Associates`,
    description: news.excerpt.substring(0, 160),
  };
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const news = getNewsBySlug(params.slug);
  
  if (!news) {
    notFound();
  }

  const formattedDate = new Date(news.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-brand-offwhite min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-blue mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to News
        </Link>
        
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="relative w-full h-[300px] md:h-[450px] bg-gray-200">
            <Image 
              src={news.image} 
              alt={news.title} 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-white">
              <div className="inline-block px-3 py-1 bg-brand-red text-brand-blue text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                {news.category}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                {news.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <Calendar size={16} />
                {formattedDate}
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-xl font-medium text-gray-900 mb-8 leading-relaxed">
                {news.excerpt}
              </p>
              
              <div className="whitespace-pre-wrap leading-relaxed">
                {news.content}
              </div>
            </div>
            
            {/* Share / CTA */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="font-medium text-gray-900">Share this article</span>
              <div className="flex gap-4">
                {/* Simplified sharing placeholders */}
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">Facebook</button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">LinkedIn</button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">Twitter</button>
              </div>
            </div>
          </div>
          
        </article>
      </div>
    </div>
  );
}
