import * as React from 'react';

interface TrashIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export default function TrashIcon({ className, ...props }: TrashIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            fill="none"
            className={className}
            {...props}
        >
            <path
                d="M717.37,353.41l-30,390.71a61.19,61.19,0,0,1-61.19,61.19H373.85a61.19,61.19,0,0,1-61.19-61.19l-30-390.71"
                stroke="currentColor"
                strokeWidth={22}
                strokeLinecap="round"
                strokeMiterlimit={10}
            />

            <line
                x1="600.9"
                y1="314.08"
                x2="418.7"
                y2="314.08"
                stroke="currentColor"
                strokeWidth={22}
                strokeLinecap="round"
            />

            <path
                d="M351.57,314.08H222V276.19a28,28,0,0,1,28-28H438.35c0-.1,0-.19,0-.28,0-29.4,27.61-53.24,61.66-53.24s61.66,23.84,61.66,53.24c0,.09,0,.18,0,.28H750a28,28,0,0,1,28,28v37.89H671.37"
                stroke="currentColor"
                strokeWidth={22}
                strokeLinecap="round"
                strokeMiterlimit={10}
            />

            <line
                x1="397.36"
                y1="455.63"
                x2="397.36"
                y2="700.74"
                stroke="currentColor"
                strokeWidth={22}
                strokeLinecap="round"
            />

            <line
                x1="500"
                y1="455.63"
                x2="500"
                y2="700.74"
                stroke="currentColor"
                strokeWidth={22}
                strokeLinecap="round"
            />

            <line
                x1="602.64"
                y1="455.63"
                x2="602.64"
                y2="700.74"
                stroke="currentColor"
                strokeWidth={22}
                strokeLinecap="round"
            />
        </svg>
    );
}
