import type { LucideIcon } from 'lucide-react';

interface CardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

export function Card({ icon: Icon, title, description, className = '' }: CardProps) {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm p-6 ${className}`}>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 justify-center text-center">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}