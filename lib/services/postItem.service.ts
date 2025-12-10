import {RegisterItemDTO, ItemInfo} from '@/types/item.types';
import { pool } from '@/config/database';

export const postItem = async (seller_id: string,itemData: RegisterItemDTO): Promise<ItemInfo> => {
    const {item_post_title,item_post_description,item_post_price,item_post_location,item_post_images,category_id} = itemData;

    const result = await pool.query(
        `INSERT INTO items (seller_id,item_post_price,item_post_title,item_post_description,item_post_location,item_post_images,category_id,item_post_date,item_status_id,item_post_views_count,item_post_likes_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), 1, 0, 0)
            RETURNING seller_id, item_post_price AS price, item_post_title AS title, item_post_description AS description, item_post_location AS address_full, item_post_images AS image_url, category_id, item_post_date AS post_at, item_status_id AS status, item_post_views_count AS view_count, item_post_likes_count AS like_count`,
        [ seller_id,item_post_price,item_post_title,item_post_description,item_post_location,item_post_images,category_id ]
    )
    if(result.rows.length ===0){
        throw new Error("아이템 등록에 실패했습니다.");
    }
    return result.rows[0];
    
};
