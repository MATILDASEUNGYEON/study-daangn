import { pool } from '@/config/database';

export interface LikeInfo {
    like_id: number;
    user_id: number;
    likes_item_id: number;
    created_at?: string;
}

export const toggleLike = async (user_id: number, item_id: number): Promise<{ liked: boolean; likeCount: number }> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const existCheck = await client.query(
            `SELECT like_id FROM items_likes WHERE user_id = $1 AND likes_item_id = $2`,
            [user_id, item_id]
        );

        let liked: boolean;

        if (existCheck.rows.length > 0) {
          
            await client.query(
                `DELETE FROM items_likes WHERE user_id = $1 AND likes_item_id = $2`,
                [user_id, item_id]
            );
            await client.query(
                `UPDATE items SET item_post_likes_count = GREATEST(COALESCE(item_post_likes_count, 0) - 1, 0) WHERE item_id = $1`,
                [item_id]
            );
            liked = false;
        } else {
            
            await client.query(
                `INSERT INTO items_likes (user_id, likes_item_id) VALUES ($1, $2)`,
                [user_id, item_id]
            );
            await client.query(
                `UPDATE items SET item_post_likes_count = COALESCE(item_post_likes_count, 0) + 1 WHERE item_id = $1`,
                [item_id]
            );
            liked = true;
        }

        const countResult = await client.query(
            `SELECT item_post_likes_count FROM items WHERE item_id = $1`,
            [item_id]
        );

        await client.query('COMMIT');

        return {
            liked,
            likeCount: countResult.rows[0]?.item_post_likes_count || 0
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export const checkUserLike = async (user_id: number, item_id: number): Promise<boolean> => {
    const result = await pool.query(
        `SELECT like_id FROM items_likes WHERE user_id = $1 AND likes_item_id = $2`,
        [user_id, item_id]
    );
    return result.rows.length > 0;
};

export const getItemLikeCount = async (item_id: number): Promise<number> => {
    const result = await pool.query(
        `SELECT item_post_likes_count FROM items WHERE item_id = $1`,
        [item_id]
    );
    return result.rows[0]?.item_post_likes_count || 0;
};

export const getUserLikedItems = async (user_id: number) => {
    const result = await pool.query(
        `SELECT i.* FROM items i
         INNER JOIN items_likes il ON i.item_id = il.likes_item_id
         WHERE il.user_id = $1`,
        [user_id]
    );
    return result.rows;
};

export const getUserLikedItemsByUsername = async (username: string) => {
    const result = await pool.query(
        `SELECT i.* FROM items i
         INNER JOIN items_likes il ON i.item_id = il.likes_item_id
         INNER JOIN users u ON il.user_id = u.user_id
         WHERE u.username = $1`,
        [username]
    );
    return result.rows;
};
