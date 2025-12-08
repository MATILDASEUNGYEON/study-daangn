import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/config/database";

export async function GET() {
    try {
        const result = await pool.query("SELECT * FROM items_category_enum");

        return NextResponse.json({
            categories: result.rows.map(row => row.category_text)
        });
    }catch(error:unknown){
        console.error("카테고리 조회 오류:", error);
        return NextResponse.json(
            { message: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}