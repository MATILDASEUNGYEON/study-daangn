import {getCheckChatroom,getUserChatrooms,createChatroom} from '@/lib/services/chat.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const item_id = searchParams.get('item_id');

    if(item_id){
        const user_id = Number(searchParams.get('user_id'));
        const itemIdNum = Number(item_id);
        if(isNaN(user_id) || isNaN(itemIdNum)){
            return NextResponse.json(
                {error : "유효한 user_id와 item_id가 필요합니다."},
                {status : 400}
            );
        }
        try{
            const chatroom =  await getCheckChatroom(user_id, itemIdNum);
            return NextResponse.json({data : chatroom});
        }catch(error){
            console.error("채팅방 확인 오류:", error);
            return NextResponse.json(
                { error: "채팅방 확인에 실패했습니다." },
                { status: 500 }
            );
        }
    }else{
        const user_id = Number(searchParams.get('user_id'));
        if(isNaN(user_id)){
            return NextResponse.json(
                {error : "유효한 user_id가 필요합니다."},
                {status : 400}
            );
        }
        try{
            const chatrooms =  await getUserChatrooms(user_id);
            return NextResponse.json({data : chatrooms});
        }catch(error){
            console.error("채팅방 목록 조회 오류:", error);
            return NextResponse.json(
                { error: "채팅방 목록 조회에 실패했습니다." },
                { status: 500 }
            );
        }
    }
}

export async function POST(req:NextRequest){
    try{
        const body = await req.json();
        const {item_id} = body;
        if(!item_id){
            return NextResponse.json(
                {error : "item_id가 필요합니다."},
                {status : 400}
            );
        }
        const newChatroom = await createChatroom(item_id);
        return NextResponse.json({data : newChatroom}, {status : 201});

    }catch(error){
        console.error("채팅방 생성 오류:", error);
        return NextResponse.json(
            { error: "채팅방 생성에 실패했습니다." },
            { status: 500 }
        );
    }
}
