"use client";

import { useRef } from "react";
import { toast } from "sonner";

interface ClientFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  action: (formData: FormData) => Promise<any>;
  successMessage?: string;
  loadingMessage?: string;
  resetOnSuccess?: boolean;
  onSuccess?: () => void;
}

export default function ClientForm({ 
  action, 
  children, 
  className, 
  successMessage = "Success!", 
  loadingMessage = "Processing...",
  resetOnSuccess = true,
  onSuccess,
  ...props 
}: ClientFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const promise = action(formData).then((res: any) => {
      if (res?.error) throw new Error(res.error);
      if (resetOnSuccess) formRef.current?.reset();
      if (onSuccess) onSuccess();
      return res;
    });

    toast.promise(promise, {
      loading: loadingMessage,
      success: successMessage,
      error: (err) => err.message || 'Something went wrong',
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className={className} {...props}>
      {children}
    </form>
  );
}
