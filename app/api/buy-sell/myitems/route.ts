import { NextRequest, NextResponse } from 'next/server';
import {
    getItemBySellerId,
    getItemsByUsername,
} from '@/lib/services/item.service';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const seller_id = searchParams.get('seller_id');
        const username = searchParams.get('username');

        if (!seller_id && !username) {
            return NextResponse.json(
                { error: 'seller_id 또는 username이 필요합니다.' },
                { status: 400 },
            );
        }

        let items;
        if (username) {
            items = await getItemsByUsername(username);
        } else {
            items = await getItemBySellerId(seller_id!.toString());
        }
        return NextResponse.json({ data: items });
    } catch (error) {
        console.error('아이템 조회 오류:', error);
        return NextResponse.json(
            { error: '아이템 조회에 실패했습니다.' },
            { status: 500 },
        );
    }
}
