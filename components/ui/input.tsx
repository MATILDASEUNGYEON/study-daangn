import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    type?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export function Input({
    className = '',
    type = 'text',
    icon,
    iconPosition = 'right',
    ...props
}: InputProps) {
    const baseClasses =
        'h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-sm transition-colors outline-none placeholder:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
    const focusClasses =
        'focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20';
    const iconPadding = icon
        ? iconPosition === 'left'
            ? 'pl-10'
            : 'pr-10'
        : '';

    if (icon) {
        return (
            <div className="relative w-full">
                {iconPosition === 'left' && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={`${baseClasses} ${focusClasses} ${iconPadding} ${className}`}
                    {...props}
                />
                {iconPosition === 'right' && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {icon}
                    </div>
                )}
            </div>
        );
    }

    return (
        <input
            type={type}
            className={`${baseClasses} ${focusClasses} ${className}`}
            {...props}
        />
    );
}
