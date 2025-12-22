'use client';

import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

interface SelectProps {
    value?: string;
    onChange?: (value: string) => void;
    options: string[];
    placeholder?: string;
    className?: string;
}

export function Select({
    value,
    onChange,
    options,
    placeholder,
    className = '',
}: SelectProps) {
    return (
        <div className={`inline-block rounded-md ${className}`}>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="appearance-none bg-transparent px-3 py-1 pr-8 text-sm focus:outline-none cursor-pointer"
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-600"
                />
            </div>
        </div>
    );
}
