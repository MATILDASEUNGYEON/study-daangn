import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, uploadImages } from '@/lib/minioClient';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const singleFile = formData.get('file') as File | null;

        const multipleFiles = formData.getAll('files') as File[];

        if (singleFile && singleFile.size > 0) {
            const url = await uploadImage(singleFile);
            return NextResponse.json({ url }, { status: 200 });
        }

        if (multipleFiles.length > 0 && multipleFiles[0].size > 0) {
            const urls = await uploadImages(multipleFiles);
            return NextResponse.json({ urls }, { status: 200 });
        }

        return NextResponse.json(
            {
                error: "파일이 없습니다. 'file' 또는 'files' 필드로 파일을 전송해주세요.",
            },
            { status: 400 },
        );
    } catch (error) {
        console.error('이미지 업로드 오류:', error);

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(
            { error: '이미지 업로드에 실패했습니다.' },
            { status: 500 },
        );
    }
}
