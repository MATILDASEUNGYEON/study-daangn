"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
const ws_1 = require("ws");
const chat_service_1 = require("@/lib/services/chat.service");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const clients = new Map();
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
                let targetRoomId;
                // 1️⃣ 기존 채팅방 존재 여부 확인
                const existingChatroom = await (0, chat_service_1.getCheckChatroom)(sender_id, item_id);
                if (existingChatroom) {
                    // ✅ 이미 존재 → 재사용
                    targetRoomId = existingChatroom.room_id;
                }
                else {
                    // 2️⃣ 없으면 새로 생성
                    const chatroom = await (0, chat_service_1.createChatroom)(item_id);
                    targetRoomId = chatroom.room_id;
                    await (0, chat_service_1.registerUserToChatroom)(targetRoomId, sender_id);
                    await (0, chat_service_1.registerSellerToChatroom)(targetRoomId, item_id);
                }
                // 3️⃣ 메시지 저장
                const saved = await (0, chat_service_1.sendMessageWithReadUpdate)(targetRoomId, sender_id, content);
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
            }
            catch (err) {
                console.error('❌ 채팅 메시지 처리 실패:', err);
            }
        }
    });
    ws.on('close', () => {
        clients.forEach((value, key) => {
            if (value === ws)
                clients.delete(key);
        });
    });
});
console.log('🚀 WebSocket server running on ws://localhost:8080');
