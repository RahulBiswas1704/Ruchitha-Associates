import Link from "next/link";
import Image from "next/image";
import { getAllNews } from "@/lib/content";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "News & Updates | Ruchitha Associates",
  description: "Latest news, events, and updates from Ruchitha Associates.",
};

export default function NewsPage() {
  const newsList = getAllNews();

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      {/* Page Header */}
      <section className="bg-brand-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay informed about our latest events, training batches, and success stories.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {newsList.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-600 mb-2">No news available right now</h2>
              <p className="text-gray-500">Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsList.map((news) => {
                const formattedDate = new Date(news.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <Link href={`/news/${news.slug}`} key={news.slug} className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                      <Image 
                        src={news.image} 
                        alt={news.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-brand-red text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {news.category}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Calendar size={14} />
                        {formattedDate}
                      </div>
                      
                      <h2 className="font-serif text-xl font-bold text-brand-blue mb-3 line-clamp-2 group-hover:text-brand-red transition-colors">
                        {news.title}
                      </h2>
                      
                      <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-grow">
                        {news.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center text-sm font-medium text-brand-blue group-hover:text-brand-red transition-colors">
                        Read full article <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
        </div>
      </section>
    </div>
  );
}
