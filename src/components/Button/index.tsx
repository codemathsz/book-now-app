import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
    
    const variants = {
      primary: 'text-white shadow-lg hover:shadow-xl border-transparent',
      secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
      outline: 'border hover:bg-accent text-foreground',
      ghost: 'hover:bg-accent text-foreground',
      success: 'bg-success hover:bg-success/90 text-success-foreground',
      destructive: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const style = variant === 'primary' ? { backgroundColor: '#3b82f6' } : undefined;
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
