import {ItemInfo} from '@/types/item.types';
import { pool } from '@/config/database';

export const getItemlist = async (): Promise<ItemInfo[]> => {
    const result = await pool.query(
        `SELECT * FROM items`
    );
    if(result.rows.length ===0){
        throw new Error("아이템 조회에 실패했습니다.");
    }
    return result.rows;
};

export const getItemById = async (item_id: number): Promise<ItemInfo | null> => {
    const result = await pool.query(
        `SELECT * FROM items WHERE item_id = $1`,
        [item_id]
    );
    if(result.rows.length ===0){
        return null;
    }
    return result.rows[0];
};

