import { NextRequest, NextResponse } from 'next/server';
import { getUserChatroomCount } from '@/lib/services/chat.service';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userid: string }> },
) {
    const { userid } = await params;
    const user_id = Number(userid);
    console.log('Received request for chatroom count of user_id:', user_id);

    if (Number.isNaN(user_id)) {
        return NextResponse.json({ error: 'Invalid user_id' }, { status: 400 });
    }

    const count = await getUserChatroomCount(user_id);

    console.log('Chatroom count for user_id', user_id, 'is', count);

    return NextResponse.json({ data: { count } });
}
