import { NextRequest, NextResponse } from 'next/server';
import { getChatroomByUsers } from '@/lib/services/chat.service';
import { getIdByUser } from '@/lib/services/auth.service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> }
) {
  try {
    const { userid } = await params;

    const userId = await getIdByUser(userid);
    console.log('Resolved userId:', userId);

    if (typeof userId !== 'number') {
      return NextResponse.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 404 }
      );
    }

    const chatrooms = await getChatroomByUsers(userId);
    console.log('Fetched chatrooms:', chatrooms);

    return NextResponse.json({ data: chatrooms }, { status: 200 });
  } catch (error) {
    console.error("사용자 채팅방 조회 오류:", error);
    return NextResponse.json(
      { error: "사용자 채팅방 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}
