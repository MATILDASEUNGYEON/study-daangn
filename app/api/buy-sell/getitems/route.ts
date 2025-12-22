import { NextResponse } from 'next/server';
import { getItemlist } from '@/lib/services/item.service';

export async function GET() {
    try {
        const items = await getItemlist();
        return NextResponse.json({ data: items });
    } catch (error) {
        console.error('아이템 조회 오류:', error);
        return NextResponse.json(
            { error: '아이템 조회에 실패했습니다.' },
            { status: 500 },
        );
    }
}
