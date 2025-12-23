import { getLastMessageWithUnreadByRoomId } from '@/lib/services/chat.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ roomid: string }> },
) {
    const { roomid } = await params;
    const room_id = Number(roomid);
    const { searchParams } = new URL(req.url);
    const user_id = Number(searchParams.get('user_id'));

    if (isNaN(room_id) || isNaN(user_id)) {
        return NextResponse.json(
            { error: '유효한 room_id와 user_id가 필요합니다.' },
            { status: 400 },
        );
    }
    try {
        const lastMessage = await getLastMessageWithUnreadByRoomId(
            room_id,
            user_id,
        );
        console.log('마지막 메시지 조회 성공:', lastMessage);
        return NextResponse.json({
            data: {
                room_id,
                ...lastMessage,
            },
        });
    } catch (error) {
        console.error('마지막 메시지 조회 오류:', error);
        return NextResponse.json(
            { error: '마지막 메시지 조회에 실패했습니다.' },
            { status: 500 },
        );
    }
}
