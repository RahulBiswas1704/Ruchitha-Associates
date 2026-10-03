"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';
import { useEffect } from 'react';

export default function RichTextEditor({ name, defaultValue = "", placeholder = "Type here..." }: { name: string, defaultValue?: string, placeholder?: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none w-full min-h-[150px] px-4 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 focus:outline-none rounded-b-xl',
      },
    },
  });

  return (
    <div className="w-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-blue transition-all">
      <div className="bg-white dark:bg-slate-900 px-3 py-2 flex gap-2 border-b border-slate-200 dark:border-slate-800 flex-wrap">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors ${editor?.isActive('bold') ? 'bg-slate-200 dark:bg-slate-800 text-brand-blue' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors ${editor?.isActive('italic') ? 'bg-slate-200 dark:bg-slate-800 text-brand-blue' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <Italic size={18} />
        </button>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 my-auto mx-1" />
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${editor?.isActive('bulletList') ? 'bg-slate-200 dark:bg-slate-800 text-brand-blue' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors ${editor?.isActive('orderedList') ? 'bg-slate-200 dark:bg-slate-800 text-brand-blue' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <ListOrdered size={18} />
        </button>
      </div>
      
      <EditorContent editor={editor} />
      
      {/* Hidden input to pass HTML to the server action */}
      <input type="hidden" name={name} value={editor?.getHTML() || ""} />
    </div>
  );
}
