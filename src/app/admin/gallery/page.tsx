import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Image as ImageIcon, Trash2, Plus, Upload, Link as LinkIcon } from "lucide-react";
import { addImage, deleteImage } from "@/lib/actions";
import Link from "next/link";
import ClientForm from "@/components/ClientForm";
import { SubmitButton } from "@/components/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const ITEMS_PER_PAGE = 12;
  
  const totalImages = await prisma.galleryImage.count();
  const totalPages = Math.ceil(totalImages / ITEMS_PER_PAGE);

  const images = await prisma.galleryImage.findMany({
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Gallery Manager</h2>
        <p className="text-slate-500 text-lg">Upload photos directly to your website's gallery.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Image Grid */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <ImageIcon size={20} className="text-brand-purple" />
              Live Images ({images.length})
            </h3>
            
            {images.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                No images in your gallery. Upload some using the form!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img: any) => (
                  <div key={img.id} className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-video">
                    <img 
                      src={img.src} 
                      alt={img.alt || "Gallery Image"} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="px-2 py-0.5 bg-brand-blue text-white text-[10px] font-bold uppercase rounded mb-1 inline-block">
                            {img.category}
                          </span>
                          <p className="text-white font-medium text-sm line-clamp-1">{img.alt}</p>
                        </div>
                        <ClientForm action={deleteImage} successMessage="Image Deleted!">
                          <input type="hidden" name="id" value={img.id} />
                          <button type="submit" className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg" title="Delete Image">
                            <Trash2 size={16} />
                          </button>
                        </ClientForm>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <Link 
                  href={`/admin/gallery?page=${Math.max(1, page - 1)}`}
                  className={`px-4 py-2 rounded-lg font-bold text-sm ${page === 1 ? 'opacity-50 pointer-events-none text-slate-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-brand-blue hover:text-white border border-slate-200 dark:border-slate-800'} transition-colors`}
                >
                  Previous
                </Link>
                <div className="text-sm font-bold text-slate-500">
                  Page {page} of {totalPages}
                </div>
                <Link 
                  href={`/admin/gallery?page=${Math.min(totalPages, page + 1)}`}
                  className={`px-4 py-2 rounded-lg font-bold text-sm ${page === totalPages ? 'opacity-50 pointer-events-none text-slate-400' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-brand-blue hover:text-white border border-slate-200 dark:border-slate-800'} transition-colors`}
                >
                  Next
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: Add Image Form */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Upload size={20} className="text-brand-blue" />
              Upload Image
            </h3>
            
            <ClientForm action={addImage} successMessage="Image Added!" className="space-y-6">
              
              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-center cursor-pointer relative overflow-hidden group">
                <input type="file" name="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">Click to browse file</p>
                  <p className="text-xs text-slate-500">or drag and drop here (JPG, PNG)</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">OR PASTE URL</span>
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LinkIcon className="text-slate-400" size={16} />
                  </div>
                  <input type="url" name="url" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="https://..." />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Category</label>
                <input 
                  type="text" 
                  name="category" 
                  list="gallery-categories" 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                  placeholder="Select or type a category..."
                  defaultValue="Placement Drives"
                />
                <datalist id="gallery-categories">
                  <option value="Placement Drives" />
                  <option value="Skill Training" />
                  <option value="Office & Culture" />
                  <option value="Corporate Events" />
                </datalist>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Caption (Optional)</label>
                <input type="text" name="caption" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g. Mega Job Mela 2024" />
              </div>
              
              <SubmitButton className="w-full">
                Publish to Gallery
              </SubmitButton>
            </ClientForm>
          </div>
        </div>

      </div>
    </div>
  );
}
