import { NextResponse, NextRequest } from "next/server";
import {updateItemStatus} from "@/lib/services/item.service";
import {ITEM_STATUS , ItemStatusType } from "@/types/item.types";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try{
        const { id: itemId } = await params;
        console.log("Received itemId:", itemId);
        const { status } : { status : ItemStatusType } = await req.json();
        if(!itemId || itemId.trim().length === 0){
            return NextResponse.json(
                { error: "유효한 아이템 ID가 필요합니다." },
                { status: 400 }
            );
        }
        if(!Object.values(ITEM_STATUS).includes(status)){
            return NextResponse.json(
                { error: "유효한 상태 값이 필요합니다." },
                { status: 400 }
            );
        }
        await updateItemStatus(Number(itemId),status);
        return NextResponse.json({message : "아이템 상태가 수정되었습니다."});
        
    }catch(error){
        console.error("아이템 상태 수정 오류:", error);
        return NextResponse.json(
            { error: "아이템 상태 수정에 실패했습니다." },
            { status: 500 }
        );
    }
}