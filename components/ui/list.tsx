import React from 'react';

export interface ListItem {
    id: string | number;
    label: string;
}

interface ListProps {
    items: ListItem[];
    onItemClick?: (item: ListItem) => void;
    className?: string;
}

export function List({ items, onItemClick, className = '' }: ListProps) {
    return (
        <ul
            role="list"
            className={`divide-y divide-gray-100 py-3 ${className}`}
        >
            {items.map((item) => (
                <li
                    key={item.id}
                    className="align-items-center flex w-full justify-between gap-x-6 py-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => onItemClick?.(item)}
                >
                    {item.label}
                </li>
            ))}
        </ul>
    );
}
