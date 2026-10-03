"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function JobShareClient({ jobId, jobTitle }: { jobId: string, jobTitle: string }) {
  const handleShare = () => {
    const url = `${window.location.origin}/jobs/${jobId}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${jobTitle} | Ruchitha Associates`,
        text: `Check out this job opening for ${jobTitle} at Ruchitha Associates!`,
        url: url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Job link copied to clipboard!");
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 text-sm font-bold text-brand-blue bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
    >
      <Share2 size={16} />
      Share Job
    </button>
  );
}
