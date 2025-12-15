import { NextRequest,NextResponse } from "next/server";
import { getItemById,deleteItem,updateItem } from "@/lib/services/item.service";
import { getUsernameById } from "@/lib/services/auth.service";
import { UpdateDTO } from "@/types/item.types";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params){
    try{
        const { id } = await params;
        const itemId = Number(id);
        
        if (isNaN(itemId)) {
            return NextResponse.json(
                { error: "유효한 아이템 ID가 필요합니다." },
                { status: 400 }
            );
        }
        
        const item = await getItemById(itemId);
        
        if (!item) {
            return NextResponse.json(
                { error: "아이템을 찾을 수 없습니다." },
                { status: 404 }
            );
        }
        
        const sellerUsername = await getUsernameById(Number(item.seller_id));
        
        return NextResponse.json({
            data: {
                ...item,
                seller_username: sellerUsername || "알 수 없음"
            }
        });
    }catch(error){
        console.error("아이템 조회 오류:", error);
        return NextResponse.json(
            { error: "아이템 조회에 실패했습니다." },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: Params){
    try{
        const { id } = await params;
        const itemId = Number(id);
        const updateData : UpdateDTO = await req.json();

        if (isNaN(itemId)) {
            return NextResponse.json(
                { error: "유효한 아이템 ID가 필요합니다." },
                { status: 400 }
            );
        }

        if(!updateData.item_title && !updateData.item_description && !updateData.item_price && !updateData.item_location && !updateData.category_id && !updateData.item_images){
            return NextResponse.json(
                { error: "수정할 데이터가 필요합니다." },
                { status: 400 }
            );
        }

        await updateItem(itemId, updateData);
        
        return NextResponse.json({message : "아이템이 수정되었습니다."});

    }catch(error){
        console.error("아이템 수정 오류:", error);
        return NextResponse.json(
            { error: "아이템 수정에 실패했습니다." },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: Params){
    try{
        const { id } = await params;
        const itemId = Number(id);
        
        if (isNaN(itemId)) {
            return NextResponse.json(
                { error: "유효한 아이템 ID가 필요합니다." },
                { status: 400 }
            );
        }
        
        await deleteItem(itemId);
        return NextResponse.json({message : "아이템이 삭제되었습니다."});
    }catch(error){
        console.error("아이템 삭제 오류:", error);
        return NextResponse.json(
            { error: "아이템 삭제에 실패했습니다." },
            { status: 500 }
        );
    }
}