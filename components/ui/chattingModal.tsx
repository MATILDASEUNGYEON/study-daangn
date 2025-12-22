'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import SubmitIcon from '@/assets/svgs/SubmitIcon';
import CloseIcon from '@/assets/svgs/CloseIcon';
import { useChat } from '@/hooks/useChat';

interface Message {
    message_id: number;
    room_id: number;
    content: string;
    sender_id: number;
    created_at: string;
}

interface ChattingModalProps {
    isOpen: boolean;
    onClose: () => void;
    roomId: number;
    title?: string;
}

export function ChattingModal({
    isOpen,
    onClose,
    roomId,
    title = '채팅',
}: ChattingModalProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const { messages: wsMessages, sendMessage } = useChat(
        user?.user_id ?? null,
    );

    const [messages, setMessages] = React.useState<Message[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!isOpen || !roomId) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/chat/rooms/${roomId}/messages`);
                const result = await res.json();
                if (res.ok) setMessages(result.data);
            } catch (err) {
                console.error('메시지 조회 실패:', err);
            }
        };

        fetchMessages();
    }, [isOpen, roomId]);

    React.useEffect(() => {
        const latest = wsMessages.at(-1);
        if (!latest || latest.room_id !== roomId) return;

        setMessages((prev) => {
            const exists = prev.some((m) => m.message_id === latest.message_id);
            if (exists) return prev;
            return [...prev, latest];
        });
    }, [wsMessages, roomId]);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputValue.trim() || !user?.user_id) return;

        sendMessage({
            type: 'CHAT',
            room_id: roomId,
            sender_id: user.user_id,
            content: inputValue,
        });

        setInputValue('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="flex flex-col w-full max-w-md h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-orange-500 text-white">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose}>
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {messages.map((msg) => {
                        const isMe = msg.sender_id === user?.user_id;
                        return (
                            <div
                                key={msg.message_id}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                                        isMe
                                            ? 'bg-orange-500 text-white rounded-br-md'
                                            : 'bg-white border rounded-bl-md'
                                    }`}
                                >
                                    <p className="text-sm">{msg.content}</p>
                                    <p className="text-xs mt-1 opacity-70 text-right">
                                        {new Date(
                                            msg.created_at,
                                        ).toLocaleTimeString('ko-KR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <div className="flex items-center gap-2 p-4 border-t">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-full"
                        placeholder="메시지를 입력하세요"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="p-2 bg-orange-500 text-white rounded-full disabled:opacity-40"
                    >
                        <SubmitIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
