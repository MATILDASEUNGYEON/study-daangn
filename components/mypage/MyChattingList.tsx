'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ChattingModal } from '@/components/ui/chattingModal';
import { ChatRoom } from '@/types/chat.types';
import Image from 'next/image';
import sampleImage from '@/assets/images/sampleImage.png';
export default function MyChattingList() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

    const loadRoomDetails = async (rooms: ChatRoom[]) => {
        const updatedRooms = await Promise.all(
            rooms.map(async (room) => {
                try {
                    const [itemRes, lastMsgRes] = await Promise.all([
                        fetch(`/api/chat/rooms/${room.room_id}/item`),
                        fetch(`/api/chat/rooms/${room.room_id}/lastmessage`),
                    ]);

                    const itemJson = itemRes.ok ? await itemRes.json() : null;
                    const msgJson = lastMsgRes.ok
                        ? await lastMsgRes.json()
                        : null;

                    return {
                        ...room,
                        itemId: itemJson?.data?.item_id ?? null,
                        itemImage: itemJson?.data?.item_images?.[0] ?? null,
                        lastMessage: msgJson?.data?.content ?? null,
                        lastMessageTime: msgJson?.data?.created_at ?? null,
                    };
                } catch (err) {
                    console.error(
                        `채팅방(${room.room_id}) 추가 정보 로딩 실패`,
                        err,
                    );
                    return room;
                }
            }),
        );

        return updatedRooms;
    };

    useEffect(() => {
        if (!user?.username) return;

        let cancelled = false;

        const fetchRooms = async () => {
            try {
                const res = await fetch(`/api/chat/users/${user.username}`);
                const result = await res.json();

                if (!res.ok || cancelled) return;

                const baseRooms: ChatRoom[] = result.data.map(
                    (room: ChatRoom) => ({
                        ...room,
                        itemImage: undefined,
                        lastMessage: undefined,
                        lastMessageTime: undefined,
                    }),
                );

                const fullRooms = await loadRoomDetails(baseRooms);

                if (!cancelled) {
                    setChatRooms(fullRooms);
                }
            } catch (error) {
                console.error('채팅방 목록 조회 실패:', error);
            }
        };

        fetchRooms();

        return () => {
            cancelled = true;
        };
    }, [user?.username]);

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
                            setSelectedRoom(room);
                            setIsModalOpen(true);
                        }}
                    >
                        <Image
                            src={room.itemImage ?? sampleImage}
                            alt="채팅 아이템 이미지"
                            width={48}
                            height={48}
                            unoptimized
                            className="w-12 h-12 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">
                                    {room.opponent_username}
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
                    </div>
                ))}
            </div>

            {selectedRoom && (
                <ChattingModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedRoom(null);
                    }}
                    roomId={selectedRoom.room_id}
                    itemId={selectedRoom.itemId ?? null} // ✅ 추가
                    title="채팅"
                />
            )}
        </div>
    );
}
