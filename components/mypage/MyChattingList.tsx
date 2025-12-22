'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ChattingModal } from '@/components/ui/chattingModal';
import { ChatRoom } from '@/types/chat.types';

export default function MyChattingList() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

    useEffect(() => {
        const fetchChatRooms = async () => {
            if (!user || !user.username) {
                setChatRooms([]);
                return;
            }
            try {
                const res = await fetch(`/api/chat/users/${user.username}`);
                const result = await res.json();

                if (res.ok) {
                    console.log('Fetched chat rooms:', result.data);
                    setChatRooms(result.data);
                }
            } catch (error) {
                console.error('채팅방 목록 조회 실패:', error);
            }
        };

        fetchChatRooms();
    }, [user]);
    return (
        <div>
            <div className="space-y-3">
                <h3 className="text-lg font-bold mb-4">채팅 목록</h3>

                {chatRooms.length === 0 && (
                    <p className="text-gray-400 text-center py-10">
                        참여 중인 채팅방이 없습니다.
                    </p>
                )}

                {chatRooms.map((room) => (
                    <div
                        key={room.room_id}
                        className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => {
                            setSelectedRoomId(room.room_id);
                            setIsModalOpen(true);
                        }}
                    >
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-500 font-bold">
                                {room.opponentName}
                            </span>
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">
                                    {room.opponentName}
                                </p>
                                {room.lastMessageTime && (
                                    <span className="text-xs text-gray-400">
                                        {new Date(
                                            room.lastMessageTime,
                                        ).toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-gray-500 truncate">
                                {room.lastMessage ?? '메시지가 없습니다.'}
                            </p>
                        </div>

                        {room.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white">
                                    {room.unreadCount}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedRoomId && (
                <ChattingModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedRoomId(null);
                    }}
                    roomId={selectedRoomId}
                    title="채팅"
                />
            )}
        </div>
    );
}
