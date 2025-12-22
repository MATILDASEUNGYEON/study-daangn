import { getItemInfoByRoomId } from '@/lib/services/chat.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ roomid: string }> },
) {
    const { roomid } = await params;
    const room_id = Number(roomid);
    if (isNaN(room_id)) {
        return NextResponse.json(
            { error: '유효한 room_id가 필요합니다.' },
            { status: 400 },
        );
    }
    try {
        const itemInfo = await getItemInfoByRoomId(room_id);
        if (!itemInfo) {
            return NextResponse.json(
                { error: '해당 채팅방에 연결된 아이템이 없습니다.' },
                { status: 404 },
            );
        }
        return NextResponse.json({ data: itemInfo });
    } catch (error) {
        console.error('아이템 정보 조회 오류:', error);
        return NextResponse.json(
            { error: '아이템 정보 조회에 실패했습니다.' },
            { status: 500 },
        );
    }
}
