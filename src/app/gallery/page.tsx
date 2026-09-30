import Image from "next/image";

export const metadata = {
  title: "Gallery | Ruchitha Associates",
  description: "View photos from our training centers, placement drives, and events.",
};

export default function GalleryPage() {
  // We will just use placeholder images for now. The user can easily replace these or add a dynamic system later.
  const photos = [
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop", title: "Classroom Training" },
    { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop", title: "Interactive Session" },
    { src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop", title: "Placement Drive" },
    { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", title: "Team Meeting" },
    { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop", title: "Skill Development Workshop" },
    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1932&auto=format&fit=crop", title: "Corporate Event" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      {/* Page Header */}
      <section className="bg-brand-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Glimpses of our training programs, events, and success stories.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <Image 
                  src={photo.src} 
                  alt={photo.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg">{photo.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center text-gray-500 text-sm">
            [ADD: You can add more real photos by updating the Gallery component]
          </div>
        </div>
      </section>
    </div>
  );
}
