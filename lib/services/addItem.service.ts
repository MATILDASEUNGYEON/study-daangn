import { RegisterItemDTO, ItemInfo } from '@/types/item.types';
import { pool } from '@/config/database';

export const postItem = async (
    seller_id: string,
    itemData: RegisterItemDTO,
): Promise<ItemInfo> => {
    const {
        item_title,
        item_description,
        item_price,
        item_location,
        item_images,
        category_id,
    } = itemData;

    const result = await pool.query(
        `INSERT INTO items (seller_id,item_price,item_title,item_description,item_location,item_images,category_id,item_date,item_status_id,item_views_count,item_likes_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), 1, 0, 0)
            RETURNING seller_id, item_price AS price, item_title AS title, item_description AS description, item_location AS address_full, item_images AS image_url, category_id, item_date AS post_at, item_status_id AS status, item_views_count AS view_count, item_likes_count AS like_count`,
        [
            seller_id,
            item_price,
            item_title,
            item_description,
            item_location,
            item_images,
            category_id,
        ],
    );
    if (result.rows.length === 0) {
        throw new Error('아이템 등록에 실패했습니다.');
    }
    return result.rows[0];
};
