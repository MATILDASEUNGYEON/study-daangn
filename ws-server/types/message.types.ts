export interface JoinMessage {
    type: 'join';
    user_id: number;
}

export interface ChatSendPayload {
    type: 'CHAT';
    room_id: number;
    sender_id: number;
    content: string;
    item_id?: number;
}
export interface ChatMessage {
    type: 'CHAT';
    message_id: number;
    room_id: number;
    sender_id: number;
    content: string;
    created_at: string;
}
