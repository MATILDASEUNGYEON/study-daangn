import * as React from "react";
import Image, { StaticImageData } from "next/image";

interface CardProps {
  image: StaticImageData | string;
  title: string;
  price: string | number;
  onClick?: () => void;
  className?: string;
}

export function Card({ image, title, price, onClick, className = "" }: CardProps) {
  const formattedPrice = typeof price === 'number' ? `${price.toLocaleString()}원` : price;

  return (
    <div 
      className={`border border-gray-200 rounded-md p-3 cursor-pointer hover:shadow-lg transition-shadow ${className}`}
      onClick={onClick}
    >
      <Image 
        src={image} 
        alt={title} 
        width={240}
        height={240}
        className="w-full h-60 object-cover rounded-t-md"
      />
      <div className="p-3">
        <p className="text-base font-medium text-gray-900 truncate">{title}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">{formattedPrice}</p>
      </div>
    </div>
  );
}
