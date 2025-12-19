export interface ChatroomDTO{
    room_id: number;
    item_id?: number;
    created_at?: string;
}

export interface ChatroomListDTO{
    room_id: number;
    item_id: number;
    last_message_time: string | null;
}
export interface ChatroomUserDTO{
    room_id: number;
    user_id: string;
}

export interface ChatMessageDTO{
    message_id: number;
    room_id: number;
    sender_id: number;
    content: string;
    created_at: string;
}
export interface ChatRoom{
    room_id: number;
    item_id: number;
    opponentName: string;
    lastMessage?: string | null;
    lastMessageTime?: string | null;
    unreadCount: number;
}