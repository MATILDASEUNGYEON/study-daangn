import { NextRequest, NextResponse } from "next/server";
import {
  registerUserToChatroom,
  registerSellerToChatroom,
} from "@/lib/services/chat.service";

export async function POST( req: NextRequest, { params }: { params: { roomid: string } }) {
  try {
    const room_id = Number(params.roomid);
    if (isNaN(room_id)) {
      return NextResponse.json(
        { message: "유효하지 않은 room_id 입니다." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { user_id, item_id } = body;

    if (!user_id || !item_id) {
      return NextResponse.json(
        { message: "user_id와 item_id는 필수입니다." },
        { status: 400 }
      );
    }

    try {
      await registerUserToChatroom(room_id, user_id);
    } catch (e) {
      console.warn("구매자 이미 등록됨 또는 무시:", e);
    }

    try {
      await registerSellerToChatroom(room_id, item_id);
    } catch (e) {
      console.warn("판매자 이미 등록됨 또는 무시:", e);
    }

    return NextResponse.json(
      { message: "채팅방 참여자 등록 완료" },
      { status: 201 }
    );
  } catch (error) {
    console.error("채팅방 참여자 등록 오류:", error);
    return NextResponse.json(
      { message: "채팅방 참여자 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
