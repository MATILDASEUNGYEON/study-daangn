import { NextRequest, NextResponse } from 'next/server';
import { getChatroomByUsers } from '@/lib/services/chat.service';
// import { getIdByUser } from '@/lib/services/auth.service';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userid: string }> },
) {
    try {
        const { userid } = await params;

        const chatrooms = await getChatroomByUsers(userid);
        console.log('Fetched chatrooms _ latest:', chatrooms);

        return NextResponse.json({ data: chatrooms }, { status: 200 });
    } catch (error) {
        console.error('사용자 채팅방 조회 오류:', error);
        return NextResponse.json(
            { error: '사용자 채팅방 조회에 실패했습니다.' },
            { status: 500 },
        );
    }
}
