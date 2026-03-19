import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
}

export const Card = ({ variant = 'default', className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'w-full bg-brand-surface rounded-3xl shadow-brand border border-border-color animate-in fade-in zoom-in duration-500',
        variant === 'glass' && 'bg-brand-surface/80 backdrop-blur-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
