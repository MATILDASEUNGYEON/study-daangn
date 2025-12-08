import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "full";
}

const getVariantClasses = (variant: ButtonProps["variant"] = "default") => {
  switch (variant) {
    case "destructive":
      return "bg-red-600 text-white hover:bg-red-700";
    case "outline":
      return "border border-gray-300 bg-white hover:bg-gray-50";
    case "secondary":
      return "bg-gray-200 text-gray-900 hover:bg-gray-300";
    case "ghost":
      return "hover:bg-amber-100 hover:text-gray-900 hover:font-bold";
    case "link":
      return "text-blue-600 underline-offset-4 hover:underline";
    case "default":
    default:
      return "bg-blue-600 text-white hover:bg-blue-700";
  }
};

const getSizeClasses = (size: ButtonProps["size"] = "default") => {
  switch (size) {
    case "sm":
      return "h-8 px-3 text-xs";
    case "lg":
      return "h-11 px-8 text-base";
    case "full" :
      return "w-full h-9 text-base";
    case "icon":
      return "h-9 w-9 p-0";
    case "default":
    default:
      return "h-9 px-4 py-2";
  }
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    />
  );
}
