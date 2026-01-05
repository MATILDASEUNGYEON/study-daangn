import { NextResponse } from 'next/server';
import { createUser } from '@/lib/services/auth.service';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('회원가입 요청 데이터:', body);

        // 필드명 매핑 (클라이언트가 'id'로 보낼 경우를 대비)
        const userData = {
            username: body.username || body.id,
            password: body.password,
            email: body.email,
            address_main: body.address_main,
            address_dong: body.address_dong,
        };

        console.log('변환된 데이터:', userData);
        const result = await createUser(userData);
        return NextResponse.json(result);
    } catch (error: unknown) {
        console.error('회원가입 오류:', error);
        const message =
            error instanceof Error ? error.message : '회원가입에 실패했습니다.';
        return NextResponse.json({ message }, { status: 400 });
    }
}
