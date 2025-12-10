import { NextRequest, NextResponse } from "next/server";
import {getItemBySellerId} from "@/lib/services/item.service";
import {getIdByUser} from "@/lib/services/auth.service";

export async function GET(req: NextRequest){
    try{
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');
        if(!username){
            return NextResponse.json(
                { error: "username가 필요합니다." },
                { status: 400 }
            );
        }
        
        const seller_id = await getIdByUser(username);
        if(!seller_id){
            return NextResponse.json(
                { error: "사용자를 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        const items = await getItemBySellerId(seller_id.toString());
        return NextResponse.json({data : items});
        
    }catch(error){
        console.error("아이템 조회 오류:", error);
        return NextResponse.json(
            { error: "아이템 조회에 실패했습니다." },
            { status: 500 }
        );
    }
}