import { NextRequest, NextResponse } from 'next/server';
import { getUserLikedItemsByUsername } from '@/lib/services/like.service';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { error: 'username이 필요합니다.' },
                { status: 400 },
            );
        }
        const items = await getUserLikedItemsByUsername(username);
        return NextResponse.json({ data: items });
    } catch (error) {
        console.error('관심상품 조회 오류:', error);
        return NextResponse.json(
            { error: '관심상품 조회에 실패했습니다.' },
            { status: 500 },
        );
    }
}
