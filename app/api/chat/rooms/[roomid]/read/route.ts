import { markRoomAsRead } from '@/lib/services/chat.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ roomid: string }> },
) {
    const { roomid } = await params;
    const room_id = Number(roomid);

    const body = await req.json();
    const user_id = Number(body.user_id);

    if (isNaN(room_id) || isNaN(user_id)) {
        return NextResponse.json(
            { error: '유효한 room_id와 user_id가 필요합니다.' },
            { status: 400 },
        );
    }

    try {
        await markRoomAsRead(room_id, user_id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('읽음 처리 실패:', error);
        return NextResponse.json(
            { error: '읽음 처리에 실패했습니다.' },
            { status: 500 },
        );
    }
}
