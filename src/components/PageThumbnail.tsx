import React from 'react';
import { Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PageThumbnailProps {
  pageNumber: number;
  thumbnailUrl: string;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const PageThumbnail: React.FC<PageThumbnailProps> = ({
  pageNumber,
  thumbnailUrl,
  isSelected,
  onToggle,
  disabled = false,
}) => {
  return (
    <div
      onClick={() => !disabled && onToggle()}
      className={cn(
        "group relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 cursor-pointer",
        isSelected
          ? "border-brand-primary bg-brand-light ring-2 ring-brand-primary/20"
          : "border-brand-light bg-white hover:border-brand-primary/40 hover:shadow-md",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-brand-light shadow-sm">
        <img
          src={thumbnailUrl}
          alt={`Page ${pageNumber}`}
          className="h-full w-full object-contain"
          referrerPolicy="no-referrer"
        />

        <div className={cn(
          "absolute top-2 right-2 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          isSelected
            ? "bg-brand-primary border-brand-primary text-white scale-110"
            : "bg-white/80 border-brand-light text-transparent"
        )}>
          <Check size={14} strokeWidth={4} />
        </div>
      </div>

      <span className={cn(
        "text-sm font-semibold transition-colors",
        isSelected ? "text-brand-accent" : "text-brand-dark/60"
      )}>
        Page {pageNumber}
      </span>
    </div>
  );
};
