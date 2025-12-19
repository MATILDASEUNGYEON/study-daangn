import {getMessages,sendMessage} from '@/lib/services/chat.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest,{params} : {params : Promise<{roomid : string}>}){
    const {roomid} = await params;
    const room_id = Number(roomid);
    if(isNaN(room_id)){
        return NextResponse.json(
            {error : "유효한 room_id가 필요합니다."},
            {status : 400}
        );
    }
    try{
        const messages =  await getMessages(room_id);
        return NextResponse.json({data : messages});
    }catch(error){
        console.error("메시지 조회 오류:", error);
        return NextResponse.json(
            { error: "메시지 조회에 실패했습니다." },
            { status: 500 }
        );
    }
}

export async function POST(req:NextRequest,{params} : {params : Promise<{roomid : string}>}){
    try{
        const {roomid} = await params;
        const room_id = Number(roomid);
        const body = await req.json();
        const {sender_id, content} = body;
        if(isNaN(room_id) || isNaN(sender_id) || !content){
            return NextResponse.json(
                {error : "유효한 room_id, sender_id와 content가 필요합니다."},
                {status : 400}
            );
        }
        const newMessage = await sendMessage(room_id, sender_id, content);
        return NextResponse.json({data : newMessage}, {status : 201});
    }catch(error){
        console.error("메시지 전송 오류:", error);
        return NextResponse.json(
            { error: "메시지 전송에 실패했습니다." },
            { status: 500 }
        );
    }
}