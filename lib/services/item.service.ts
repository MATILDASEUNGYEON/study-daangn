import { ItemInfo, UpdateDTO } from '@/types/item.types';
import { pool } from '@/config/database';

export const getItemlist = async (): Promise<ItemInfo[]> => {
    const result = await pool.query(
        `SELECT * FROM items WHERE deleted_at IS NULL ORDER BY item_date DESC`,
    );
    if (result.rows.length === 0) {
        throw new Error('아이템 조회에 실패했습니다.');
    }
    return result.rows;
};

export const getItemById = async (
    item_id: number,
): Promise<ItemInfo | null> => {
    const result = await pool.query(`SELECT * FROM items WHERE item_id = $1`, [
        item_id,
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};

export const getItemBySellerId = async (
    seller_id: string,
): Promise<ItemInfo[]> => {
    const result = await pool.query(
        `SELECT * FROM items WHERE seller_id = $1 AND deleted_at IS NULL`,
        [seller_id],
    );
    if (result.rows.length === 0) {
        return [];
    }
    return result.rows;
};

export const getItemsByUsername = async (
    username: string,
): Promise<ItemInfo[]> => {
    const result = await pool.query(
        `SELECT i.* FROM items i
         INNER JOIN users u ON i.seller_id = u.user_id
         WHERE u.username = $1 AND i.deleted_at IS NULL
         ORDER BY i.item_date DESC`,
        [username],
    );
    return result.rows;
};

export const updateItemStatus = async (
    item_id: number,
    status_id: number,
): Promise<void> => {
    const result = await pool.query(
        `UPDATE items SET item_status_id=$1 WHERE item_id = $2`,
        [status_id, item_id],
    );
    if (result.rowCount === 0) {
        throw new Error('아이템 상태 업데이트에 실패했습니다.');
    }
    return result.rows[0];
};

// export const deleteItem = async (item_id: number): Promise<boolean> => {
//     const result = await pool.query(`DELETE FROM items WHERE item_id = $1`, [
//         item_id,
//     ]);
//     if (result.rowCount === 0) {
//         throw new Error('아이템 삭제에 실패했습니다.');
//     }
//     return result.rows[0];
// };

export const deleteItem = async (item_id: number): Promise<boolean> => {
    const result = await pool.query(
        `
    UPDATE items
    SET deleted_at = NOW()
    WHERE item_id = $1
      AND deleted_at IS NULL
    `,
        [item_id],
    );
    if (result.rowCount === 0) {
        throw new Error('아이템 삭제에 실패했습니다.');
    }

    return (result.rowCount ?? 0) > 0;
};

export const updateItem = async (
    item_id: number,
    updateData: UpdateDTO,
): Promise<void> => {
    const fields = [];
    const values = [];
    let paramsIndex = 1;

    if (updateData.item_title !== undefined) {
        fields.push(`item_title = $${paramsIndex++}`);
        values.push(updateData.item_title);
    }
    if (updateData.item_description !== undefined) {
        fields.push(`item_description = $${paramsIndex++}`);
        values.push(updateData.item_description);
    }
    if (updateData.item_price !== undefined) {
        fields.push(`item_price = $${paramsIndex++}`);
        values.push(updateData.item_price);
    }
    if (updateData.item_location !== undefined) {
        fields.push(`item_location = $${paramsIndex++}`);
        values.push(updateData.item_location);
    }
    if (updateData.item_images !== undefined) {
        fields.push(`item_images = $${paramsIndex++}`);
        values.push(updateData.item_images);
    }
    if (updateData.category_id !== undefined) {
        fields.push(`category_id = $${paramsIndex++}`);
        values.push(updateData.category_id);
    }
    if (fields.length === 0) {
        throw new Error('업데이트할 데이터가 없습니다.');
    }

    console.log(fields.join(', '));

    const result = await pool.query(
        `UPDATE items SET ${fields.join(', ')} WHERE item_id = $${paramsIndex}`,
        [...values, item_id],
    );

    if (result.rowCount === 0) {
        throw new Error('아이템 업데이트에 실패했습니다.');
    }
    return result.rows[0];
};
