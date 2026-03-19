import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelAside?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, labelAside, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label || labelAside ? (
          <div className="flex items-center justify-between px-1">
            {label && (
              <label 
                htmlFor={id} 
                className="text-[10px] font-bold tracking-widest text-brand-dark/40 uppercase"
              >
                {label}
              </label>
            )}
            {labelAside}
          </div>
        ) : null}
        <input
          id={id}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-brand-light/50 border border-brand-light rounded-xl text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200',
            error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-[10px] font-semibold text-red-500 px-1 mt-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
