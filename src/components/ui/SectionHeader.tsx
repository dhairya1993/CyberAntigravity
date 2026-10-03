import React from 'react';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  badgeText: string;
  badgeVariant?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple' | 'slate';
  title: string;
  description: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeVariant = 'cyan',
  title,
  description,
  align = 'center',
  action,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}
    >
      <div className={`mb-3 flex ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <Badge variant={badgeVariant} dot size="md">
          {badgeText}
        </Badge>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
