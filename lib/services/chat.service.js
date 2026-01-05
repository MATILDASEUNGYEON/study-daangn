"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markRoomAsRead = exports.getLastMessageWithUnreadByRoomId = exports.getLastMessageByRoomId = exports.getItemInfoByRoomId = exports.getUserChatroomCount = exports.getChatroomByUsers = exports.registerSellerToChatroom = exports.registerUserToChatroom = exports.sendMessageWithReadUpdate = exports.getMessages = exports.createChatroom = exports.getUserChatrooms = exports.getCheckChatroom = void 0;
const database_1 = require("@/config/database");
const getCheckChatroom = async (user_id, item_id) => {
    const result = await database_1.pool.query(`SELECT cr.room_id
            FROM chat_rooms cr
            JOIN chat_room_users cru ON cr.room_id = cru.room_id
            WHERE cr.item_id = $1
            AND cru.user_id = $2`, [item_id, user_id]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
exports.getCheckChatroom = getCheckChatroom;
const getUserChatrooms = async (user_id) => {
    const result = await database_1.pool.query(`SELECT
            cr.room_id,
            cr.item_id,
            COALESCE(MAX(cm.message_id), 0) AS max_message_id,
            cru.last_read_message_id,
            MAX(cm.created_at) AS last_message_time
        FROM chat_room_users cru
        JOIN chat_rooms cr ON cr.room_id = cru.room_id
        LEFT JOIN chat_messages cm ON cm.room_id = cr.room_id
        WHERE cru.user_id = $1
        GROUP BY cr.room_id, cr.item_id, cru.last_read_message_id
        ORDER BY last_message_time DESC`, [user_id]);
    if (result.rows.length === 0) {
        return [];
    }
    return result.rows.map((row) => ({
        room_id: row.room_id,
        item_id: row.item_id,
        last_message_time: row.last_message_time,
        hasUnread: row.max_message_id > (row.last_read_message_id ?? 0),
    }));
};
exports.getUserChatrooms = getUserChatrooms;
const createChatroom = async (item_id) => {
    const result = await database_1.pool.query(`INSERT INTO chat_rooms (item_id)
        VALUES ($1)
        RETURNING room_id`, [item_id]);
    if (result.rows.length === 0) {
        throw new Error('채팅방 생성에 실패했습니다.');
    }
    return result.rows[0];
};
exports.createChatroom = createChatroom;
const getMessages = async (room_id) => {
    const result = await database_1.pool.query(`SELECT message_id, room_id, sender_id, content, created_at 
        FROM chat_messages
        WHERE room_id = $1
        ORDER BY created_at ASC
        LIMIT 30`, [room_id]);
    if (result.rows.length === 0) {
        return [];
    }
    return result.rows;
};
exports.getMessages = getMessages;
const sendMessageWithReadUpdate = async (room_id, sender_id, content) => {
    const client = await database_1.pool.connect();
    try {
        await client.query('BEGIN');
        const messageResult = await client.query(`
            INSERT INTO chat_messages (room_id, sender_id, content)
            VALUES ($1, $2, $3)
            RETURNING message_id, created_at
            `, [room_id, sender_id, content]);
        if (messageResult.rows.length === 0) {
            throw new Error('메시지 생성 실패');
        }
        const { message_id, created_at } = messageResult.rows[0];
        await client.query(`
            UPDATE chat_room_users
            SET last_read_message_id = $1
            WHERE room_id = $2
              AND user_id = $3
            `, [message_id, room_id, sender_id]);
        await client.query('COMMIT');
        return { message_id, created_at };
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
};
exports.sendMessageWithReadUpdate = sendMessageWithReadUpdate;
const registerUserToChatroom = async (room_id, user_id) => {
    const result = await database_1.pool.query(`INSERT INTO chat_room_users (room_id, user_id) VALUES ($1, $2)`, [room_id, user_id]);
    console.log('registerUserToChatroom result:', result);
    if (result.rowCount === 0) {
        throw new Error('채팅방 사용자 등록에 실패했습니다.');
    }
    return;
};
exports.registerUserToChatroom = registerUserToChatroom;
const registerSellerToChatroom = async (room_id, item_id) => {
    const result = await database_1.pool.query(`INSERT INTO chat_room_users (room_id, user_id)
        SELECT $1, seller_id FROM items WHERE item_id = $2`, [room_id, item_id]);
    console.log('registerSellerToChatroom result:', result);
    if (result.rowCount === 0) {
        throw new Error('채팅방 판매자 등록에 실패했습니다.');
    }
    return;
};
exports.registerSellerToChatroom = registerSellerToChatroom;
const getChatroomByUsers = async (user_id) => {
    const result = await database_1.pool.query(`SELECT
            cr.room_id,
            u.user_id AS opponent_id,
            u.username AS opponent_username
        FROM chat_rooms cr
        JOIN chat_room_users cru_me
            ON cr.room_id = cru_me.room_id
        JOIN users me
            ON me.user_id = cru_me.user_id
        JOIN chat_room_users cru_other
            ON cr.room_id = cru_other.room_id
        AND cru_other.user_id != cru_me.user_id
        JOIN users u
            ON u.user_id = cru_other.user_id
        WHERE me.username = $1`, [user_id]);
    if (result.rows.length === 0) {
        return [];
    }
    return result.rows;
};
exports.getChatroomByUsers = getChatroomByUsers;
const getUserChatroomCount = async (user_id) => {
    const result = await database_1.pool.query(`
    SELECT COUNT(*) AS count
    FROM chat_room_users
    WHERE user_id = $1
    `, [user_id]);
    return Number(result.rows[0].count);
};
exports.getUserChatroomCount = getUserChatroomCount;
const getItemInfoByRoomId = async (room_id) => {
    const result = await database_1.pool.query(`SELECT
    i.item_id,
    i.item_images
FROM chat_rooms cr
JOIN items i
    ON i.item_id = cr.item_id
WHERE cr.room_id = $1;`, [room_id]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
exports.getItemInfoByRoomId = getItemInfoByRoomId;
const getLastMessageByRoomId = async (room_id) => {
    const result = await database_1.pool.query(`SELECT
    message_id,
    content,
    created_at
FROM chat_messages
WHERE room_id = $1
ORDER BY created_at DESC
LIMIT 1;`, [room_id]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
exports.getLastMessageByRoomId = getLastMessageByRoomId;
const getLastMessageWithUnreadByRoomId = async (room_id, user_id) => {
    const result = await database_1.pool.query(`
        SELECT
            cm.message_id,
            cm.content,
            cm.created_at,
            CASE
                WHEN cru.last_read_message_id IS NULL THEN true
                WHEN cm.message_id > cru.last_read_message_id THEN true
                ELSE false
            END AS has_unread
        FROM chat_messages cm
        JOIN chat_room_users cru
            ON cru.room_id = cm.room_id
           AND cru.user_id = $2
        WHERE cm.room_id = $1
        ORDER BY cm.message_id DESC
        LIMIT 1;
        `, [room_id, user_id]);
    if (result.rows.length === 0) {
        return null;
    }
    return {
        message_id: result.rows[0].message_id,
        content: result.rows[0].content,
        created_at: result.rows[0].created_at,
        has_unread: result.rows[0].has_unread,
    };
};
exports.getLastMessageWithUnreadByRoomId = getLastMessageWithUnreadByRoomId;
const markRoomAsRead = async (room_id, user_id) => {
    await database_1.pool.query(`
        UPDATE chat_room_users
        SET last_read_message_id = sub.max_message_id
        FROM (
            SELECT MAX(message_id) AS max_message_id
            FROM chat_messages
            WHERE room_id = $1
        ) sub
        WHERE chat_room_users.room_id = $1
          AND chat_room_users.user_id = $2;
        `, [room_id, user_id]);
};
exports.markRoomAsRead = markRoomAsRead;
