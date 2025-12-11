import React from "react";
import { ITEM_STATUS, ITEM_STATUS_LABEL, ItemStatusType } from "@/types/item.types";

interface CardProps {
  image: string;
  title: string;
  price: string | number;
  status?: ItemStatusType;
  location?: string;
  onClick?: () => void;
  className?: string;
}

export function Card({ image, title, price, status, location, onClick, className = "" }: CardProps) {
  const formattedPrice = typeof price === 'number' 
    ? (price === 0 ? '나눔' : `${price.toLocaleString()}원`) 
    : price;

  const getStatusStyle = (status: ItemStatusType) => {
    switch (status) {
      case ITEM_STATUS.SELLING:
        return 'bg-green-500';
      case ITEM_STATUS.RESERVED:
        return 'bg-amber-500';
      case ITEM_STATUS.SOLD:
        return 'bg-gray-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div 
      className={`border border-gray-200 rounded-md p-3 cursor-pointer hover:shadow-lg transition-shadow ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-50 object-cover rounded-t-md p-2"/>
        {status && (
          <span className={`absolute top-2 left-2 px-2 py-1 text-xs text-white rounded ${getStatusStyle(status)}`}>
            {ITEM_STATUS_LABEL[status]}
          </span>
        )}
      </div>
      
      <div className="p-3">
        <p className="text-lg font-medium text-gray-900 truncate">{title}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">{formattedPrice} 원</p>
        {location && <p className="text-sm text-gray-500 mt-1">{location}</p>}
      </div>
    </div>
  );
}
