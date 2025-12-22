import { useEffect, useState } from 'react';
import { connectSocket, sendMessage as sendWsMessage } from '@/lib/websocket';
import { ChatSendPayload, ChatMessage } from '@/ws-server/types/message.types';

export function useChat(userId: number | null) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [lastRoomId, setLastRoomId] = useState<number | null>(null);

    useEffect(() => {
        if (!userId) return;

        const socket = connectSocket(userId);

        socket.onmessage = (event) => {
            const data: ChatMessage = JSON.parse(event.data);

            if (data.type === 'CHAT') {
                setMessages((prev) => [...prev, data]);
                setLastRoomId(data.room_id);
            }
        };

        return () => {
            socket.close();
        };
    }, [userId]);

    const sendMessage = (payload: ChatSendPayload) => {
        sendWsMessage(payload);
    };

    return {
        messages,
        sendMessage,
        lastRoomId,
    };
}
