import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface RegisterItemDTO {
    title: string;
    description: string;
    price: number;
    address_full: string;
    image_url: string[];
    category_id: number;
}
export interface ItemInfo{
    seller_id: string;
    price: number;
    title: string;
    description: string;
    address_full: string;
    image_url: string[];
    category_id: number;   
    post_at : Timestamp
    status: number;
    view_count?: number;
    like_count?: number;
}