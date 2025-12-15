import { NextRequest, NextResponse } from "next/server";
import { postItem } from "@/lib/services/addItem.service";
import { uploadImages } from "@/lib/minioClient";
import { RegisterItemDTO } from "@/types/item.types";
import { getIdByUser } from "@/lib/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const username = formData.get("seller_id") as string; // username으로 받음
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const address_full = formData.get("address_full") as string;
    const category_id = Number(formData.get("category_id"));

    if (!username || !title || !description || !price || !address_full || !category_id) {
      return NextResponse.json(
        { error: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    // username으로 실제 user_id 조회
    const userInfo = await getIdByUser(username);
    if (!userInfo) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    const seller_id = userInfo.user_id;

    const imageFiles = formData.getAll("images") as File[];

    if (imageFiles.length > 10) {
      return NextResponse.json(
        { error: "이미지는 최대 10장까지 업로드 가능합니다." },
        { status: 400 }
      );
    }

    let imageUrls: string[] = [];
    if (imageFiles.length > 0 && imageFiles[0].size > 0) {
      imageUrls = await uploadImages(imageFiles);
    }

    const itemData: RegisterItemDTO = {
      item_title: title,
      item_description: description,
      item_price: price,
      item_location: address_full,
      item_images: imageUrls,
      category_id,
    };

    const result = await postItem(seller_id.toString(), itemData);

    return NextResponse.json(
      { 
        message: "상품이 성공적으로 등록되었습니다.",
        data: result 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("상품 등록 오류:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "상품 등록에 실패했습니다." },
      { status: 500 }
    );
  }
}
