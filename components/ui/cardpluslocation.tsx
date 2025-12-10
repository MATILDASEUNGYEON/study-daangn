import React from "react";

interface CardAddLocationProps {
    image: string;
    title: string;
    price: string | number;
    location: string;
    uploadTime?: string;
    onClick?: () => void;
    className?: string;
}
function timeAgo(uploadTime?: string | null){
    if (!uploadTime) return "";

    // "2025-12-10 16:30:52.298" 형식을 ISO 8601로 변환
    const normalizedDate = uploadTime.replace(' ', 'T');
    const uploaded = new Date(normalizedDate);
    
    // 유효하지 않은 날짜 체크
    if (isNaN(uploaded.getTime())) return "";
    
    const now = new Date();
    const diffMs = now.getTime() - uploaded.getTime();

    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    if (diffMinutes < 1) return "방금 전";
    if (diffMinutes < 60) return `${diffMinutes}분 전`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}일 전`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `${diffWeeks}주 전`;
    
    // 4주 이상이면 날짜 표시
    return uploaded.toLocaleDateString('ko-KR');
}
export function CardAddLocation({image,title,price,location,uploadTime,onClick,className=""}:CardAddLocationProps) {
    const formattedPrice = typeof price === 'number' ? `${price.toLocaleString()}원` : price;
    const formattedUploadTime = timeAgo(uploadTime);
    return (
        <div 
            className={`w-65 cursor-pointer hover:shadow-lg transition-shadow justify-between ${className}`}
            onClick={onClick}
        >
            <img src={image} alt={title} className="w-full h-60 object-cover rounded-t-md"/>
            <div className="p-3">
                <p className="text-base font-medium text-gray-900 truncate">{title}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{formattedPrice}</p>
                <div className="flex text-sm items-center text-gray-400 mt-3 gap-3">
                    <p>{location}</p>
                    <p>•</p>
                    <p>{formattedUploadTime}</p>
                </div>
            </div>
        </div>
    );
}