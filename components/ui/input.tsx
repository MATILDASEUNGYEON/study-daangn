import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
}

export function Input({ className = "", type = "text", ...props }: InputProps) {
  const baseClasses = "h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-sm transition-colors outline-none placeholder:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
  const focusClasses = "focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20";

  return (
    <input
      type={type}
      className={`${baseClasses} ${focusClasses} ${className}`}
      {...props}
    />
  );
}
