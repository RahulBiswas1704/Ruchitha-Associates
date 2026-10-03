"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

interface ExportCsvButtonProps {
  data: any[];
  filename?: string;
}

export default function ExportCsvButton({ data, filename = "export.csv" }: ExportCsvButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      toast.error("No data to export");
      return;
    }

    try {
      // Get all unique keys from the data to use as headers
      const headers = Array.from(new Set(data.flatMap(Object.keys)));
      
      // Map data to CSV rows
      const csvRows = data.map(row => {
        return headers.map(header => {
          let cellValue = row[header] ?? "";
          
          // Handle nested objects (like job.title)
          if (typeof cellValue === "object" && cellValue !== null) {
             if (cellValue instanceof Date) {
                 cellValue = cellValue.toISOString();
             } else {
                 cellValue = JSON.stringify(cellValue);
             }
          }
          
          // Escape quotes and wrap in quotes if there are commas
          const stringValue = String(cellValue).replace(/"/g, '""');
          return `"${stringValue}"`;
        }).join(",");
      });

      // Combine headers and rows
      const csvString = [headers.join(","), ...csvRows].join("\n");
      
      // Create blob and trigger download
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Export downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate CSV");
    }
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
    >
      <Download size={18} />
      Export CSV
    </button>
  );
}
