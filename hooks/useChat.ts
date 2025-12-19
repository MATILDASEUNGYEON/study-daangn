// import { useEffect, useState } from 'react';
// import { connectSocket, sendMessage } from '@/lib/websocket';

// type ChatMessage = {
//   type: string;
//   [key: string]: string | number | boolean | object | undefined;
// };

// export function useChat(user_id: number | null) {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);

//   useEffect(() => {
//     if (!user_id) return;

//     const socket = connectSocket(user_id);

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'CHAT') {
//         setMessages(prev => [...prev, data]);
//       }
//     };

//     return () => {
//       socket.close();
//     };
//   }, [user_id]);

//   return {
//     messages,
//     sendMessage,
//   };
// }

import { useEffect, useState } from "react";
import { connectSocket, sendMessage as sendWsMessage } from "@/lib/websocket";
import { ChatSendPayload,ChatMessage } from "@/ws-server/types/message.types";
// export interface ChatMessage {
//   type: "CHAT";
//   message_id: number;
//   room_id: number;
//   sender_id: number;
//   content: string;
//   created_at: string;
// }

export function useChat(userId: number | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastRoomId, setLastRoomId] = useState<number | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = connectSocket(userId);

    socket.onmessage = (event) => {
      const data: ChatMessage = JSON.parse(event.data);

      if (data.type === "CHAT") {
        setMessages((prev) => [...prev, data]);
        setLastRoomId(data.room_id);
      }
    };

    return () => {
      socket.close();
    };
  }, [userId]);

  /* ✅ 이제 sendMessage는 "보내는 타입"만 받는다 */
  const sendMessage = (payload: ChatSendPayload) => {
    sendWsMessage(payload);
  };

  return {
    messages,
    sendMessage,
    lastRoomId,
  };
}
