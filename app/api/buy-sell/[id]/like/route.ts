import { NextRequest, NextResponse } from 'next/server';
import {
    toggleLike,
    checkUserLike,
    getItemLikeCount,
} from '@/lib/services/like.service';
import { getIdByUser } from '@/lib/services/auth.service';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const item_id = parseInt(id);

        if (isNaN(item_id)) {
            return NextResponse.json(
                { error: '유효하지 않은 상품 ID입니다.' },
                { status: 400 },
            );
        }

        const body = await req.json();
        const { username } = body;

        if (!username) {
            return NextResponse.json(
                { error: '로그인이 필요합니다.' },
                { status: 401 },
            );
        }

        const userInfo = await getIdByUser(username);
        if (!userInfo) {
            return NextResponse.json(
                { error: '사용자를 찾을 수 없습니다.' },
                { status: 404 },
            );
        }

        const result = await toggleLike(userInfo, item_id);

        return NextResponse.json({
            success: true,
            data: {
                liked: result.liked,
                likeCount: result.likeCount,
            },
            message: result.liked
                ? '좋아요를 눌렀습니다.'
                : '좋아요를 취소했습니다.',
        });
    } catch (error) {
        console.error('좋아요 처리 오류:', error);
        return NextResponse.json(
            { error: '좋아요 처리에 실패했습니다.' },
            { status: 500 },
        );
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const item_id = parseInt(id);

        if (isNaN(item_id)) {
            return NextResponse.json(
                { error: '유효하지 않은 상품 ID입니다.' },
                { status: 400 },
            );
        }

        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        const likeCount = await getItemLikeCount(item_id);

        let isLiked = false;
        if (username) {
            const userInfo = await getIdByUser(username);
            if (userInfo) {
                isLiked = await checkUserLike(userInfo, item_id);
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                liked: isLiked,
                likeCount,
            },
        });
    } catch (error) {
        console.error('좋아요 상태 조회 오류:', error);
        return NextResponse.json(
            { error: '좋아요 상태 조회에 실패했습니다.' },
            { status: 500 },
        );
    }
}
