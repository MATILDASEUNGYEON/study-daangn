import * as React from "react";

interface SubmitIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export default function SubmitIcon({ className, ...props }: SubmitIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
        </svg>
    );
}
