export const ITEM_STATUS = {
    SELLING: 1,    
    RESERVED: 2, 
    SOLD: 3      
} as const;

export type ItemStatusType = typeof ITEM_STATUS[keyof typeof ITEM_STATUS];

export const ITEM_STATUS_LABEL: Record<ItemStatusType, string> = {
    [ITEM_STATUS.SELLING]: '판매중',
    [ITEM_STATUS.RESERVED]: '예약중',
    [ITEM_STATUS.SOLD]: '판매완료'
};

export interface RegisterItemDTO {
    item_post_title: string;
    item_post_description: string;
    item_post_price: number;
    item_post_location: string;
    item_post_images: string[];
    category_id: number;
}
export interface ItemInfo{
    item_id: number;
    seller_id: string;
    seller_username?: string;
    item_post_price: number;
    item_post_title: string;
    item_post_description: string;
    item_post_location: string;
    item_post_images: string[];
    category_id: number;   
    item_post_date: string;
    item_status_id: number;
    item_post_views_count?: number;
    item_post_likes_count?: number;
}
export interface UpdateDTO {
    item_post_title?: string;
    item_post_description?: string;
    item_post_price?: number
    item_post_location?: string;
    item_post_images?: string[];
    category_id?: number;    
}
