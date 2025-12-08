import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/config/database";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: "아이디를 입력해주세요." },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT username FROM users WHERE username = $1",
      [id]
    );

    return NextResponse.json({
      exists: result.rows.length > 0
    });
  } catch (error: unknown) {
    console.error("ID 중복 확인 오류:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
