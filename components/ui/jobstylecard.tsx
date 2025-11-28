import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { Tag } from "./tags";

interface JobStyleCardProps {
  title: string;
  categories: string[];
  price: string;
  tags?: Array<{
    text: string;
    bgColor: string;
    textColor: string;
  }>;
  image: StaticImageData | string;
  onClick?: () => void;
  className?: string;
}

export function JobStyleCard({ 
  title, 
  categories, 
  price, 
  tags = [], 
  image, 
  onClick, 
  className = "" 
}: JobStyleCardProps) {
  return (
    <div 
      className={`flex w-full border border-gray-300 rounded-md p-4 mb-5 cursor-pointer hover:shadow-lg transition-shadow ${className}`}
      onClick={onClick}
    >
      <div className="w-4/5 flex flex-col items-start justify-center">
        <p className="text-lg font-bold">{title}</p>
        <div className="flex text-xs text-gray-400 gap-2">
          {categories.map((category, index) => (
            <p key={index}>{category}</p>
          ))}
        </div>
        <p className="text-lg font-bold pb-5">{price}</p>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Tag 
              key={index}
              text={tag.text} 
              bgColor={tag.bgColor} 
              textColor={tag.textColor} 
            />
          ))}
        </div>
      </div>
      <div className="w-1/5 flex justify-center">
        <Image 
          src={image} 
          alt={title} 
          width={160}
          height={160}
          className="size-40 object-cover m-3 rounded-md"
        />
      </div>
    </div>
  );
}
