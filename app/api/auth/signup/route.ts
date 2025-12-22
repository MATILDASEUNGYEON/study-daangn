import { NextResponse } from 'next/server';
import { createUser } from '@/lib/services/auth.service';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = await createUser(body);
        return NextResponse.json(result);
    } catch (error: unknown) {
        console.error('회원가입 오류:', error);
        const message =
            error instanceof Error ? error.message : '회원가입에 실패했습니다.';
        return NextResponse.json({ message }, { status: 400 });
    }
}
