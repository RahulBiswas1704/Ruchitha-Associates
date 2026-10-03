"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({ children, className, loadingText = "Saving..." }: { children: React.ReactNode, className?: string, loadingText?: string }) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending} 
      className={`${className} ${pending ? 'opacity-70 cursor-not-allowed' : ''} flex items-center justify-center gap-2`}
    >
      {pending && <Loader2 className="animate-spin" size={18} />}
      {pending ? loadingText : children}
    </button>
  );
}
