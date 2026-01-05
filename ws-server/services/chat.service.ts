import { pool } from '../config/database';

interface ChatroomDTO {
    room_id: number;
}

interface ChatMessageDTO {
    message_id: number;
    room_id: number;
    sender_id: number;
    content: string;
    created_at: string;
}

export const getCheckChatroom = async (
    user_id: number,
    item_id: number,
): Promise<ChatroomDTO | null> => {
    const result = await pool.query(
        `SELECT cr.room_id
            FROM chat_rooms cr
            JOIN chat_room_users cru ON cr.room_id = cru.room_id
            WHERE cr.item_id = $1
            AND cru.user_id = $2`,
        [item_id, user_id],
    );
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};

export const createChatroom = async (
    item_id: number,
): Promise<{ room_id: number }> => {
    const result = await pool.query(
        `INSERT INTO chat_rooms (item_id)
        VALUES ($1)
        RETURNING room_id`,
        [item_id],
    );
    if (result.rows.length === 0) {
        throw new Error('채팅방 생성에 실패했습니다.');
    }
    return result.rows[0];
};

export const sendMessageWithReadUpdate = async (
    room_id: number,
    sender_id: number,
    content: string,
): Promise<{ message_id: number; created_at: string }> => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const messageResult = await client.query(
            `
            INSERT INTO chat_messages (room_id, sender_id, content)
            VALUES ($1, $2, $3)
            RETURNING message_id, created_at
            `,
            [room_id, sender_id, content],
        );

        if (messageResult.rows.length === 0) {
            throw new Error('메시지 생성 실패');
        }

        const { message_id, created_at } = messageResult.rows[0];

        await client.query(
            `
            UPDATE chat_room_users
            SET last_read_message_id = $1
            WHERE room_id = $2
              AND user_id = $3
            `,
            [message_id, room_id, sender_id],
        );

        await client.query('COMMIT');

        return { message_id, created_at };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export const registerUserToChatroom = async (
    room_id: number,
    user_id: number,
): Promise<void> => {
    const result = await pool.query(
        `INSERT INTO chat_room_users (room_id, user_id) VALUES ($1, $2)`,
        [room_id, user_id],
    );
    console.log('registerUserToChatroom result:', result);
    if (result.rowCount === 0) {
        throw new Error('채팅방 사용자 등록에 실패했습니다.');
    }
    return;
};

export const registerSellerToChatroom = async (
    room_id: number,
    item_id: number,
): Promise<void> => {
    const result = await pool.query(
        `INSERT INTO chat_room_users (room_id, user_id)
        SELECT $1, seller_id FROM items WHERE item_id = $2`,
        [room_id, item_id],
    );
    console.log('registerSellerToChatroom result:', result);
    if (result.rowCount === 0) {
        throw new Error('채팅방 판매자 등록에 실패했습니다.');
    }
    return;
};
