import {NextResponse} from "next/server";
import {loginUser} from "@/lib/services/auth.service";

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const result = await loginUser(body);
        
        const response = NextResponse.json({
            success: true,
            user: result.user,
            token: result.token,
        });

        response.cookies.set('auth-token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, 
            path: '/',
        });

        return response;
    }catch (error: unknown){
        console.error("로그인 오류:", error);
        const message = error instanceof Error ? error.message : "로그인에 실패했습니다.";
        return NextResponse.json(
            { success: false, message },
            {status: 401}
        );
    }
}