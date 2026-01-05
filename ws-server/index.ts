import dotenv from 'dotenv';

dotenv.config();

import { WebSocketServer } from 'ws';
import {
    createChatroom,
    registerUserToChatroom,
    registerSellerToChatroom,
    getCheckChatroom,
    sendMessageWithReadUpdate,
} from './services/chat.service';

const wss = new WebSocketServer({ port: 8080 });

const clients = new Map<number, import('ws').WebSocket>();

wss.on('connection', (ws) => {
    console.log('🔌 WebSocket connected');

    ws.on('message', async (data) => {
        const message = JSON.parse(data.toString());

        if (message.type === 'JOIN') {
            clients.set(message.user_id, ws);
            return;
        }

        if (message.type === 'CHAT') {
            const { sender_id, content, item_id } = message;

            try {
                if (!item_id) {
                    throw new Error('item_id is required to send chat message');
                }

                let targetRoomId: number;

                const existingChatroom = await getCheckChatroom(
                    sender_id,
                    item_id,
                );

                if (existingChatroom) {
                    targetRoomId = existingChatroom.room_id;
                } else {
                    const chatroom = await createChatroom(item_id);
                    targetRoomId = chatroom.room_id;

                    await registerUserToChatroom(targetRoomId, sender_id);
                    await registerSellerToChatroom(targetRoomId, item_id);
                }

                const saved = await sendMessageWithReadUpdate(
                    targetRoomId,
                    sender_id,
                    content,
                );

                const outgoingMessage = {
                    type: 'CHAT',
                    message_id: saved.message_id,
                    room_id: targetRoomId,
                    sender_id,
                    content,
                    created_at: saved.created_at,
                };

                // 4️⃣ 브로드캐스트
                clients.forEach((client) => {
                    if (client.readyState === ws.OPEN) {
                        client.send(JSON.stringify(outgoingMessage));
                    }
                });
            } catch (err) {
                console.error('❌ 채팅 메시지 처리 실패:', err);
            }
        }
    });

    ws.on('close', () => {
        clients.forEach((value, key) => {
            if (value === ws) clients.delete(key);
        });
    });
});

console.log('🚀 WebSocket server running on ws://localhost:8080');
