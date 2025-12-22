import * as React from 'react';

interface SelectButtonProps {
    label: string;
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
}

export function SelectButton({
    label,
    isSelected = false,
    onClick,
    className = '',
}: SelectButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex border rounded-md px-3 py-1 text-sm whitespace-nowrap transition-colors ${
                isSelected
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-300 bg-white text-black hover:border-gray-400'
            } ${className}`}
        >
            {label}
        </button>
    );
}
