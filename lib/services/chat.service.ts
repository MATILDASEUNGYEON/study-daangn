import {ChatroomDTO, ChatroomListDTO,ChatMessageDTO} from '@/types/chat.types';
import {pool} from '@/config/database';
console.log('DB PASSWORD:', process.env.DB_PASSWORD);
export const getCheckChatroom = async (user_id: number, item_id: number) : Promise<ChatroomDTO | null> => {
    const result = await pool.query(
        `SELECT cr.room_id
            FROM chat_rooms cr
            JOIN chat_room_users cru ON cr.room_id = cru.room_id
            WHERE cr.item_id = $1
            AND cru.user_id = $2`,
        [item_id, user_id]
    );
    if(result.rows.length ===0){
        return null;
    }
    return result.rows[0];
}

export const getUserChatrooms = async (user_id: number) : Promise<ChatroomListDTO[]> => {
    const result = await pool.query(
        `SELECT
        cr.room_id,
        cr.item_id,
        MAX(cm.created_at) AS last_message_time
        FROM chat_room_users cru
        JOIN chat_rooms cr ON cr.room_id = cru.room_id
        LEFT JOIN chat_messages cm ON cm.room_id = cr.room_id
        WHERE cru.user_id = $1
        GROUP BY cr.room_id, cr.item_id
        ORDER BY last_message_time DESC`,
        [user_id]
    );
    if(result.rows.length ===0){
        return [];
    }
    return result.rows;
}

export const createChatroom = async (item_id: number): Promise<{room_id: number}> => {
    const result = await pool.query(
        `INSERT INTO chat_rooms (item_id)
        VALUES ($1)
        RETURNING room_id`,
        [item_id]
    );
    if(result.rows.length ===0){
        throw new Error("채팅방 생성에 실패했습니다.");
    }
    return result.rows[0];
}

export const getMessages = async (room_id: number): Promise<ChatMessageDTO[]> => {
    const result = await pool.query(
        `SELECT message_id, room_id, sender_id, content, created_at 
        FROM chat_messages
        WHERE room_id = $1
        ORDER BY created_at ASC
        LIMIT 30`,
        [room_id]
    );
    if(result.rows.length ===0){
        return [];
    }
    return result.rows;
}

export const sendMessage = async (room_id: number, sender_id: number, content: string): Promise<{message_id: number, created_at: string}> => {
    const result = await pool.query(
        `INSERT INTO chat_messages (room_id, sender_id, content)
        VALUES ($1, $2, $3)
        RETURNING message_id, created_at`,
        [room_id, sender_id, content]
    );
    if(result.rows.length ===0){
        throw new Error("메시지 전송에 실패했습니다.");
    }
    return result.rows[0];
}

export const registerUserToChatroom = async (room_id: number, user_id: number): Promise<void> => {
    const result = await pool.query(
        `INSERT INTO chat_room_users (room_id, user_id) VALUES ($1, $2)`,
        [room_id, user_id]
    );
    console.log("registerUserToChatroom result:", result);
    if(result.rowCount ===0){
        throw new Error("채팅방 사용자 등록에 실패했습니다.");
    }
    return;
}

export const registerSellerToChatroom = async (room_id: number, item_id: number): Promise<void> => {
    const result = await pool.query(
        `INSERT INTO chat_room_users (room_id, user_id)
        SELECT $1, seller_id FROM items WHERE item_id = $2`,
        [room_id, item_id]
    );
    console.log("registerSellerToChatroom result:", result);
    if(result.rowCount ===0){
        throw new Error("채팅방 판매자 등록에 실패했습니다.");
    }
    return;
}

export const getChatroomByUsers = async (user_id: number): Promise<ChatroomListDTO[]> => {
    const result = await pool.query(
        `SELECT * from chat_room_users WHERE user_id = $1`,
        [user_id]
    );
    if(result.rows.length ===0){
        return [];
    }
    return result.rows;
};