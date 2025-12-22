import * as React from 'react';

interface TagProps {
    text: string;
    bgColor?: string;
    textColor?: string;
    className?: string;
}

export function Tag({
    text,
    bgColor = 'bg-gray-200',
    textColor = 'text-gray-900',
    className = '',
}: TagProps) {
    return (
        <div
            className={`inline-flex items-center border rounded-sm px-2 py-1 ${bgColor} ${className}`}
        >
            <p className={`text-xs font-bold ${textColor}`}>{text}</p>
        </div>
    );
}
